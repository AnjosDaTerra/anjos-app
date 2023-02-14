import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.page.html',
  styleUrls: ['./botao.page.scss'],
})
export class BotaoPage implements OnInit {
  id ='12334'
  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  abrirPagina(pagina: string) {
    //this.nav.navigateForward(`${pagina}/${this.id}`)
    this.nav.navigateForward(`${pagina}`)
  }
}
