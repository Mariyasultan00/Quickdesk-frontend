import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { NewTicketModalComponent } from './new-ticket-modal/new-ticket-modal.component';
import { TicketService, Ticket } from '../services/ticket.service';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-helpdesk',
  standalone: true,
  imports: [
    CommonModule, 
    TicketListComponent, 
    TicketDetailComponent,
    NewTicketModalComponent,ChatComponent
  ],
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  selectedTicket: Ticket | null = null;
  showModal = false;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    // Subscribe to selected ticket changes
    this.ticketService.selectedTicket$
      .pipe(takeUntil(this.destroy$))
      .subscribe(ticket => {
        this.selectedTicket = ticket;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openNewTicketModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onCreateTicket(ticketData: any): void {
    this.ticketService.addTicket(ticketData);
    this.closeModal();
  }
  showChat = false;

openChat() {
  this.showChat = true;
}

closeChat() {
  this.showChat = false;
}
}