import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CadastroService {
  private apiUrl = '/api/usuario';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, data);
  } 
}
