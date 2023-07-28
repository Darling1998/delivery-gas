import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabProductosPageRoutingModule } from './tab-productos-routing.module';

import { TabProductosPage } from './tab-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabProductosPageRoutingModule
  ],
  declarations: [TabProductosPage]
})
export class TabProductosPageModule {}
