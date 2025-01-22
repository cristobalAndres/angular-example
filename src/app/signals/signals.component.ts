import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
})
export class SignalsComponent {
  // Signal que mantiene el valor del contador
  contador = signal(0);

  // Signal computado que calcula el doble del contador
  dobleContador = computed(() => this.contador() * 2);

  // Método para incrementar el contador
  incrementar() {
    this.contador.update((valor) => valor + 1);
  }

  // Método para decrementar el contador
  decrementar() {
    this.contador.update((valor) => valor - 1);
  }
}
