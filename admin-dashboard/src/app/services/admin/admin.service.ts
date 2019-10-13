import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

constructor(private http: HttpClient) {}


public getAdmins() {
  return this.http.get(`${environment.API_URL}/users`);
}

public getAdmin(id: number) {
  return this.http.get(`${environment.API_URL}/users/${id}`);
}

public registerAdmin(admin) {
  return this.http.post(`${environment.API_URL}/users`, admin);
}

public updatePlan(id, admin) {
  return this.http.put(`${environment.API_URL}/users/${id}`, admin);
}

}
