import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { CartService } from './services/cart/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Indica que este é um componente standalone
  imports: [RouterOutlet, RouterLink, CartComponent, CommonModule], // Certifique-se de incluir o FormsModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchTerm: string = ''; // Termo de busca

  constructor(
    public cartService: CartService,
    private router: Router // Rota para barra de navegação
  ) {}

  // Captura o valor do campo de texto
  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }

  search(): void {
    if (this.searchTerm.trim()) {
      // Redireciona para a página de busca com o termo como parâmetro
      this.router.navigate(['/busca'], { queryParams: { q: this.searchTerm } });
    }
  }
}