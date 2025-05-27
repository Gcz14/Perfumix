import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduto(produto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, produto);
  }

  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduto(produto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${produto.id}`, produto);
  }
}
