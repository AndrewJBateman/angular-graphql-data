import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'character-list',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module'),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./components/pages/episodes/episodes.module'),
  },

  {
    path: 'character-list',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-list/characters-list.module'
      ),
  },
  {
    path: 'character-details/:id',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-details/characters-details.module'
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/pages/about/about.module'),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./components/pages/notFound/not-found.module'),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
