import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonPronoComponent } from './mon-prono/mon-prono.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'monprono', component: MonPronoComponent }
];
