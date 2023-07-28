import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Producto } from 'src/app/Interfaces/interfaces';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Geolocation } from '@capacitor/geolocation';
import { LoginService } from 'src/app/servicios/login.service';
import { UniversalService } from 'src/app/servicios/universal.service';
import { Device } from '@capacitor/device';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  idUsuario=0;
  listaServicios:any[]=[];
  carrito: any[] = [];
  carritoNuevo: any[] = [];
  subtotal = 0;
  totalCompra = 0;
  iva = 0;
  costoEntrega = 0;
  idServicio=0;
  isExpanded: boolean = false;
  isExpandedService: boolean = false;
  latitud:number=0;
  longitud:number=0;

  constructor(private navParams: NavParams,private imdal:ModalController, private serv_pedido:PedidoService,private serv_log:LoginService,private serv_ge:UniversalService,private noti_No:NotificacionService) { }

  ngOnInit() {
    this.carrito = this.navParams.get('productosCarrito');
    this.idUsuario=this.serv_log.get("infoUser").id_usuario;  

    this.serv_pedido.getServicios().subscribe(
      resp=>{
        console.log(resp);
        
        this.listaServicios=resp.data.info;
      }
    )
    
    this.newLista();
    this.calcularSubtotal();
    this.calcularIVA();
    this.calcularTotal();
  }

  newLista() {
    const productoCantMap = new Map<number, number>();
    this.carrito.forEach(elem => {
      if (productoCantMap.has(elem.id_producto)) {
        productoCantMap.set(elem.id_producto, productoCantMap.get(elem.id_producto) + 1);
      } else {
        productoCantMap.set(elem.id_producto, 1);
      }
    });

    this.carritoNuevo = Array.from(productoCantMap.entries()).map(([id_producto, cant]) => {
      const producto = this.carrito.find(item => item.id_producto === id_producto);
      const total = producto.precio * cant;
      const producto_id = producto.id_producto;
      const nombreProducto = producto.nombre;
      const precioUnitario = producto.precio;
      const foto = producto.foto

      return { cant, nombreProducto, producto_id, foto,precioUnitario, total };
    });

    console.log("carritoNuevo", this.carritoNuevo);

    
  }

  eliminarProducto(item:Producto){

    console.log("ok eliinar");
    console.log(item);

    var resultado = []
    for (var i = 0; i < this.carritoNuevo.length; i++) {
      if (this.carritoNuevo[i] == item) {
        resultado.push(this.carritoNuevo[i]);
      }
    }

    var dato = this.carritoNuevo.indexOf(resultado[0]);
    
      this.carritoNuevo.splice(dato, 1);
      resultado.shift;
  }


  calcularSubtotal() {

    this.subtotal = this.carritoNuevo.reduce((subtotal, producto) => subtotal + producto.precioUnitario * producto.cant, 0);
 
    this.subtotal += this.costoEntrega;

    this.calcularIVA();
  }

  calcularIVA() {
    this.iva = this.subtotal * 0.12;
  }

  calcularTotal() {
    this.totalCompra = this.subtotal + this.iva;
  }

  increaseQuantity(item: any) {
    const index = this.carritoNuevo.findIndex(prod => prod.producto_id === item.producto_id);
    if (index !== -1) {
      this.carritoNuevo[index].cant++;
      this.calcularSubtotal();
    }
  }

  decreaseQuantity(item: any) {
    const index = this.carritoNuevo.findIndex(prod => prod.producto_id === item.producto_id);
    if (index !== -1 && this.carritoNuevo[index].cant > 1) {
      this.carritoNuevo[index].cant--;
      this.calcularSubtotal();
      this.calcularIVA();
      this.calcularTotal();
    }
  }

  costoEntregaChange(event) {

    const valorSeleccionado = event.detail.value;
    let x= this.listaServicios.findIndex((item) => item.valor === valorSeleccionado);
    this.idServicio=x+1;
    this.costoEntrega = parseFloat(event.detail.value);
    this.calcularSubtotal(); // Llama a la función para recalcular el subtotal
    this.calcularTotal(); // Llama a la función para recalcular el total
  }


async  crearPedido(){

  const info = await Device.getId();

  console.log(info);

   if(this.carritoNuevo.length ===0 || this.idServicio===0 || this.latitud===0){
   
      this.serv_ge.presentToast("Formulario Incompleto","danger");
    }else{
      let ObjPedido={
        idCliente:this.idUsuario,
        latitud:this.latitud,
        longitud:this.longitud,
        subtotal:this.subtotal,
        iva:this.iva,
        total:this.totalCompra,
        idServicio:this.idServicio,
        detallePedido:this.carritoNuevo.map(item => {
          return {
            cant: item.cant,
            id_producto: item.producto_id
          };
        }) 
      }
      this.serv_pedido.nuevoPedido(ObjPedido).subscribe(
       res=>{
          if(res!=0){
            this.carritoNuevo=[];
            this.carrito=[];
            this.serv_ge.presentToast(res.mensaje);
           this.closeModal()
          }else{
               this.serv_ge.presentToast(res.mensaje);
          }
        } 
      ) 
    } 
  }


  closeModal(){
    this.imdal.dismiss({lista:this.carrito});
  }

  toggleCard() {
    this.isExpanded = !this.isExpanded;
  }

  toggleCardService() {
    this.isExpandedService = !this.isExpandedService;
  }


  async getPosicion(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    this.latitud=coordinates.coords.latitude;
    this.longitud=coordinates.coords.longitude;

    console.log('Current position:', coordinates);
  }


  getImagenRuta(url:string) {
    const webServiceUrl = environment.webService+"imagenes"+ url
     return webServiceUrl ; 
   
  }
}
