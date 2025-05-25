import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { EnderecoComponent } from './endereco/endereco.component';
import { Endereco, MetodoEnvio, MetodoPagamento } from '../../models/entrega.model';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { EnderecoService } from '../../services/endereco/endereco.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subtotal$!: Observable<number>;
  total$!: Observable<number>;
  totalDesconto$!: Observable<number>;
  totalParcelado$!: Observable<number>;
  totalFinal$!: Observable<number>;

  items: any[] = [];
  enderecos: Endereco[] = [];
  enderecoSelecionado?: Endereco | null = null;

  exibirCadastroEndereco = false;
  etapaAtual: 'endereco' | 'pagamento' = 'endereco';

  metodosEnvio: MetodoEnvio[] = [
    { tipo: 'PAC', prazo: 7, valor: 15.00 },
    { tipo: 'Sedex', prazo: 3, valor: 30.00 }
  ];

  metodoPagamento: MetodoPagamento[] = [
    { tipo: 'Cartão de Crédito', bandeira: 'Visa', parcelas: 12 },
    { tipo: 'Cartão de Débito' },
    { tipo: 'Boleto' },
    { tipo: 'Pix' }
  ]

  metodoEnvioSelecionado$ = new BehaviorSubject<MetodoEnvio>(this.metodosEnvio[0]); // Seleciona a primeira opção por padrão
  metodoPagamentoSelecionado$ = new BehaviorSubject<MetodoPagamento | null>(null);
  descontoPix = 0.1; // 10%

  currTipoPagamento: Observable<String | any> = this.metodoPagamentoSelecionado$.pipe(
    map(metodo => metodo?.tipo)
  );

  constructor(private modal: MatDialog, private enderecoService: EnderecoService) {}

  ngOnInit(): void {
    this.carregarDados();
    this.carregarEnderecos();
  }

  onMetodoEnvioChange(metodo: MetodoEnvio) {
    // Atualiza o método de envio a partir das propriedades do método selecionado
    this.metodoEnvioSelecionado$.next(metodo);
  }

  onMetodoPagamentoChange(metodo: MetodoPagamento) {
    this.metodoPagamentoSelecionado$.next(metodo);
  }

  selecionarEndereco(endereco: Endereco) {
    this.enderecoSelecionado = endereco;
  }

  carregarDados(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('checkout_preview')) {
      const preview = localStorage.getItem('checkout_preview');
      const data = JSON.parse(preview!);
      const total = data.total || 0;
      this.items = data.items || [];

      this.subtotal$ = of(total);
      this.total$ = combineLatest([this.subtotal$, this.metodoEnvioSelecionado$])
        .pipe(
          map(([subtotal, metodoEnvio]) => subtotal + (metodoEnvio?.valor || 0))
        );
      this.totalDesconto$ = this.total$.pipe(
        map(total => total - (total * this.descontoPix))
      );
      this.totalParcelado$ = combineLatest([this.total$, this.metodoPagamentoSelecionado$])
        .pipe(
          map(([total, metodoPagamento]) => total / (metodoPagamento?.parcelas || 1))
        );
      this.totalFinal$ = combineLatest([
        this.total$,
        this.totalDesconto$,
        this.totalParcelado$,
        this.metodoPagamentoSelecionado$
      ]).pipe(
        map(([total, desconto, parcelado, metodoPgto]) => {
          switch (metodoPgto?.tipo) {
            case 'Pix': return desconto;
            case 'Boleto': return desconto;
            case 'Cartão de Crédito': return parcelado;
            case 'Cartão de Débito': return total;
            default: return total;
          }
        })
      )
    } else {
      this.subtotal$ = of(0);
      this.total$ = of(0);
      this.totalDesconto$ = of(0);
      this.totalParcelado$ = of(0);
      this.totalFinal$ = of(0);
      this.items = [];
      console.warn('Nenhum preview de checkout encontrado no localStorage.');
    }
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

  finalizarCompra() {
    if (!this.metodoPagamentoSelecionado$.value) {
      alert('Informe um método de pagamento.');
      return;
    }
    alert('Compra finalizada com sucesso!');
  }

  irParaPagamento() {
    if (!this.enderecoSelecionado) {
      alert('Selecione um endereço de entrega.');
      return;
    }
    this.etapaAtual = 'pagamento';
  }

  irParaEndereco() {
    this.etapaAtual = 'endereco';
  }
  
}

