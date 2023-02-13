import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UtilidadesService } from 'src/app/Core/services/utilidades.service';
import { customAlphabet } from 'nanoid'
import { MsgRequest } from 'src/app/Core/models/email-recovery.interface';

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
    private router: Router,
    ) {
      this.menuCtrl.enable(false, 'main-menu') //DESATIVA O MENU LATERAL
     }

//Tenho que ver onde vou por esse httpOptions e a chamadas http
httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
} 
readonly API = 'http://127.0.0.1:4000';
//--------------------------------------------
  formEmail! : FormGroup;
  formConfirma! : FormGroup;
  formNewPassword! : FormGroup;

  buttonDisabled!: boolean;
  isTextFieldType: boolean | undefined;

  clickCount: number = 0;
  codigoGerado!: string;
  botaoNome: string= 'Enviar';
  
  error_messages = {
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

  ngOnInit() {
    this.buttonDisabled = false;

    this.formEmail = this.formBuilder.group({
      email: ['', 
        Validators.compose([
          Validators.required,
          Validators.email
        ])
    ]
    });
    
    this.formConfirma = this.formBuilder.group({
      codigo: ['',
        Validators.compose([
          Validators.pattern('^[0-9]+$'),
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4)
        ])
      ]
    });

    this.formNewPassword = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ])),  
    },
    {
      validators: this.mustMatch('password','confirmPassword') //@deprecated
    });
    
  }

  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }

  //Desativa o botão depois de x clicks
  private desativarBotao(limite: number) {
    if(this.clickCount > limite) {
       setTimeout(() => {
          this.buttonDisabled = true;
        }, 2000);
      }
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

  enviarCodigo() {
    //Primeiro fazer a validação do formulário
    if(this.formEmail.valid) { 
      this.clickCount += 1; //contabiliza o número de clicks no botão enviar.
      const email = this.formEmail.value['email']
      let nome = email.slice(0 ,email.indexOf('@'))
      this.httpClient.get<string>(`${this.API}/email/check/usuario/tipo/vitima?email=${email}`).subscribe((resultado) => {
        if(resultado == '200') {
        //se existir o email - gerar um numero aleatorio
          const nanoid = customAlphabet('0123456789', 4);
          const generatedNumber = nanoid();
          //criando um objeto
          const objEmail : MsgRequest = {
            nome: nome,
            emailTarget: email,
            codigo: generatedNumber,
            template: 'recovery'
          }
          //armarzenar o nanoid()
          this.codigoGerado = generatedNumber;
          //criar um endpoint pra enviar o numero aleatorio
          this.httpClient.post<MsgRequest>(`http://127.0.0.1:4000/email/enviar`, objEmail, this.httpOptions).subscribe()
          this.util.informando('O código de recuperação foi enviado para o seu email', 'success', 'top', 3000);
          this.botaoNome = "Confirmar"      
        } else {
          this.util.informando('O email não foi encontrado', 'danger', 'top', 3000);
          this.clickCount = 5;
        }
      })        
    } else {
      //se o formulário for inválido executa o bloco abaixo
      this.desativarBotao(9)
      this.util.informando('Por favor, insira um email válido', 'danger', 'top', 3000);
    }
  }
  
  confirmarCodigo() {
    const codigo = this.formConfirma.value['codigo'];
    if(codigo == this.codigoGerado) {
      this.util.informando('Código confirmado com sucesso!', 'success', 'top', 3000);
      this.botaoNome = "Trocar senha"
    } else {
      this.util.informando('Codigo incorreto', 'danger', 'top', 3000);
    }
   
  }

  mudarSenha() {

  }
  

}
