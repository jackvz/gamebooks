// Angular and Ionic components
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// App components
import { GameMenuComponent } from './game-menu/game-menu';
import { TitleHeaderComponent } from './title-header/title-header';
import { AppHeaderComponent } from './app-header/app-header';
import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
	declarations: [
    GameMenuComponent,
    TitleHeaderComponent,
    AppHeaderComponent,
    ProgressBarComponent,
  ],
	imports: [],
	exports: [
    RouterModule,
    GameMenuComponent,
    TitleHeaderComponent,
    AppHeaderComponent,
    ProgressBarComponent,
  ]
})
export class ComponentsModule {}
