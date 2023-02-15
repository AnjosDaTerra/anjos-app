import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitacaoAjuda } from 'src/app/Core/models/vitima/requerimento-ajuda';
import { UtilidadesService } from 'src/app/Core/services/utilidades.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {

  //Tenho que ver onde vou por esse httpOptions e a chamadas http
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  } 
  readonly API = 'https://anjos-server.herokuapp.com';
  //--------------------------------------------
 
  rotaStore: any
  solitForm! :FormGroup;
  ingredients = [
  
    {name: 'Abrigo', isChecked: false},
    {name: 'Alimento', isChecked: false},
    {name: 'Itens de Higiene', isChecked: false},
    {name: 'Dinheiro', isChecked: false},

]

  constructor( 
      private formBuilder: FormBuilder,
      private httpCliente: HttpClient,
      private util:UtilidadesService,
      private route: ActivatedRoute,
      private routeId: Router
    ) { }

  ngOnInit() {

    this.route = this.route.snapshot.params['id'];
    this.rotaStore = this.route

    this.solitForm = this.formBuilder.group({
      qtde: ['', Validators.required],
      helpText: ['', Validators.required]
    })
  }
  
  getCheckBoxValues() {
    let data=[]
    for (let i=0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].isChecked == true) {
      data.push(this.ingredients[i]); //Se for true, armazena o valor true na propriedade isChecked
      } else {
      data.push(this.ingredients[i]) //Se for false, armazena o valor false na propriedade isChecked
      }
    }
    return data
  }

 submit() {
    const qtde = this.solitForm.value['qtde'];
    let helpText = this.solitForm.value['helpText'];
    const checkBox = this.getCheckBoxValues();
    let objRequerimento : SolicitacaoAjuda = {
      status: 'pendente',
      pessoasQtde: qtde,
      abrigo: checkBox[0].isChecked,
      alimento: checkBox[1].isChecked,
      itemHigiene: checkBox[2].isChecked,
      dinheiro: checkBox[3].isChecked,
      outros: helpText
    }
    try {
      this.httpCliente.post<SolicitacaoAjuda | string>(`${this.API}/vitima/criar-dados-ajudame?cpf=${this.rotaStore}`, objRequerimento, this.httpOptions).subscribe(resultado => {
        if (resultado == '200') {
          this.util.informando('Solicitação realizada com sucesso, aguarde a verificação do administrador até 7 dias','success', 'top', 7000);
        }
        console.log(resultado);
      });
    } catch (error) {
      console.log(error);
    }
  }
}