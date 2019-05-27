import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {

  constructor(public Alerta: AlertController, public navCtrl: NavController) { }

  ionViewWillEnter(){
    this.logAlert();
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

