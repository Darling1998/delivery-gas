import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NotificacionService } from './servicios/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menuCtrl: MenuController,private servNoti:NotificacionService) { 
   // this.servNoti.initPush();
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'primerMenu'); // Deshabilita el menú con el identificador 'primerMenu'
  }
}
