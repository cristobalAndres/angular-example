import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonDetail {
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

  getPokemonList(page: number = 1, limit: number = 151): Observable<PokemonListResponse> {
    console.log('Limit', limit);
    console.log('page', page);
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=${limit}`);
  }

  getPokemonDetail(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/pokemon/${name}`);
  }
}
