import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    { id: 1, title: 'Cinema Popcorn', description: ' Classic, warm popcorn, perfectly salted and crispy. Ideal for snacking while enjoying a movie, with a rich flavor that melts in your mouth. Available in large portion sizes, perfect for sharing!', price: 20, image: 'https://img.freepik.com/premium-photo/popcorn-white-background_693425-8920.jpg' },
    { id: 2, title: 'French Fries', description: ' Crispy, golden-brown fries, lightly salted, and served with your choice of dipping sauces. A crunchy and savory option to accompany your movie night.', price: 30, image: 'https://5.imimg.com/data5/SELLER/Default/2023/1/LT/NE/DN/35551975/premium-french-fries-photos-7-png-500x500.png' },
    { id: 3, title: 'Pizza Slices', description: 'Savory, cheesy pizza slices with a variety of toppings, from pepperoni to vegetarian options. A comforting and filling snack for movie lovers who want something more substantial.', price: 23, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0i9AGhBa1PxqzbN6zrMCnAD9fxVufFykhCmbC7PcaeEGjZtJqIwV1zImjgGC40re0y0&usqp=CAU' },
    { id: 4, title: 'Ice Cream Cups', description: 'Creamy, smooth ice cream served in convenient cups, available in a variety of flavors. Ideal for a cold treat that’s easy to eat while enjoying the show', price: 20, image: 'https://media.istockphoto.com/id/1090251878/photo/ice-cream-balls-in-paper-cup.jpg?s=612x612&w=0&k=20&c=QlII4k-Q2phcY190xGomdSsGwv-ab4jStWIhl_d5ndI=' },
    { id: 5, title: 'Nachos with Cheese', description: 'Crispy nachos smothered in rich, warm cheese, with a side of salsa or guacamole for dipping. A perfect, flavorful bite for those who enjoy a bit of spice and a fuller taste.', price: 20, image: 'https://i3.wp.com/www.seriouseats.com/thmb/tntNdOAMuxyGZHrYR3YZeO0k7Lo=/1500x1125/filters:fill(auto,1)/cheese-sauce-for-cheese-fries-and-nachos-hero-01-e6ccf966688c43ec8025cf9a19678423.jpg' },
    { id: 6, title: 'Candy Selection', description: 'A variety of classic movie theater candies, from fruity gummies to chocolate bars and sour treats. A sweet indulgence to satisfy any candy lover during the film.', price: 25, image: 'https://m.media-amazon.com/images/I/71MT9yvMhvL._AC_UF894,1000_QL80_.jpg' },
  ];

  cart: any[] = [];
  isCartVisible: boolean = false;

  addToCart(product: any): void {
    const productIndex = this.cart.findIndex(item => item.id === product.id);
    if (productIndex !== -1) {
      this.cart[productIndex].quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number): void {
    const productIndex = this.cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
      if (this.cart[productIndex].quantity > 1) {
        this.cart[productIndex].quantity--;
      } else {
        this.cart.splice(productIndex, 1);
      }
    }
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }
}
