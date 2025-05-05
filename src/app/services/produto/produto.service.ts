import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = '/api/produtos';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private currentProductSubject = new BehaviorSubject<any> (null);

  //Observáveis públicos
  loading$ = this.loadingSubject.asObservable();
  currentProduct$ = this.currentProductSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any[]> {
    this.loadingSubject.next(true);
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar produtos:', error);
        return of([]); // Retorna um array vazio em caso de erro
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  getProdutoById(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error(`ID inválido: ${id}`);
      return of(null);
    }
    this.loadingSubject.next(true);
    console.log(`(ProdutoService)Buscando produto com ID ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(produto => {
        //Atualiza o carrinho
        this.currentProductSubject.next(produto);
      }),
      catchError((error) => {
        console.error(`Erro ao buscar o produto com ID ${id}:`, error);
        return of(null); // Retorna null em caso de erro
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}