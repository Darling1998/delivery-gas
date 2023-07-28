import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { UniversalService } from 'src/app/servicios/universal.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  formularioRegistro = new FormGroup({
    nombres : new FormControl('',[Validators.minLength(4),Validators.required]),
    apellidos : new FormControl('',[Validators.minLength(4),Validators.required]),
    cedula : new FormControl('',[Validators.minLength(4),Validators.required]),
    telefono : new FormControl('',[Validators.minLength(4),Validators.required]),
    correo : new FormControl('',[Validators.minLength(4),Validators.required,Validators.email]),
    contrasena : new FormControl('',[Validators.minLength(4),Validators.required])
  });


  constructor(private general_service:UniversalService,private serv_login:LoginService,private serv_ge:UniversalService,private navCtrl:NavController) { }

  ngOnInit() {
  }

  changeToogle() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }


  sendRegistro(){
    let bodyRegistro={
      cedula:this.formularioRegistro.value.cedula,
      nombres:this.formularioRegistro.value.nombres,
      apellidos:this.formularioRegistro.value.apellidos,
      telefono:this.formularioRegistro.value.telefono,
      contrasena:this.formularioRegistro.value.contrasena,
      correo:this.formularioRegistro.value.correo,
    }

    if(this.formularioRegistro.valid){
      this.serv_login.registro(bodyRegistro).subscribe(
        resp=>{
          console.log(resp);
          
          if (resp.info.id == 0) {
            this.serv_ge.presentToast("Ha ocurrido un error", 'danger'); 
          } else {
            console.log(resp.info.id);
            this.serv_ge.presentToast(resp.mensaje, 'success'); 
            this.navCtrl.navigateRoot('login', { animated: true }); 
          }
        }
      )

    }else{
      this.serv_ge.presentToast("Formulario Invalido","danger");
      return ;
    }
  }

}
