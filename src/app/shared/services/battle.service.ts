import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, interval, take } from 'rxjs';
import { isUndefined } from 'lodash';
import { Hero } from '../../core/models/hero';
import { Monster } from '../../core/models/monster';
import Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { HeroService } from './hero.service';
import { WeaponService } from './weapon.service';
import { Item } from '../../core/models/item';

const BACKGROUND_DEFAULT = 'assets/background/background.jpg';
const WEAPON_DEFAULT = 'assets/skill/default-weapon.png';
const TIME_CALCULATE = 1000;
@Injectable()
export class BattleService {
  updateBattle$: BehaviorSubject<Item> = new BehaviorSubject({} as Item);
  startBattle$: BehaviorSubject<Item> = new BehaviorSubject({} as Item);
  isFinished$ = new BehaviorSubject(false);
  stage: any;
  layer = new Konva.Layer();
  heroGroup = new Konva.Group({
    x: 50,
    y: 40,
  });
  heroWeaponGroup = new Konva.Group({
    x: 100,
    y: 100,
  });
  monsterGroup = new Konva.Group({
    x: 650,
    y: 40,
  });
  monsterWeaponGroup = new Konva.Group({
    x: 600,
    y: 125,
  });

  messageGroup = new Konva.Group({
    x: 350,
    y: 210,
  });
  constructor(
    private heroService: HeroService,
    private weaponService: WeaponService
  ) {
    this.listenUpdateBattle();
  }

  initStageCanvas(): void {
    const width = 900;
    const height = 550;
    this.stage = new Konva.Stage({
      container: 'imageCanvas' || null,
      width: width,
      height: height,
    });
  }

  listenUpdateBattle(): void {
    this.updateBattle$
      .pipe(
        filter(
          (item: Item) =>
            !isUndefined(item.listHero) && !isUndefined(item.monsters)
        ),
        delay(TIME_CALCULATE)
      )
      .subscribe((item: Item) => {
        // if empty heroes or monters will ended battle
        // will destroy monster and heroes
        this.heroGroup.destroy();
        this.monsterGroup.destroy();
        if (!item.listHero.length || !item.monsters.length) {
          this.isFinished$.next(true);
          !item.listHero.length
            ? this.drawMessage('Lose', false)
            : this.drawMessage('Victory', true);
          this.heroService.reset();
          return;
        }
        // draw first hero in to image
        const firstHero = item.listHero[0];
        this.drawCharacter(firstHero, this.heroGroup);
        const getWeaponImage = this.weaponService.getItemById(
          firstHero?.weaponId || 0
        );
        this.drawWeapon(
          this.heroWeaponGroup,
          100,
          600,
          false,
          getWeaponImage?.imageSrc
        );

        // draw first monster of monsters in to image
        let firstMonster = item.monsters[0];
        this.drawCharacter(firstMonster, this.monsterGroup);
        this.drawWeapon(this.monsterWeaponGroup, 600, 100, true, undefined);

        // calculate dame and health for hero and monster
        firstHero.health = firstHero.health - firstMonster.damage;
        firstMonster.health = firstMonster.health - firstHero.damage;
        // remove hero and monster
        // if both of them have under 0 health
        if (firstHero.health <= 0 && firstMonster.health <= 0) {
          this.startBattle$.next({
            listHero: this.removeItems(firstHero, item.listHero),
            monsters: this.removeItems(firstMonster, item.monsters),
          });
          return;
        }

        // remove hero if he has under 0 health
        if (firstHero.health <= 0) {
          this.startBattle$.next({
            listHero: this.removeItems(firstHero, item.listHero),
            monsters: item.monsters,
          });
          return;
        }

        // remove monster if he has under 0 health
        if (firstMonster.health <= 0) {
          this.startBattle$.next({
            listHero: item.listHero,
            monsters: this.removeItems(firstMonster, item.monsters),
          });
          return;
        }
        // set hero and monster after to calculate and continue battle
        item.listHero[0] = firstHero;
        item.monsters[0] = firstMonster;
        this.startBattle$.next({
          listHero: item.listHero,
          monsters: item.monsters,
        });
      });
  }

