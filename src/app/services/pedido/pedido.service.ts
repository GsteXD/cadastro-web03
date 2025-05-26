import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({ providedIn: "root"})
export class PedidoService {
    private apiUrl = '/api/pedido';

    constructor(private http: HttpClient) {}

    criarPedido(pedido: any): Observable<any> {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            console.error('Token faltando');
            return throwError(() => new Error('Token faltando'))
        }

        return this.http.post(`${this.apiUrl}/cadastrar`, pedido, {headers: {Authorization: `Bearer ${token}`}}).pipe(
            tap(() => {
                console.log('Pedido registrado com sucesso!');
            }),
            catchError((error) => {
                console.error('Erro na criação do pedido');
                return throwError(() => error);
            })
        );
    }
}