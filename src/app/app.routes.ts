import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout';
import { Heroes } from './components/heroes/heroes';
import { HeroDetail } from './components/hero-detail/hero-detail';
import { FightPage } from './components/fight-page/fight-page';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: Heroes },                 // Page d’accueil
      { path: 'hero/:id', component: HeroDetail },     // Détail héros
      { path: 'fight', component: FightPage }          // Nouvelle route pour le combat
    ]
  }
];

