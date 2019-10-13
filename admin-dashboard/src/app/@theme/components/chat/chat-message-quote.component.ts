import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'nb-chat-message-quote',
  template: `
  <p class="sender" *ngIf="sender || date">{{ sender }} <time>{{ date  | date:'shortTime' }}</time></p>
    <p class="quote">
      {{ quote }}
    </p>
    <nb-chat-message-text [message]="message">
      {{ message }}
    </nb-chat-message-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatMessageQuoteComponent {

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
   * Quoted message
   * @type {Date}
   */
  @Input() quote: string;

}
