import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EnderecoComponent } from './endereco/endereco.component';
import { Endereco, MetodoEnvio } from '../../models/entrega.model';
import { CartService } from '../../services/cart/cart.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  enderecos: Endereco[] = [];
  subtotal$: Observable<number>;
  total$: Observable<number>;
  // overlay: Overlay; // Removed duplicate declaration

  exibirCadastroEndereco = false;

  metodosEnvio: MetodoEnvio[] = [
    { tipo: 'PAC', prazo: 7, valor: 15.00 },
    { tipo: 'Sedex', prazo: 3, valor: 30.00 }
  ];

  metodoSelecionado$ = new BehaviorSubject<MetodoEnvio>(this.metodosEnvio[0]);
  descontoPix = 0.1; // 10%
  enderecoSelecionado: Endereco | null = null;

  constructor(
    private cartService: CartService,
    private modal: MatDialog,
    private overlay: Overlay
  ) {
    this.subtotal$ = this.cartService.total$;
    this.total$ = combineLatest([
      this.subtotal$,
      this.metodoSelecionado$
    ]).pipe(
      map(([subtotal, metodo]) => subtotal + (metodo?.valor || 0))
    );
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
        this.enderecos.push(resultado);
        this.enderecoSelecionado = resultado;
      }
    })
  }

  voltar() {
    alert('Voltando...');
  }

  irParaPagamento() {
    if (!this.enderecoSelecionado) {
      alert('Selecione um endereço de entrega.');
      return;
    }
    alert('Indo para pagamento...');
  }
}