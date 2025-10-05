import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Output() close = new EventEmitter<void>();
  message: string = '';
  chatLog: { sender: 'user' | 'ai' | 'error'; text: string }[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  sendMessage(): void {
    const trimmedMessage = this.message.trim();
    if (!trimmedMessage || this.isLoading) return;

    this.chatLog.push({ sender: 'user', text: trimmedMessage });
    this.message = '';
    this.isLoading = true;

    this.http.post<{ reply: string }>(`${environment.apiUrl}/chat/`, { message: trimmedMessage })
      .subscribe({
        next: (res) => {
          this.chatLog.push({ sender: 'ai', text: res.reply });
          this.isLoading = false;
        },
        error: (err) => {
          this.chatLog.push({
            sender: 'error',
            text: 'Error: ' + (err.message || 'Server error')
          });
          this.isLoading = false;
        }
      });
  }

  getMessageClass(msgObj: { sender: 'user' | 'ai' | 'error'; text: string }): string {
    switch (msgObj.sender) {
      case 'user': return 'user-message';
      case 'ai': return 'ai-message';
      case 'error': return 'error-message';
      default: return '';
    }
  }
}


