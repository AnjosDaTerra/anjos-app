import { Injectable } from '@angular/core';
import {LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(
    private loadCtrl: LoadingController,
    private toast: ToastController
  ) { }

  async informando(
    message: string,
    color: string,
    position: ToastOptions['position'],
    duration: number
  ) {
      const toastei = this.toast.create({
        message,
        position,
        color,
        duration
      });
      (await toastei).present();
  }

}
