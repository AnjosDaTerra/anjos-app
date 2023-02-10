import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosPessoais } from 'src/app/Core/models/vitima/vitima-pessoal.interface';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }
  readonly API = 'http://127.0.0.1:4000';

  form!: FormGroup
  cpf_value: string = "1235wewqwqw7";
  email_value!: string;
  option_sexo : any = [
    {
      name: "Masculino",  
      value: 0 
    },
    {
      name: "Feminino",  
      value: 1
    }
  ]

  option_estadoCivil : any = [
    {
      name: "Solteiro(a)",
      value: 0
    },
    {
      name: "Casado(a)",
      value: 1
    },
    {
      name: "Outro(a)",
      value: 2
    }
  ]

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      cpf: [''], //set value from database
      idade: [''],
      email: [''], //set value from database
      telefone: [''],
      sexo: [''],
      estado_civil: ['']      
    })
  }
  setInputValue() {
    this.form.controls['cpf'].setValue('1234 TESTE');
    this.form.controls['email'].setValue('yuri@hotmail.com');
  }

  pegarSexo(ev: any) {
    console.log(ev.target.value);
  }
  pegarEstadoCivil(ev: any) {
    console.log(ev.target.value);
  }

  cadastrar() {
    const objPessoalData: DadosPessoais = {
      nome: this.form.value['nome'],
      sobrenome: this.form.value['sobrenome'],
      cpf: this.form.value['cpf'],
      idade: this.form.value['idade'],
      email: this.form.value['email'],
      telefone: this.form.value['telefone'],
      sexo: this.form.value['sexo'],
      estadoCivil: this.form.value['estado_civil']
    }
    console.log('Primeiro console'+objPessoalData);
    this.httpClient.post<DadosPessoais>(`${this.API}/vitima/criar-dados-pessoal?cpf=${objPessoalData.cpf}`, objPessoalData,this.httpOptions).subscribe((result) => {
      console.log(result);//fazer tratamento de erro e criar uma lógica para a próxima página.
    })
  }
}
