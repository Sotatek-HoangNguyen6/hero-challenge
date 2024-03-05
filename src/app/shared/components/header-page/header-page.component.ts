import { Component } from '@angular/core';

export const navMenu = [
  {
    name: 'Dashboard',
    routerLink: '/dashboard',
  },
  {
    name: 'Heroes',
    routerLink: '/heroes',
  },
  {
    name: 'Weapons',
    routerLink: '/weapons',
  },
  {
    name: 'Armors',
    routerLink: '/armors',
  },
];

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css'],
})
export class HeaderPageComponent {
  title = 'Tour of Heroes';
  navItems = navMenu;
}
