import { Component, OnInit } from '@angular/core';
import { HeroService } from '../common/services/hero.service';
import { ActivatedRoute } from '@angular/router';
import Hero from '../models/hero';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  public character:Hero = new Hero;
  processing = true;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    var heroId = this.route.snapshot.params.id;

    this.heroService.getHero(heroId).subscribe((data) => {
      this.character.id = data.id;
      this.character.name = data.name;
      this.character.bio = data.bio;
      this.character.photo = data.photo;

      console.log(this.character);

      this.processing = false;
      if(!this.character.hasOwnProperty('id')){
        this._snackBar.open('No data available', '', {
          duration: 3000,
        });
      }
    }, (err) => {
      this.processing = false;
      this._snackBar.open('Something Went Wrong', '', {
        duration: 3000,
      });
      console.error(err);
    });

    // this.character = this.heroService.getHero(heroId);
  }

  ngOnInit(): void {}

}
