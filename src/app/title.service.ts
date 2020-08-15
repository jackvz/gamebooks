// Angular and Ionic components
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

// App components
import { Title } from './title';
import { PROXY_SERVER, TITLES } from './title-data';
import { GameService } from './game.service';

@Injectable()
export class TitleService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private gameService: GameService,
    private router: Router
  ) {
  }

  // Returns the local hard-coded data for all titles
  getTitles(): Observable<Title[]> {
    return of(TITLES);
  }

  // Returns a specific title, and gets the content from storage or the server
  getTitle(seriesId, titleId) {
    var title = TITLES.find(title => title.seriesId == seriesId && title.id == titleId);
    if (!title || !title.dataUrl) {
      this.router.navigateByUrl('/home');
    }

    var titleKey = 'title-' + seriesId + '-' + titleId;

    var promise = new Promise((resolve, reject) => {
      this.storage.get(titleKey).then((titleData) => {
        if (titleData) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(titleData, 'text/html');
          title.xml = doc;
          resolve(title);
        } else {
          this.http.get<string>(PROXY_SERVER + title.dataUrl + 'title.htm', { responseType: 'text' as 'json' })
            .toPromise()
            .then(res => {
              res = res.split('\n').slice(1).join('\n');
              var parser = new DOMParser();
              var doc = parser.parseFromString(res, 'text/html');
              title.xml = doc;
              this.saveTitle(seriesId, titleId, res).then(() => {
                resolve(title);
              });
            }).catch(() => {
              reject();
            });
        }
      });
    });

    return promise;
  }

  loadTitleImages(title) {
    var promise = new Promise((resolve, reject) => {
      this.gameService.getStorageImages().then((storageImages) => {
        (<any>window).createjs = createjs;
        var queue = new createjs.LoadQueue();
        queue.on('fileload', function(event) {
          if (((event as any).item as any).type == 'image') {
            var imageKey = 'image-' + (event as any).item.src;
            var storageImage = (<Array<any>>storageImages).find((storageImage) => storageImage.key == imageKey);
            if (!storageImage) {
              this.storage.set(imageKey, (event as any).rawResult);
            }
          }
        }, this);
        queue.on('complete', function() {
          resolve();
        }, this);
        var titleImages = document.evaluate('//img/@src', (<Title>title).xml, null, XPathResult.ANY_TYPE, null);
        var titleImage = titleImages.iterateNext();
        var baseUrl = title.dataUrl;
        while (titleImage) {
          queue.loadFile({ src: PROXY_SERVER + baseUrl + titleImage.textContent });
          titleImage = titleImages.iterateNext();
        }
        queue.load();
      });
    });
    return promise;
  }

  saveTitle(seriesId, titleId, titleContent) {
    var title = TITLES.find(title => title.seriesId == seriesId && title.id == titleId);
    var promise = new Promise((resolve, reject) => {
      var titleKey = 'title-' + seriesId + '-' + titleId;
      this.storage.set(titleKey, titleContent).then(() => {
        this.loadTitleImages(title).then(() => {
          var loadedTitles = this.gameService.loadedTitles;
          if (!this.gameService.loadedTitles.includes(titleKey)) {
            loadedTitles.push(titleKey);
          }
          this.gameService.loadedTitles = loadedTitles;
          resolve();
        });
      });
    });
    return promise;
  }
}
