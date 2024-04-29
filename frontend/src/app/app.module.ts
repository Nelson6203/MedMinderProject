import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { MedListComponent } from './components/med-list/med-list.component';
import { MedRegisterComponent } from './components/med-register/med-register.component';
import { HelpAndSupportComponent } from './components/help-and-support/help-and-support.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterComponent,
    MenuPrincipalComponent,
    UserProfileComponent,
    HeaderComponent,
    MedListComponent,
    MedRegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
