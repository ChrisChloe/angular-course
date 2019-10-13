import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

constructor(private http: HttpClient) {}

public getUsers() {
  return this.http.get(`${environment.API_URL}/common`);
}

public getUser(id: number) {
  return this.http.get(`${environment.API_URL}/brokers/${id}`);
}

public registerUser(user) {
  return this.http.post(`${environment.API_URL}/common`, user);
}

public updateUser(id, user) {
  return this.http.put(`${environment.API_URL}/common/${id}`, user);
}

}
