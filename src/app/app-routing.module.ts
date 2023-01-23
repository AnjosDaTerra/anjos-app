import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'quemsomos/:id',
    loadChildren: () => import('./pages/quemsomos/quemsomos.module').then( m => m.QuemsomosPageModule)
  },
  {
    path: 'botao',
    loadChildren: () => import('./botao/botao.module').then( m => m.BotaoPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./shared/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'slide',
    loadChildren: () => import('./components/slide/slide.module').then( m => m.SlidePageModule)
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./pages/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
