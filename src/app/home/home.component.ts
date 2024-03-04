import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products?limit=20')
      .subscribe(products => {
        this.products = products;
        this.categories = Array.from(new Set(products.map(product => product.category)));
        this.filteredProducts = this.products; // Inicialmente, exibe todos os produtos
      });
  }

  filterByCategory(category: string): void {
    console.log("category " + category)
    console.log("categories " + this.categories)
    if (category === 'All') {
      this.filteredProducts = this.products; // Mostra todos os produtos
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }

}
