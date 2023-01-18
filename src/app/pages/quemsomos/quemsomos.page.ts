import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quemsomos',
  templateUrl: './quemsomos.page.html',
  styleUrls: ['./quemsomos.page.scss'],
})
export class QuemsomosPage implements OnInit {

  public quemsomos!: string;


  constructor(private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.quemsomos = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

 
}
