import { Injectable } from '@angular/core';
import { UniversalService } from './universal.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private serv_general:UniversalService,private http:HttpClient) { }

  login(data: any) {
    const URL = this.serv_general.URL_API + 'login';
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }

  registro(data: any) {
    const URL = this.serv_general.URL_API + 'nuevoCliente';
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }


  getProfile(idUsuario:number) {
    const URL =  this.serv_general.URL_API + "getInfoUsuario/"+idUsuario ;
    return this.http.get<any>(URL);
  }

  updateProfile(data: any) {
    const URL = this.serv_general.URL_API + 'updatePerfil';
    return this.http.post<any>(URL, this.serv_general.objectToFormData(data));
  }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving', e);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error al obtener la data', e);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error al eliminar el key', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error al limpiar el localstorage', e);
    }
  }


}
