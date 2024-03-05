import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../../../shared/services/hero.service';
import { Subject, takeUntil } from 'rxjs';
import { WeaponService } from '../../../shared/services/weapon.service';
import { ArmorService } from '../../../shared/services/armor.service';
import { Weapon } from '../../../core/models/weapon';
import { DEFAULT_IMAGE } from '../../../core/constants/mock-data';
import { Armor } from '../../../core/models/armor';
import { Hero } from '../../../core/models/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  ngUnsubscribe = new Subject<void>();
  DEFAULT_IMAGE = DEFAULT_IMAGE;
  isWeapon = false;
  weapons: Weapon[] = [];
  isArmor = false;
  armors: Armor[] = [];
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private armorService: ArmorService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHero(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((hero) => (this.hero = hero));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  listenWeapons(): void {
    this.isWeapon = true;
    this.weaponService
      .getWeapons()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((weapons) => {
        this.weapons = weapons;
        this.isArmor = false;
      });
  }

  listenArmors(): void {
    this.isArmor = true;
    this.armorService
      .getArmors()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((armors) => {
        this.armors = armors;
        this.isWeapon = false;
      });
  }

  addWeapon(weapon: Weapon): void {
    this.hero.damage =
      (this.hero?.damage || 0) -
      (this.weapons.find((weapon) => this.hero?.weaponId === weapon.id)
        ?.damage || 0) +
      weapon.damage;
    this.hero.weaponId = weapon.id;
    this.isWeapon = false;
  }

  addArmor(armor: Armor): void {
    this.hero.health =
      (this.hero?.health || 0) -
      (this.armors.find((armor) => this.hero?.armorId === armor.id)?.health ||
        0) +
      armor.health;
    this.hero.armorId = armor.id;
    this.isArmor = false;
  }
}
