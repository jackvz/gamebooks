import { NgModule } from '@angular/core';
import { HeroImagePipe } from './hero-image/hero-image';
import { TitleFilterPipe } from './title-filter/title-filter';
@NgModule({
	declarations: [TitleFilterPipe,
    HeroImagePipe],
	imports: [],
	exports: [TitleFilterPipe,
    HeroImagePipe]
})
export class PipesModule {}
