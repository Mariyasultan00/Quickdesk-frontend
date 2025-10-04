import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message = '';
  chatLog: string[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.message) return;
    this.chatLog.push("You: " + this.message);
    this.http.post<any>(`${environment.apiUrl}/chat/`, { message: this.message })
      .subscribe({
        next: (res) => {
          this.chatLog.push(res.reply);
          this.message = '';
        },
        error: (err) => {
          this.chatLog.push("Error: " + err.message);
          this.message = '';
        }
      });
  }
}
