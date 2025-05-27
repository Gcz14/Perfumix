import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CurrencyPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyMaskDirective } from '../../shared/directives/currency/mask.directive';
import { ProductService, Product } from '../../services/product/product.service';

@Component({
  selector: 'app-tela-crud-adm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    RouterModule,
    CurrencyMaskDirective
  ],
  templateUrl: './tela-crud-adm.component.html',
  styleUrl: './tela-crud-adm.component.css'
})
export class TelaCrudAdmComponent implements OnInit {
  listaProdutos: Product[] = [];
  produtoNovo: Product = { nome: '', descricao: '', preco: 0, imagem: '' };
  modoEdicao: boolean = false;
  produtoParaEditar: Product | null = null;

  constructor(private servicoProdutos: ProductService) {}

  ngOnInit() {
    this.pegarProdutos();
  }

  pegarProdutos() {
    this.servicoProdutos.getProdutos().subscribe(dados => {
      this.listaProdutos = dados;
    });
  }

  salvarOuEditarProduto() {
    if (this.modoEdicao && this.produtoParaEditar?.id) {
      this.servicoProdutos.updateProduto(this.produtoParaEditar).subscribe(() => {
        this.pegarProdutos();
        this.cancelar();
      });
    } else {
      const novo: Product = {
        nome: this.produtoNovo.nome,
        descricao: this.produtoNovo.descricao,
        preco: this.produtoNovo.preco,
        imagem: this.produtoNovo.imagem
      };

      this.servicoProdutos.addProduto(novo).subscribe(() => {
        this.limparCampos();
        this.pegarProdutos();
      });
    }
  }

  apertouEditar(produto: Product) {
    this.modoEdicao = true;
    this.produtoParaEditar = { ...produto };
  }

  apagarProduto(id: number) {
    this.servicoProdutos.deleteProduto(id).subscribe(() => {
      this.pegarProdutos();
    });
  }

  limparCampos() {
    this.produtoNovo = { nome: '', descricao: '', preco: 0, imagem: '' };
  }

  cancelar() {
    this.modoEdicao = false;
    this.produtoParaEditar = null;
  }

  selecionarImagem(evento: any) {
    const arquivo = evento.target.files[0];
    if (arquivo) {
      const leitor = new FileReader();
      leitor.onload = () => {
        this.produtoNovo.imagem = leitor.result as string;
      };
      leitor.readAsDataURL(arquivo);
    }
  }

  selecionarImagemEditando(evento: any) {
    const arquivo = evento.target.files[0];
    if (arquivo) {
      const leitor = new FileReader();
      leitor.onload = () => {
        if (this.produtoParaEditar) {
          this.produtoParaEditar.imagem = leitor.result as string;
        }
      };
      leitor.readAsDataURL(arquivo);
    }
  }
}