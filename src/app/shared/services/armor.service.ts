import { Injectable } from '@angular/core';
import { ARMORS } from '../../core/constants/mock-data';
import { Armor } from '../../core/models/armor';

@Injectable({
  providedIn: 'root',
})
export class ArmorService {
  getArmors(): Armor[] {
    return ARMORS;
  }

  getArmor(id: number): Armor {
    const armor = ARMORS.find((armor) => armor.id === id)!;
    return armor;
  }
}
