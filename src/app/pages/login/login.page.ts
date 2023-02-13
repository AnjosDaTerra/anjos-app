import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/Core/models/vitima/login.interface';
import { DadosPessoais } from 'src/app/Core/models/vitima/vitima-pessoal.interface';
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
  temCadastro!: boolean
  //Tenho que ver onde vou por esse httpOptions e a chamadas http
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  } 
  readonly API = 'http://127.0.0.1:4000';
  //--------------------------------------------
  cadastroForm! :FormGroup
  loginForm! :FormGroup

  error_messages = {
    'cpf': [
      { type: 'required',  message: '*'},
      { type: 'minlength', message: '* o cpf deve ter 11 algarismos'},
      { type: 'maxlenght', message: '* o cpf deve ter 11 algarismos'},
      { type: 'pattern',   message: '* somente números são permitidos'}
    ],

    'email': [
      { type: 'required',  message: '*'},
      { type: 'minlength', message: '* número de caracteres insuficiente'},
      { type: 'maxlenght', message: '* você excedeu o número de caracteres'},
      { type: 'email',     message: '* por favor, digite um email válido'}
    ],

    'password': [
      { type: 'required',  message: '*'},
      { type: 'minlength', message: 'Sua senha tem menos de 4 caracteres'},
      { type: 'maxlenght', message: 'Sua senha passou do tamanho permetido'},

    ],

    'confirmPassword': [
      { type: 'required',  message: 'Campo obrigatório'},
      { type: 'Mustmatch', message: 'errado'}
    ]
  }

  constructor(
    private httpClient: HttpClient, 
    private util:UtilidadesService, 
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private router: Router
  ) { 
   this.menuCtrl.enable(false, 'main-menu') //DESATIVA O MENU LATERAL
  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      cpf: ['',
        Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]+$')
      ])],
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
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    },
    {
      validators: this.mustMatch('password','confirmPassword') //@deprecated
    }
    );

    this.loginForm = this.formBuilder.group({
      cpf: new FormControl('', Validators.compose([
        Validators.required
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  get cadastroFormControl() {
    return this.cadastroForm.controls;
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  //Metodo de comparar senhas
  mustMatch(password: string, confirmPassword: string) {
    return (fg: FormGroup) => {
      const passwordControl = fg.controls[password];
      const confirmPasswordControl = fg.controls[confirmPassword];

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['Mustmatch']) {
        return;
      }

      if(passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({Mustmatch: true});
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
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
       cpf: this.cadastroForm.value['cpf'],
       senha: this.cadastroForm.value['confirmPassword'],
       email: this.cadastroForm.value['email'],
       logado: false //verificar se vai alterar o valor no banco para `true` quando o user logar
     }

    //Faz a chamada do endpoint de cadastro
    this.httpClient.post<Usuario|string>(`${this.API}/vitima/criar-login`,objCadastro,this.httpOptions).subscribe((result) => {
      if(result == "200") {
        this.util.informando('Cadastro realizado com sucesso!', 'success', 'top', 5000);
      } else {
        this.util.informando('CPF já cadastrado!', 'danger', 'top', 5000);
      }
    });
  }

  public logar() {
    const cpf = this.loginForm.value['cpf'];
    const senha = this.loginForm.value['password'];
    this.checkCadastroPessoal(cpf);
    this.httpClient.get<string>(`${this.API}/vitima/check-login/${cpf}/${senha}`).subscribe((result) => {
      if(result == "200") {
        if(this.temCadastro) {
         this.router.navigate([`/home`], {queryParams:{cpf:`${cpf}`}}) 
        } else {
          this.router.navigate(['/pessoal'], {queryParams:{cpf:`${cpf}`}})
        }
      } else {
        this.util.informando('Credenciais incorretas', 'danger', 'top', 3000);
      }      
    })
  }

  public checkCadastroPessoal(cpf: string) {
    this.httpClient.get<boolean>(`${this.API}/vitima/check-cadastro-pessoal?cpf=${cpf}`).subscribe(valor => {
      console.log(`valor booleando checkCadastro `+ valor)
      this.temCadastro = valor;
      console.log(`depois da atribuicao`+this.temCadastro)
    })
  }

}
