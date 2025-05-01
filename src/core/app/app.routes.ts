import { Routes } from '@angular/router';
import { CadastroComponent } from '../../app/components/cadastro/cadastro.component';
import { MainPageComponent } from '../../app/components/main-page/main-page.component';
import { LoginComponent } from '../../app/components/login/login.component';
import { DetalhesComponent } from '../../app/components/detalhes/detalhes.component';
import { BuscaComponent } from '../../app/components/busca/busca.component';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
  { 
    path:'',
    redirectTo: 'mainPage', //Redirecionamento Padrão
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
    data: { title: 'Detalhes do Produto - QMask!', RenderMode: 'ssr' }
  },

  {
    path: 'busca',
    component: BuscaComponent,
    data: { title: 'Resultados de Busca - QMask!' }
  }
];
