import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, Platform } from '@ionic/angular';
import { UsersService } from '../services/users.service';


import { ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import { Chart } from 'chart.js';
import 'chartjs-plugin-streaming';
import { BluetoothService } from '../services/bluetooth.service';

import { Data } from 'src/app/models/Data';
import { NavController } from '@ionic/angular';

import { DataService } from 'src/app/services/data.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from '../services/message.service';


@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: [],
})
export class IndexPage implements OnInit {

    users: any = [];
    userr = {};

    data: Data = {
        Frecuencia_D: null,
        Id_U: null,
    };

    bpm = null;
    constructor(public menu: MenuController,
        public toast: ToastController,
        public bluetoothSerial: BluetoothSerial,
        private bluetoothService: BluetoothService,
        private localNotifications: LocalNotifications,
        private alertCtrl: AlertController,
        private plt: Platform,
        private datasService: DataService,
        private usersService: UsersService,
        private navCtrl: NavController,
        private message: MessageService) {

    }
    active;

    datasets: any[] = [{
        data: [],
        label: 'Electro'
    }];

    options: any = {
        scales: {
            xAxes: [{
                type: 'realtime',
                delay: 5000,
                pause: true,
                realtime: {
                    delay: 2000
                }
            }]
        }
    };


    ngOnInit() { }

    conect() {
        this.presentToast('Conectando');
        this.bluetoothService.connect();
    }

    sendMessage() {
        this.message.sendMessage('+573145475480', 'Tu ritmo cardiaco se encuentra fuera del rango normal, por favor revisa tu condición.')
            .subscribe(value => {
                console.log(value);
            });
    }

    ionViewWillLeave() {
        this.active = false;
    }

    ionViewWillEnter() {

        this.menu.enable(true);
        this.bluetoothService.myEvent.subscribe(value => {
            // this.presentToast(value);
            this.data.Frecuencia_D = value;
            if (this.data.Frecuencia_D > 0) {
                if (this.data.Frecuencia_D >= 120 || this.data.Frecuencia_D <= 70) {
                    this.message.sendMessage
                        ('+573145475480', 'Tu ritmo cardiaco se encuentra fuera del rango normal, por favor revisa tu condición.')
                        .subscribe(val => {
                            console.log(val);
                        });
                }
                if (this.data.Frecuencia_D >= 120 || this.data.Frecuencia_D <= 70) {
                    this.localNotifications.schedule({
                        id: 1,
                        title: 'Precaución',
                        text: 'Notificación de alerta.\n Tu condición cardiaca se ha alterado, por favor revisa tu condición',
                        data: { mydata: 'My hidden message this is' },
                        trigger: { in: 1, unit: ELocalNotificationTriggerUnit.SECOND },
                        foreground: true // Show the notification while app is open
                    });
                }
                this.datasService.savedata(this.data
                ).subscribe(
                    res => {
                        if (res['ok']) {
                        } else {
                        }
                    });
            }
            this.datasets.forEach(function (dataset: any) {
                dataset.data.push({
                    x: Date.now(),
                    y: value
                });
            }
            );
            // this.presentToast(value);
        });
        this.active = true;
        this.userr = this.usersService.user;
        console.log('user', this.userr);
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

    async presentToast(message) {
        const toast = await this.toast.create({
            message: message,
            duration: 1000
        });
        toast.present();
    }

    disconnect() {
        this.bluetoothSerial.disconnect().then(value => {
            this.presentToast('Desconectado ' + value.toString());
        }).catch(reason => {
            this.presentToast('error' + reason);
        });
    }

    scheduleNotification() {
        this.localNotifications.schedule({
            id: 1,
            title: 'Alarma Test',
            text: 'Simons Notificación de pruebas',
            data: { mydata: 'My hidden message this is' },
            trigger: { in: 1, unit: ELocalNotificationTriggerUnit.SECOND },
            foreground: true // Show the notification while app is open
        });
    }
}
