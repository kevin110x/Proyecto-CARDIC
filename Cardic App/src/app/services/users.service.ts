import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = 'http://10.12.18.252:3000/API/';
  //API_URL = 'http://localhost:3000/API/';

  user = {};
  constructor(private http: HttpClient) {

  }

  login(id, clave) {
    return this.http.post(this.API_URL + 'user/user', {id,clave})
      .subscribe(value => {
        this.user = value['user'];
        console.log('user service', value);
        return value;
      });
  }

  getUsers() {
    return this.http.get(this.API_URL + 'user');
  }

  getUser(id: string) {
    return this.http.get(this.API_URL + 'user/${id}');
  }

  logUser(id: string) {
    return this.http.get(this.API_URL + 'user/${id}');
  }

  deleteUser(id: string) {
    return this.http.delete(this.API_URL + 'user/${id}');
  }

  saveUser(user: User) {
    return this.http.post(this.API_URL + 'user', user)

  }

  uptadeUser(id: string | number, user: User) {
    return this.http.put(this.API_URL + `user/${id}`, user);
  }
}
