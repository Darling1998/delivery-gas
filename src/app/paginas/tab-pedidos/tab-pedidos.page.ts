import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { LoginService } from 'src/app/servicios/login.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UniversalService } from 'src/app/servicios/universal.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tab-pedidos',
  templateUrl: './tab-pedidos.page.html',
  styleUrls: ['./tab-pedidos.page.scss'], 
})
export class TabPedidosPage implements OnInit {
  nuevos: any[] = [];
  entregados: any[] = [];
  type: string;
  idPerfil = 0;
  idUsuario = 0;
  intervalo: any;
  customerRating: number = 0;


  constructor(private pedidoService: PedidoService, private loginService: LoginService,private imdodal:ModalController,private ser_ge:UniversalService) {}

  ngOnInit() {
    this.type = 'nuevos';

    const infoUser = this.loginService.get('infoUser');
    this.idPerfil = infoUser.id_perfil;
    this.idUsuario = infoUser.id_usuario;
    this.loadPedidos();

    /* this.intervalo = setInterval(() => {
      this.loadPedidos();
    }, 1000);  */
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'nuevos') {
      this.loadPedidos();
    } else {
      this.loadEntregados();
    }
  }

  loadPedidos() {
    if (this.idPerfil === 1) {
      this.loadNuevosAdministrador();
    } else {
      this.loadNuevosClientes();
    }
  }

  loadEntregados() {
    if (this.idPerfil === 1) {
      this.loadEntregadosAdministrador();
    } else {
      this.loadEntregadosClientes();
    }
  }

  loadNuevosAdministrador() {
    this.pedidoService.getPedidosNuevosAdmin().subscribe(
      (res: any) => {
        console.log(res);
        console.log("data uevos administrador",res);
        this.nuevos = res.data.info;
      },
      (error) => {
        console.error('Error loading nuevos administrador:', error);
      }
    );
  }

  loadEntregadosAdministrador() {
    this.pedidoService.getPedidosEntregadosAdmin().subscribe(
      (res: any) => {
        console.log(res);
        this.entregados = res.data.info;
      },
      (error) => {
        console.error('Error loading entregados administrador:', error);
      }
    );
  }

  loadNuevosClientes() {
    this.pedidoService.getPedidosNuevosCliente(this.idUsuario).subscribe(
      (res: any) => {
        console.log("data uevos clietes",res);
        this.nuevos = res.data.info;
      },
      (error) => {
        console.error('Error loading nuevos cliente:', error);
      }
    );
  }

  loadEntregadosClientes() {
    this.pedidoService.getPedidosEntregadosCliente(this.idUsuario).subscribe(
      (res: any) => {
        console.log(res);
        this.entregados = res.data.info;
      },
      (error) => {
        console.error('Error loading entregados cliente:', error);
      }
    );
  }

  getImagenRuta(url:string) {
    const webServiceUrl = environment.webService+"imagenes"+ url
     return webServiceUrl ; 
   
  }


 async abrirUbicacion(item:any){
    const imadl=  await this.imdodal.create({
      component:MapaComponent,
      componentProps:{
        latitud:item.latitud,
        longitud:item.longitud,
        idPedido:item.idPedido
      }
    })

    await imadl.present();

  }


  onRatingChange(rating: number, idPedido: number) {
    console.log("Calificación del cliente para el pedido #", idPedido, ":", rating);
    
    let obj={
      idPedido:idPedido, 
      rating:rating
    }

    console.log(obj);
    
    this.pedidoService.guardarCalificacion(obj).subscribe(
      res=>{
        if(res.bool==1){
          this.ser_ge.presentToast(res.msj)
        }else{
          this.ser_ge.presentToast(res.msj,"danger")
        }
      }
    )
  }


  stringToStars(starString: string): number {
    return parseInt(starString, 10); // Convierte la cadena a un número entero.
  }
  
 
}
