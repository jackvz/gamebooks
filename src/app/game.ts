import { PlayerChart } from './player-chart';

export class Game {
  key?: String;
  seriesId: number;
  titleId: number;
  frontMatterPos: number;
  sectionNr: number;
  playerChart: PlayerChart;

  constructor() {
    this.seriesId = null;
    this.titleId = null;
    this.sectionNr = 0;
    this.playerChart = new PlayerChart();
  }
}
