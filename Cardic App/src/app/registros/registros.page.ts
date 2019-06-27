import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { UsersService } from '../services/users.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage {

  datos: Data[] = [];
  data = {
    Frecuencia_D: null,
    fecha_D: null
  };
  D = {
    Fecha_D: null,
  };

  users: any = [];
  userr = {};

  constructor(public Alerta: AlertController,
    public navCtrl: NavController,
    public dataService: DataService,
    private usersService: UsersService) {
  }



  ionViewWillEnter() {
    this.userr = this.usersService.user;
    console.log('user', this.userr);
    this.registros();
    if (JSON.stringify(this.userr) === '{}') {
      this.navCtrl.navigateForward('home');
    }
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => console.log(err)
    );
  }


  registros() {
    this.dataService.getData().subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
  }

  busqueda() {
    this.dataService.getdata(this.D.Fecha_D).subscribe((data: any) => {
      this.data = data;
      console.log(this.data);
    });
  }

  // async logAlert() {
  //   const alert = await this.Alerta.create({
  //     header: 'Lo sentimos',
  //     message: 'Esta función está en desarrollo',
  //     buttons: ['OK']
  //   });
  //   this.navCtrl.navigateForward('index');

  //   await alert.present();
  // }
}

