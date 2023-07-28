import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { Producto } from 'src/app/Interfaces/interfaces';
import { ProductoService } from 'src/app/servicios/producto.service';
import { UniversalService } from 'src/app/servicios/universal.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.page.html',
  styleUrls: ['./producto-detail.page.scss'],
})
export class ProductoDetailPage implements OnInit {

  objProducto:Producto;
  img:string="";
  @Input() listProductos:Producto[]=[];

  titulo:string="";
  constructor(private imdal:ModalController,private navParams:NavParams,private router:Router,private ser_producto:ProductoService,private serv_universal:UniversalService) { 
    this.titulo=navParams.get('titulo')
    this.objProducto=navParams.get('item')
  }

  ngOnInit() {
  }

  cancelar(){
    this.imdal.dismiss();
  }

  grabar() {
    if (this.titulo == 'Editar') {

      this.ser_producto.actualizarInfoProducto(this.objProducto).subscribe((resp) => {
        if (resp.id == 0) {
          this.serv_universal.presentToast('Ha ocurrido un error al actualizar', 'danger');
        } else {
          this.serv_universal.presentToast(resp.msj, 'success');
          this.cancelar();
        }
      }); 
    } else { 
     
        let objProductoNew={
          nombre:this.objProducto.nombre,
          descripcion:this.objProducto.descripcion,
          precio:this.objProducto.precio,
          stock:this.objProducto.stock,
          foto:this.objProducto.foto,
        }

        this.ser_producto.addProductos(objProductoNew).then((valido) => {
          console.log(valido);
          
          if (valido) {
/*             this.objProducto={
              id_producto:0,
              nombre:'',
              descripcion:'',
              precio:0,
              stock:0,
              foto:'',
            }; */
           // this.router.navigate(['tabs/tab-productos']);
           this.imdal.dismiss();
            this.serv_universal.presentToast("Producto Guardado con éxito", "success");
          } else {
            this.serv_universal.presentToast("Ha ocurrido un error", "danger");
          }
        });
      }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.img=file.name;
      this.objProducto.foto=file
    }
  }

}
