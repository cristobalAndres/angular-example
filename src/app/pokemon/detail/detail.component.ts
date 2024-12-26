import { Component, input } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon.interface';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
   pokemonDetail = input<PokemonDetail | null >();
   images = input<string[]>([]);

}
