import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { QuizzComponent } from './quizz/quizz.component';
import { ThemesComponent } from './themes/themes.component';
import { ResultsQuizzComponent } from './results-quizz/results-quizz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AlertComponent,
    NavbarComponent,
    QuizzComponent,
    ThemesComponent,
    ResultsQuizzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
