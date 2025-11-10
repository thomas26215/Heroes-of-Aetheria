import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout';
import { Heroes } from './components/heroes/heroes';
import { HeroDetail } from './components/hero-detail/hero-detail';
import { FightPage } from './components/fight-page/fight-page';
import { AddHeroComponent } from './components/add-hero/add-hero';
import { AddWeaponComponent } from './components/weapons/add/add';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'heroes', pathMatch: 'full' }, // Redirection vers la page d’accueil
      { path: 'heroes', component: Heroes },                 // Page d’accueil
      { path: 'hero/:id', component: HeroDetail },     // Détail héros
      { path: 'fight', component: FightPage },         // Nouvelle route pour le combat
      { path: 'add-hero', component: AddHeroComponent }, // Page pour ajouter un héros
      { path: 'add-arme', component: AddWeaponComponent } // Page pour ajouter une arme
    ]
  }
];

