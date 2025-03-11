import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { 
    path:'',
    redirectTo: 'mainPage', //Redirecionamento Padrão
    pathMatch:'full'
  },

  {
    path:'cadastro',
    component:CadastroComponent
  },

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'mainPage',
    component:MainPageComponent
  }
];
