// Angular and Ionic components
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// App components
import { SERIES } from '../../app/series-data';
import { TITLES } from '../../app/title-data';
import { Title } from '../../app/title';
import { GameService } from '../../app/game.service';
import { TitleService } from '../../app/title.service';

@Component({
  selector: 'page-random-number',
  templateUrl: 'random-number.html'
})
export class RandomNumberPage {
  public series;
  public title;
  public pageMarkedUpContent;

  constructor(
    private router: Router,
    private gameService: GameService,
    private titleService: TitleService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.gameService.checkAgreed();
    this.gameService.checkSeriesAndTitleSelected();

    this.series = SERIES.find(seriesItem => seriesItem.id == this.gameService.game.seriesId);
    this.title = TITLES.find(title => title.seriesId == this.gameService.game.seriesId && title.id == this.gameService.game.titleId);

    this.titleService.getTitle(this.gameService.game.seriesId, this.gameService.game.titleId)
      .then((title) => {
        if (title && (<Title>title).xml) {
          var contentXhtml = (
            <HTMLDivElement>document.evaluate(
              '//div[@class="frontmatter"][./h2/a[@name="random"]]',
              (<Title>title).xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
              ).singleNodeValue
            ).innerHTML;
          this.gameService.processXhtml(this.title, contentXhtml).then((processedMarkup) => {
            this.pageMarkedUpContent = this.sanitizer.bypassSecurityTrustHtml(<string>processedMarkup);
          });
        }
      }).catch(() => {
        this.router.navigateByUrl('/home');
      });
  }

  ngAfterViewInit() {
    $('ion-content .scroll-content').scrollTop(0);
  }
}
