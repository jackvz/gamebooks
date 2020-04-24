// Angular and Ionic components
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// App components
import { SERIES } from '../../app/series-data';
import { TITLES } from '../../app/title-data';
import { Title } from '../../app/title';
import { TitleService } from '../../app/title.service';
import { Game } from '../../app/game';
import { GameService } from '../../app/game.service';

// Global vars
declare var gtag: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public series = SERIES;
  public titles = TITLES;
  public downloadingTitles: String[];
  public downloadingSeries: String[];
  public selectedSeriesId: number;
  public selectedTitleId: number;
  public savedGames: Game[];

  constructor(
    private router: Router,
    private gameService: GameService,
    private titleService: TitleService,
  ) {
  }

  ngOnInit() {
    this.gameService.checkAgreed();

    this.downloadingSeries = new Array<String>();
    this.downloadingTitles = new Array<String>();

    this.savedGames = new Array<Game>();
    this.gameService.getSavedGames().then((savedGames) => {
      this.savedGames = <Array<Game>>savedGames;
    });

    <any>gtag('View', 'Home');
  }

  ngAfterViewInit() {
    var self = this;

    // Init Foundation
    (<any>$('page-home')).foundation();

    // If all titles for a series is closed, display the overview
    $('.accordion-series').on('up.zf.accordion', function() {
      var accordion = $(this);
      var accordionOpenItemsCount = accordion.find('.accordion-item.is-active').length;
      if (accordionOpenItemsCount == 0) {
        var overviewItemTrigger = accordion.find('.series-overview-header');
        overviewItemTrigger.trigger('click');
        self.selectedTitleId = null;
      }
    });

    $('ion-content .scroll-content').scrollTop(0);
  }

  ngOnDestroy() {
    $('.accordion-series').off('up.zf.accordion');
  }

  activateTitle(seriesId, titleId): void {
    this.selectedSeriesId = seriesId;
    this.selectedTitleId = titleId;
  }

  selectTitle(seriesId, titleId): void {
    this.gameService.newGame();
    this.gameService.game.seriesId = seriesId;
    this.gameService.game.titleId = titleId;
    this.router.navigateByUrl('/game');
  }

  isSeriesDownloading(id): Boolean {
    return this.downloadingSeries.includes('series-' + id);
  }

  isTitleDownloading(seriesId, id): Boolean {
    return this.downloadingTitles.includes('title-' + seriesId + '-' + id);
  }

  isTitleDownloaded(seriesId, id): Boolean {
    return this.gameService.loadedTitles.includes('title-' + seriesId + '-' + id);
  }

  isSeriesDownloaded(id): Boolean {
    var downloaded = true;
    var seriesTitles = TITLES.filter(title => (title.seriesId == id));
    var seriesKey = 'series-' + id;
    if (this.downloadingSeries.includes(seriesKey)) {
      return;
    }

    seriesTitles.forEach(title => {
      if (!this.gameService.loadedTitles.includes('title-' + id + '-' + title.id)) {
        downloaded = false;
      }
    });
    return downloaded;
  }

  downloadTitle(seriesId, id): void {
    var titleKey = 'title-' + seriesId + '-' + id;
    if (this.downloadingTitles.includes(titleKey) || this.gameService.loadedTitles.includes(titleKey)) {
      return;
    } else {
      this.downloadingTitles.push(titleKey);
    }

    this.titleService.getTitle(seriesId, id).then((title) => {
      this.downloadingTitles.splice(this.downloadingTitles.indexOf(titleKey), 1);
    }).catch(() => {
      this.downloadingTitles.splice(this.downloadingTitles.indexOf(titleKey), 1);
      (<any>$('#disconnected-popup')).foundation('open');
    });
  }

  downloadSeries(id): void {
    var seriesTitles = TITLES.filter(title => (title.seriesId == id));
    var seriesTitleCount = seriesTitles.length;
    var seriesTitlesDownloaded = 0;
    var seriesKey = 'series-' + id;
    if (this.downloadingSeries.includes(seriesKey)) {
      return;
    } else {
      this.downloadingSeries.push(seriesKey);
    }

    for (var i = 0; i < seriesTitleCount; i++) {
      var title = seriesTitles[i];
      var titleKey = 'title-' + id + '-' + title.id;
      var isDisconnectedAndPopupShown = false;
      if (this.downloadingTitles.includes(titleKey) || this.gameService.loadedTitles.includes(titleKey)) {
        seriesTitlesDownloaded++;
      } else {
        this.downloadingTitles.push(titleKey);

        this.titleService.getTitle(id, title.id).then((title) => {
          var titleKey = 'title-' + (<Title>title).seriesId + '-' + (<Title>title).id;
          this.downloadingTitles.splice(this.downloadingTitles.indexOf(titleKey), 1)
          seriesTitlesDownloaded++;
          if (seriesTitleCount == seriesTitlesDownloaded) {
            this.downloadingSeries.splice(this.downloadingSeries.indexOf(seriesKey), 1)
          }
        }).catch(() => {
          this.downloadingSeries.splice(this.downloadingSeries.indexOf(seriesKey), 1)
          this.downloadingTitles.splice(this.downloadingTitles.indexOf(titleKey), 1);
          if (!isDisconnectedAndPopupShown) {
            (<any>$('#disconnected-popup')).foundation('open');
            isDisconnectedAndPopupShown = true;
          }
        });
      }
    };
  }

  getGameSeriesName(game: Game): String {
    if (game) {
      return SERIES.find(seriesItem => seriesItem.id == game.seriesId).name;
    } else {
      return '';
    }
  }

  getGameTitleName(game: Game): String {
    if (game) {
      return TITLES.find(title => title.seriesId == game.seriesId && title.id == game.titleId).name;
    } else {
      return '';
    }
  }

  continueGame(game: Game): void {
    this.gameService.newGame();
    this.gameService.game = game;
    this.router.navigateByUrl('/game');
  }

  clearDownloadedContent(): void {
    this.gameService.clearStorage().then(() => {
      this.downloadingSeries = new Array<String>();
      this.downloadingTitles = new Array<String>();
      this.gameService.loadedTitles = new Array<String>();
      (<any>$('#content-cleared-popup')).foundation('open');
    });
  }
}
