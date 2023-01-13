import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quemsomos',
  templateUrl: './quemsomos.page.html',
  styleUrls: ['./quemsomos.page.scss'],
})
export class QuemsomosPage implements OnInit {

  public quemsomos!: string;

  image = "https://www.showmetech.com.br/wp-content/uploads//2021/11/black-friday-os-melhores-notebooks-e-computadores-para-aproveitar-a-data.png"

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.quemsomos = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
