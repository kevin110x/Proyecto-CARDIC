import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/Data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = environment.url_api;
  // API_URL = 'http://localhost:3000/API/';

  data = {};
  constructor(private http: HttpClient) {

  }

  getData() {
    return this.http.get(this.API_URL + '/data');
  }

  getdata(Fecha_D: Date) {
    return this.http.get(this.API_URL + '/data/' + Fecha_D);
  }

  savedata(data: Data) {
    return this.http.post(this.API_URL + '/data', data)

  }

}
