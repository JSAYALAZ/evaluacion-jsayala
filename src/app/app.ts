import { Component, OnInit, signal } from '@angular/core';
import { TvApi } from '../services/tv.service';
import { TvCard, TvCardT } from '../components/tv-card/tv-card';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,TvCard,CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('evaluacionayala');

  authForm!: FormGroup;
  tvshows: TvCardT[] = [];
  setTvShows(data: any) {
    this.tvshows  = data
  }

  initForm() {
    this.authForm = new FormGroup({
      query: new FormControl('', Validators.required),
    });
  }
  constructor(private api: TvApi) {
    this.initForm()
  }
  submitForm(){

    this.api.getTxShows(this.authForm.value.query).subscribe({
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
  ngOnInit(): void {
    this.api.getTxShows("a").subscribe({
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
