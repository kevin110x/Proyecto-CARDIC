import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/Data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 192.168.137.1
  // 10.12.18.193
  API_URL = 'http://10.12.18.193:3000/API/';
  //API_URL = 'http://localhost:3000/API/';

  data = {};
  constructor(private http: HttpClient) {

  }

  getData() {
    return this.http.get(this.API_URL + 'data');
  }

  getdata(Id_U: string) {
    return this.http.get(this.API_URL + 'data/${Id_U}');
  }
  
  savedata(data: Data) {
    return this.http.post(this.API_URL + 'data', data)

  }

}
