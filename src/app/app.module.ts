// Angular and Ionic components
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

// App components
import { Gamebooks } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TitleService } from './title.service';
import { GameService } from './game.service';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { HomePage } from '../pages/home/home';
import { TermsPage } from '../pages/terms/terms';
import { GamePage } from '../pages/game/game';
import { ActionChartPage } from '../pages/action-chart/action-chart';
import { CombatPage } from '../pages/combat/combat';
import { MapPage } from '../pages/map/map';
import { RandomNumberPage } from '../pages/random-number/random-number';
import { SaveGamePage } from '../pages/save-game/save-game';
import { ErrorPage } from '../pages/error/error';
import { GlobalErrorHandler } from './error-handler';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(Gamebooks),
    IonicStorageModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'Gamebooks',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [
    Gamebooks,
    HomePage,
    TermsPage,
    GamePage,
    ActionChartPage,
    CombatPage,
    MapPage,
    RandomNumberPage,
    SaveGamePage,
    ErrorPage,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Gamebooks,
    HomePage,
    TermsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    TitleService,
    GameService,
  ]
})
export class AppModule {}
