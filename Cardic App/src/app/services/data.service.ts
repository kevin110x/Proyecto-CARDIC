import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/Data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = 'http://192.168.1.54:3000/API/';
  //API_URL = 'http://localhost:3000/API/';

  data = {};
  constructor(private http: HttpClient) {

  }

  getData() {
    return this.http.get(this.API_URL + 'data');
  }

  getdata(fecha: string) {
    return this.http.get(this.API_URL + 'data/${fecha}');
  }

  deletedata(fecha: string) {
    return this.http.delete(this.API_URL + 'data/${fecha}');
  }

  savedata(data: Data) {
    return this.http.post(this.API_URL + 'data', data)

  }

}
