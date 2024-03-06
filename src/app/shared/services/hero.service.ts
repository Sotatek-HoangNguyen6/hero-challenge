import { Injectable } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { HEROES } from '../../core/constants/mock-data';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Monster } from '../../core/models/monster';
import { MONSTERS } from '../../core/constants/mock-monster';

@Injectable({ providedIn: 'root' })
export class HeroService {
  heroes$ = new BehaviorSubject(HEROES);
  monsters$ = new BehaviorSubject(MONSTERS);

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
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

  getMonster(index: number): Monster {
    const monsters = this.monsters$.getValue();
    return monsters[index];
  }

  // reset(): void {
  //   const baseData = JSON.parse(localStorage.getItem('baseData') as any);
  //   this.heroes$.next(baseData?.heroes || HEROES);
  //   this.monsters$.next(baseData?.monsters || MONSTERS);
  // }
}
