import {
  Component,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList, AfterViewInit,
} from '@angular/core';
import { convertToBoolProperty } from './helpers';
import { NbChatMessageComponent } from './chat-message.component';

@Component({
  selector: 'nb-chat',
  styleUrls: ['./chat.component.scss'],
  template: `
    <div class="header">{{ title }}</div>
    <div class="scrollable" #scrollable>
      <div class="messages">
        <ng-content select="nb-chat-message"></ng-content>
        <p class="no-messages" *ngIf="!messages?.length">Não há mensagens nesse ticket.</p>
      </div>
    </div>
    <div class="form">
      <ng-content select="nb-chat-form"></ng-content>
    </div>
  `,
})
export class NbChatComponent implements AfterViewInit {

  static readonly SIZE_XXSMALL = 'xxsmall';
  static readonly SIZE_XSMALL = 'xsmall';
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';
  static readonly SIZE_XLARGE = 'xlarge';
  static readonly SIZE_XXLARGE = 'xxlarge';

  static readonly STATUS_ACTIVE = 'active';
  static readonly STATUS_DISABLED = 'disabled';
  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  size: string;
  status: string;
  accent: string;
  scrollBottom: boolean = true;

  @Input() title: string;

  @HostBinding('class.xxsmall-chat')
  get xxsmall() {
    return this.size === NbChatComponent.SIZE_XXSMALL;
  }

  @HostBinding('class.xsmall-chat')
  get xsmall() {
    return this.size === NbChatComponent.SIZE_XSMALL;
  }

  @HostBinding('class.small-chat')
  get small() {
    return this.size === NbChatComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium-chat')
  get medium() {
    return this.size === NbChatComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large-chat')
  get large() {
    return this.size === NbChatComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge-chat')
  get xlarge() {
    return this.size === NbChatComponent.SIZE_XLARGE;
  }

  @HostBinding('class.xxlarge-chat')
  get xxlarge() {
    return this.size === NbChatComponent.SIZE_XXLARGE;
  }

  @HostBinding('class.active-chat')
  get active() {
    return this.status === NbChatComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.disabled-chat')
  get disabled() {
    return this.status === NbChatComponent.STATUS_DISABLED;
  }

  @HostBinding('class.primary-chat')
  get primary() {
    return this.status === NbChatComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-chat')
  get info() {
    return this.status === NbChatComponent.STATUS_INFO;
  }

  @HostBinding('class.success-chat')
  get success() {
    return this.status === NbChatComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-chat')
  get warning() {
    return this.status === NbChatComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-chat')
  get danger() {
    return this.status === NbChatComponent.STATUS_DANGER;
  }

  @HostBinding('class.accent')
  get hasAccent() {
    return this.accent;
  }

  /**
   * Chat size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} val
   */
  @Input('size')
  private set setSize(val: string) {
    this.size = val;
  }

  /**
   * Chat status color (adds specific styles):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }

  /**
   * Scroll chat to the bottom of the list when a new message arrives
   * @param {boolean} val
   */
  @Input('scrollBottom')
  private set setScrollBottom(val: boolean) {
    this.scrollBottom = convertToBoolProperty(val);
  }

  @ViewChild('scrollable') scrollable: ElementRef;
  @ContentChildren(NbChatMessageComponent) messages: QueryList<NbChatMessageComponent>;

  ngAfterViewInit() {
    this.messages.changes
      .subscribe((messages) => {
        this.messages = messages;
        this.updateView();
      });

    this.updateView();
  }

  updateView() {
    if (this.scrollBottom) {
      this.scrollListBottom();
    }
  }

  scrollListBottom() {
    this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
  }
}
