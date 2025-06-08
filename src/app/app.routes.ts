import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonPronoComponent } from './mon-prono/mon-prono.component';
import { ResultatComponent } from './resultat/resultat.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'monprono', component: MonPronoComponent },
  { path: 'results', component: ResultatComponent }
];
