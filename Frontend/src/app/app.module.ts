import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from './components/alert/alert.component';
import { QuizzComponent } from './quizz/quizz.component';
import { ThemesComponent } from './themes/themes.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './components/users/profile/profile.component';
import { PlayComponent } from './components/quizz/play/play.component';
import { EndgameComponent } from './components/quizz/endgame/endgame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomeComponent } from './home/home.component';
import { TopComponent } from './top/top.component';
import { ToastChallengeComponent } from './components/toast-challenge/toast-challenge.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DefiComponent } from './components/defi/defi.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    NavbarComponent,
    QuizzComponent,
    ThemesComponent,
    SidebarComponent,
    ProfileComponent,
    PlayComponent,
    EndgameComponent,
    HomeComponent,
    TopComponent,
    ToastChallengeComponent,
    DefiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
