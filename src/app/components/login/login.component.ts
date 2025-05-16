import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/produto.model';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      senhaLogin: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    //Lê todos os campos
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      console.log('Logando usuário:', this.loginForm.value);
      this.usuarioService.loginUsuario(this.loginForm.value).subscribe({
        next: () => { // Redirecionamento de rotas caso o usuário queira finalizar o carrinho sem um login

          // Procura por um url de retorno, se não achar, usa o /mainPage
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/mainPage';
          // Procura por um carrinho pendente dentro do local storage
          const pendingCart = localStorage.getItem('pendingCart');

          // Se houver um carrinho pendente e a url de retorno for /checkout for verdadeiro
          if (pendingCart && returnUrl === '/checkout') {
            try {
              // Formata o conteúdo dentro de pendingCart em um json 
              const items = JSON.parse(pendingCart);
              // Chama o fetchCart para atualizar os itens do carrinho
              this.cartService.fetchCart().subscribe(() => {
                // Adiciona itens pendentes ao carrinho existente
                items.forEach((item: CartItem) => {
                  this.cartService.addItem(item, item.quantidade).subscribe();
                });
                // Remove o conteúdo do local storage
                localStorage.removeItem('pendingCart');
                // Retorna para a url definida (/checkout)
                this.router.navigate([returnUrl]);
              });
            } catch (err) {
              console.error('Erro ao restaurar carrinho:', err);
              this.router.navigate([returnUrl]);
            }
          }

          this.router.navigate([returnUrl]);
          
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.loginError = true;

          const currentEmail = this.loginForm.get('emailLogin')?.value;
          this.loginForm.reset({
            emailLogin: currentEmail // Preserva o email digitado
          });
      
          this.loginForm.get('emailLogin')?.setErrors(null);
          this.loginForm.get('senhaLogin')?.setErrors(null);
        }
      });
    }
  }

  resetSenha(): void {
    
    if (!this.loginForm.get('emailLogin')?.value) {
      alert('Insira um email');
      return;
    }
    
    this.usuarioService.resetarSenha(this.loginForm.get('emailLogin')?.value).subscribe({
      next: () => alert('Email de verificação enviado.'),
      error: (err) => alert('Erro ao solicitar a redefinição de senha.')
    });
  }

  resetLoginError(): void {
    this.loginError = false;
  }
}
