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

  resetarSenha(email: string): Observable<any> {
    // Isso envia um body com a string, e não só a string pura --> retornaria "undefined"
    return this.http.post(`${this.apiUrl}/new-senha`, {emailRecovery: email});
  }

  cadastrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, data);
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
