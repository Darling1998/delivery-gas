import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './componentes/menu/menu.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StarComponent } from './componentes/star/star.component';
import { StarModule } from './componentes/star/star.module';
import { MapaComponent } from './componentes/mapa/mapa.component';
const config: SocketIoConfig = { url: 'http://localhost:3000/', options: {} };

@NgModule({
  declarations: [AppComponent,MenuComponent,MapaComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,SocketIoModule.forRoot(config),StarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports:[MenuComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
