import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../../shared/services/hero.service';
import { Subject, takeUntil } from 'rxjs';
import { WeaponService } from '../../../shared/services/weapon.service';
import { ArmorService } from '../../../shared/services/armor.service';
import { Weapon } from '../../../core/models/weapon';
import { Armor } from '../../../core/models/armor';
import { Hero } from '../../../core/models/hero';
import { ItemDetailComponent } from '../../../shared/components/item-detail/item-detail.component';
import { ListItemComponent } from '../../../shared/components/list-item/list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [ItemDetailComponent, ListItemComponent, CommonModule],
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  weapons: Weapon[] = [];
  armors: Armor[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private armorService: ArmorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHeroById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((hero) => (this.hero = hero));
    this.weapons = this.weaponService.get();
    this.armors = this.armorService.get();
  }

  updateWeapon(weapon: Weapon, isEquip: boolean): void {
    if (isEquip) {
      this.hero.damage =
        (this.hero?.damage || 0) -
        (this.weaponService.getItemById(this.hero?.weaponId || 0)?.damage ||
          0) +
        weapon.damage;
      this.hero.weaponId = weapon.id;
    } else {
      this.hero.damage =
        (this.hero?.damage || 0) -
          this.weaponService.getItemById(this.hero?.weaponId || 0)?.damage || 0;
      this.hero.weaponId = undefined;
    }
    this.heroService.updateHero(this.hero);
  }

  updateArmor(armor: Armor, isEquip: boolean): void {
    if (isEquip) {
      this.heroService.updateHero(this.hero);
      this.hero.health =
        (this.hero?.health || 0) -
        (this.armorService.getItemById(this.hero?.armorId || 0)?.health || 0) +
        armor.health;
      this.hero.armorId = armor.id;
    } else {
      this.hero.health =
        (this.hero?.health || 0) -
          this.armorService.getItemById(this.hero?.armorId || 0)?.health || 0;
      this.hero.armorId = undefined;
    }
    this.heroService.updateHero(this.hero);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
