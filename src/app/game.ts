import { PlayerChart } from './player-chart';

export class Game {
  key?: String;
  seriesId: number;
  titleId: number;
  sectionNr: number;
  frontMatterPos: number;
  playerChart: PlayerChart;

  constructor() {
    this.seriesId = null;
    this.titleId = null;
    this.sectionNr = 0;
    this.frontMatterPos = 2; // Skip 1 "Table of Contents"
    this.playerChart = new PlayerChart();
  }
}
