import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public loadingScreenEvent = new Subject<boolean>();

  constructor() { }

  public loadingScreen(activate) {
    return setTimeout(() => { this.loadingScreenEvent.next(activate); });
  }




}
