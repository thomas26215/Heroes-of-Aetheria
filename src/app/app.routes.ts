import { Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout';
import { Heroes } from './components/heroes/heroes';
import { HeroDetail } from './components/hero-detail/hero-detail';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: Heroes },                 // Page d’accueil
      { path: 'hero/:id', component: HeroDetail } // Route vers un détail de héros avec paramètre id
    ]
  }
];

