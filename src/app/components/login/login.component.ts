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
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/mainPage';
          const pendingCart = localStorage.getItem('pendingCart');

          if (pendingCart && returnUrl === '/checkout') {
            try {
              const items = JSON.parse(pendingCart);
              this.cartService.fetchCart().subscribe(() => {
                // Adiciona itens pendentes ao carrinho existente
                items.forEach((item: CartItem) => {
                  this.cartService.addItem(item, item.quantidade).subscribe();
                });
                localStorage.removeItem('pendingCart');
                this.router.navigate([returnUrl]);
              });
            } catch (err) {
              console.error('Erro ao restaurar carrinho:', err);
              this.router.navigate([returnUrl]);
            }
          } else {
            this.router.navigate([returnUrl]);
          }
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

  resetLoginError(): void {
    this.loginError = false;
  }
}
