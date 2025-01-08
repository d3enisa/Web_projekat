import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [FormsModule, NgIf, NgForOf],
})
export class AdminDashboardComponent implements OnInit {
  protected users: any[] = []; // Lista korisnika
  protected user = {
    id: null,
    ime: '',
    prezime: '',
    korisnicko_ime: '',
    email: '',
    sifra: '',
    is_admin: '0',
  }; // Trenutno uređivani korisnik
  protected errors: string[] = [];
  protected isEditMode: boolean = false; // Flag za uređivanje

  private apiUrl = 'http://localhost/movies-api/users.php';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUsers(); // Dohvati sve korisnike prilikom inicijalizacije
  }

  // Dohvati sve korisnike
  protected async getUsers(): Promise<void> {
    try {
      const res = await fetch(this.apiUrl);
      if (!res.ok) throw new Error('Greška pri dohvaćanju korisnika.');
      const data = await res.json();
      this.users = data.map((user: any) => ({
        id: user.ID,
        ime: user.ime,
        prezime: user.prezime,
        korisnicko_ime: user.korisnicko_ime,
        email: user.email,
        sifra: user.sifra,
        is_admin: user.is_admin,
      }));
    } catch (e: any) {
      this.errors.push(e.message || 'Greška pri dohvaćanju korisnika.');
      console.error(e.message);
    }
  }

  // Dodaj ili ažuriraj korisnika
  protected async onSubmit(): Promise<void> {
    this.errors = [];

    // Validacija
    if (!this.user.ime.trim()) this.errors.push('Ime je obavezno.');
    if (!this.user.prezime.trim()) this.errors.push('Prezime je obavezno.');
    if (!this.user.korisnicko_ime.trim())
      this.errors.push('Korisničko ime je obavezno.');
    if (!this.user.email.trim()) this.errors.push('Email je obavezan.');

    if (this.errors.length > 0) return;

    try {
      const method = this.isEditMode ? 'PUT' : 'POST';
      const res = await fetch(this.apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.user.id,
          ime: this.user.ime,
          prezime: this.user.prezime,
          korisnicko_ime: this.user.korisnicko_ime,
          email: this.user.email,
          sifra: this.user.sifra,
          is_admin: this.user.is_admin,
        }),
      });

      if (!res.ok) throw new Error('Greška pri spremanju korisnika.');
      const data = await res.json();

      console.log(data); //

      if (data.error) {
        this.errors.push(data.error);
        return;
      }

      this.getUsers(); // Azuriraj listu korisnika
      this.resetForm();
      alert(this.isEditMode ? 'Korisnik ažuriran.' : 'Korisnik dodan.');
    } catch (e: any) {
      this.errors.push(e.message || 'Greška pri spremanju korisnika.');
      console.error(e.message);
    }
  }

  // Postavi korisnika za uređivanje
  protected editUser(user: any): void {
    this.user = { ...user }; // Kopiraj podatke korisnika
    this.isEditMode = true;
  }

  // Obriši korisnika
  protected async deleteUser(id: number): Promise<void> {
    try {
      const res = await fetch(this.apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Greška pri brisanju korisnika.');
      const data = await res.json();

      if (data.error) {
        this.errors.push(data.error);
        return;
      }

      this.getUsers();
      alert('Korisnik obrisan.');
    } catch (e: any) {
      this.errors.push(e.message || 'Greška pri brisanju korisnika.');
      console.error(e.message);
    }
  }

  // Resetuj formu
  protected resetForm(): void {
    this.user = {
      id: null,
      ime: '',
      prezime: '',
      korisnicko_ime: '',
      email: '',
      sifra: '',
      is_admin: '0',
    };
    this.isEditMode = false;
    this.errors = [];
  }
}
