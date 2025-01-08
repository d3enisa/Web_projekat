import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-kartica',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './kartica.component.html',
  styleUrls: ['./kartica.component.css']
})
export class KarticaComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost/movies-api/index.php')
      .subscribe((data) => {
        this.products = data;
      });
  }
}
