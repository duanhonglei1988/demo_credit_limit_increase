import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRoutingModule } from './card-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardRoutingModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [MatSelectModule]
})
export class CardModule { }
