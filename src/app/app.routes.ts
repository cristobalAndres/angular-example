import { Routes } from '@angular/router';

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
