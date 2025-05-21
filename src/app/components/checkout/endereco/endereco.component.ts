import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { EnderecoService } from '../../../services/endereco/endereco.service';

@Component({
  selector: 'app-endereco',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent {
  enderecoForm: FormGroup;

  mascaraCEP = '00000-000';

  constructor(
    private fb: FormBuilder,
    private modal: MatDialogRef<EnderecoComponent>,
    private enderecoService: EnderecoService

  ) {
    this.enderecoForm = this.fb.group({
      tipo: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  pesquisacep() {
    const cep = this.enderecoForm.get('cep')?.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
          if (!data.erro) {
            this.enderecoForm.patchValue({
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
          } else {
            alert('CEP não encontrado.');
          }
        })
        .catch(() => alert('Erro ao buscar o CEP.'));
    }
  }

  cadastrar() {
    if(this.enderecoForm.valid) {
      this.enderecoService.criarEndereco(this.enderecoForm.value).subscribe({
          next: () => { this.modal.close(this.enderecoForm.value); },
          error: (err) => {
            console.error('Erro ao cadastrar endereço:', err);
          }
      });

    }
  }

  cancelar() {
    this.modal.close(null);
  }

}
