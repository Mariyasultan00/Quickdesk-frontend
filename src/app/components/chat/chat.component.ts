import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    this.http.post<any>('http://127.0.0.1:8000/api/chat/', { message: this.message })
      .subscribe(res => {
        this.chatLog.push(res.reply);
        this.message = '';
      });
  }
}
