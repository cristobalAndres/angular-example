import { Component, computed, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon/pokemon.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ListComponent } from "./list/list.component";
import { DetailComponent } from "./detail/detail.component";

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, ListComponent, DetailComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  private readonly pokemonService = inject(PokemonService);

  pokemons = this.pokemonService.pokemons;
  isLoading = this.pokemonService.isLoading;
  pagination = this.pokemonService.pagination;

  pokemonDetail = this.pokemonService.pokemonDetail;
  isLoadingDetail = this.pokemonService.isLoadingDetail;

  images = computed(() => {
    const pokemon = this.pokemonDetail();
    if (!pokemon) {
      return [];
    }

    const sprites = Object.keys(pokemon.sprites).map((key) => (pokemon.sprites as any)[key]).filter((sprite) => sprite && typeof sprite === 'string');
    return sprites;
  })

  ngOnInit(): void {
    this.pokemonService.getPokemons();
  }
}
