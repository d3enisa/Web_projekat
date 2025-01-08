import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected username: string = '';
  protected firstName: string = '';
  protected lastName: string = '';
  protected email: string = '';
  protected password: string = '';
  protected confirmPassword: string = '';
  protected errors: string[] = [];
  protected data: any = null;

  public constructor(private router: Router) {
    const userID = sessionStorage.getItem('userID');

    if (userID) {
      this.router.navigate(['/home']);
      alert('You are already logged in!');
      return;
    }
  }

  public async register() {
    this.errors = [];

    if (!this.username || this.username.trim().length === 0) {
      this.errors.push("Username is required.");
    }

    if (!this.email || !this.validateEmail(this.email)) {
      this.errors.push("A valid email is required.");
    }

    if (!this.password || this.password.length < 6) {
      this.errors.push("Password must be at least 6 characters long.");
    }

    if (this.password !== this.confirmPassword) {
      this.errors.push("Passwords do not match.");
    }

    if (this.firstName.trim().length === 0 || this.lastName.trim().length === 0) {
      this.errors.push("First and last name are required.");
    }

    if (this.errors.length > 0) {
      console.error("Validation errors:", this.errors);
      return;
    }


    try {
      const res = await fetch('http://localhost/movies-api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.firstName,
          last_name: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
        }),
      });

      this.data = await res.json();

      if (this.data.errors?.length > 0) {
        this.errors.push(...this.data.errors);
        return;
      }

      await this.router.navigate(['/']);
      alert("Registration successful!");
    } catch (e: any) {
      this.errors.push(e.message);
      console.error("Registration error:", e.message);
    }
  }

  private validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
}
