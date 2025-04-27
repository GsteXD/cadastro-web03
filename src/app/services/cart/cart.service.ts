import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, take, tap } from 'rxjs';

@Injectable({ providedIn: 'any' })
//Funções para a aba de carrinho
export class CartService {
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  private cartItems: any[] = [];

  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Controla o estado do carrinho

  private apiUrl = '/api/cesto';

  constructor(private http: HttpClient) {}

  //Funções HTTP=============================================

  //Recupera os itens do carrinho
  getItems(): Observable<any[]> {
    console.log("Batata")
    return this.http.get<any[]>(this.apiUrl).pipe(
      take(1), // Garante que a chamada seja resolvida apenas uma vez
      catchError((error) => {
        console.error('Erro ao recuperar os itens do carrinho:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }

  //Verifica o estado do carrinho (quantidade de itens)
  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  AddCart(item: any): Observable<any> {
    return this.http.post<any>('api/cesto', item);
  }

    //Atualiza o carrinho
  loadCart(): Observable<any[]> {
    console.log("Erro");
    return this.getItems().pipe(
      tap((data) => {
        this.cartItems = data;
        this.cartItemsSubject.next(this.cartItems); // Atualiza o estado inicial
      }),
      catchError((error) => {
        console.error('Erro ao carregar o carrinho:', error);
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
      tap(() => console.log('Item adicionado ao carrinho:', item)),
      catchError((error) => {
        console.error('Erro ao adicionar item ao carrinho:', error);
        throw error; // Propaga o erro para o componente
      })
    );
  }

  //Remove todo o produto a partir de seu id
  removeItem(id: number): Observable<any> {
    console.log("Chocolate")
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const updatedItems = this.cartItems.filter(item => item.id !== id);
        if (JSON.stringify(this.cartItems) !== JSON.stringify(updatedItems)) {
          this.cartItems = updatedItems;
          this.cartItemsSubject.next(this.cartItems); // Atualiza o estado apenas se houver mudanças
        }
        console.log(`Item com ID ${id} removido do carrinho`);
      }),
      catchError((error) => {
        console.error(`Erro ao remover item com ID ${id}:`, error);
        throw error;
      })
    );
  }

  //Remove apenas um item do produto, diminuindo a contagem em 1
  removeOneItem(produto: any): Observable<any> {
    console.log("Lmao")
    let item = this.cartItems.find(p => p.id === produto.id);
    if (item) {
      item.quantidade -= 1;
      if (item.quantidade === 0) {
        return this.removeItem(produto.id); // Remove o item se a quantidade for 0
      } else {
        return this.AddCart(item).pipe(
          tap(() => {
            console.log('Quantidade do item atualizada:', item);
            this.cartItemsSubject.next(this.cartItems); // Atualiza o estado do carrinho
          }),
          catchError((error) => {
            console.error('Erro ao atualizar a quantidade do item:', error);
            throw error; // Propaga o erro para o componente
          })
        );
      }
    }
    return new Observable(); // Retorna um Observable vazio se o item não for encontrado
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
        items.reduce(
          (total, item) =>
            total + item.quantidade * parseFloat(item.preco.replace('R$', '').replace(',', '.')),
          0
        )
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
    const currentVisibility = this.cartVisibleSubject.value;
    this.cartVisibleSubject.next(!currentVisibility);
    console.log(!currentVisibility);
  }
}
