import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private router: Router
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
        next: () => this.router.navigate(['/mainPage']), // Navega para a página inicial
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
