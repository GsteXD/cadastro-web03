import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = '/api/produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erro ao buscar produtos:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }
  getProdutoById(id: number): Observable<any> {
    if (!id || isNaN(id)) {
      console.error(`ID inválido: ${id}`);
      return of(null);
    }
    console.log(`Buscando produto com ID ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Erro ao buscar o produto com ID ${id}:`, error);
        return of(null); // Retorna null em caso de erro
      })
    );
  }
}