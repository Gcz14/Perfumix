import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService,Product } from '../../services/product/product.service';

@Component({
  selector: 'app-tela-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tela-principal.component.html',
  styleUrl: './tela-principal.component.css'
})
export class TelaPrincipalComponent implements OnInit, AfterViewInit {
  cont = 1;
  produtos: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.proximaImg();
    }, 5000);

    this.productService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const el = document.getElementById(fragment);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  proximaImg(): void {
    this.cont++;
    if (this.cont > 3) {
      this.cont = 1;
    }
    const radio = document.getElementById('radio' + this.cont) as HTMLInputElement;
    if (radio) {
      radio.checked = true;
    }
  }
}
