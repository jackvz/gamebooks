// Angular and Ionic components
import { Component } from '@angular/core';

// App components
import { SERIES } from '../../app/series-data';
import { TITLES } from '../../app/title-data';
import { Game } from '../../app/game';
import { GameService } from '../../app/game.service';

@Component({
  selector: 'page-save-game',
  templateUrl: 'save-game.html',
})
export class SaveGamePage {
  public series;
  public title;
  public titleData;
  public savedGames: Game[];

  constructor(
    private gameService: GameService,
  ) {
  }

  ngOnInit() {
    (<any>$('#save-popup')).foundation();

    this.gameService.checkAgreed();
    this.gameService.checkSeriesAndTitleSelected();

    this.savedGames = new Array<Game>();
    this.gameService.getSavedGames().then((savedGames) => {
      this.savedGames = <Array<Game>>savedGames;
    });

    this.series = SERIES.find(seriesItem => seriesItem.id == this.gameService.game.seriesId);
    this.title = TITLES.find(title => title.seriesId == this.gameService.game.seriesId && title.id == this.gameService.game.titleId);
  }

  saveGame(nr: number): void {
    this.gameService.saveGame(nr).then(() => {
      (<any>$('#save-popup')).foundation('open');
      this.gameService.getSavedGames().then((savedGames) => {
        this.savedGames = <Array<Game>>savedGames;
      });
    });
  }

  ngAfterViewInit() {
    $('ion-content .scroll-content').scrollTop(0);
  }
}
