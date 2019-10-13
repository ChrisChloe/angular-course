import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketService } from './../../../services/ticket/ticket.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';
import { saveAs } from 'file-saver/dist/FileSaver';

@Component({
  selector: 'nb-chat-message-file',
  template: `
    <nb-chat-message-text [sender]="sender" [date]="date" [message]="message">
      {{ message }}
    </nb-chat-message-text>
    <ng-container *ngIf="readyFiles?.length > 1">
      <div class="message-content-group">
        <div *ngFor="let file of readyFiles">
          <a (click)="downloadFile(file.id, file.name)" style="border: 0; cursor: pointer;">
            <span class="fas fa-file-download" *ngIf="!file.urlStyle"></span>
            <div *ngIf="file.isImage" [style.background-image]="file.urlStyle"></div>
          </a>
            <div style="width: 70px; text-overflow: ellipsis;overflow: hidden;white-space: nowrap; margin-top: -10px;">
              {{file.name}}
            </div>
          </div>
      </div>
    </ng-container>
    <ng-container *ngIf="readyFiles?.length === 1">
      <a (click)="downloadFile(readyFiles[0].id, readyFiles[0].name)" style="cursor: pointer;">
        <span class="fas fa-file-download"  *ngIf="!readyFiles[0].urlStyle"></span>
        <div *ngIf="readyFiles[0].isImage" [style.background-image]="readyFiles[0].urlStyle"></div>
      </a>
      <div style="width: 70px; text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
            {{readyFiles[0].name}}
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageFileComponent {

  readyFiles: any[];

  /**
   * Message sender
   * @type {string}
   */
  @Input() message: string;

  /**
   * Message sender
   * @type {string}
   */
  @Input() sender: string;

  /**
   * Message send date
   * @type {Date}
   */
  @Input() date: Date;

  /**
   * Message file path
   * @type {Date}
   */
  @Input()
  set files(files: any[]) {
    this.readyFiles = (files || []).map((file: any) => {
      const isImage = this.isImage(file);
      return {
        ...file,
        urlStyle: isImage && this.domSanitizer.bypassSecurityTrustStyle(`url(${file.url})`),
        isImage: isImage,
      };
    });
    this.cd.detectChanges();
  }

  constructor(
    private cd: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private ticket: TicketService,
    private notify: NotifyService,
    ) {
  }

  isImage(file: any): boolean {
    return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
  }

  downloadFile(fileID, filename) {
    this.ticket.downloadFile(fileID)
      .pipe(first())
      .subscribe(
          data => {
            saveAs(data, filename);
          },
          error => {
            this.notify.show('Erro ao tentar baixar arquivo', 'danger');
          });
  }
}
