import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { MenuComponent } from 'src/app/componentes/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/tab-productos',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'tab-productos',
        loadChildren:()=>import('../tab-productos/tab-productos.module').then(m=>m.TabProductosPageModule),   
      },
      {
        path:'tab-pedidos',
        loadChildren:()=>import('../tab-pedidos/tab-pedidos.module').then(m=>m.TabPedidosPageModule),
      },
      {
        path: "menu",
        component: MenuComponent
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
