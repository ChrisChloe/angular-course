import { ChatService } from './chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TicketService } from './../../../services/ticket/ticket.service';
import { AuthService } from './../../../services/auth/auth.service';
import { first } from 'rxjs/operators';

interface Message {
  content: string;
  ticket_id: number;
}
@Component({
  selector: 'ngx-ticket-chat',
  styleUrls: ['./ticket-chat.component.scss'],
  templateUrl: './ticket-chat.component.html',
  providers: [ ChatService ],
})
export class TicketChatComponent implements OnInit {

  constructor(
    protected chatService: ChatService,
    private ticketService: TicketService,
    private authService: AuthService,
    private route: ActivatedRoute,
    ) { }

  message: Object;
  messages: any[];
  id: number;
  ticket: any;
  currentUser: any;
  files: Object;

  ngOnInit(): void {
    this.currentUser = this.authService.getDataUser();
    this.route.params.subscribe(routeParams => {
      this.ticketService.getTicket(routeParams.id).subscribe((response: any) => {
        this.ticket = (response.data);
        this.messages = (response.data.messages);
        this.id = routeParams.id;
      });
    });
  }

  sendMessage(event: any) {
    this.message = {
      ticket_id: this.id,
      content: event.message,
    };

    // if (event.files.length > 0) {
    //   this.message = {
    //     ticket_id: this.id,
    //     files: event.files,
    //   };
    //   this.ticketService.sendFile(this.message).pipe(first())
    //   .subscribe(
    //     data => {
    //     },
    //     error => {
    //     });
    // }
    this.ticketService.sendMessage(this.message)
    .pipe(first())
    .subscribe(
        data => {
          this.ticketService.getTicket(this.id).subscribe((response: any) => {
            this.ticket = (response.data);
            this.messages = (response.data.messages);
          });
        },
        error => {
    });
    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'nb-compose',
    //   };
    // });
    // this.messages.push({
    //   text: event.message,
    //   date: new Date(),
    //   reply: true,
    //   type: files.length ? 'file' : 'text',
    //   files: files,
    //   user: {
    //     name: 'Jonh Doe',
    //     avatar: 'https://i.gifer.com/no.gif',
    //   },
    // });
  }
}
