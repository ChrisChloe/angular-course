import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketService {

constructor(private http: HttpClient) {}


public getTickets() {
  return this.http.get(`${environment.API_URL}/tickets`);
}

public getTicket(id: number) {
  return this.http.get(`${environment.API_URL}/tickets/${id},`);
}

public createTicket() {
  return this.http.post(`${environment.API_URL}/tickets`, '');
}

public sendMessage(message) {
  return this.http.post(`${environment.API_URL}/mensagens`, message);
}

public sendFile(file) {
  return this.http.post(`${environment.API_URL}/mensagens`, file);
}

public downloadFile(fileID) {
  return this.http.get(`${environment.API_URL}/files/${fileID}`, {responseType: 'blob'});


}

// static createAndDownloadBlobFile(body, options, filename) {
//   var blob = new Blob([body], options);
//   if (navigator.msSaveBlob)
//   {
//       // IE 10+
//       navigator.msSaveBlob(blob, filename);
//   }
//   else
//   {
//       const link = document.createElement('a');
//       // Browsers that support HTML5 download attribute
//       if (link.download !== undefined)
//       {
//           const url = URL.createObjectURL(blob);
//           link.setAttribute('href', url);
//           link.setAttribute('download', filename);
//           link.style.visibility = 'hidden';
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//       }
//   }
// }
}
