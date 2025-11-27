import { Component, OnInit, signal } from '@angular/core';
import { TvApi } from '../services/tv.service';
import { TvCard, TvCardT } from '../components/tv-card/tv-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TvCard,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('evaluacionayala');

  tvshows: TvCardT[] = [];

  setTvShows(data: any) {
    this.tvshows  = data
  }

  constructor(private api: TvApi) {}
  ngOnInit(): void {
    this.api.getTxShows().subscribe({
      next: (resp) => {
        const datainj = resp.map((tv: any):TvCardT => {
          return {
            id: tv.show.id,
            lenguaje: tv.show.language,
            name: tv.show.name,
            rating: tv.show.rating.average,
            resumen: tv.show.summary,
            image:tv.show.image.medium
          };
        });
        this.setTvShows(datainj)
      },
    });
  }
}
