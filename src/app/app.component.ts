// Angular, Ionic and other 3rd party components
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import * as createjs from 'createjs-module';

// App components
import { SERIES } from './series-data';
import { PROXY_SERVER, TITLES } from './title-data';
import { GameService } from './game.service';

@Component({
  templateUrl: 'app.html'
})
export class Gamebooks {
  public heroImagesLoaded: number = 0;
  public totalHeroImages: number = SERIES.length + TITLES.length;
  public allHeroImagesProcessed: boolean = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private gameService: GameService,
    /* tslint:disable-next-line */
    private storage: Storage,
  ) {
  }

  ngOnInit() {
    this.preloadHeroImages();

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  preloadHeroImages() {
    this.gameService.getStorageImages().then((storageImages) => {
      (<any>window).createjs = createjs;
      var queue = new createjs.LoadQueue(true, '', 'Anonymous');

      queue.on('fileload', function(event) {
        if (((event as any).item as any).type == 'image') {
          this.storage.set('image-' + (event as any).item.src, (event as any).rawResult);
          this.heroImagesLoaded++;
        }
      }, this);

      queue.on('complete', function() {
        this.allHeroImagesProcessed = true;
      }, this);

      var imageKey;
      var storageImage;
      for (let series of SERIES) {
        imageKey = 'image-' + PROXY_SERVER + series.heroImage;
        storageImage = (<Array<any>>storageImages).find((storageImage) => storageImage.key == imageKey);
        if (!storageImage) {
          queue.loadFile({ src: PROXY_SERVER + series.heroImage });
        } else {
          this.heroImagesLoaded++;
        }
      }

      for (let title of TITLES) {
        imageKey = 'image-' + PROXY_SERVER + title.heroImage;
        storageImage = (<Array<any>>storageImages).find((storageImage) => storageImage.key == imageKey);
        if (!storageImage) {
          queue.loadFile({ src: PROXY_SERVER + title.heroImage });
        } else {
          this.heroImagesLoaded++;
        }
      }

      if (this.heroImagesLoaded == this.totalHeroImages) {
        this.allHeroImagesProcessed = true;
      } else {
        queue.load();
      }
    });
  }
}
