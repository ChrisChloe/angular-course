import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'nb-chat-message-text',
  template: `
    <p class="sender" *ngIf="sender || date">{{ sender }} <time>{{ date  | date:'shortTime' }}</time></p>
    <p class="text" *ngIf="message">{{ message }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageTextComponent {

  /**
   * Message sender
   * @type {string}
   */
  @Input() sender: string;

  /**
   * Message sender
   * @type {string}
   */
  @Input() message: string;

  /**
   * Message send date
   * @type {Date}
   */
  @Input() date: Date;

}
