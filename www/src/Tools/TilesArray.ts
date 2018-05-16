import { Config, Singleton } from '../Config';
export default class TilesArray {
  private tiles: Array<number>;
  private arraySize: number;

  constructor() {
    let singleton = Singleton.getInstance();
    let config = singleton.config;
    this.tiles = config.tileSettings.initialArray;
    this.arraySize = config.tileSettings.arraySize;
  }

  get(x: number, y: number): number {
    return this.tiles[y * (this.arraySize + 1) + x];
  }

  set(x: number, y: number, value: number) {
    this.tiles[y * (this.arraySize + 1) + x] = value;
  }

  isFull(): boolean {
    for (let tile of this.tiles) {
      if (tile === 0) {
        return false;
      }
    }
    return true;
  }

  emptyTiles(): number {
    let empty = 0;
    for (let tile of this.tiles) {
      if (tile === 0) {
        empty++;
      }
    }
    return empty;
  }

  calculateSum() {
    let points = 0;
    for (let tile of this.tiles) {
      points += tile;
    }
    return points;
  }
}
