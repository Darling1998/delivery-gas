import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { UniversalService } from 'src/app/servicios/universal.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  form = new FormGroup({
    correo : new FormControl('',[Validators.minLength(4),Validators.required,Validators.email]),
    contrasena : new FormControl('',[Validators.minLength(4),Validators.required])
  });

  constructor(private general_service:UniversalService,private navCtrl:NavController,private servLogin:LoginService,private menuCtrl:MenuController ){}

  ngOnInit() {
    this.menuCtrl.enable(false, 'primerMenu');
  }




 async sendLogin(){
   
    if(this.form.valid){ 
      const info = await Device.getId();
      let user={
        correo:this.form.value.correo,
        contrasena:this.form.value.contrasena,
        IdDevice:info.identifier,
      }
      console.log(user);
      

      this.servLogin.login(user).subscribe(
        resp=>{
          console.log(resp);
          

           if (resp.idUsuario == 0) {
            this.general_service.presentToast(resp.mensaje, 'danger'); //msj no existe el usuario
          } else {
            console.log(resp);
            this.servLogin.set("infoUser",resp.info.items)
            let  perfil_id = resp.idPerfil;
           /*  if (perfil_id === 1) { */
              this.navCtrl.navigateRoot('/tabs', { animated: true }); //encuentra al usuario y loguea
           /*  } else
              this.navCtrl.navigateRoot('/tabs', { animated: true }); //encuentra al usuario y loguea */
            }
        }
      )

    }else{
      this.general_service.presentToast("Formulario Invalido","danger");
      return ;
    }
  }


  changeToogle() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }


}


