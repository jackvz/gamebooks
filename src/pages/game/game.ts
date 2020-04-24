// Angular and Ionic components
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

// App components
import { SERIES } from '../../app/series-data';
import { TITLES } from '../../app/title-data';
import { Title } from '../../app/title';
import { GameService } from '../../app/game.service';
import { TitleService } from '../../app/title.service';
import { Choice } from '../../app/choice';

// Global vars
declare var gtag: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public series;
  public title;
  public titleData;
  public pageMarkedUpContent;
  public choices: Choice[] = new Array<Choice>();

  private frontMatterCount: number = 0;
  public displayPrev: boolean = false;
  public displayNext: boolean = false;

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

    this.showContent();

    <any>gtag('View', 'Game', { 'event_label' : this.series.name + ' - ' + this.title.name });
  }

  showContent() {
    this.displayPrev = false;
    this.displayNext = false;
    this.pageMarkedUpContent = 'Loading...';
    this.choices = new Array<Choice>();
    this.titleService.getTitle(this.gameService.game.seriesId, this.gameService.game.titleId)
      .then((title) => {
        if (title && (<Title>title).xml) {
          // Front matter...
          if (this.gameService.game.sectionNr == 0) {
            if (!this.gameService.game.frontMatterPos || this.gameService.game.frontMatterPos == 0) {
              this.gameService.game.frontMatterPos = 2; // Skip 1 "Table of Contents"
            }
            // var frontMatterCount = document.evaluate('count(//div[@class="numbered"]/preceding-sibling::div[@class="frontmatter"][not(.//h2[text()="Table of Contents"])])', (<Title>title).xml, null, XPathResult.ANY_TYPE, null);
            var frontMatterCount = document.evaluate('count(//div[@class="numbered"]/preceding-sibling::div[@class="frontmatter"])', (<Title>title).xml, null, XPathResult.ANY_TYPE, null);
            this.frontMatterCount = frontMatterCount.numberValue;
            if (this.gameService.game.frontMatterPos > 2) { // Skip 1 "Table of Contents"
              this.displayPrev = true;
            }
            this.displayNext = true;
            var frontMatterItems = document.evaluate('//div[@class="frontmatter"]', (<Title>title).xml, null, XPathResult.ANY_TYPE, null);
            var frontMatterItem = frontMatterItems.iterateNext();
            var frontMatterCounter = 0;
            while (frontMatterItem) {
              frontMatterCounter++;
              // var isTOC = (<HTMLDivElement>frontMatterItem).innerHTML.includes('<h2>Table of Contents</h2>');
              // if (!isTOC) {
                if (this.gameService.game.frontMatterPos == frontMatterCounter) {
                  this.gameService.processXhtml(this.title, (<HTMLDivElement>frontMatterItem).innerHTML).then((processedMarkup) => {
                    this.pageMarkedUpContent = this.sanitizer.bypassSecurityTrustHtml(<string>processedMarkup);
                  });
                }
                frontMatterItem = frontMatterItems.iterateNext();
              // }
            }
          // Or numbered section...
          } else {
            var contentXhtml = (
              document.evaluate(
                '//div[@class="numbered"]/*',
                (<Title>title).xml, null, XPathResult.ANY_TYPE, null)
              );

            // Loop through the nodes and only add the correct markup
            var sectionXhtml = '';
            var sectionChoices = new Array<Choice>();
            var sectionXhtmlStarted = false;
            var contentNode = contentXhtml.iterateNext();
            while (contentNode) {
              var contentNodeXhtml = (<HTMLElement>contentNode).outerHTML;
              if (contentNodeXhtml.includes('name="sect' + this.gameService.game.sectionNr + '"')) {
                sectionXhtmlStarted = true;
              }
              var nextSectionNr = this.gameService.game.sectionNr;
              nextSectionNr++;
              if (contentNodeXhtml.includes('name="sect' + nextSectionNr + '"')) {
                sectionXhtmlStarted = false;
              }
              if (sectionXhtmlStarted) {
                // Build section

                // Add choice options
                if (contentNodeXhtml.includes('class="choice"')) {
                  sectionChoices.push(new Choice(contentNodeXhtml.match(/<a href="#sect(.*)">/)[1], (<HTMLElement>contentNode).textContent));
                } else {
                // Add markup
                  sectionXhtml += contentNodeXhtml;
                }
              }
              contentNode = contentXhtml.iterateNext();
            }

            this.gameService.processXhtml(this.title, sectionXhtml).then((processedMarkup) => {
              this.pageMarkedUpContent = this.sanitizer.bypassSecurityTrustHtml(<string>processedMarkup);
              this.choices = sectionChoices;
            });
          }
        }
      }).catch(() => {
        this.router.navigateByUrl('/home');
      });

    $('ion-content .scroll-content').scrollTop(0);
  }

  next(): void {
    if (this.gameService.game.frontMatterPos < this.frontMatterCount) {
      this.gameService.game.frontMatterPos++;
      this.showContent();
    } else {
      this.gameService.game.sectionNr = 1;
      this.showContent();
    }
  }

  prev(): void {
    this.gameService.game.frontMatterPos--;
    this.showContent();
  }

  makeChoice(sectionNr: number): void {
    this.gameService.game.sectionNr = sectionNr;
    this.showContent();
  }

  ngAfterViewInit() {
    $('ion-content .scroll-content').scrollTop(0);
  }
}