  startBattle(listHero: Hero[], monsters: Monster[]): void {
    this.isFinished$.next(false);
    this.startBattle$.next({
      listHero: listHero,
      monsters: monsters,
    });
  }

  /*
   * Draw background image layer
   */
  addImageLayer() {
    const imageObj = new Image();
    imageObj.src = BACKGROUND_DEFAULT;
    const backgroundLayer = new Konva.Image({
      x: 50,
      y: 50,
      image: imageObj,
      width: 800,
      height: 550,
    });

    this.layer.add(backgroundLayer);
    this.stage.add(this.layer);
  }

  /*
   * Draw character like hero or monster
   */
  drawCharacter(character: Hero | Monster, group: Group) {
    const imageObj = new Image();
    imageObj.src = character.imageSrc || '';
    const imageLayer = new Konva.Image({
      image: imageObj,
      x: 50,
      y: 250,
      width: 100,
      height: 250,
    });
    this.drawBlood(group, character.health);
    group.add(imageLayer);
    this.layer.add(group);
    this.stage.add(this.layer);
  }

  /*
   * Draw blood of monster or hero when they are fighting
   */
  drawBlood(parentGroup: Group, width?: number): void {
    let colorhealth = 'green';
    if (width && width < 50) {
      colorhealth = 'red';
    }
    const bloodColumn = new Konva.Rect({
      x: 50,
      y: 230,
      width: width || 100,
      height: 20,
      name: 'health',
      fill: colorhealth,
    });
    const text = new Konva.Text({
      x: 45,
      y: 227,
      text: `${width || 100}`,
      fontFamily: 'Calibri',
      fontSize: 18,
      padding: 5,
      fill: 'white',
    });
    parentGroup.add(bloodColumn);
    parentGroup.add(text);
  }

  /*
   * Draw weapon for character
   * actually, use skill like fireball, hakai,...
   */
  drawWeapon(
    group: Group,
    coordinatesStart: number,
    coordinatesEnd: number,
    isMonster = false,
    imageSrc?: string
  ): void {
    const imageWeapon = new Image();
    imageWeapon.src = !!imageSrc ? imageSrc : WEAPON_DEFAULT;
    const weaponImg = new Konva.Image({
      image: imageWeapon,
      x: 70,
      y: 230,
      width: 50,
      height: 50,
    });
    let start = coordinatesStart;
    const animationWeapon = new Konva.Animation(() => {
      if (
        (!isMonster && group.x() < coordinatesEnd) ||
        (isMonster && group.x() > coordinatesEnd)
      ) {
        isMonster ? (start -= 20) : (start += 20);
        group.x(start);
      } else {
        animationWeapon.stop();
        start = coordinatesStart;
        group.destroy();
        group.x(coordinatesStart);
      }
    }, this.layer);
    interval(TIME_CALCULATE)
      .pipe(take(1))
      .subscribe(() => animationWeapon.start());
    group.add(weaponImg);
    this.layer.add(group);
    this.stage.add(this.layer);
  }

  /*
   * after fighting, show message victory or lose
   */
  drawMessage(message: string, isWin = false): void {
    const backGround = new Konva.Rect({
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      name: message,
      fill: isWin ? 'green' : 'red',
    });
    const text = new Konva.Text({
      x: 50,
      y: 30,
      text: message,
      fontFamily: 'Calibri',
      fontSize: 25,
      padding: 10,
      fill: 'white',
    });
    this.messageGroup.add(backGround);
    this.messageGroup.add(text);
    this.messageGroup.on('click', () => {
      this.messageGroup.destroy();
    });
    this.layer.add(this.messageGroup);
    this.stage.add(this.layer);
  }

  removeItems(
    item: Hero | Monster,
    array: Hero[] | Monster[]
  ): Hero[] | Monster[] {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
