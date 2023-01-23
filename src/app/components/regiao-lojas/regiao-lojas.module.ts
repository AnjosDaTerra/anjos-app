import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegiaoLojasPageRoutingModule } from './regiao-lojas-routing.module';

import { RegiaoLojasPage } from './regiao-lojas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegiaoLojasPageRoutingModule
  ],
  declarations: [RegiaoLojasPage],
  exports: [RegiaoLojasPage]
})
export class RegiaoLojasPageModule {}
