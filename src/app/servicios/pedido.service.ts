import { Injectable } from '@angular/core';
import { UniversalService } from './universal.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private serv_general:UniversalService,private http:HttpClient) { }

  getServicios() {
    const URL =  this.serv_general.URL_API + "allServicios";
    return this.http.get<any>(URL);
  }

  nuevoPedido(data:any){
    const URL =  this.serv_general.URL_API + "nuevoPedido";
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }


  guardarCalificacion(data:any){
    const URL =  this.serv_general.URL_API + "saveStar";
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }



  getPedidosNuevosAdmin() {
    const URL =  this.serv_general.URL_API + "PedidosNuevosAdmin";
    return this.http.get<any>(URL);
  }

  getPedidosEntregadosAdmin() {
    const URL =  this.serv_general.URL_API + "PedidosEntregadosAdmin";
    return this.http.get<any>(URL);
  }

  getPedidosNuevosCliente(idCliente:number) {
    const URL =  this.serv_general.URL_API + "PedidosNuevosCliente/"+idCliente ;
    return this.http.get<any>(URL);
  }

  getPedidosEntregadosCliente(idCliente:number) {
    const URL =  this.serv_general.URL_API + "PedidosEntregadosCliente/"+idCliente;
    return this.http.get<any>(URL);
  }

  updateEstadoPedido(data:any){
    const URL =  this.serv_general.URL_API + "updatePedido";
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }
}
