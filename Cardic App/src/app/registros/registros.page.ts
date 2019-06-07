import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Data } from '@angular/router';


@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage {

  datos: Data[] =[];

  constructor(public Alerta: AlertController, 
              public navCtrl: NavController,
              public dataService: DataService) { 
              this.dataService.getData().subscribe((data : any)=>{
                this.datos = data;
              })
              }



  ionViewWillEnter(){
    this.logAlert();
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

