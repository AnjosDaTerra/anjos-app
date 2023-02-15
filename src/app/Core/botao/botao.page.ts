import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.page.html',
  styleUrls: ['./botao.page.scss'],
})
export class BotaoPage implements OnInit {
  
  constructor(public nav: NavController, private router: Router, private route: ActivatedRoute) {
    
   }
  rotaStore: any
  ngOnInit() {
    this.route = this.route.snapshot.params['id'];
    this.rotaStore = this.route
  }

  abrirPagina(pagina: string) {
    //this.nav.navigateForward(`${pagina}/${this.id}`)
    this.router.navigate([`${pagina}/${this.rotaStore}`])
  }
}
