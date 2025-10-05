import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
}

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent {
  @Input() ticket: any;

  newComment = '';

  // Mock comments data
  comments: Comment[] = [
    {
      id: 1,
      author: 'John Doe',
      avatar: 'JD',
      content: 'This started happening right after the 2.1.5 deployment this morning.',
      timestamp: '1/4/2025, 10:05:00 AM',
      isInternal: false
    },
    {
      id: 2,
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'Looking into this now. Checking the deployment logs and recent changes.',
      timestamp: '1/4/2025, 10:15:00 AM',
      isInternal: true
    },
    {
      id: 3,
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'Found the issue - there\'s a broken import in the auth module. Rolling back now.',
      timestamp: '1/4/2025, 10:30:00 AM',
      isInternal: true
    }
  ];

  getSLAStatus(): 'breached' | 'at_risk' | 'met' {
    // Mock logic - you'd calculate based on creation time and SLA rules
    return 'breached';
  }

  onCommentInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newComment = target.value;
  }

  sendComment(): void {
    if (this.newComment.trim()) {
      // Handle comment submission to backend
      console.log('Sending comment:', this.newComment);
      this.newComment = '';
      // Reset textarea
      const textarea = document.querySelector('.comment-input') as HTMLTextAreaElement;
      if (textarea) textarea.value = '';
    }
  }
}