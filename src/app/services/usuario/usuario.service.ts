import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly TOKEN_KEY = 'auth_token';
  private apiUrl = '/api/usuario';

  constructor(private http: HttpClient, private router: Router) {}

  loginUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
        }
      },
      catchError(error => {
        console.error('Falha na criação de um token:', error);
        return throwError(() => error);
      })
    ));
  }

  autenticarToken(): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Usuário não autenticado'));
    }

    return this.http.post(`${this.apiUrl}/autenticar`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(error => {
        console.error('Falha na autenticação do token:', error);
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  // Envia um email para resetar a senha
  resetarSenhaRequest(email: string): Observable<any> {
    // Isso envia um body com a string, e não só a string pura --> retornaria "undefined"
    return this.http.post(`${this.apiUrl}/new-senha/token`, {emailRecovery: email});
  }

  trocarSenha(token: string, newSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/new-senha`, {token, newSenha})
  }

  cadastrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, data);
  }
  
}
