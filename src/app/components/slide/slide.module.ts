import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwiperModule } from 'swiper/angular';
import { SlidePage } from './slide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule
  ],
  declarations: [SlidePage],
  exports:[SlidePage]
})
export class SlidePageModule {}
