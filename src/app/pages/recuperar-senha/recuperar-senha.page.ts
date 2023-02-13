import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UtilidadesService } from 'src/app/Core/services/utilidades.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient, 
    private util:UtilidadesService, 
    private menuCtrl: MenuController,
    private router: Router
    ) {
      this.menuCtrl.enable(false, 'main-menu') //DESATIVA O MENU LATERAL
     }
//Tenho que ver onde vou por esse httpOptions e a chamadas http
httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
} 
readonly API = 'http://127.0.0.1:4000';
//--------------------------------------------
  formEmail! : FormGroup
  ngOnInit() {
    this.formEmail = this.formBuilder.group({
      email: ['', 
        Validators.compose([
          Validators.required,
          Validators.email
        ])
    ]
    })
  }

  enviarCodigo() {
    //Primeiro fazer o endPoint pra verificar se o email existe
    const email = this.formEmail.value['email']
    this.httpClient.get<string>(`${this.API}/email/check/usuario/tipo/vitima?email=${email}`).subscribe((resultado) => {
      if(resultado == '200') {
      //se existir o email - gerar um numero aleatorio

      } else {
        this.util.informando('O email não foi encontrado', 'danger', 'top', 3000);
      }
    })
      //se retornar 200 - Existe  senao nao existe
        
          //criar um endpoint pra enviar o numero aleatorio

  }

}
