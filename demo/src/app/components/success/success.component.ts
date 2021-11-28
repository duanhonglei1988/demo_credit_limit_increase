import { Component,NgModule,OnInit, Optional, SkipSelf } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* import { HttpClient, HttpClientModule } from '@angular/common/http/http'; */

@Component({
  selector: 'app-success',
  template: `
  <div class="limit_wrap">
  <div class="card_image">
  <img src="../../../assets/image/success.png"/>
  </div>
    <h2>Request Submit Successfully</h2>
    <div class="limit_info">
        <span>Transaction Card</span>
        <span class="blue_text">{{queryParams.cardId}}</span>
    </div>
    <div class="limit_info">
        <span>Increase Limit To</span>
        <span class="blue_text">{{'$' + queryParams.limitValue}}</span>
    </div>
    <div class="limit_info">
        <span>Request Submit Date</span>
        <span class="blue_text">{{queryParams.date}}</span>
    </div>
    <div class="limit_info"></div>
  </div>
  `,
  styleUrls: ['../../module/card/card.component.less']
})

export class SuccessComponent implements OnInit{
    queryParams:any = {}
    
  constructor(public route: ActivatedRoute) {
  }
  ngOnInit() {  
    this.route.queryParams.subscribe((params:any) => {
         console.log(params)
         this.queryParams = params
    })
     
  }
}