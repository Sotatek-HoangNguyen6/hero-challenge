import { Component, OnDestroy, OnInit } from '@angular/core';

import { HeroService } from '../../shared/services/hero.service';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Hero } from '../../core/models/hero';
import { ListItemComponent } from '../../shared/components/list-item/list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [ListItemComponent, CommonModule],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroService.getHeroes();
  }

  goToDetail(hero: Hero): void {
    this.router.navigateByUrl(`/hero/${hero.id}`);
  }
}
