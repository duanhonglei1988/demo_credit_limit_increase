import { Component,NgModule,OnInit, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* import { HttpClient, HttpClientModule } from '@angular/common/http/http'; */

@Component({
  selector: 'app-error',
  template: `
  <div class="limit_wrap">
  <div class="card_image">
  <img src="../../../assets/image/error.png"/>
  </div>
    <h1>Request Submit Error</h1>
    <div class="limit_info"></div>
  </div>
  `,
  styleUrls: ['../../module/card/card.component.less']
})

export class ErrorComponent implements OnInit{
    queryParams:any = {}
    
  constructor(public route: ActivatedRoute) {
  }
  ngOnInit() {  
    this.route.queryParams.subscribe((params:any) => {
         this.queryParams = params
    })
     
  }
}