import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { BuscaComponent } from './components/busca/busca.component';

export const routes: Routes = [
  { 
    path:'',
    redirectTo: 'mainPage', //Redirecionamento Padrão
    pathMatch:'full'
  },

  {
    path:'mainPage',
    component:MainPageComponent
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
    path:'detalhes/:id',
    component:DetalhesComponent
  },

  {
    path: 'busca',
    component: BuscaComponent
  }
];
