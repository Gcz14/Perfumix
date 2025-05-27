import { Routes } from '@angular/router';
import { TelaPrincipalComponent } from './components/tela-principal/tela-principal.component';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';
import { TelaUsuariosComponent } from './components/tela-usuarios/tela-usuarios.component';
import { TelaCrudAdmComponent } from './components/tela-crud-adm/tela-crud-adm.component';
import { TelaHomeAdmComponent } from './components/tela-home-adm/tela-home-adm.component';
import { TelaCadastroComponent } from './components/tela-cadastro/tela-cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tela-principal', pathMatch: 'full' },
  { path: 'tela-principal', component: TelaPrincipalComponent },
  { path: 'tela-login', component: TelaLoginComponent },
  { path: 'tela-usuarios', component: TelaUsuariosComponent },
  { path: 'tela-crud', component: TelaCrudAdmComponent },
  { path: 'tela-cadastro', component: TelaCadastroComponent },
  { path: 'tela-home-adm', component:TelaHomeAdmComponent}
];
