import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-new-senha',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-senha.component.html',
  styleUrl: './new-senha.component.css'
})
export class NewSenhaComponent implements OnInit{
  newSenhaForm: FormGroup;
  senhaError: boolean = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newSenhaForm = this.fb.group({
      newSenha: ['', [Validators.required]],
      senhaConfirm: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    console.log(this.token);
  }

  onSubmit(): void {
    this.newSenhaForm.markAllAsTouched();
    this.senhaError = false;

    const newSenha = this.newSenhaForm.value.newSenha;
    const senhaConfirm = this.newSenhaForm.value.senhaConfirm;

    if(newSenha !== senhaConfirm) {
      this.senhaError = true;
      return;
    }

    this.usuarioService.trocarSenha(this.token, newSenha).subscribe({
      next: () => {
        alert('Senha trocada com sucesso!');
        this.router.navigate(['/mainPage']);
      },
      error: (err) => {
        console.log('Erro ao trocar a senha:', err)
      }
    })
  }
}
