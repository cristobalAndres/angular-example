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
    path: 'code',
    loadComponent: () => import('./code-test/code-test.component').then((m) => m.CodeTestComponent),
  },
  {
    path: 'signals',
    loadComponent: () => import('./signals/signals.component').then((m) => m.SignalsComponent),
  },
  {
    path: 'signals-tasks',
    loadComponent: () => import('./signals-tasks/signals-tasks.component').then((m) => m.SignalsTasksComponent),
  },
  {
    path: 'signals-pokemon',
    loadComponent: () => import('./signals-pokemon/signals-pokemon.component').then((m) => m.SignalsPokemonComponent),
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
