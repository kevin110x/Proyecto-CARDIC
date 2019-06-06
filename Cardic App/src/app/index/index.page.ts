import {Component, OnInit} from '@angular/core';
import {MenuController, AlertController, Platform} from '@ionic/angular';


import {ToastController} from '@ionic/angular';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';

import {Chart} from 'chart.js';
import 'chartjs-plugin-streaming';
import {BluetoothService} from '../services/bluetooth.service';

import { Data } from 'src/app/models/Data';

import { DataService } from 'src/app/services/data.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: [],
})
export class IndexPage implements OnInit {


    // data: Data = {
    //     Frecuencia_D: null,
    //     Fecha_D: null,
    //     Id_U: null,
    // }

    bpm = '';
    constructor(public menu: MenuController,
                public toast: ToastController,
                public bluetoothSerial: BluetoothSerial,
                private bluetoothService: BluetoothService,
                private localNotifications: LocalNotifications,
                private alertCtrl: AlertController,
                private plt: Platform)
    //private dataService: DataService) 
    {

        this.plt.ready().then(() => {
            this.localNotifications.on('click').subscribe(res => {
                let msg = res.data ? res.data.mydata : '';
            });
        });

        this.plt.ready().then(() => {
            this.localNotifications.on('trigger').subscribe(res => {

            });
        });

        this.menu.enable(true);
        bluetoothService.myEvent.subscribe(value => {
            this.presentToast(value);
            this.bpm = value;
            this.datasets.forEach(function (dataset: any) {
                dataset.data.push({
                    x: Date.now(),
                    y: value
                });
            });
            // this.presentToast(value);
        });
    }
    active;

    datasets: any[] = [{
        data: []
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

    ngOnInit() {}

    conect() {
        this.presentToast('Connect');
        this.bluetoothService.connect();
    }

    ionViewWillLeave() {
        this.active = false;
    }

    ionViewWillEnter() {
        this.active = true;
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

    scheduleNotifications() {
        if (this.bpm <= '110' ) {
            this.localNotifications.schedule({
                id: 1,
                title: 'Atención',
                text: 'Revisa tu pulso, hemos detectado alteraciones',
                trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
                data: { mydata: 'Ten cuidado'}
            });
        }
    }


}
