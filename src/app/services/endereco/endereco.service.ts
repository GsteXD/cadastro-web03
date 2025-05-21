import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

@Injectable({ providedIn: "root" }) 
export class EnderecoService {
    private apiurl = '/api/endereco';

    constructor(private http: HttpClient, private router: Router) {}

    criarEndereco(endereco: any) {
        const token = localStorage.getItem('auth_token');
        if(!token) {
            this.router.navigate(['/login'])
            return throwError(() => new Error('(EnderecoService)Usuário não autenticado'));
        }

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        })

        return this.http.post(`${this.apiurl}/cadastrar`, endereco, {headers});
    }

    getEnderecoById(id: number) {
        return this.http.get(`${this.apiurl}/${id}`);
    }
}