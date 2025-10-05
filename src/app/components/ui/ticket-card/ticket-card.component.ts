import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Ticket {
  title: string;
  desc: string;
  status: string;
  priority: string;
  comments: number;
}

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent {
  @Input() ticket!: Ticket;
  @Output() selectTicket = new EventEmitter<Ticket>();

  onSelect() {
    this.selectTicket.emit(this.ticket);
  }
}
