import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CalendarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  shows: any[] = [];
  currentPage: number = 1;
  showsPerPage: number = 12;
  errorMessage: string = '';
  paginatedShows: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadShows(this.currentPage);
  }

  loadShows(page: number): void {
    this.http.get<any[]>(`https://api.tvmaze.com/shows?page=${page}`)
      .subscribe(
        (data) => {
          this.shows = data;
          this.updatePaginatedShows();
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Failed to load shows. Please try again later.';
          console.error('Error:', error);
        }
      );
  }

  updatePaginatedShows(): void {
    const startIndex = (this.currentPage - 1) * this.showsPerPage;
    this.paginatedShows = this.shows.slice(startIndex, startIndex + this.showsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadShows(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage * this.showsPerPage < this.shows.length) {
      this.currentPage++;
      this.loadShows(this.currentPage);
    }
  }
}
