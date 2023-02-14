import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  routerId = null;
  constructor(
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController, 
    private route: ActivatedRoute, 
    ) { }

  ngOnInit() {
    this.routerId = this.route.snapshot.params['cpf'];
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
        {
          text: 'Residencial',
          icon: 'home',
          handler: () => {
            console.log('Share clicked');
          },
        },
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
          placeholder: 'nome'
        },
        {
          name: 'sobrenome',
          type: 'text',
          placeholder: 'sobrenome'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'email'
        },
        {
          name: 'telefone',
          type: 'number',
          placeholder: 'telefone'
        },
        {
          label: 'Red',
          type: 'radio',
          value: 'red',
        },
        {
          label: 'Blue',
          type: 'radio',
          value: 'blue',
        },
        {
          label: 'Green',
          type: 'radio',
          value: 'green',
        },
      ],
      buttons: [     
        {
          text: 'Cancelar',
          handler: () => {
          console.log("Item cancelado")
          }
        },
        { 
          text: 'Cadastrar',
          handler: (form) => { //é como se fosse um treinador, ele trabalha como um submit().
            //vamos criar um objeto que irá formar nosso item da lista
            let item = {
              nome: form.item,
              quantia: form.quantidade,
              preco: form.preco,
              //Vai ser a variavel de controle do ngIf
              status: false
            };

            try{
             
             console.log(item);
            }catch(err){
              console.log(err)
            }finally{        
            }           
          }           
        }           
      ]
    });
    (await alert).present();
  }   

}
