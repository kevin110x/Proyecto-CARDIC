import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NavController, AlertController} from '@ionic/angular';
import { User } from 'src/app/models/User';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {

  users: any = [];
  userr = {};
  
  constructor(private usersService: UsersService, public navCtrl: NavController, public Alerta: AlertController) { }

  user: User = {
    Id_U: null,
    Usuario_U: '',
    Edad_U: null,
    Telefono_U: '',
    Correo_U: '',
    Clave_U: '',
  };

  repassword:string="";

  ngOnInit() {
    this.userr = this.usersService.user;
    console.log('user', this.userr)
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(res);
      },
      err => console.log(err)
    )
  }

  async regisAlert() {
    const alert = await this.Alerta.create({
      header: 'Error',
      message: 'No se admiten campos vacios.',
      buttons: ['OK']
    });

    await alert.present();
}

  update(){if (this.user.Id_U==null || this.user.Usuario_U=="" || this.user.Edad_U==null || this.user.Telefono_U=="" || this.user.Correo_U=="" || this.user.Clave_U=="" || this.repassword==""){
    this.regisAlert();
  }else if (this.user.Clave_U==this.repassword) {
      this.usersService.user=this.user;
      this.usersService.uptadeUser(this.user.Id_U, this.user).subscribe(
        res => {
          console.log(res);
          this.navCtrl.navigateForward('user');
          this.userr=this.user.Id_U;
        }
      )
    }else{
      this.coinAlert();
    };

  }

  
async coinAlert() {
  const alert = await this.Alerta.create({
    header: 'Error',
    message: 'Las contraseñas no coinciden.',
    buttons: ['OK']
  });

  await alert.present();
}


}
