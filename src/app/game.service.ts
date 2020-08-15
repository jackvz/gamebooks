// Angular and Ionic components
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

// App components
import { Game } from './game';
import { Title } from './title';
import { PROXY_SERVER } from './title-data';

@Injectable()
export class GameService {
  public game;
  public loadedTitles;

  constructor(
    private storage: Storage,
    private router: Router
  ) {
    var self = this;
    this.game = new Game();
    this.loadedTitles = new Array<String>();
    this.getStorageTitleKeys().then((keys) => {
      self.loadedTitles = keys;
    });
  }

  getStorageTitleKeys() {
    var result = new Array<String>();
    var promise = new Promise((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        if (key.startsWith('title-')) {
          result.push(key);
        }
      }).then(() => {
        resolve(result);
      })
    });
    return promise;
  }

  getSavedGameKeys() {
    var result = new Array<String>();
    var promise = new Promise((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        if (key.startsWith('game')) {
          result.push(key);
        }
      }).then(() => {
        resolve(result);
      })
    });
    return promise;
  }

  getStorageImages() {
    var result = new Array<any>();
    var promise = new Promise((resolve, reject) => {
      this.storage.forEach((value, key, index) => {
        if (key.startsWith('image-')) {
          result.push({key: key, value: value});
        }
      }).then(() => {
        resolve(result);
      })
    });
    return promise;
  }

  getSavedGames() {
    var self = this;
    var result = new Array<Game>();
    var promise = new Promise((resolve, reject) => {
      var savedGameCount = 0;
      this.getSavedGameKeys().then((keys) => {
        var totalSavedGames = (<Array<String>>keys).length;
        (<Array<String>>keys).forEach(key => {
          self.loadGame(<string>key).then((game) => {
            if (result.filter(savedGame => savedGame.key == key).length == 0) {
              (<Game>(game)).key = key;
              result.push(<Game>(game));
              savedGameCount++;
              if (savedGameCount == totalSavedGames) {
                resolve(result);
              }
            }
          });
        });
      });
    });
    return promise;
  }

  checkAgreed(): void {
    this.storage.get('termsAgreed').then((termsAgreed) => {
      if (!termsAgreed) {
        this.router.navigateByUrl('/terms');
      }
    });
  }

  checkSeriesAndTitleSelected(): void {
    if (!this.game || !this.game.seriesId || !this.game.titleId) {
      this.router.navigateByUrl('/home');
    }
  }

  newGame(): void {
    this.game = new Game();
  }

  saveGame(nr: number) {
    var promise = new Promise((resolve, reject) => {
      this.storage.set('game' + nr.toString(), this.game).then(() => {
        resolve();
      });
    });
    return promise;
  }

  loadGame(key: string) {
    var result = new Game();
    var promise = new Promise((resolve, reject) => {
      this.storage.get(key).then((game) => {
        result = game;
        resolve(result);
      });
    });
    return promise;
  }

  setXhtmlImagesSources(title: Title, xml: string, imageSources: Array<string>){
    // Set the sources for images, either loading it from storage or via the network
    var result = xml;
    var promise = new Promise((resolve, reject) => {
      if (!imageSources) {
        resolve(result);
      } else {
        this.getStorageImages().then((storageImages) => {
          var imageSourcesCount = imageSources.length;
          var imageSourcesSet = 0;
          for (var i = 0; i < imageSourcesCount; i++) {
            var imageSource = imageSources[i];
            var imageSourcePath = imageSource.replace(/src="/gi, '').replace(/"/gi, '');
            var imageKey = 'image-' + PROXY_SERVER + title.dataUrl + imageSourcePath;
            var storageImage = (<Array<any>>storageImages).find((storageImage) => storageImage.key == imageKey);
            if (storageImage) {
              var objectURL = URL.createObjectURL(storageImage.value);
              result = result.replace(imageSource, 'src="' + objectURL + '"');
            } else {
              result = result.replace(imageSource, 'src="' + title.dataUrl + imageSourcePath + '"');
            }
            imageSourcesSet++;
            if (imageSourcesSet == imageSourcesCount) {
              resolve(result);
            }
          }
        });
      }
    });

    return promise;
  }

  processXhtml(title: Title, xml: string) {
    var result = xml;
    var promise = new Promise((resolve, reject) => {
      var imageSources = result.match(/src="[^"]+"/gi);

      // Set image sources
      this.setXhtmlImagesSources(title, xml, imageSources).then((xml) => {

        // Clear links
        var allLinksCleared = false;
        while (!allLinksCleared) {
          var replacedXml = (<string>xml).replace(/<a href="#(.*)">/g, '<a data-href="#$1">');
          if (replacedXml == xml) {
            allLinksCleared = true;
          }
          xml = replacedXml;
        }

        resolve(xml);
      });
    });
    return promise;
  }

  clearStorage() {
    var promise = new Promise((resolve, reject) => {
      this.storage.clear().then(() => {
        resolve();
      });
    });
    return promise;
  }
}
