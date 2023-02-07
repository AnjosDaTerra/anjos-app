import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/Core/models/vitima/login.interface';
import { UtilidadesService } from 'src/app/Core/services/utilidades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  form1! : FormGroup;
  isTextFieldType: boolean | undefined;
  botaoCL: boolean = true;
  botaoCLmsg: string = 'Cadastra-se';
  titulo: string = 'Login';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  } 
  ngOnInit() {
    this.form1 = this.formBuilder.group({
      cpf: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [],
    });
  }
  constructor(private readonly httpClient: HttpClient, private util:UtilidadesService, private formBuilder: FormBuilder) { }
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

  public cadastrar() {
    //Pega os valores do formulario
     let objCadastro: Usuario = {
       cpf: this.form1.value['cpf'],
       senha: this.form1.value['password'],
       email: this.form1.value['email']
     }
    console.log("form",this.form1.value['cpf']);
    console.log(objCadastro)

    //Faz a chamada do endpoint de cadastro
    // this.httpClient.post<Usuario|string>('http://127.0.0.1:4000/vitima/criar-login',objCadastro,this.httpOptions).subscribe((result) => {
    //   if(result == "200") {
    //     this.util.informando('Cadastro realizado com sucesso!', 'success', 'top', 5000);
    //   } else {
    //     this.util.informando('CPF já cadastrado!', 'danger', 'top', 5000);
    //   }
    // });
  }

}
