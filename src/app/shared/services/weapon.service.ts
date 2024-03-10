import { Injectable } from '@angular/core';
import { Weapon } from '../../core/models/weapon';
import { WEAPONS } from '../../core/constants/mock-data';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class WeaponService extends ItemService<Weapon> {
  constructor() {
    super(WEAPONS);
  }
}
