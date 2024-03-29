import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { DadosPessoais } from '../Core/models/vitima/vitima-pessoal.interface';
import { UtilidadesService } from '../Core/services/utilidades.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
    //Tenho que ver onde vou por esse httpOptions e a chamadas http
    httpOptions = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    } 
    readonly API = 'https://anjos-server.herokuapp.com';
    //--------------------------------------------
  
  objeto! : DadosPessoais  
  rotaStore: any
  nome: any
  sobrenome: any
  cpf: any

  constructor(
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController, 
    private route: ActivatedRoute, 
    private routeId: Router,
    private httpClient: HttpClient,
    private util:UtilidadesService
    ) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params['id'];
    this.rotaStore = this.routeId
    console.log(this.rotaStore)
    this.pegarInformacao();
  }
  //Pegar os dados do banco.
  pegarInformacao() {
    this.httpClient.get<DadosPessoais>(`${this.API}/vitima/pegar-dados-pessoal?cpf=${this.rotaStore}`).subscribe((resultado) => {
      this.objeto = resultado;
      this.nome = this.objeto.nome;
      this.sobrenome = this.objeto.sobrenome;
      this.cpf = this.objeto.cpf;
    })
  }
  
  //escolher qual eu vou editar.
  async editarOpcoes() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Editar cadastro',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Pessoal',
          icon: 'person',
          handler: () => {
            console.log('Delete clicked');
            this.editarCadastro();
          },
        },
        // {
        //   text: 'Residencial',
        //   icon: 'home',
        //   handler: () => {
        //     console.log('Share clicked');
        //   },
        // },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  //formulário de cadastro
  async editarCadastro() {
    const alert = this.alertCtrl.create({
      mode: 'ios',
      header: 'Editar cadastro',
      message: 'Altere os campos necessários abaixo:',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: `${this.objeto.nome}`,
          value: `${this.objeto.nome}`
        },
        {
          name: 'sobrenome',
          type: 'text',
          placeholder: `${this.objeto.sobrenome}`,
          value: `${this.objeto.sobrenome}`
        },
        {
          name: 'cpf',
          type: 'text',
          placeholder: `${this.objeto.cpf}`,
          value: `${this.objeto.cpf}`
        },
        {
          name: 'idade',
          type: 'number',
          placeholder: `${this.objeto.idade}`,
          value: `${this.objeto.idade}`
        },
        {
          name: 'email',
          type: 'email',
          placeholder: `${this.objeto.email}`,
          value: `${this.objeto.email}`
        },
        {
          name: 'telefone',
          type: 'number',
          placeholder: `${this.objeto.telefone}`,
          value: `${this.objeto.telefone}`
        }    
      ],
      buttons: [     
        {
          text: 'Cancelar',
          handler: () => {
            this.util.informando('Você cancelou a atualização','danger', 'top', 2000);
          }
        },
        { 
          text: 'Atualizar',
          handler: (form) => { //é como se fosse um treinador, ele trabalha como um submit().
            //vamos criar um objeto que irá formar nosso item da lista
            let item : DadosPessoais = {
              nome: form.nome,
              sobrenome: form.sobrenome,
              cpf: this.objeto.cpf,
              idade: form.idade,
              email: form.email,
              telefone: form.telefone,
              sexo: this.objeto.sexo,
              estadoCivil: this.objeto.estadoCivil
            };
            console.log(item);
            try{
              this.httpClient.post<DadosPessoais|string>(`${this.API}/vitima/criar-dados-pessoal?cpf=${item.cpf}`, item, this.httpOptions).subscribe(resultado => {
                if (resultado == '200') {                                       
                  this.util.informando('Os seus dados foram atualizados com sucesso !', 'success', 'top', 3000);          
                }
              })            
            }catch(err){
              console.log(err)
            } finally { 
              setTimeout(this.refresh, 1500)       
            }           
          }           
        }           
      ]
    });
    (await alert).present();
  }  
  refresh(){
    location.reload()
  }
  

}
