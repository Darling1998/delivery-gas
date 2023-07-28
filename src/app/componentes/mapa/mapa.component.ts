import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, NavParams } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servicios/login.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UniversalService } from 'src/app/servicios/universal.service';
import { environment } from 'src/environments/environment';

declare const MapboxDirections: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {
  longitudAdmin: number;
  latitudAdmin: number;

  longitudPedido: number;
  latitudPedido: number;
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;

  id_perfil=0;
  idPedido=0;


  constructor(private navParasm:NavParams,private imdal:ModalController,private socketio: Socket,private ser_log:LoginService,private serv_pedido:PedidoService,private servGeneral:UniversalService) {
    this.latitudPedido=navParasm.get("latitud"); //recuperamos la ubicacion del pedido
    this.longitudPedido=navParasm.get("longitud"); 
    this.idPedido=navParasm.get("idPedido"); 

    this.mapbox.accessToken = environment.mapbox.accessToken;
   // this.getPosition();
  }

  ngOnInit() {
    this.id_perfil= this.ser_log.get("infoUser").id_perfil; 
    this.renderMap();
    this.socketio.connect();


    if(this.id_perfil===1){      /*SI SOMOS PERFIL 1 ADMINNISTRADORES O REPARTIDOR ENTONCES TOMAMOS LA POSIVION ACTUAL Y CREAMOMS NUESTRO MARCADOR*/
      this.getPosition().then(() => { 
        this.crearMarcadorRepartidor(this.longitudAdmin, this.latitudAdmin);
      }); 
    }else{ //SI SOMOS PERFIL 2, OSEA CLIENTES, DEBEMOS OBTENER LA POSISICON ACTAUL DEL REPARTIDOR, UNA VEZ LO TENEMOS, DIBUJAMOS SU MARACADOR
      this.enviarPosicionAdminAcliente(this.longitudAdmin,this.latitudAdmin);
    }
  }

  //obtener posicion del repartidor
  async getPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitudAdmin = position.coords.latitude;
    this.longitudAdmin = position.coords.longitude;
  }


  //enviamos la ubicacion del pedido para el repartidor
  enviarUbicaciondelPedido(lng: number, lat: number) {
    this.socketio.emit('ubicacionCliente', { lng, lat }); 
  }


  //enviamos ubicacion del repartidor al cliente
  enviarPosicionAdminAcliente(lng: number, lat: number) {
    this.socketio.emit('ubicacionAdmin', { lng, lat }); 
  }

  renderMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-80.8885912, -2.2389642], // starting position [lng, lat]
      zoom: 12.5, 
    });


    this.map.addControl(new mapboxgl.NavigationControl());
    this.crearMarcadorDestinoPedido(this.longitudPedido,this.latitudPedido)
  
  }

  crearMarcadorDestinoPedido(lng: number, lat: number) {
    const customIcon = document.createElement('div');
    customIcon.className = 'custom-marker';
    customIcon.style.backgroundImage = 'url(./assets/img/marker.png)';
    customIcon.style.backgroundSize='contain';
    customIcon.style.backgroundRepeat='no-repeat';
    customIcon.style.position='center';
    customIcon.style.width = '50px';
    customIcon.style.height = '50px';
  
    const marker = new mapboxgl.Marker({
      draggable: true,
      element: customIcon // Utiliza el elemento personalizado como icono
    })
    .setLngLat([lng, lat])
    .addTo(this.map);
  
    marker.on('drag', () => {
      console.log(marker.getLngLat());
    })
  }



  crearMarcadorRepartidor(lng: number, lat: number) {
    const customIcon = document.createElement('div');
    customIcon.className = 'custom-marker';
    customIcon.style.backgroundImage = 'url(./assets/img/fast-delivery.png)';
    customIcon.style.backgroundSize='contain';
    customIcon.style.backgroundRepeat='no-repeat';
    customIcon.style.position='center';
    customIcon.style.width = '50px';
    customIcon.style.height = '50px';
  
    const marker = new mapboxgl.Marker({
      draggable: true,
      element: customIcon // Utiliza el elemento personalizado como icono
    })
    .setLngLat([lng, lat])
    .addTo(this.map);
  
    marker.on('drag', () => {
      console.log(marker.getLngLat());
    })
  }


  cerrar(){
    console.log("gola");
    this.imdal.dismiss();
  }



  actualizarUbicacionRepartidor(ubicacion: any) {
    const lng = ubicacion.lng;
    const lat = ubicacion.lat;

    const repartidorMarker = this.map.getLayer('repartidor-marker'); // Reemplaza 'repartidor-marker' con el ID de tu marcador del repartidor
    if (repartidorMarker) {
      this.map.getSource('repartidor-marker').setData({
        type: 'Point',
        coordinates: [lng, lat],
      });
    }
  }


  listenForUbicacionRepartidor(): Observable<any> {
    return new Observable((observer) => {
      this.socketio.on('ubicacionRepartidor', (ubicacion) => {
        observer.next(ubicacion);
      });
    });
  }



  cambiarEstado(){
    let info={
      idPedido: this.idPedido
    }
    this.serv_pedido.updateEstadoPedido(info).subscribe(
      res=>{

        if(res.bool ==1){
          this.servGeneral.presentToast(res.msj, "success");
          this.imdal.dismiss();
        }
        else{
          this.servGeneral.presentToast(res.msj, "danger");
        }
       // console.log(res);
        
      }
    )
  }
}
