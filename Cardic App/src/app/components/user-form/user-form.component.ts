import { Component, OnInit} from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/User';

import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {



  user: User = {
    Id_U: null,
    Usuario_U: '',
    Edad_U: null,
    Telefono_U: '',
    Correo_U: '',
    Clave_U: '',
  }

  constructor(private usersService: UsersService ,
              public navCtrl: NavController, 
              public Alerta: AlertController, 
              public loadingController: LoadingController ) {
    
  }

  repassword:string="";

  ngOnInit() {
  }

  async regisAlert() {
    const alert = await this.Alerta.create({
      header: 'Error',
      message: 'No se admiten campos vacios.',
      buttons: ['OK']
    });

    await alert.present();
}
async coinAlert() {
  const alert = await this.Alerta.create({
    header: 'Error',
    message: 'Las contraseñas no coinciden.',
    buttons: ['OK']
  });

  await alert.present();
}

async userAlert() {
  const alert = await this.Alerta.create({
    header: 'Error',
    message: 'Registro fallido, este ID ya está perteneciente a otro usuario.',
    buttons: ['OK']
  });

  await alert.present();
}

async loading() {
    const loading = await this.loadingController.create({
      duration: 1000,
      message: 'Registrando...',
      cssClass: 'custom-class custom-loading',
      translucent: true
    });
    return await loading.present();
  }


  registro(){
    if (this.user.Id_U==null || this.user.Usuario_U=="" || this.user.Edad_U==null || this.user.Telefono_U=="" || this.user.Correo_U=="" || this.user.Clave_U=="" || this.repassword==""){
      this.regisAlert();
    }else if (this.user.Clave_U==this.repassword) {
    this.usersService.saveUser(this.user).subscribe(
      res => {
        if (res['ok']) {
          this.userAlert();
        } else {
          this.loading();
          this.navCtrl.navigateForward('home');
        }
      })
    }else{
      this.coinAlert();
    };

  }
}
