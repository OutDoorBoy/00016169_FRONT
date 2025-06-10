import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/add', component: MovieFormComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies/:id/edit', component: MovieFormComponent },
  { path: '**', redirectTo: '' }
];
