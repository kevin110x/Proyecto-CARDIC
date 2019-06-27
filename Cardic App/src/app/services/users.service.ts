import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = environment.url_api;

  user = {};
  constructor(private http: HttpClient) {

  }

  login(id, clave) {
    return this.http.post(this.API_URL + '/user/user', { id, clave });
  }

  getUsers() {
    return this.http.get(this.API_URL + '/user');
  }

  getUser(id: string) {
    return this.http.get(this.API_URL + '/user/${id}');
  }

  logUser(id: string) {
    return this.http.get(this.API_URL + '/user/${id}');
  }

  deleteUser(id: string) {
    return this.http.delete(this.API_URL + '/user/${id}');
  }

  saveUser(user: User) {
    return this.http.post(this.API_URL + '/user', user)

  }

  uptadeUser(id: string | number, user: User) {
    return this.http.put(this.API_URL + `/user/${id}`, user);
  }
}
