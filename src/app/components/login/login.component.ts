import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  // Static credentials
  private readonly VALID_EMAIL = 'admin@mail.com';
  private readonly VALID_PASSWORD = 'admin123';

  constructor(private router: Router) {}

  onEmailInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.email = target.value;
    this.errorMessage = '';
  }

  onPasswordInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.password = target.value;
    this.errorMessage = '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    // Validation
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
      if (this.email === this.VALID_EMAIL && this.password === this.VALID_PASSWORD) {
        // Store auth token (in real app, this would come from backend)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', this.email);
        
        // Navigate to helpdesk
        this.router.navigate(['/helpdesk']);
      } else {
        this.errorMessage = 'Invalid email or password';
        this.isLoading = false;
      }
    }, 800);
  }
}