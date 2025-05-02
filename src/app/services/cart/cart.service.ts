import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
//Funções para a aba de carrinho
export class CartService {
  private cartItems: any[] = [];

  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Controla o estado do carrinho
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);

  isCartOpen$: Observable<boolean> = this.cartVisibleSubject.asObservable();

  private apiUrl = '/api/cesto';

  constructor(private http: HttpClient) {}

  //Loaders=========================================
  loadCart(): Observable<any[]> {
    console.log("Cenoura");
    return this.getItems().pipe(
      tap((data) => {
        console.log('Itens carregados do backend:', data);
        this.cartItems = data;
        this.cartItemsSubject.next(this.cartItems); // Atualiza o estado inicial
      }),
      catchError((error) => {
        console.error('(cartService) Erro ao carregar o carrinho:', error);
        throw error;
      })
    );
  }

  updateItemQuantity(id: number, novaQuantidade: number): Observable<any> {
    return this.http.patch(`/api/cesto/${id}`, { novaQuantidade }).pipe(
      tap(() => {
        console.log('(cartService) quantidade atualizada');
        this.loadCart().subscribe();
      }),
      catchError((error) => {
        console.error('(cartService) Erro ao atualizar quantidade', error);
        throw error;
      })
    );
  }

  //================================================

  //Recupera os itens do carrinho
  getItems(): Observable<any[]> {
    console.log("Batata")
    return this.http.get<any[]>(this.apiUrl).pipe(
      take(1), //chama apenas uma vez
      catchError((error) => {
        console.error('(cartService) Erro ao recuperar os itens do carrinho:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  //Verifica o estado do carrinho (quantidade de itens)
  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  AddCart(item: any): Observable<any> {
    const { id, quantidade } = item;
    if (!id || !quantidade || quantidade <= 0) {
      console.error('(cartService) Produto ou quantidade inválida');
      return of(null); //"of" é utilizado por ser um Observer
    }

    return this.http.post<any>(`/api/cesto/${id}`, {quantidadeAdicionada:quantidade}).pipe(
      tap(() => console.log(`ID: ${id}; Quantidade: ${quantidade}`)),
      catchError((error) => {
        console.error('(cartService) Erro ao adicionar no carrinho:', error);
        throw error;
      })
    );
  }

  //Adiciona o item no carrinho e incrementa o contador em 1
  addItem(produto: any): Observable<any> {
    console.log("Diamante");
    const item = { ...produto, quantidade: 1 }; // Adiciona a quantidade inicial
    console.log(item);
    return this.AddCart(item).pipe(
      tap(() => {
        console.log('(cartService) Item adicionado ao carrinho:', item);
        this.loadCart().subscribe(); // Atualiza o carrinho
      }),
      catchError((error) => {
        console.error('(cartService) Erro ao adicionar item ao carrinho:', error);
        throw error; // Propaga o erro para o componente
      })
    );
  }

  addOneItem(produto: any): Observable<any> {
    const item = this.cartItems.find(p => p.id === produto.id);
    console.log('Item encontrado: ', item);
    if (item) {
      console.log('Nova quantidade:', item.quantidade + 1);
      return this.updateItemQuantity(item.id, item.quantidade + 1);
    }
    return new Observable();
  }  

  //Remove todo o produto a partir de seu id
  removeItem(id: number): Observable<any> {
    console.log("Chocolate")
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log(`(cartService) Item com ID ${id} removido do carrinho`);
        this.loadCart().subscribe();
      }),
      catchError((error) => {
        console.error(`(cartService) Erro ao remover item com ID ${id}:`, error);
        throw error;
      })
    );
  }

  //Remove apenas um item do produto, diminuindo a contagem em 1
  removeOneItem(produto: any): Observable<any> {
    const item = this.cartItems.find(p => p.id === produto.id);
    if (item) {
      return this.updateItemQuantity(item.id, item.quantidade - 1);
    }
    return new Observable();
  }

  finalizarPedido(): Observable<any> {
    console.log("Salmão");
    if (this.cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return new Observable(); // Retorna um Observable vazio
    }
  
    return this.http.post('/api/pedidos', { itens: this.cartItems }).pipe(
      tap(() => {
        console.log('Pedido finalizado:', this.cartItems);
        this.cartItems = []; // Limpa o carrinho localmente
        this.cartItemsSubject.next(this.cartItems); // Atualiza o estado do carrinho
        alert('Pedido finalizado com sucesso!');
        this.cartVisibleSubject.next(false) // Esconde o carrinho
      }),
      catchError((error) => {
        console.error('Erro ao finalizar o pedido:', error);
        alert('Erro ao finalizar o pedido. Tente novamente.');
        throw error; // Propaga o erro para o componente
      })
    );
  }

  //Pega o Total do carrinho
  getTotal(): Observable<number> {
    console.log("Banana");
    return this.cartItemsSubject.asObservable().pipe(
      map((items) =>
        items.reduce((total, item) => {
          if (!item.preco) return total; // evita erro se preco estiver ausente
          const preco =
            typeof item.preco === 'string'
              ? parseFloat(item.preco.replace('R$', '').replace(',', '.'))
              : item.preco; // já é número
          return total + item.quantidade * preco;
        }, 0)
      )
    );
  }
  

  //Pega o total baseado na quantidade de um mesmo produto
  getTotalItems(): Observable<number> {
    console.log("Pepino");
    return this.cartItemsSubject.asObservable().pipe(
      map((items) =>
        items.reduce((total, item) => total + item.quantidade, 0)
      )
    );
  }

  openCart() {
    console.log("Balala");
    this.cartVisibleSubject.next(true);
  }

  getCartVisibility(): Observable<boolean> {
    return this.cartVisibleSubject.asObservable();
  }
  
  toggleCart(): void {
    console.log("Pepe");
    this.cartVisibleSubject.next(!this.cartVisibleSubject.value);
    console.log(!this.cartVisibleSubject);
  }
}
