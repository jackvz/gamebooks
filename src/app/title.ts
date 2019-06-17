export class Title {
  id: number;
  seriesId: number;
  name: string;
  blurb: string;
  heroImage: string;
  dataUrl: string;
  xml?: Node;

  constructor(id?, seriesId?, name?, blurb?, heroImage?, dataUrl?) {
    this.id = id;
    this.seriesId = seriesId;
    this.name = name;
    this.blurb = blurb;
    this.heroImage = heroImage;
    this.dataUrl = dataUrl;

    var parser = new DOMParser();
    var doc = parser.parseFromString('', 'text/html');
    this.xml = doc;
  }
}
