import { Component, computed, inject, resource, signal } from '@angular/core';
import { PokemonDetail, PokemonListResponse, PokemonService } from './services/pokemon.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signals-pokemon-resource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signals-pokemon-resource.component.html',
  styleUrl: './signals-pokemon-resource.component.scss'
})
export class SignalsPokemonResourceComponent {
  private pokemonService = inject(PokemonService);

  // Señal para el nombre del Pokémon seleccionado
  selectedPokemon = signal<string | null>(null);

  limit = signal<number>(151);

  pokemonTypes = computed(() => {
      const detail = this.pokemonDetailResource.value();
      return detail ? detail.types.map(t => t.type.name).join(', ') : 'Desconocido';
    });

  // Recurso para obtener la lista de Pokémon
  pokemonListResource = resource({
    // Computación reactiva que produce el valor de la solicitud
    request: () => {
      return {
        page: 1,
        limit: this.limit(),
      };
    },
    // Función asíncrona que recupera la lista de Pokémon
    loader: ({request}) => {
      const { page, limit } = request;
      return firstValueFrom(this.pokemonService.getPokemonList(page, limit));
    },
  })

  // Recurso para obtener los detalles del Pokémon seleccionado
  pokemonDetailResource = resource({
    // Computación reactiva que produce el valor de la solicitud
    request: () => this.selectedPokemon(),
    // Función asíncrona que recupera los detalles del Pokémon
    loader: ({ request }) => {
      if (request) {
        return firstValueFrom(this.pokemonService.getPokemonDetail(request)); 
      }
      return Promise.resolve(null);
    },
  });

  // Método para seleccionar un Pokémon
  selectPokemon(name: string): void {
    this.selectedPokemon.set(name);
  }

  limitList(value: any): void {
    console.log('Limit', value.target.value);
    this.limit.set(value.target.value);
  }
}


// nextValidaciones2025