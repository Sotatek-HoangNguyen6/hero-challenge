import { Component, OnDestroy, OnInit } from '@angular/core';

import { HeroService } from '../../shared/services/hero.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../core/models/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  ngUnsubscribe = new Subject<void>();

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((heroes) => (this.heroes = heroes));
  }
  goToDetail(hero: Hero): void {
    this.router.navigateByUrl(`/hero/${hero.id}`);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
