import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-estadis',
  templateUrl: './estadis.page.html',
  styleUrls: ['./estadis.page.scss'],
})
export class EstadisPage implements OnInit {

  users: any = [];
  userr = {};

  constructor(private usersService: UsersService, private navCtrl: NavController, public Alerta: AlertController) { }

  ionViewWillEnter() {
    this.userr = this.usersService.user;
    console.log('user', this.userr);
    if (JSON.stringify(this.userr) == '{}') {
      this.navCtrl.navigateForward('home')
    };
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => console.log(err)

    );
  }

  ngOnInit() {

  }

  async logAlert() {
    const alert = await this.Alerta.create({
      header: 'Lo sentimos',
      message: 'Esta función está en desarrollo',
      buttons: ['OK']
    });
    this.navCtrl.navigateForward('index');

    await alert.present();
  }
}
