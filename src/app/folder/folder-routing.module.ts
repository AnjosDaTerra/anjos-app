import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarPage } from '../pages/cadastrar/cadastrar.page';
import { LoginPage } from '../pages/login/login.page';
import { QuemsomosPage } from '../pages/quemsomos/quemsomos.page';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: '',
    component: QuemsomosPage,
  },
  {
    path: '',
    component: CadastrarPage
  },
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
