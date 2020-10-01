
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroService } from '../common/services/hero.service';
import Hero from '../models/hero';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public heroes: Hero[] = [];
  processing = true;
  displayedColumns: string[] = ['id', 'name', 'detail'];

  constructor(private heroService: HeroService, private _snackBar: MatSnackBar) {
    this.heroService.getHeroes().subscribe((data) => {
      this.heroes = data.map(hero => {return hero});
      this.processing = false;
      if(!this.heroes.length){
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

    // this.heroes = this.heroService.getHeroes();
  }

  ngOnInit(): void {
  }

}
