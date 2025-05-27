import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaPrincipalComponent } from "./components/tela-principal/tela-principal.component";
import { TelaLoginComponent } from "./components/tela-login/tela-login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'perfumix';
}
