import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = '/api/usuario';

  constructor(private http: HttpClient) {}

  loginUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  cadastrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, data);
  } 
}
