import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CartService } from '../../app/services/cart/cart.service';
import { CartComponent } from '../../app/components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter, map, Observable, of } from 'rxjs';

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
  totalItems$: Observable<any> = of(0); // Valor inteiro para o badge

  constructor(
    public cartService: CartService,
    private router: Router, // Rota para barra de navegação
    private titleService: Title, // Título da página
    private activatedRoute: ActivatedRoute
  ) {}

  private updateTitle(): void {
    let route = this.activatedRoute;
    // Atualiza a rota ativa apartir do primeiro nódulo filho
    while (route.firstChild) {
      route = route.firstChild;
    }
    // Após atualizar a rota, pega o data de routes.ts ou QMask, caso não ache nada
    const title = route.snapshot.data['title'] || 'QMask!';
    // Coloca o título para a página
    this.titleService.setTitle(title);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    })

    this.totalItems$ = this.cartService.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantidade, 0))
    );
  }

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