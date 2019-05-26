// Angular and Ionic components
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// App components
import { SERIES } from '../../app/series-data';
import { GameService } from '../../app/game.service';

@Component({
  selector: 'game-menu',
  templateUrl: 'game-menu.html',
})
export class GameMenuComponent {
  @Input()
  selected: string;

  public series;

  constructor(
    private gameService: GameService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.series = SERIES.find(seriesItem => seriesItem.id == this.gameService.game.seriesId);
    (<any>$('game-menu')).foundation();
  }

  isActiveMenuItem(selected): boolean {
    return (selected == this.selected);
  }

  activateMenuItem(selected): void {
    if (selected == 'story') {
      this.router.navigateByUrl('/game');
    } else {
      this.router.navigateByUrl('/' + selected);
    }
  }
}
