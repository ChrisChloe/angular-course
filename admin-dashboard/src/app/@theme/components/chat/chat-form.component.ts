import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'nb-chat-form',
  template: `
  <div class="dropped-files" *ngIf="droppedFiles?.length">
  <ng-container *ngFor="let file of droppedFiles">
    <div *ngIf="file.urlStyle" [style.background-image]="file.urlStyle">
      <span class="remove" (click)="removeFile(file)">&times;</span>
    </div>
    <div *ngIf="!file.urlStyle" class="nb-compose">
      <span class="remove" (click)="removeFile(file)">&times;</span>
    </div>
  </ng-container>
</div>
<div class="message-row">
<textarea [(ngModel)]="message"
          [class.with-button]="showButton" rows="5"
          nbInput fullWidth
          shape="round"
          placeholder="{{ fileOver ? 'Drop file to send' : 'Digite uma mensagem' }}"
          style="width: 100%;
          height: 100px;
          padding: 10px;
          border-radius: 10px 0 0 10px;"
          (keyup.enter)="sendMessage()">
</textarea>
  <button *ngIf="showButton" class="btn" [class.with-icon]="!buttonTitle" (click)="sendMessage()">
    {{ buttonTitle }}<span *ngIf="!buttonTitle" [class]="buttonIcon"></span>
  </button>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NbChatFormComponent {

  droppedFiles: any[] = [];
  imgDropTypes = ['image/png', 'image/jpeg', 'image/gif'];

  /**
   * Predefined message text
   * @type {string}
   */
  @Input() message: string = '';

  /**
   * Send button title
   * @type {string}
   */
  @Input() buttonTitle: string = '';

  /**
   * Send button icon, shown if `buttonTitle` is empty
   * @type {string}
   */
  @Input() buttonIcon: string = 'nb-paper-plane';

  /**
   * Show send button
   * @type {boolean}
   */
  @Input() showButton: boolean = true;

  /**
   * Show send button
   * @type {boolean}
   */
  @Input() dropFiles: boolean = false;

  /**
   *
   * @type {EventEmitter<{ message: string, files: File[] }>}
   */
  @Output() send = new EventEmitter<{ message: string, files: File[] }>();

  @HostBinding('class.file-over') fileOver = false;

  constructor(private cd: ChangeDetectorRef, private domSanitizer: DomSanitizer) {
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    if (this.dropFiles) {
      event.preventDefault();
      event.stopPropagation();

      this.fileOver = false;
      if (event.dataTransfer && event.dataTransfer.files) {

        // tslint:disable-next-line
        for (let file of event.dataTransfer.files) {
          const res = file;

          if (this.imgDropTypes.includes(file.type)) {
            const fr = new FileReader();
            fr.onload = (e: any) => {
              res.src = e.target.result;
              res.urlStyle = this.domSanitizer.bypassSecurityTrustStyle(`url(${res.src})`);
              this.cd.detectChanges();
            };

            fr.readAsDataURL(file);
          }
          this.droppedFiles.push(res);
        }
      }
    }
  }

  removeFile(file) {
    const index = this.droppedFiles.indexOf(file);
    if (index >= 0) {
      this.droppedFiles.splice(index, 1);
    }
  }

  @HostListener('dragover')
  onDragOver() {
    if (this.dropFiles) {
      this.fileOver = true;
    }
  }

  @HostListener('dragleave')
  onDragLeave() {
    if (this.dropFiles) {
      this.fileOver = false;
    }
  }

  sendMessage() {
    if (this.droppedFiles.length || String(this.message).trim().length) {
      this.send.emit({ message: this.message, files: this.droppedFiles });
      this.message = '';
      this.droppedFiles = [];
    }
  }


}
