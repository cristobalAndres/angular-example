import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { FintocComponent } from './fintoc/fintoc.component';

// export const routes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: 'pokemon', component: PokemonComponent, data: { title: 'Pokemon' } },
//   { path: 'fintoc', component: FintocComponent },
//   {
//     path: '**',
//     redirectTo: '/home',
//     pathMatch: 'full',
//   },
// ];

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'pokemon',
    loadComponent: () => import('./pokemon/pokemon.component').then((m) => m.PokemonComponent),
  },
  {
    path: 'fintoc',
    loadComponent: () => import('./fintoc/fintoc.component').then((m) => m.FintocComponent),
  },
  {
    path: 'forms',
    loadComponent: () => import('./forms/forms.component').then((m) => m.FormsComponent),
  },
  {
    path: '**',
    redirectTo: '/forms',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/forms',
    pathMatch: 'full',
  },
];
