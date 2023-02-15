import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/Core/models/vitima/login.interface';
import { AlertController} from '@ionic/angular';

import { ActivatedRoute, Router } from '@angular/router';
import { DadosPessoais } from 'src/app/Core/models/vitima/vitima-pessoal.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   //Tenho que ver onde vou por esse httpOptions e a chamadas http
   httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  } 
  readonly API = 'http://127.0.0.1:4000';
  //--------------------------------------------

  nome!: string;
  cpf!: string;
  objeto! : DadosPessoais  
  updateUserInfo: any

  
  constructor(
    private readonly httpClient: HttpClient, private readonly alert: AlertController,
    private route: ActivatedRoute,
    private routeId: Router,
    ) { }
   
  ngOnInit() {
    this.routeId = this.route.snapshot.params['id'];
    this.pegarInformacao();
    //esse reloadOnce serve pra não bugar o side menu logo depois do login.
    this.reloadOnce()
  }
  reloadOnce() {
    if (window.localStorage) {
  
      // If there is no item as 'reload'
      // in localstorage then create one &
      // reload the page
      if (!localStorage.getItem('reload')) {
          localStorage['reload'] = true;
          window.location.reload();
      } else {

          // If there exists a 'reload' item
          // then clear the 'reload' item in
          // local storage
          localStorage.removeItem('reload');  
      }
    }
  }

  //Pegar os dados do banco.
  pegarInformacao() {
    this.httpClient.get<DadosPessoais>(`${this.API}/vitima/pegar-dados-pessoal?cpf=${this.routeId}`).subscribe((resultado) => {
      this.objeto = resultado;
      this.nome = this.objeto.nome;
      this.cpf = this.objeto.cpf;
    })
  }

  // public async sayHello() : Promise<Usuario> {
  //   this.httpClient.get<Usuario>('http://127.0.0.1:4000/vitima/usuarios').subscribe(resultado => {
  //     this.nome = resultado;
  //   });
  //   return this.nome
  // }

  

}
