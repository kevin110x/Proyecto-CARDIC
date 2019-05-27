import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Pagina Principal',
      url: '/index',
      icon: 'home'
    },
    {
      title: 'Registros',
      url: '/registros',
      icon: 'list'
    },
    {
      title: 'Estadísticas',
      url: '/estadis',
      icon: 'stats'
    },
    {
      title: 'Consejos',
      url: '/consejos',
      icon: 'heart'
    },
    {
      title: 'Contáctenos',
      url: '/cont',
      icon: 'call'
    },
    {
      title: 'Configuración',
      url: '/config',
      icon: 'options'
    },
    {
      title: 'Salir',
      url: '/home',
      icon: 'pulse'
    },

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
