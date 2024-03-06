import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../shared/services/hero.service';
import { Hero } from '../../core/models/hero';
import { RouterModule } from '@angular/router';
import { Monster } from '../../core/models/monster';
import { BattleService } from '../../shared/services/battle.service';
import { Observable, delay, filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  monsters: Monster[] = [];
  listHero: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private battleService: BattleService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.listenFighting();
    this.battleService.initStageCanvas();
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  addHero(hero: Hero): void {
    //check hero in list hero exist
    if (this.listHero.some((item) => hero.id === item.id)) {
      return;
    }
    this.battleService.addImageLayer();
    this.listHero.push(hero);
    this.monsters.push(this.heroService.getMonster(this.listHero.length - 1));
  }

  fight(): void {
    // save data to reset data before fight
    // const baseData = {
    //   heroes: this.heroService.heroes$.getValue(),
    //   monsters: this.heroService.monsters$.getValue(),
    // };
    // localStorage.setItem('baseData', JSON.stringify(baseData));
    this.battleService.startBattle$.next({
      listHero: this.listHero,
      monsters: this.monsters,
    });
  }

  listenFighting(): void {
    this.battleService.startBattle$
      .pipe(
        filter((nextfight) => !!nextfight),
        delay(200)
      )
      .subscribe((newItem: any) => {
        this.battleService.updateBattle$.next({
          listHero: newItem?.listHero,
          monsters: newItem?.monsters,
        });
      });
  }
}
