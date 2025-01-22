import { Component, inject, input, signal } from '@angular/core';
import { Pagination, Pokemon, PokemonDetail } from '../../models/pokemon.interface';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
    selector: 'app-list',
    imports: [CommonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class ListComponent {
  private readonly pokemonService = inject(PokemonService);
  pokemons = input<Pokemon[]>();
  pokemonDetail = input<PokemonDetail | null >();
  pagination = input<Pagination>();

  numerationPokemon = signal(0);

  getPokemonDetail(namePokemon: string) {
    this.pokemonService.getPokemonDetail(namePokemon);
  }

  previousPage() {
    this.numerationPokemon.update((value) => value - 10);
    this.pokemonService.getPokemons(this.pagination()?.previous);
  }
  
  nextPage() {
    this.numerationPokemon.update((value) => value + 10);
    this.pokemonService.getPokemons(this.pagination()?.next);
  }
}
