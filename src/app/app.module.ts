import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeroDetailComponent } from './pages/heroes/hero-detail/hero-detail.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderPageComponent } from './shared/components/header-page/header-page.component';
import { ListItemComponent } from './shared/components/list-item/list-item.component';
import { ItemDetailComponent } from './shared/components/item-detail/item-detail.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeaderPageComponent,
    ListItemComponent,
    ItemDetailComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
