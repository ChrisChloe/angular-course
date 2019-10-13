import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from './helpers';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'nb-chat-message',
  template: `
    <div class="avatar" [style.background-image]="avatarStyle" *ngIf="!replyValue">
      <ng-container *ngIf="!avatarStyle">
        {{ getInitials() }}
      </ng-container>
    </div>
    <div class="message">
      <ng-container [ngSwitch]="type">
        <nb-chat-message-file *ngSwitchCase="'file'"
                              [sender]="sender" [date]="date" [message]="message" [files]="files">
        </nb-chat-message-file>
        <nb-chat-message-quote *ngSwitchCase="'quote'"
                              [sender]="sender" [date]="date" [message]="message" [quote]="quote">
        </nb-chat-message-quote>
        <nb-chat-message-text *ngSwitchDefault
                              [sender]="sender" [date]="date" [message]="message">
        </nb-chat-message-text>
      </ng-container>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(80),
      ]),
      transition('* => void', [
        animate(80, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageComponent {


  @HostBinding('@flyInOut')
  get flyInOut() {
    return true;
  }

  @HostBinding('class.reply')
  replyValue: boolean = false;

  @HostBinding('class.not-reply')
  get notReply() {
    return !this.replyValue;
  }

  avatarStyle: SafeStyle;

  /**
   * Determines if a message is a reply
   */
  @Input()
  set reply(val: boolean) {
    this.replyValue = convertToBoolProperty(val);
  }

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
   * Array of files `{ url: 'file url', icon: 'file icon class' }`
   * @type {string}
   */
  @Input() files: { url: string, icon: string }[];

  /**
   * Quoted message text
   * @type {string}
   */
  @Input() quote: string;

  /**
   * Map latitude
   * @type {number}
   */
  @Input() latitude: number;

  /**
   * Map longitude
   * @type {number}
   */
  @Input() longitude: number;

  /**
   * Message send avatar
   * @type {string}
   */
  @Input()
  set avatar(value: string) {
    this.avatarStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Message type, available options `text|file|map|quote`
   * @type {string}
   */
  @Input() type: string;

  constructor(private domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.sender) {
      const names = this.sender.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}
