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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './components/users/profile/profile.component';
import { AllComponent } from './components/users/all/all.component';
import { LastGamesComponent } from './components/users/last-games/last-games.component';
import { CreateComponent } from './components/challenge/create/create.component';
import { ListComponent } from './components/challenge/list/list.component';
import { PlayComponent } from './components/quizz/play/play.component';
import { EndgameComponent } from './components/quizz/endgame/endgame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AlertComponent,
    NavbarComponent,
    QuizzComponent,
    ThemesComponent,
    ResultsQuizzComponent,
    SidebarComponent,
    ProfileComponent,
    AllComponent,
    LastGamesComponent,
    CreateComponent,
    ListComponent,
    PlayComponent,
    EndgameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
