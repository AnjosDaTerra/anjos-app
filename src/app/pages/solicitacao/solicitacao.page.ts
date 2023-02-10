import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
})
export class SolicitacaoPage implements OnInit {

  ingredients = [

    {name: 'Abrigo', isChecked: false},
    {name: 'Alimento', isChecked: false},
    {name: 'Itens de Higiene', isChecked: false},
    {name: 'Dinheiro', isChecked: false},

]

  constructor() { }

  ngOnInit() {
  }
  

}