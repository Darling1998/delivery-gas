import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import { UniversalService } from 'src/app/servicios/universal.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  shouldHideInput: boolean = true;
  objPerfil:any;
  id_usuario=0;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  infoUsuario:any[]=[];

  constructor(private ser_log:LoginService,private serv_gral:UniversalService) { }

  ngOnInit() {
    this.id_usuario=this.ser_log.get("infoUser").id_usuario; 
    this.getDataProfile();
  }


  getDataProfile(){
    this.ser_log.getProfile(this.id_usuario).subscribe(
      res=>{
        console.log(res);
        
        this.infoUsuario=res.data.info
      }
    )
  }



  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) { return; }
   
     const formValue = fActualizar.value;
     const storedUser = this.ser_log.get('infoUser');

     if (JSON.stringify(formValue) === JSON.stringify(storedUser)) {
       this.serv_gral.presentToast("No se realizaron cambios", 'warning');
       return;
     }
   
     this.ser_log.updateProfile(formValue).subscribe((resp) => {

       if (resp.id == 0) {
         this.serv_gral.presentToast("Ha ocurrido un error al actualizar", 'danger');
       } else {
         let objUser = resp.data;
         this.ser_log.set('infoUser', objUser);
         this.serv_gral.presentToast(resp.msj, 'success');
       }
     }); 
  }

  changeToogle() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  cancelar(){

  }
}
