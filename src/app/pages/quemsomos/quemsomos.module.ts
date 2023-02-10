import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonFabButton, IonicModule } from '@ionic/angular';

import { QuemsomosPageRoutingModule } from './quemsomos-routing.module';

import { QuemsomosPage } from './quemsomos.page';
import { BotaoPageModule } from 'src/app/Core/botao/botao.module';
//import { SharedModule } from 'src/app/shared/shared.module'; //bugando tbm, então vou fazer manualmente a importacao do botao e do footer
//import { FooterPageModule } from 'src/app/shared/footer/footer.module'; //é o footer bugando

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuemsomosPageRoutingModule,
    BotaoPageModule//gambiara
  ],
  declarations: [QuemsomosPage]
})




export class QuemsomosPageModule {}
