import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

export const navMenu = [
  {
    name: 'Dashboard',
    routerLink: '/dashboard',
  },
  {
    name: 'Heroes',
    routerLink: '/heroes',
  },
];

@Component({
  standalone: true,
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css'],
  imports: [RouterModule],
})
export class HeaderPageComponent {
  title = 'Tour of Heroes';
  navItems = navMenu;
}
