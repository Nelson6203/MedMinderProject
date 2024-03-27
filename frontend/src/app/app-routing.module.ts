import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent} from './components/user-register/user-register.component';
import { MenuPrincipalComponent } from './components/menu-principal/menu-principal.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
