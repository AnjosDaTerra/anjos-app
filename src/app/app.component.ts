import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Meu perfil', url: '/perfil', icon: 'person' },
    { title: 'Quem somos', url: '/quemsomos/quemsomos', icon: 'people' },
    
    
   

    // { title: 'Lojas', url: '/folder/Favorites', icon: 'heart' }
  ];
  constructor() {}
}
