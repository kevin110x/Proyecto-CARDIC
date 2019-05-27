import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from '@ionic/angular';
import { UsersService } from '../services/users.service'
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController,
    public Alerta: AlertController,
    public loadingController: LoadingController,
    private http: HttpClient,
    private uService: UsersService,
    private menu: MenuController) {
      
  }

  ionViewDidLoad(){
    this.menu.enable(false);
  }

  
  ionViewWillEnter(){
    this.menu.enable(false);
    this.username = "";
    this.password = "";
  }

  log() {
    this.http.post('http://10.12.18.252:3000/API/user/user', { id: this.username, clave: this.password })
      .subscribe(value => {
        console.log(value);
        this.uService.user = value['user'];
        if (value['ok']) {
          this.loading();
          this.navCtrl.navigateForward('index');
          this.username = "";
          this.password = "";
          this.menu.enable(true);
        } else {
          this.logAlert();
        }
        return value;
      });


  }

  reg() {
          this.navCtrl.navigateForward('regis');
          this.username = "";
          this.password = "";
          this.menu.enable(false);

  }

  async loading() {
    const loading = await this.loadingController.create({
      duration: 250,
      message: 'Ingresando...',
      cssClass: 'custom-class custom-loading',
      translucent: true
    });
    return await loading.present();
  }

  async presentAlert() {
    const alert = await this.Alerta.create({
      header: 'Error',
      message: 'Ha ocurrido un problema, por favor intentar más tarde.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async logAlert() {
    const alert = await this.Alerta.create({
      header: 'Usuario Inexistente',
      message: 'Usuario y/o contraseña incorrecta',
      buttons: ['OK']
    });

    await alert.present();
  }




}
