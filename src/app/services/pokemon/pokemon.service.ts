import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pagination, Pokemon, PokemonDetail } from '../../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);

  isLoading = signal<boolean>(false);
  pokemons = signal<Pokemon[]>([]);
  pagination = signal<Pagination>({
    count: 0,
    next: '',
    previous: '',
  });

  isLoadingDetail = signal<boolean>(false);
  pokemonDetail = signal<PokemonDetail | null>(null);

  getPokemons(urlPage: string = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0' ) {
    this.isLoading.set(true);
    return this.http.get<Pagination>(urlPage).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.pagination.set(response);
        this.pokemons.set(response.results || []);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.log('error', error);
      }
    });
  }

  getPokemonDetail(namePokemon: string) {
    this.isLoadingDetail.set(true);
    return this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`).subscribe({
      next: (response) => {
        this.isLoadingDetail.set(false);
        this.pokemonDetail.set(response);
      },
      error: (error) => {
        this.isLoadingDetail.set(false);
        console.log('error', error);
      }
    });
  }
}