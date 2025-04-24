import { Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { BuscaComponent } from './components/busca/busca.component';

export const routes: Routes = [
  { 
    path:'',
    redirectTo: '/mainPage', //Redirecionamento Padrão
    pathMatch:'full'
  },

  {
    path:'mainPage',
    component:MainPageComponent,
    data: { title: 'QMask!' }
  },

  {
    path:'cadastro',
    component:CadastroComponent,
    data: { title: 'Cadastro - QMask!' }
  },

  {
    path:'login',
    component:LoginComponent,
    data: { title: 'Login - QMask!' }
  },

  {
    path:'detalhes/:id',
    component:DetalhesComponent,
    data: { title: 'Detalhes do Produto - QMask!' }
  },

  {
    path: 'busca',
    component: BuscaComponent,
    data: { title: 'Resultados de Busca - QMask!' }
  }
];
