import { Component, inject, signal, effect, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, of } from 'rxjs';
import { PokemonDetail, PokemonService } from './services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signals-pokemon.component.html',
  styleUrls: ['./signals-pokemon.component.scss'],
})
export class SignalsPokemonComponent {
  private readonly pokemonService = inject(PokemonService);

  // Signal para la lista de Pokémon
  pokemonList = signal<{ name: string; url: string }[]>([]);
  // pokemonList = this.pokemonService.pokemonList;

  // Computed signal for the total number of Pokémon
  totalPokemonCount = computed(() => this.pokemonList().length);

  pokemonTypes = computed(() => {
    const detail = this.pokemonDetail();
    return detail ? detail.types.map(t => t.type.name).join(', ') : 'Desconocido';
  });

  // Signal para el nombre del Pokémon seleccionado
  selectedPokemon = signal<string | null>(null);

  // Observable que emite los detalles del Pokémon seleccionado
  private selectedPokemon$ = toObservable(this.selectedPokemon);

  // Signal para los detalles del Pokémon seleccionado
  pokemonDetail = toSignal(
    this.selectedPokemon$.pipe(
      switchMap((name) =>
        name ? this.pokemonService.getPokemonDetail(name) : of(null)
      )
    ),
    { initialValue: null }
  );

  constructor() {
    // Efecto para cargar la lista de Pokémon al inicializar el componente
    this.pokemonService.getPokemonList().subscribe((response) => {
      this.pokemonList.set(response.results);
    });

    // this.pokemonService.getPokemonList();
  }

  // Método para seleccionar un Pokémon
  selectPokemon(name: string): void {
    this.selectedPokemon.set(name);
  }
}
