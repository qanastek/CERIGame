import { ProfileComponent } from './components/users/profile/profile.component';
import { ResultsQuizzComponent } from './results-quizz/results-quizz.component';
import { ThemesComponent } from './themes/themes.component';
import { AuthGuard } from './Guards/auth.guard';
import { QuizzComponent } from './quizz/quizz.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuard], children: [
    { path: '', component: MainComponent },
    { path: 'themes', component: ThemesComponent },
    { path: 'quizz/:id', component: QuizzComponent },
    { path: 'quizz/results', component: ResultsQuizzComponent },
    { path: 'users', children: [
      { path: 'profile/:id', component: ProfileComponent },
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
