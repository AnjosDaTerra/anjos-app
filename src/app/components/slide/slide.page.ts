import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);



@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlidePage implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }
  

}