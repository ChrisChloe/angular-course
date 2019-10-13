import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class BrokerService {

constructor(private http: HttpClient) {}


public getBrokers() {
  return this.http.get(`${environment.API_URL}/brokers`);
}

public getBroker(id: number) {
  return this.http.get(`${environment.API_URL}/brokers/${id}`);
}

public registerBroker(broker) {
  return this.http.post(`${environment.API_URL}/brokers`, broker);
}

public updateBroker(id: number, broker) {
  return this.http.put(`${environment.API_URL}/brokers/${id}`, broker);
}

}
