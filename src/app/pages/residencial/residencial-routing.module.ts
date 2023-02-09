import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidencialPage } from './residencial.page';

const routes: Routes = [
  {
    path: '',
    component: ResidencialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidencialPageRoutingModule {}
