import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  
  constructor( private route: ActivatedRoute, private routeId: Router) { }
  rotaStore: any = 'hello world'
  //se eu pegar os dados atraves do banco, vou precisar de uma referencia. O negócio é arrumar alguma maneira de passar os dados pra este component
  ngOnInit() {
    this.route = this.route.snapshot.params['id'];
    this.rotaStore = this.route
  }

  public appPages = [//como q eu vou passar o cpf para o meu perfil.
    { title: 'Quem somos', url: '/quemsomos', icon: 'people' },
    { title: 'Logout', url: `/login`, icon: 'exit' }
    // { title: 'Lojas', url: '/folder/Favorites', icon: 'heart' }
  ];

}




