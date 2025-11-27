import { Component, Input, input } from '@angular/core';

export type TvCardT = {
  id: string;
  name: string;
  lenguaje: string;
  resumen: string;
  rating: number | null;
  image: string;
};
@Component({
  selector: 'app-tv-card',
  imports: [],
  templateUrl: './tv-card.html',
  styleUrl: './tv-card.css',
})
export class TvCard {
  @Input() tvShow!: TvCardT;

  addFavorites(tv: TvCardT) {
    localStorage.setItem(
      'mi_watchlist',
      JSON.stringify({
        serie_id: tv.id,
        titulo_formateado: tv.name.toUpperCase(),
        es_top: tv.rating && tv.rating >= 8 ? true : false,
      })
    );
  }
}
