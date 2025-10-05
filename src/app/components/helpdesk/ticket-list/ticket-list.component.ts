import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  activeFilter = 'all';
  searchTerm = '';
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    // Subscribe to tickets
    this.ticketService.tickets$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tickets => {
        this.tickets = tickets;
        this.applyFilters();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelect(ticket: Ticket): void {
    this.ticketService.selectTicket(ticket);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.tickets];

    // Apply status filter
    if (this.activeFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === this.activeFilter);
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(term) ||
        ticket.desc.toLowerCase().includes(term)
      );
    }

    this.filteredTickets = filtered;
  }

  getPriorityLabel(priority: string): string {
    return priority.toUpperCase();
  }

  getStatusLabel(status: string): string {
    return status.replace('_', ' ');
  }
}