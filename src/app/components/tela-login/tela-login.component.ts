import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private http: HttpClient, private router: Router) { }
  login() {
    if (!this.email.trim() || !this.senha.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.http
      .get<any[]>(`http://localhost:3000/usuarios?email=${this.email}&senha=${this.senha}`)
      .subscribe((usuarios) => {
        if (usuarios.length > 0) {
          this.router.navigate(['/tela-home-adm']);
        } else {
          alert('Email ou senha inválidos!');
        }
      }, (erro) => {
        console.error('Erro na requisição:', erro);
        alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
      });
  }


}
