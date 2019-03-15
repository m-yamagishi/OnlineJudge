import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  heroes: Hero[] = [];
  title = 'OnLine Judge System Beta';
	md = ""
		+ "\n"
		+ "- [Java問題に解答する](/contests)\n"
    + "- [Java問題を作成する](/addcontest)\n"
    + "- 解答状況を確認する\n"
		+ "";

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
