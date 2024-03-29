import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/Core/models/vitima/login.interface';
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
  readonly API = 'https://anjos-server.herokuapp.com';
  cpf!: string;
  form!: FormGroup
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getParamsValue()
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
    this.setInputValue()
  }
  
  async getParamsValue(): Promise<string> {
    this.route.queryParams.subscribe(params => {
      this.cpf = params.cpf;
    })
    return this.cpf;
  }
  //Aqui estou pegando os valores do documento vitima
  setInputValue() {
    this.httpClient.get<Usuario>(`${this.API}/vitima/usuarios?cpf=${this.cpf}`).subscribe(result => {
      this.form.controls['cpf'].setValue(result.cpf);
      this.form.controls['email'].setValue(result.email);  
    })
    
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
    this.httpClient.post<DadosPessoais|string>(`${this.API}/vitima/criar-dados-pessoal?cpf=${objPessoalData.cpf}`, objPessoalData,this.httpOptions).subscribe((result) => {
      if(result == '200') {
        this.router.navigate([`/home/${objPessoalData.cpf}`], {queryParams:{cpf:`${objPessoalData.cpf }`}}) 
      }
    })  
  }
}
