import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuariosService, Usuario } from '../../services/user/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tela-usuarios',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tela-usuarios.component.html',
  styleUrl: './tela-usuarios.component.css'
})
export class TelaUsuariosComponent implements OnInit {
  listaUsuarios: Usuario[] = [];
  novoUsuario: Usuario = { nome: '', email: '', senha: '' };
  modoEdicao: boolean = false;
  usuarioParaEditar: Usuario | null = null;

  constructor(private servicoUsuarios: UsuariosService) {}

  ngOnInit() {
    this.pegarUsuarios();
  }

  pegarUsuarios() {
    this.servicoUsuarios.getUsuarios().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  salvarOuEditar() {
    if (this.modoEdicao && this.usuarioParaEditar?.id) {
      this.servicoUsuarios.updateUsuario(this.usuarioParaEditar).subscribe(() => {
        this.pegarUsuarios();
        this.cancelar();
      });
    } else {
      const usuarioCriado: Usuario = {
        nome: this.novoUsuario.nome,
        email: this.novoUsuario.email,
        senha: this.novoUsuario.senha,
      };

      this.servicoUsuarios.addUsuario(usuarioCriado).subscribe(() => {
        this.limparCaixas();
        this.pegarUsuarios();
      });
    }
  }

  apertouEditar(u: Usuario) {
    this.modoEdicao = true;
    this.usuarioParaEditar = { ...u };
  }

  apagarUsuario(id: number) {
    this.servicoUsuarios.deleteUsuario(id).subscribe(() => {
      this.pegarUsuarios();
    });
  }

  limparCaixas() {
    this.novoUsuario = { nome: '', email: '', senha: '' };
  }

  cancelar() {
    this.modoEdicao = false;
    this.usuarioParaEditar = null;
  }
}