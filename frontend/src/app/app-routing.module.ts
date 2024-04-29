import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent} from './components/user-register/user-register.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MedListComponent } from './components/med-list/med-list.component';
import { MedRegisterComponent } from './components/med-register/med-register.component';

const routes: Routes = [
  { path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  { path: 'registerUser',
  component: UserRegisterComponent,
  pathMatch: 'full'
  },
  { path: 'menuPrincipal',
  component: MenuPrincipalComponent,
  pathMatch: 'full'
  },
  { path: 'userProfile',
  component: UserProfileComponent,
  pathMatch: 'full'
  },
  { path: 'medList',
  component: MedListComponent,
  pathMatch: 'full'
  },
  { path: 'registerMed',
  component: MedRegisterComponent,
  pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
