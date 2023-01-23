import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/Core/models/usuario.interface';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };
  nome!: Usuario;
  
  constructor(private readonly httpClient: HttpClient, private readonly alert: AlertController) { }
   
  ngOnInit() {
    //this.sayHello()
  }
  public async sayHello() : Promise<Usuario> {
    this.httpClient.get<Usuario>('http://127.0.0.1:4000/cliente/usarios').subscribe(resultado => {
      this.nome = resultado;
    });
    return this.nome
  }

  async presentAlert1() {
    const alert = await this.alert.create({
      header: 'Primeiro passo',
      subHeader: 'Escolha o seu produto',
      message: '',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alert.create({
      header: 'Segundo passo',
      subHeader: 'Escolha a forma de pagamento',
      message: '',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alert.create({
      header: 'Último passo',
      subHeader: 'Endereço de entrega',
      message: '',
      buttons: ['OK'],
    });
    await alert.present();
  }
}