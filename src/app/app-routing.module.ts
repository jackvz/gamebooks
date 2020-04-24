// Angular and Ionic components
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App components
import { HomePage } from '../pages/home/home';
import { TermsPage } from '../pages/terms/terms';
import { GamePage } from '../pages/game/game';
import { ActionChartPage } from '../pages/action-chart/action-chart';
import { CombatPage } from '../pages/combat/combat';
import { MapPage } from '../pages/map/map';
import { RandomNumberPage } from '../pages/random-number/random-number';
import { SaveGamePage } from '../pages/save-game/save-game';
import { ErrorPage } from '../pages/error/error';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'terms', component: TermsPage },
  { path: 'game', component: GamePage },
  { path: 'action-chart', component: ActionChartPage },
  { path: 'combat', component: CombatPage },
  { path: 'map', component: MapPage },
  { path: 'random-number', component: RandomNumberPage },
  { path: 'save-game', component: SaveGamePage },
  { path: 'error', component: ErrorPage },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
