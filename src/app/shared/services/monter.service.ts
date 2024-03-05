import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Monster } from '../../core/models/monster';
import { MONSTERS } from '../../core/constants/mock-monster';

@Injectable({
  providedIn: 'root',
})
export class MonterService {
  constructor() {}
  getMonsters(): Observable<Monster[]> {
    const heroes = of(MONSTERS);
    return heroes;
  }

  getMonster(id: number): Observable<Monster> {
    const monster = MONSTERS.find((monter) => monter.id === id)!;
    return of(monster);
  }
}
