// Angular and Ionic components
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// App components
import { TITLES } from '../../app/title-data';
import { GameService } from '../../app/game.service';
import { PROXY_SERVER } from '../../app/title-data';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  private storageImages;

  constructor(
    private gameService: GameService,
    private sanitizer: DomSanitizer
  ) {
  }

  getImageFromStorageOrNetwork(heroImage: string) {
    var imageKey = 'image-' + PROXY_SERVER + heroImage;
    var storageImage = (<Array<any>>this.storageImages).find((storageImage) => storageImage.key == imageKey);
    if (storageImage) {
      var objectURL = URL.createObjectURL(storageImage.value);
      return objectURL;
    } else {
      return heroImage;
    }
  }

  transform(seriesHeroImage: string, seriesId: number, selectedSeriesId?: number, selectedTitleId?: number) {
    return this.gameService.getStorageImages().then((storageImages) => {
      this.storageImages = storageImages;

      if (!selectedSeriesId || !selectedTitleId || seriesId != selectedSeriesId) {
        return this.sanitizer.bypassSecurityTrustUrl(<string>(this.getImageFromStorageOrNetwork(seriesHeroImage)));
      }

      var selectedTitle = TITLES.find(title => title.seriesId == selectedSeriesId && title.id == selectedTitleId);
      return this.sanitizer.bypassSecurityTrustUrl(<string>(this.getImageFromStorageOrNetwork(selectedTitle.heroImage)));
    });
  }
}
