import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class NotifyService {

constructor(private toastrService: NbToastrService) {}

public show(text, status) {
  this.toastrService.show(
    text, 'Notificação', { status });
}
}
