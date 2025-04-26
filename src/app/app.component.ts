import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CartService } from './services/cart/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    CartComponent, 
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  searchTerm: string = ''; // Termo de busca
  totalItems$: Observable<number> = of(0);

  constructor(
    public cartService: CartService,
    private router: Router, // Rota para barra de navegação
    private titleService: Title, // Título da página
    private activatedRoute: ActivatedRoute
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
  
  ngOnInit(): void {
    this.totalItems$ = this.cartService.getTotalItems();
  }
}