import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weapon } from '../../core/models/weapon';
import { WEAPONS } from '../../core/constants/mock-data';

@Injectable({
  providedIn: 'root',
})
export class WeaponService {
  getWeapons(): Weapon[] {
    return WEAPONS;
  }

  getWeapon(id: number): Weapon {
    const weapon = WEAPONS.find((weapon) => weapon.id === id)!;
    return weapon;
  }
}
