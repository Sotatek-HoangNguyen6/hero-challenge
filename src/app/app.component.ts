import { Component } from '@angular/core';
import { HeaderPageComponent } from './shared/components/header-page/header-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderPageComponent, CommonModule, RouterModule],
})
export class AppComponent {
  title = 'Tour of Heroes';
}
