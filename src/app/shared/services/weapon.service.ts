import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weapon } from '../../core/models/weapon';
import { WEAPONS } from '../../core/constants/mock-data';

@Injectable({
  providedIn: 'root',
})
export class WeaponService {
  getWeapons(): Observable<Weapon[]> {
    const weapons = of(WEAPONS);
    return weapons;
  }

  getWeapon(id: number): Observable<Weapon> {
    const weapon = WEAPONS.find((weapon) => weapon.id === id)!;
    return of(weapon);
  }
}
