import { BehaviorSubject, catchError, map, Observable, of, take, tap, switchMap, throwError, finalize, ignoreElements, filter } from 'rxjs';
import { CartItem, Produto } from '../../models/produto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({ providedIn: 'root' })
//Funções para a aba de carrinho
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]); // Controla o estado do carrinho
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  //Observáveis públicos
  cartItems$ = this.cartItemsSubject.asObservable();
  isCartOpen$ = this.cartVisibleSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  total$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (Number(item.precoNumerico) * Number(item.quantidade)), 0))
  );

  private readonly API_URLS = {
    CART: '/api/cesto',
    ORDERS: '/api/pedidos'
  };

  constructor(
    private http: HttpClient, 
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.closeCart(); //Fecha o carrinho quando muda a página
    });
  }

  //Mostra o conteúdo do carrinho
  //Void pois apenas carrega, não retorna nenhum valor significativo
  fetchCart(): Observable<any> { 
    this.loadingSubject.next(true);
    return this.http.get<CartItem[]>(this.API_URLS.CART).pipe(
      tap(items => {
        if(!Array.isArray(items)) {
          throw new Error('A resposta da API não é um array!')
        }
        const processedItems = items.map(item => ({
          ...item,
          precoNumerico: parseFloat(item.preco.replace('R$', '').trim())
        }));
        this.cartItemsSubject.next(processedItems);
        catchError(error => {
          console.error('Erro ao carregar o carrinho:', error);
          return throwError(() => error);
        }),
        finalize(() => this.loadingSubject.next(false)),
        ignoreElements()
      })
    );
  }

  addItem(produto: Produto, quantidade: number): Observable<void> {
    const item: CartItem = { 
      ...produto, 
      quantidade,
      precoNumerico: parseFloat(produto.preco.replace('R$', '').trim())
    }; //Extende novas propriedades em "produto"
    this.loadingSubject.next(true);
    return this.http.post(`${this.API_URLS.CART}/${item.id}`, { quantidadeAdicionada: quantidade }).pipe(
      switchMap(() => this.fetchCart()),
      catchError(error => {
        console.error('Erro ao adicionar o item:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  updateQuantity(id: number, quantity: number): Observable<void> {
    if(isNaN(quantity) || quantity <= 0) {
      return throwError (() => new Error('Quantidade inválida'));
    }
    console.log("Banana");
    this.loadingSubject.next(true);
    return this.http.patch(`${this.API_URLS.CART}/${id}`, { novaQuantidade: quantity }).pipe(
      switchMap(() => this.fetchCart()),
      catchError(error => {
        console.error('Erro ao atualizar quantidade:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  removeItem(id: number): Observable<void> {
    this.loadingSubject.next(true);
    return this.http.delete(`${this.API_URLS.CART}/${id}`).pipe(
      switchMap(() => this.fetchCart()),
      catchError(error => {
        console.error('Erro ao remover item:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  finalizeOrder(): Observable<void> {
    //Verifica se o carrinho está vazio
    if (this.cartItemsSubject.value.length === 0) {
      return throwError(() => new Error('Carrinho Vazio!'));
    }

    //Verifica se o usuário está logado
    if(!this.usuarioService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/checkout' }
      });
      return of();
    }

    this.loadingSubject.next(true);
    return this.http.post(`${this.API_URLS.ORDERS}`, { 
      items: this.cartItemsSubject.value, 
      token: this.usuarioService.getToken() 
    }).pipe(
      switchMap(() => this.fetchCart()),
      tap(() => {
        this.router.navigate(['/checkout']); //redireciona para o checkout
      }),
      catchError(error => {
        console.error('Erro ao finalizar o pedido:', error);
        return throwError(() => error);
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  //UI
  toggleCart(): void {
    this.cartVisibleSubject.next(!this.cartVisibleSubject.value);
  }
  openCart(): void {
    this.cartVisibleSubject.next(true); 
  }
  closeCart(): void {
    this.cartVisibleSubject.next(false);
  }
}
