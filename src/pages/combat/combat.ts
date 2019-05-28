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

// Global vars
declare var gtag: any;

@Component({
  selector: 'page-combat',
  templateUrl: 'combat.html',
})
export class CombatPage {
  public series;
  public title;
  public combatResultsMarkedUpContent;
  public combatRulesMarkedUpContent;

  constructor(
    private router: Router,
    private gameService: GameService,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
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
              '//div[@class="frontmatter"][./h2/a[@name="crtable"]]',
              (<Title>title).xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
              ).singleNodeValue
            ).innerHTML;
          this.gameService.processXhtml(this.title, contentXhtml).then((processedMarkup) => {
            this.combatResultsMarkedUpContent = this.sanitizer.bypassSecurityTrustHtml(<string>processedMarkup);
          });
        }
      }).catch(() => {
        this.router.navigateByUrl('/home');
      });

    this.titleService.getTitle(this.gameService.game.seriesId, this.gameService.game.titleId)
      .then((title) => {
        if (title && (<Title>title).xml) {
          var contentXhtml = (
            <HTMLDivElement>document.evaluate(
              '//div[@class="frontmatter"][./h2/a[@name="crsumary"]]',
              (<Title>title).xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
              ).singleNodeValue
            ).innerHTML;
          this.gameService.processXhtml(this.title, contentXhtml).then((processedMarkup) => {
            this.combatRulesMarkedUpContent = this.sanitizer.bypassSecurityTrustHtml(<string>processedMarkup);
          });
        }
      }).catch(() => {
        this.router.navigateByUrl('/home');
      });

    <any>gtag('View', 'Combat', { 'event_label' : this.series.name + ' - ' + this.title.name });
  }

  ngAfterViewInit() {
    $('ion-content .scroll-content').scrollTop(0);
  }
}
