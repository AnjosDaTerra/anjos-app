import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from 'src/app/Core/models/usuario.interface';

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
  
  constructor(private readonly httpClient: HttpClient ) { }
   
  ngOnInit() {
    this.sayHello()
  }
  public async sayHello() : Promise<Usuario> {
    this.httpClient.get<Usuario>('http://127.0.0.1:4000/cliente/usarios').subscribe(resultado => {
      this.nome = resultado;
    });
    return this.nome
  }
}
