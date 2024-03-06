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
  ngUnsubscribe = new Subject<void>();
  weapons: Weapon[] = [];
  armors: Armor[] = [];
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private armorService: ArmorService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.listenArmors();
    this.listenWeapons();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHeroById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((hero) => (this.hero = hero));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  listenWeapons(): void {
    this.weapons = this.weaponService.getWeapons();
  }

  listenArmors(): void {
    this.armors = this.armorService.getArmors();
  }

  addWeapon(weapon: Weapon): void {
    this.hero.damage =
      (this.hero?.damage || 0) -
      (this.weapons.find((weapon) => this.hero?.weaponId === weapon.id)
        ?.damage || 0) +
      weapon.damage;
    this.hero.weaponId = weapon.id;
  }

  addArmor(armor: Armor): void {
    this.hero.health =
      (this.hero?.health || 0) -
      (this.armors.find((armor) => this.hero?.armorId === armor.id)?.health ||
        0) +
      armor.health;
    this.hero.armorId = armor.id;
  }
}
