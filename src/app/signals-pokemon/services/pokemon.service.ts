import { inject, Injectable } from '@angular/core';
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

  // constructor(private http: HttpClient) {}

  getPokemonList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=151`)

      // this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=151`).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.pokemonList.set(response.results);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    // })
  }

  getPokemonDetail(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${name}`);
  }
}
