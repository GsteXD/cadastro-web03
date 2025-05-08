import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { cpfValidator } from './validadores/cpfValidador';
import { rgValidator } from './validadores/rgValidador';
import { senhaValidator, senhaMatchValidator } from './validadores/senhaValidador';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;

  mascaraDocumento: string = '';
  mascaraTelefone: string = '00000-0000';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private usuarioService: UsuarioService
  ) {

    this.cadastroForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      ddd: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{9,11}$/)]],
      documento_id: ['', Validators.required],
      documento: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6), senhaValidator]],
      senhaConfirm: ['', Validators.required],
      notifyCheck: [false]
    }, { validators: [senhaMatchValidator] } as AbstractControlOptions); 
  }

  private checkInvalidInputs(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.checkInvalidInputs(control);
      } else {
        control.markAsTouched(); // Marca o controle como tocado para exibir mensagens de erro
      }
    });
  }

  onSubmit(): void { //TODO: Implementar o envio dos dados para o backend
    if (this.cadastroForm.valid) {
      console.log('Dados enviados:', this.cadastroForm.value);
      this.usuarioService.cadastrarUsuario(this.cadastroForm.value).subscribe({
        next: () => this.router.navigate(['/mainPage']), // Navega para a página inicial
        error: (err) => {
          console.error('Erro no cadastro:', err);
        }
      });
    } else {
      this.checkInvalidInputs(this.cadastroForm); // Marca todos os campos como tocados para exibir mensagens de erro
    }
  }

  ngOnInit(): void{
    this.cadastroForm.get('documento')?.valueChanges.subscribe(value => {
      const documentoControl = this.cadastroForm.get('documento_id');
      
      if (!documentoControl) return;

      switch (value) {
        case 'CPF':
          documentoControl.setValidators([Validators.required, cpfValidator]);
          this.mascaraDocumento = '000.000.000-00'; // Máscara para CPF
          break;
        case 'CNH':
          documentoControl.setValidators([Validators.required, Validators.pattern(/^\d{11}$/)]);
          this.mascaraDocumento = '00000000000'; // Máscara para CNH
          break;
        case 'RG':
          documentoControl.setValidators([Validators.required, rgValidator]);
          this.mascaraDocumento = '00.000.000-0'; // Máscara para RG
          break;
        default:
          documentoControl.clearValidators();
          this.mascaraDocumento = ''; // Limpa a máscara se nenhum documento for selecionado
          break;
      }
      documentoControl.updateValueAndValidity(); // Atualiza a validação do campo documento
    });
  }
}