import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class PlanService {

constructor(private http: HttpClient) {}


public getPlans() {
  return this.http.get(`${environment.API_URL}/plans`);
}

public getPlan(id: number) {
  return this.http.get(`${environment.API_URL}/brokers/${id}`);
}

public addPlans(plan) {
  return this.http.post(`${environment.API_URL}/plans`, plan);
}

public updatePlan(id, plan) {
  return this.http.put(`${environment.API_URL}/plans/${id}`, plan);
}

}
