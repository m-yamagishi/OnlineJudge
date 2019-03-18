import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ContestComponent} from './components/contest/contest.component';
import { ContestsComponent} from './components/contests/contests.component';
import { AddcontestComponent } from './components/addcontest/addcontest.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contests', component: ContestsComponent},
  { path: 'contest/:id', component: ContestComponent},
  { path: 'addcontest', component: AddcontestComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
