import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ContestComponent } from './components/contest/contest.component';
import { ContestsComponent } from './components/contests/contests.component';
import { AddcontestComponent } from './components/addcontest/addcontest.component';
import { ResultComponent } from './components/result/result.component';
import { ResultsComponent } from './components/results/results.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contests', component: ContestsComponent },
  { path: 'contest/:id', component: ContestComponent, canActivate: [AuthGuard] },
  { path: 'addcontest', component: AddcontestComponent, canActivate: [AuthGuard] },
  { path: 'results', component: ResultsComponent },
  { path: 'result/:id', component: ResultComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
