import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Quem somos', url: '/quemsomos', icon: 'paper-plane' },
    { title: 'Lojas', url: '/folder/Favorites', icon: 'heart' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
