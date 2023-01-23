import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  isTextFieldType: boolean | undefined;

  ngOnInit() {
  }
  constructor(public navCrtl: NavController) { }
  togglePasswordFieldType() {
    this.isTextFieldType = !this.isTextFieldType;
  }
}

