import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPedidosPageRoutingModule } from './tab-pedidos-routing.module';

import { TabPedidosPage } from './tab-pedidos.page';
import { StarComponent } from 'src/app/componentes/star/star.component';
import { StarModule } from 'src/app/componentes/star/star.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarModule,
    TabPedidosPageRoutingModule
  ],
  declarations: [TabPedidosPage]
})
export class TabPedidosPageModule {}
