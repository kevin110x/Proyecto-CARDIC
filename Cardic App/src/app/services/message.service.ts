import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  API_URL = environment.url_api;

  constructor(private http: HttpClient) { }

  sendMessage(number, message) {
    return this.http.post(`${this.API_URL}/data/message`, {to: number, message})
  }
}
