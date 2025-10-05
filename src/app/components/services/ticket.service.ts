import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Ticket {
  id: number;
  title: string;
  desc: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  comments: number;
  assignee: string | null;
  overdue: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsSubject = new BehaviorSubject<Ticket[]>([
    { 
      id: 1,
      title: 'Login page not loading', 
      desc: 'Users are reporting that the login page shows a blank screen', 
      status: 'open', 
      priority: 'urgent', 
      comments: 3,
      assignee: 'Sarah Chen',
      overdue: true,
      createdAt: new Date('2025-01-04T10:00:00'),
      updatedAt: new Date('2025-01-04T10:30:00')
    },
    { 
      id: 2,
      title: 'Email notifications delayed', 
      desc: 'Email notifications are being sent with 2-3 hour delay', 
      status: 'in_progress', 
      priority: 'high', 
      comments: 7,
      assignee: 'Mike Johnson',
      overdue: true,
      createdAt: new Date('2025-01-04T09:30:00'),
      updatedAt: new Date('2025-01-04T11:00:00')
    },
    { 
      id: 3,
      title: 'Dashboard charts not updating', 
      desc: 'Real-time charts on dashboard are frozen', 
      status: 'open', 
      priority: 'medium', 
      comments: 1,
      assignee: null,
      overdue: false,
      createdAt: new Date('2025-01-04T08:00:00'),
      updatedAt: new Date('2025-01-04T08:00:00')
    },
    { 
      id: 4,
      title: 'Export to CSV feature request', 
      desc: 'Users want ability to export reports to CSV format', 
      status: 'open', 
      priority: 'low', 
      comments: 0,
      assignee: null,
      overdue: true,
      createdAt: new Date('2025-01-03T14:00:00'),
      updatedAt: new Date('2025-01-03T14:00:00')
    },
    { 
      id: 5,
      title: 'Mobile app crashes on iOS', 
      desc: 'App crashes when opening settings on iOS 17', 
      status: 'resolved', 
      priority: 'high', 
      comments: 12,
      assignee: 'Alex Rivera',
      overdue: true,
      createdAt: new Date('2025-01-02T10:00:00'),
      updatedAt: new Date('2025-01-04T12:00:00')
    }
  ]);

  private selectedTicketSubject = new BehaviorSubject<Ticket | null>(null);

  tickets$: Observable<Ticket[]> = this.ticketsSubject.asObservable();
  selectedTicket$: Observable<Ticket | null> = this.selectedTicketSubject.asObservable();

  // Get all tickets
  getTickets(): Ticket[] {
    return this.ticketsSubject.value;
  }

  // Get selected ticket
  getSelectedTicket(): Ticket | null {
    return this.selectedTicketSubject.value;
  }

  // Select a ticket
  selectTicket(ticket: Ticket | null): void {
    this.selectedTicketSubject.next(ticket);
  }

  // Add new ticket
  addTicket(ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newTicket: Ticket = {
      ...ticket,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentTickets = this.ticketsSubject.value;
    this.ticketsSubject.next([newTicket, ...currentTickets]);
  }

  // Update ticket
  updateTicket(id: number, updates: Partial<Ticket>): void {
    const currentTickets = this.ticketsSubject.value;
    const updatedTickets = currentTickets.map(ticket => 
      ticket.id === id 
        ? { ...ticket, ...updates, updatedAt: new Date() }
        : ticket
    );
    this.ticketsSubject.next(updatedTickets);

    // Update selected ticket if it's the one being updated
    const selectedTicket = this.selectedTicketSubject.value;
    if (selectedTicket && selectedTicket.id === id) {
      this.selectedTicketSubject.next({ ...selectedTicket, ...updates, updatedAt: new Date() });
    }
  }

  // Delete ticket
  deleteTicket(id: number): void {
    const currentTickets = this.ticketsSubject.value;
    const filteredTickets = currentTickets.filter(ticket => ticket.id !== id);
    this.ticketsSubject.next(filteredTickets);

    // Clear selection if deleted ticket was selected
    const selectedTicket = this.selectedTicketSubject.value;
    if (selectedTicket && selectedTicket.id === id) {
      this.selectedTicketSubject.next(null);
    }
  }

  // Filter tickets by status
  filterByStatus(status: string): Ticket[] {
    const allTickets = this.ticketsSubject.value;
    if (status === 'all') {
      return allTickets;
    }
    return allTickets.filter(ticket => ticket.status === status);
  }

  // Search tickets
  searchTickets(searchTerm: string): Ticket[] {
    const allTickets = this.ticketsSubject.value;
    if (!searchTerm.trim()) {
      return allTickets;
    }
    
    const term = searchTerm.toLowerCase();
    return allTickets.filter(ticket => 
      ticket.title.toLowerCase().includes(term) ||
      ticket.desc.toLowerCase().includes(term)
    );
  }

  // Get ticket by ID
  getTicketById(id: number): Ticket | undefined {
    return this.ticketsSubject.value.find(ticket => ticket.id === id);
  }

  // Update ticket status
  updateStatus(id: number, status: Ticket['status']): void {
    this.updateTicket(id, { status });
  }

  // Update ticket priority
  updatePriority(id: number, priority: Ticket['priority']): void {
    this.updateTicket(id, { priority });
  }

  // Assign ticket
  assignTicket(id: number, assignee: string): void {
    this.updateTicket(id, { assignee });
  }
}