import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Core/models/vitima/login.interface';
import { UtilidadesService } from 'src/app/Core/services/utilidades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  isTextFieldType: boolean | undefined;
  botaoCL: boolean = true;
  botaoCLmsg: string = 'Cadastra-se';
  titulo: string = 'Login';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  } 
  ngOnInit() {
    
  }
  constructor(private readonly httpClient: HttpClient, private util:UtilidadesService) { }
   togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  mudarCadastroLogin() {
    this.botaoCL = !this.botaoCL;
    if (this.botaoCL) {
      this.botaoCLmsg ='Cadastra-se'
      this.titulo = "Login";
    } else {
      this.botaoCLmsg ='Login';
      this.titulo = 'Cadastro';
    }
  }

  public cadastrar(form: any) {
    //Pega os valores do formulario
    let objCadastro: Usuario = {
      cpf: form.value.cpf,
      senha: form.value.senha,
      email: form.value.email
    }
    //Faz a chamada do endpoint de cadastro
    this.httpClient.post<Usuario|string>('http://127.0.0.1:4000/vitima/criar-login',objCadastro,this.httpOptions).subscribe((result) => {
      if(result == "200") {
        this.util.informando('Cadastro realizado com sucesso!', 'success', 'top', 5000);
      } else {
        this.util.informando('CPF já cadastrado!', 'danger', 'top', 5000);
      }
    });
  }

}
