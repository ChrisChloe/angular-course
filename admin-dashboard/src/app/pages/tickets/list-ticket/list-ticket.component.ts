import {Component, OnInit} from '@angular/core';

import { TicketService } from '../../../services/ticket/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list-ticket',
  styleUrls: ['./list-ticket.component.scss'],
  templateUrl: './list-ticket.component.html',
})
export class TicketListComponent implements OnInit {

  tickets: [];

  constructor(
    private ticketService: TicketService,
    private router: Router,
    ) {
  }


  ngOnInit() {
    this.ticketService.getTickets().subscribe((response: any) => {
      this.tickets = response.data;
    });
  }

  openTicket(id) {
    this.router.navigate(['/pages/ticket', id]);
  }
}
