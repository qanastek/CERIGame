import { TopComponent } from './top/top.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ThemesComponent } from './themes/themes.component';
import { AuthGuard } from './Guards/auth.guard';
import { QuizzComponent } from './quizz/quizz.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuard], children: [
    { path: '', component: HomeComponent },
    { path: 'themes', component: ThemesComponent },
    { path: 'quizz', component: QuizzComponent },
    { path: 'users', children: [
      { path: 'top', component: TopComponent },
      { path: 'profile/:id', component: ProfileComponent },
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
