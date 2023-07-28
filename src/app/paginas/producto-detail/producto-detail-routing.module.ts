import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoDetailPage } from './producto-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoDetailPageRoutingModule {}
