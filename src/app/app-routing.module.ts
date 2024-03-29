import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'quemsomos',
    loadChildren: () => import('./pages/quemsomos/quemsomos.module').then(m => m.QuemsomosPageModule)
  },
  {
    path: 'botao',
    loadChildren: () => import('./Core/botao/botao.module').then(m => m.BotaoPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./shared/footer/footer.module').then(m => m.FooterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'pessoal',//cadastro pessoal
    loadChildren: () => import('./pages/pessoal/endereco.module').then(m => m.EnderecoPageModule)
  },
  {
    path: 'residencial', //cadastro endereco
    loadChildren: () => import('./pages/residencial/residencial.module').then(m => m.ResidencialPageModule)
  },
  {
    path: 'solicitacao/:id',
    loadChildren: () => import('./pages/solicitacao/solicitacao.module').then( m => m.SolicitacaoPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./pages/recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
