import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Quem somos', url: '/quemsomos/quemsomos', icon: 'paper-plane' },
    
    { title: 'Login', url: '/login', icon: 'mail'},
    { title: 'Endereço', url: '/endereco', icon: 'mail'}

    // { title: 'Lojas', url: '/folder/Favorites', icon: 'heart' }
  ];
  constructor() {}
}
