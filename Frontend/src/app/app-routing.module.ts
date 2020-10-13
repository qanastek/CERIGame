import { QuizzComponent } from './quizz/quizz.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainComponent },
  { path: 'quizz', component: QuizzComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
