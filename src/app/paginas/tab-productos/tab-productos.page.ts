import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/Interfaces/interfaces';
import { ProductoDetailPage } from '../producto-detail/producto-detail.page';
import { UniversalService } from 'src/app/servicios/universal.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-tab-productos',
  templateUrl: './tab-productos.page.html',
  styleUrls: ['./tab-productos.page.scss'],
})
export class TabProductosPage implements OnInit {

  idPerfil:number=0;
  listadeProductos:Producto[]=[];
  listaCompras:Producto[]=[];
  totalProductos=0;
  objVacio={}
  

  constructor(private imdal:ModalController,private ser_prod:ProductoService,private serv_log:LoginService) { }

  ngOnInit() {

    this.idPerfil=this.serv_log.get("infoUser").id_perfil; 
    this.listarProductos();
    this.ser_prod.nuevoProduct.subscribe(post=>{
        this.listadeProductos.unshift(post)
    })
    
  }


  addCarrito(producto:Producto){
    this.listaCompras.push(producto);
    console.log(this.listaCompras);
    this.totalProductos=this.listaCompras.length;
  }


  getImagenRuta(url:string): string {
     const webServiceUrl = environment.webService+"imagenes"+ url
      return webServiceUrl ;
    
  }
  

  listarProductos(){
    this.ser_prod.getProductos().subscribe(
      res=>{
       this.listadeProductos=res.data.info; 
      }
    )
  }

  async detalleCompra(){
    const mdal= await this.imdal.create({
      component:CarritoPage,
      componentProps:{
        productosCarrito:this.listaCompras
      }
    });

    await mdal.present();
    const {data}= await mdal.onDidDismiss();
    console.log("data",data);
    
    if (data !== undefined) {
      this.listaCompras = data.lista;
      this.totalProductos = this.listaCompras.length;
    } else {
      this.totalProductos = this.listaCompras.length;
      console.log('Modal cerrado sin datos.');
    }

  }

  async openNewProducto(){
    const modal= await this.imdal.create({
    
      component:ProductoDetailPage,
        componentProps:{
        objProducto:this.objVacio,
        listProductos: this.listadeProductos,
        titulo:"Agregar",
      } 
    });
     
    await modal.present();

    const{data}= await modal.onDidDismiss();

    if(data!=null){
      let nuevo:Producto;
      nuevo=data;
      this.addProducto(nuevo);
    }
  }

  addProducto(item:Producto){
    this.listadeProductos.push(item);
  }


async editarProducto(item:Producto){
  const idal= await this.imdal.create({
    
    component:ProductoDetailPage,
    componentProps:{
      objProducto:item,
      titulo:"Editar"
    }
  });
   
  await idal.present();
} 

}
