import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-ticket-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-ticket-modal.component.html',
  styleUrls: ['./new-ticket-modal.component.css']
})
export class NewTicketModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() createTicket = new EventEmitter<any>();

  title = '';
  description = '';
  priority = 'medium';

  onTitleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.title = target.value;
  }

  onDescriptionInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.description = target.value;
  }

  onPriorityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.priority = target.value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.title.trim() && this.description.trim()) {
      const newTicket = {
        id: Date.now(),
        title: this.title,
        desc: this.description,
        status: 'open',
        priority: this.priority,
        comments: 0,
        assignee: null,
        overdue: false
      };
      this.createTicket.emit(newTicket);
      this.resetForm();
      this.close.emit();
    }
  }

  onBackdropClick(): void {
    this.close.emit();
  }

  onModalClick(event: Event): void {
    event.stopPropagation();
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.priority = 'medium';
  }
}