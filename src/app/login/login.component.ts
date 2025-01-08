import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected username: string = '';
  protected password: string = '';
  protected user: any = null;
  protected errors: string[] = [];

  public constructor(private router: Router) {}

  public async login() {
    this.errors = [];


    if (!this.username || this.username.trim().length === 0) {
      this.errors.push('Username is required.');
    }

    if (!this.password || this.password.trim().length === 0) {
      this.errors.push('Password is required.');
    }

    if (this.errors.length > 0) {
      console.error('Validation errors:', this.errors);
      return;
    }

    // Provjera za admina
    if (this.username === 'admin' && this.password === 'admin123') {
      alert('Login successful as Admin!');
      this.router.navigate(['/admin-dashboard']);
      return;
    }
    try {
      console.log(
        JSON.stringify({
          username: this.username,
          password: this.password
        })
      );
      const res = await fetch('http://localhost/movies-api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      const data = await res.json();

      if (data.errors?.length > 0) {
        this.errors.push(...data.errors);
        return;
      }

      this.user = data.user;
      alert('Login successful!');
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.errors.push(e.message);
      console.error('Login error:', e.message);
    }
  }
}
