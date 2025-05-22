import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EnderecoComponent } from './endereco/endereco.component';
import { Endereco, MetodoEnvio } from '../../models/entrega.model';
import { CartService } from '../../services/cart/cart.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { EnderecoService } from '../../services/endereco/endereco.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal$: Observable<number>;
  total$: Observable<number>;

  enderecos: Endereco[] = [];
  enderecoSelecionado?: Endereco | null = null;

  exibirCadastroEndereco = false;

  metodosEnvio: MetodoEnvio[] = [
    { tipo: 'PAC', prazo: 7, valor: 15.00 },
    { tipo: 'Sedex', prazo: 3, valor: 30.00 }
  ];

  metodoSelecionado$ = new BehaviorSubject<MetodoEnvio>(this.metodosEnvio[0]);
  descontoPix = 0.1; // 10%

  constructor(
    private cartService: CartService,
    private modal: MatDialog,
    private overlay: Overlay,
    private router: Router,
    private enderecoService: EnderecoService
  ) {
    this.subtotal$ = this.cartService.total$;
    this.total$ = combineLatest([
      this.subtotal$,
      this.metodoSelecionado$
    ]).pipe(
      map(([subtotal, metodo]) => subtotal + (metodo?.valor || 0))
    );
  }

  carregarEnderecos() {
    this.enderecoService.getEnderecos().subscribe({
      next: (enderecos) => {
        console.log('Endereços recebidos:', Array.isArray(enderecos), enderecos);
        this.enderecos = enderecos;
        if (this.enderecos.length > 0) {
          this.enderecoSelecionado = this.enderecos[0];
        }
      },
      error: (err) => {
        console.error('Erro ao carregar os endereços:', err);
      }
    })
  }

  ngOnInit(): void {
    this.carregarEnderecos();
  }

  onMetodoEnvioChange(metodo: MetodoEnvio) {
    this.metodoSelecionado$.next(metodo);
  }

  selecionarEndereco(endereco: Endereco) {
    this.enderecoSelecionado = endereco;
  }

  adicionarEndereco() {
    const modalRef = this.modal.open(EnderecoComponent, {
      panelClass: 'modal-endereco'
    });

    modalRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.carregarEnderecos();
      }
    })
  }

  voltar() {
    this.router.navigate(['/mainPage']);
  }

  irParaPagamento() {
    if (!this.enderecoSelecionado) {
      alert('Selecione um endereço de entrega.');
      return;
    }
    alert('Indo para pagamento...');
  }
}