import { Injectable } from '@angular/core';
import { ARMORS } from '../../core/constants/mock-data';
import { Armor } from '../../core/models/armor';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class ArmorService extends ItemService<Armor> {
  constructor() {
    super(ARMORS);
  }
}
