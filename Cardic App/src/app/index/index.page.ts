import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';


import {ToastController} from '@ionic/angular';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';

import {Chart} from 'chart.js';
import 'chartjs-plugin-streaming';
import {BluetoothService} from '../services/bluetooth.service';

import { Data } from 'src/app/models/Data';

import { DataService } from 'src/app/services/data.service';


@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {


    data: Data = {
        Frecuencia_D: null,
        Fecha_D: null,
        Id_U: null,
    }

    bpm = '';
    constructor(public menu: MenuController,
        public toast: ToastController,
        public bluetoothSerial: BluetoothSerial,
        private bluetoothService: BluetoothService)
    //private dataService: DataService) 
    {

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
}
