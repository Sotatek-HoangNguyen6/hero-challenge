import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ARMORS } from '../../core/constants/mock-data';
import { Armor } from '../../core/models/armor';

@Injectable({
  providedIn: 'root',
})
export class ArmorService {
  getArmors(): Observable<Armor[]> {
    const armors = of(ARMORS);
    return armors;
  }

  getArmor(id: number): Observable<Armor> {
    const armor = ARMORS.find((armor) => armor.id === id)!;
    return of(armor);
  }
}
