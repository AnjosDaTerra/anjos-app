import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SlidePageModule } from 'src/app/components/slide/slide.module';
import { RegiaoLojasPageModule } from 'src/app/components/regiao-lojas/regiao-lojas.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SlidePageModule,
    RegiaoLojasPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
