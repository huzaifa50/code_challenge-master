import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Hero from 'src/app/models/hero';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient) { }
  dataSource = [
    {
      "id": 1,
      "name": "Captain Marvel",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/008cmv_ons_crd_04.jpg",
      "bio": "dummy"
    },
    {
      "id": 2,
      "name": "Thanos",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/019tha_ons_crd_03.jpg",
      "bio": "dummy"
    },
    {
      "id": 3,
      "name": "Black Panther",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/007blp_ons_crd_02.jpg",
      "bio": "dummy"
    },
    {
      "id": 4,
      "name": "Yon-Rogg",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/272sfc_ons_crd_02_0.jpg",
      "bio": "dummy"
    },
    {
      "id": 5,
      "name": "Spider-Man",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 6,
      "name": "Goose the Cat",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 7,
      "name": "Iron Man",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 8,
      "name": "Captain America",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 9,
      "name": "Black Widow",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 10,
      "name": "Hulk",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 11,
      "name": "Hawkeye",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    },
    {
      "id": 12,
      "name": "Thor",
      "photo": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg",
      "bio": "dummy"
    }
  ];

  // Url that your server is running on
  private BASE_URL = 'http://localhost:3000';

  private getHeroesRequest(): Observable<Hero[]> {
    let base;

    base = this.http.get(this.BASE_URL+`/heroes/`);
    const request = base.pipe(
      map((data: Hero) => {
        return data;
      })
    );

    return request;
  }

  private getHeroRequest(id): Observable<Hero> {
    let base;

    base = this.http.get(this.BASE_URL+`/heroes/`+id);
    const request = base.pipe(
      map((data: Hero) => {
        return data;
      })
    );

    return request;
  }

  public getHeroes(): Observable<Hero[]> {
    return this.getHeroesRequest();
    // return this.dataSource;
  }

  public getHero(id): Observable<Hero>{
    return this.getHeroRequest(id);

    // let a= this.dataSource.filter((hero) => {
    //   return hero.id == id;
    // }).map((hero: Hero) => {
    //   return hero;
    // });

    // return a;
  }

}
