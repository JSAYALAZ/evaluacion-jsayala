import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TvCardT } from '../components/tv-card/tv-card';

@Injectable({
  providedIn: 'root',
})
export class TvApi {
  private urlBase = 'https://api.tvmaze.com/search/shows';

  constructor(private http: HttpClient) {}

  getTxShows(q: string = 'a') {
    return this.http.get<any>(this.urlBase + `?q=${q}`).pipe(
      map((resp:any)=>{
        return resp
      })
    );
  }
}
