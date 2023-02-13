import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/Core/models/vitima/login.interface';
import { AlertController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };
  nome!: Usuario;
  cpf!: string;
    
  
  constructor(
    private readonly httpClient: HttpClient, private readonly alert: AlertController,
    private route: ActivatedRoute,
    private router: Router
    ) { }
   
  ngOnInit() {
    this.getParamsValue()
    //esse reloadOnce serve pra não bugar o side menu logo depois do login.
    this.reloadOnce()
  }
  reloadOnce() {
    if (window.localStorage) {
  
      // If there is no item as 'reload'
      // in localstorage then create one &
      // reload the page
      if (!localStorage.getItem('reload')) {
          localStorage['reload'] = true;
          window.location.reload();
      } else {

          // If there exists a 'reload' item
          // then clear the 'reload' item in
          // local storage
          localStorage.removeItem('reload');  
      }
    }
  }

  public async sayHello() : Promise<Usuario> {
    this.httpClient.get<Usuario>('http://127.0.0.1:4000/vitima/usuarios').subscribe(resultado => {
      this.nome = resultado;
    });
    return this.nome
  }

  async getParamsValue(): Promise<string> {
    this.route.queryParams.subscribe(params => {
      this.cpf = params.cpf;
    })
    console.log(this.cpf)
    return this.cpf;
  }
 
  
}
