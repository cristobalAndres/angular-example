import { Component, inject } from '@angular/core';
import { PokemonService } from '../../signals-pokemon/services/pokemon.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private readonly pokemonService = inject(PokemonService);

    pokemonDetail = this.pokemonService.pokemonDetail;

    // constructor() {
    //     this.pokemonService.getPokemonList();
    // }
}
