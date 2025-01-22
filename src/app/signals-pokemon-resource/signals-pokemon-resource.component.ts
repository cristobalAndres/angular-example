// import { Component, inject, signal, re } from '@angular/core';
// import { PokemonDetail, PokemonListResponse, PokemonService } from './services/pokemon.service';

// @Component({
//   selector: 'app-signals-pokemon-resource',
//   standalone: true,
//   imports: [],
//   templateUrl: './signals-pokemon-resource.component.html',
//   styleUrl: './signals-pokemon-resource.component.scss'
// })
// export class SignalsPokemonResourceComponent {
//   private readonly pokemonService = inject(PokemonService);

//   // Señal para el nombre del Pokémon seleccionado
//   selectedPokemon = signal<string | null>(null);

//   // Recurso para obtener la lista de Pokémon
//   pokemonListResource = resource<PokemonListResponse>({
//     // Función asíncrona que recupera la lista de Pokémon
//     async loader() {
//       return await this.pokemonService.getPokemonList().toPromise();
//     },
//   });

//   // Recurso para obtener los detalles del Pokémon seleccionado
//   pokemonDetailResource = resource<PokemonDetail | null>({
//     // Computación reactiva que produce el valor de la solicitud
//     request: () => this.selectedPokemon(),
//     // Función asíncrona que recupera los detalles del Pokémon
//     async loader({ request }) {
//       if (request) {
//         return await this.pokemonService.getPokemonDetail(request).toPromise();
//       }
//       return null;
//     },
//   });

//   // Método para seleccionar un Pokémon
//   selectPokemon(name: string): void {
//     this.selectedPokemon.set(name);
//   }
// }


