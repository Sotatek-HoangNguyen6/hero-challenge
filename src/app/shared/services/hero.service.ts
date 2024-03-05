import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../../core/models/hero';
import { HEROES } from '../../core/constants/mock-data';

@Injectable({ providedIn: 'root' })
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    return of(hero);
  }
}
