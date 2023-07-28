import { EventEmitter, Injectable } from '@angular/core';
import { UniversalService } from './universal.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  nuevoProduct = new EventEmitter<Producto>;
  constructor(private serv_general:UniversalService,private http:HttpClient) { }

  getProductos() {
    const URL =  this.serv_general.URL_API + "allProductos";
    return this.http.get<any>(URL);
  }

  actualizarInfoProducto(data: any){
    const URL = this.serv_general.URL_API + 'actualizarProducto';
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }

  addProductos(data: any):Promise<boolean>{
    return new Promise<boolean>(resolve => {
      const URL = this.serv_general.URL_API + 'nuevoProducto';
      return this.http.post<any>(URL, this.serv_general.objectToFormData(data)).subscribe(
        (res:any)=>{
          if (res.id === 0) {
            resolve(false); // Resuelve la promesa con false en caso de error
          } else {
            console.log(res.data);
            
            this.nuevoProduct.emit(res.data);
            resolve(true); // Resuelve la promesa con true si se guardó correctamente
          }
          
        }
      );
    }
    );
  }

}
