import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegiaoLojasPage } from './regiao-lojas.page';

const routes: Routes = [
  {
    path: '',
    component: RegiaoLojasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegiaoLojasPageRoutingModule {}
