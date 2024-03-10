import { Injectable } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { HEROES } from '../../core/constants/mock-data';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Monster } from '../../core/models/monster';
import { MONSTERS } from '../../core/constants/mock-monster';
import { isEmpty } from 'lodash';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroes$ = new BehaviorSubject(HEROES);
  private monsters$ = new BehaviorSubject(MONSTERS);

  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  getHeroById(id: number): Observable<Hero> {
    return this.heroes$.pipe(
      map((heroes) => heroes.find((h) => h.id === id) as Hero)
    );
  }

  getMonsterById(id: number): Observable<Monster> {
    return this.monsters$.pipe(
      map(
        (monsters) => monsters.find((monster) => monster.id === id) as Monster
      )
    );
  }

  updateHero(hero: Hero): void {
    const oldHeroes = this.heroes$.getValue();
    const updateHeroes = oldHeroes.map((item) =>
      item.id === hero.id ? hero : item
    );
    this.heroes$.next(updateHeroes);
    this.updateBaseData(updateHeroes);
  }

  getMonster(index: number): Monster {
    const monsters = this.monsters$.getValue();
    return monsters[index];
  }

  updateBaseData(heroes?: Hero[], monsters?: Monster[]): void {
    // save data to reset data before they're fight
    const baseData = {
      heroes: heroes ? heroes : this.heroes$.getValue(),
      monsters: monsters ? monsters : this.monsters$.getValue(),
    };
    localStorage.setItem('baseData', JSON.stringify(baseData));
  }

  reset(): void {
    const baseData = JSON.parse(localStorage.getItem('baseData') as any);
    if (isEmpty(baseData)) {
      return;
    }
    this.heroes$.next(baseData.heroes);
    this.monsters$.next(baseData.monsters);
  }
}
