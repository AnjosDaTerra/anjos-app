import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidencialPageRoutingModule } from './residencial-routing.module';

import { ResidencialPage } from './residencial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResidencialPageRoutingModule
  ],
  declarations: [ResidencialPage]
})
export class ResidencialPageModule {}
