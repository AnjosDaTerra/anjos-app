import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [//como q eu vou passar o cpf para o meu perfil.
    { title: 'Meu perfil', url: '/perfil', id:'17574229783', icon: 'person' },
    { title: 'Quem somos', url: '/quemsomos/quemsomos', icon: 'people' },
    
    
   

    // { title: 'Lojas', url: '/folder/Favorites', icon: 'heart' }
  ];
  constructor() {}
}
