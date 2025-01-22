import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export  interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2';

  pokemonList = signal<{ name: string; url: string }[]>([]);

  pokemonDetail = signal<PokemonDetail | null>(null);

  // constructor(private http: HttpClient) {}

  getPokemonList(): void {
    // return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=151`)

      this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=151`).subscribe({
      next: (response) => {
        console.log(response);
        this.pokemonList.set(response.results);
      },
      error: (error) => {
        console.error(error);
      },
    })
  }

  getPokemonDetail(name: string) {
    this.http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${name}`).subscribe({
      next: (detail) => {
        this.pokemonDetail.set(detail);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}