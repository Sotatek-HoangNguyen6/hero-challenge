import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroService } from '../../shared/services/hero.service';
import { Hero } from '../../core/models/hero';
import { RouterModule } from '@angular/router';
import { Monster } from '../../core/models/monster';
import { BattleService } from '../../shared/services/battle.service';
import { Subject, combineLatest, filter, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Item } from '../../core/models/item';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterModule, CommonModule],
  providers: [BattleService],
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  monsters: Monster[] = [];
  listHero: Hero[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private heroService: HeroService,
    private battleService: BattleService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.listenFighting();
    this.battleService.initStageCanvas();
    this.listenFinishedBattle();
  }

  listenFinishedBattle(): void {
    this.battleService.isFinished$
      .pipe(
        filter((isFinished) => !!isFinished),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        //reset list data fight
        this.listHero = [];
        this.monsters = [];
      });
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((heroes) => (this.heroes = heroes));
  }

  addHero(hero: Hero): void {
    //check hero in list hero exist
    if (this.listHero.some((item) => hero.id === item.id)) {
      return;
    }
    this.listHero.push(hero);
    this.monsters.push(this.heroService.getMonster(this.listHero.length - 1));
    this.battleService.addImageLayer();
  }

  startBattle(): void {
    this.battleService.startBattle(this.listHero, this.monsters);
    this.heroService.updateBaseData();
  }

  listenFighting(): void {
    this.battleService.startBattle$
      .pipe(
        filter((newItem) => !!newItem),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((newItem: Item) => {
        this.battleService.updateBattle$.next({
          listHero: newItem?.listHero,
          monsters: newItem?.monsters,
        });
      });
  }

  removeItem(item: Hero | Monster, isHero = false): void {
    if (isHero) {
      this.listHero = this.battleService.removeItems(item, this.listHero);
    } else {
      this.monsters = this.battleService.removeItems(item, this.monsters);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
