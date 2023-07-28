import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  idPerfil=0;
  constructor(private ser_log:LoginService,private router:Router,private menuCtrl:MenuController) { }

  ngOnInit() {
    this.idPerfil=this.ser_log.get("infoUser").id_perfil; 
  }


  cerrarCesion() {
    this.ser_log.clear();
    this.router.navigateByUrl("login");
    this.menuCtrl.close("primerMenu");

  }

  navegarA(url:string){
    this.router.navigate([url]);
    this.menuCtrl.close('primerMenu');
  }
  
}
