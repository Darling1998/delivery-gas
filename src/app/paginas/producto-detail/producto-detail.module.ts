import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoDetailPageRoutingModule } from './producto-detail-routing.module';

import { ProductoDetailPage } from './producto-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoDetailPageRoutingModule
  ],
  declarations: [ProductoDetailPage]
})
export class ProductoDetailPageModule {}
