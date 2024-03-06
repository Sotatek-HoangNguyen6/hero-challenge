import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { isEmpty } from 'lodash';
import { Hero } from '../../core/models/hero';
import { Monster } from '../../core/models/monster';
import Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { HeroService } from './hero.service';

const BACKGROUND_DEFAULT = 'assets/background/background.jpg';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  updateBattle$ = new BehaviorSubject({});
  startBattle$ = new BehaviorSubject({});
  layer$: BehaviorSubject<any> = new BehaviorSubject({});
  stage: any;
  layer = new Konva.Layer();
  heroGroup = new Konva.Group({
    x: 50,
    y: 40,
  });
  bloodHeroGroup = new Konva.Group({
    x: 0,
    y: 0,
  });
  monsterGroup = new Konva.Group({
    x: 600,
    y: 40,
  });
  bloodMonsterGroup = new Konva.Group({
    x: 0,
    y: 0,
  });

  constructor(private heroService: HeroService) {
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

  drawHero(imageObj: any, health: number): void {
    this.drawBlood(this.heroGroup, this.bloodHeroGroup, health);
    const heroImg = new Konva.Image({
      image: imageObj,
      x: 50,
      y: 250,
      width: 100,
      height: 250,
    });
    // TODO add animation for skill of hero belongs to weaponId
    this.heroGroup.add(heroImg);
    this.heroGroup.on('click', () => {
      this.heroGroup.destroy();
    });
    this.layer.add(this.heroGroup);
    this.stage.add(this.layer);
  }
  drawMonster(imageObj: any, health: number): void {
    this.drawBlood(this.monsterGroup, this.bloodMonsterGroup, health);
    const monsterImg = new Konva.Image({
      image: imageObj,
      x: 50,
      y: 250,
      width: 100,
      height: 250,
    });
    // TODO add animation for skill of monster
    this.monsterGroup.add(monsterImg);
    this.layer.add(this.monsterGroup);
    this.stage.add(this.layer);
  }

  drawBlood(parentGroup: Group, group: Group, width?: number): void {
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
    group.add(bloodColumn);
    group.add(text);
    parentGroup.add(group);
  }

  resetData(): void {
    // this.heroService.reset();
  }

  listenUpdateBattle(): void {
    this.updateBattle$.pipe(delay(500)).subscribe((item: any) => {
      // if empty heroes or monters will ended battle
      // will destroy monster and heroes
      if (isEmpty(item.listHero) || isEmpty(item.monsters)) {
        this.heroGroup.destroy();
        this.monsterGroup.destroy();
        this.resetData();
        return;
      }
      // draw first hero in to image
      const firstHero = item.listHero[0];
      const imageHero = new Image();
      imageHero.src = firstHero.imageSrc;
      this.heroGroup.destroy();
      this.drawHero(imageHero, firstHero.health);

      // draw first monster of monsters in to image
      let firstMonster = item.monsters[0];
      const imageMonster = new Image();
      imageMonster.src = firstMonster.imageSrc;
      this.monsterGroup.destroy();
      this.drawMonster(imageMonster, firstMonster.health);

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
