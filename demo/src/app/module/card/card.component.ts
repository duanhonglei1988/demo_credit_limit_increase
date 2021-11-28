import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
/* import { FormBuilder,FormGroup, Validators } from '@angular/forms' */

interface Card {
  cardID: string;
  name: string;

  }
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  cards: Card[] = [];
  cardValue:string = ''
  cardImage:string = ''
  cardId:string = ''
  maxValue:number = 0
  limitValue:any = 0
  inputValue:number = 0
  ratio:number = 0
  errorFlg:boolean = false
  ratioTempNum:number = 0
  constructor(private http:HttpClient, private router: Router, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
   }
  ngOnInit(): void {
    this.http.get('../assets/mock/card.json').subscribe((res:any) => {
      if(res) {
        this.cards = res
        let cardItem:any = this.cards[0]
        this.cardValue = cardItem.name
        this.setCardValue(cardItem)
        
        this.ratio = cardItem.available
        this.getD(this.ratio)
      } else {
        console.log('error')
      }
      
    })
  }

  isSelectCard(): void {
    let cardItem: any = this.cards.filter(item => item.name === this.cardValue)[0]
    this.setCardValue(cardItem)
  }

  setCardValue(cardItem:any): void{
    this.cardImage = cardItem.image
    this.cardId = '********' + cardItem.cardID.substr(-4)
    this.maxValue = cardItem.limit
    this.getD(cardItem.available)
  }

  inputNumber(e:any): void {
    e=e.replace(/,/g, "")
    this.limitValue = Number(e)
    this.cdr.detectChanges();
    
    // this.limitValue = this.formatPrice(this.limitValue)
  }
  blurOut() {
    if(this.limitValue <= this.maxValue && this.limitValue > this.ratio){
      this.errorFlg = false
    }else {
      this.errorFlg = true
      // this.limitValue = this.maxValue
    }
    this.limitValue = this.formatPrice(this.limitValue)
  }
  formatPrice(price:number): string {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  submit(): void {
    if(!this.errorFlg) {
      const param = {
        'id': this.cardId,
        'limitValue':this.limitValue
      }
      this.http.get('../assets/mock/response.json',{params: param}).subscribe((res:any) => {
        if(res && res.result.status === "OK") {
          this.http.get('../assets/mock/customer.json',{params: param}).subscribe((response:any) => {
            if(response && response.result.status === "OK") {
              this.router.navigate(['success'],{
                queryParams: {
                  cardId: this.cardId,
                  limitValue:this.limitValue,
                  date: formatDate(new Date(), 'YYYY/MM/dd', 'en')
                }
              })
            } else {
              console.log('error')
            }
          })
        } else {
          this.router.navigate(['error'],{
            queryParams: {
              cardId: this.cardId,
              limitValue:this.limitValue,
              date: formatDate(new Date(), 'YYYY/MM/dd', 'en')
            }
          })
        }
        
      })
    } else {
      alert('Please write correct number')
    }
    
  }

  contentHtml: any = ''

  getD(ratio:any): void {
    let ratioTemp = this.ratio*100/this.maxValue
    if (ratioTemp >= 100) {
      ratio  = 99.99
    }
    this.ratioTempNum = ratioTemp
    const angle = Math.PI / 50 * ratioTemp
    const r = 47
    const x = r * Math.cos(angle)
    const y = -r * Math.sin(angle)
    const isBigAngle = Number(ratioTemp > 50)
    let d = `M 47 0 A 47 47 0 ${isBigAngle} 0 ${x} ${y}`
    this.contentHtml= this.sanitizer.bypassSecurityTrustHtml(`
    <svg width="200" height="200" viewBox="-60 -60 120 120">
    <circle cx="0" cy="0" stroke-width="2" fill="none" stroke="#ddd" r="47"/>
    <path d="${d}" fill="none" stroke-width="12" stroke="#369"/>
    <text text-anchor="middle" dominant-baseline="middle" style="font-size:10px">
      <tspan x="1" y="-10">Available Limit</tspan> 
    </text>
    <text text-anchor="middle" dominant-baseline="middle">
      <tspan x="1" y="10" style="color: #336699;">$${ratio}</tspan> 
    </text>
    </svg>
    `)

  }
}
