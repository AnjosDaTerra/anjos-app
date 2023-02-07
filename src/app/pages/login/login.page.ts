import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  //Tenho que ver onde vou por esse httpOptions
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  } 
  //---------------------------------
  form1! : FormGroup
  error_messages = {
    'cpf': [
      { type: 'required',  message: 'Campo obrigatório'},
      { type: 'minlength', message: 'CPF deve ter 11 algarismos'},
      { type: 'maxlenght', message: 'CPF deve ter 11 algarismos'}
    ],

    'email': [
      { type: 'required',  message: 'Campo obrigatório'},
      { type: 'minlenght', message: 'Número de caracteres insuficiente'},
      { type: 'maxlenght', message: 'Você excedeu o número de caracteres'},
      { type: 'required',  message: 'Por favor, digite um email válido'}
    ],
    
    'password': [
      { type: 'required',  message: 'Campo obrigatório'},
      { type: 'minlenght', message: 'Sua senha tem menos de 4 caracteres'},
      { type: 'maxlenght', message: 'Sua senha passou do tamanho permetido'}
    ],

    'confirmPassword': [
      { type: 'required',  message: 'Campo obrigatório'},
      { type: 'minlenght', message: 'Sua senha tem menos de 4 caracteres'},
      { type: 'maxlenght', message: 'Sua senha passou do tamanho permetido'}
    ]
  }

  constructor(
    private readonly httpClient: HttpClient, 
    private util:UtilidadesService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form1 = this.formBuilder.group({
      cpf: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ])),
      confirmPassowrd: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]))
    }, {
        validators: this.checkPassword.bind(this)    
      });
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  public async checkPassword() {
    const password = this.form1.value['password'];
    const confirmPassword = this.form1.value['confirmPassword'];
    if(password === confirmPassword) { return null } else { return true };
  }

  
  public mudarCadastroLogin() {
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
