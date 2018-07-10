
import GridTile from './GridTile'
export default class GridStructure {
  private grid: Array<GridTile>;
  private arraySize: number;
  constructor(arraySize: number) {
    this.arraySize = arraySize;
    this.grid = [];
  }

  getTiles() {
    return this.grid.filter(x => x);
  }

  getOrdered(asc = false) {
    if (asc) {
      return this.getTiles().sort((n1, n2) => n1.value - n2.value);
    } else {
      return this.getTiles().sort((n1, n2) => n2.value - n1.value);
    }  }

  filter(filter: any) {
    return this.grid.filter(filter);
  }

  push(tile: GridTile) {
    this.grid.push(tile);
  }

  get(x: number, y: number): GridTile {
    let position = y * (this.arraySize + 1) + x;
    return this.grid[position];
  }

  set(x: number, y: number, tile: GridTile) {
    let position = y * (this.arraySize + 1) + x;
    this.grid[position] = tile;
  }

  isFull(): boolean {
    for (let tile of this.grid) {
      if (!tile) {
        return false;
      }
    }
    return true;
  }

  emptyTiles(): number {
    let empty = 0;
    for (let tile of this.grid) {
      if (tile && tile.value === 0) {
        empty++;
      }
    }
    return empty;
  }

  sumTiles() {
    let points = 0;
    for (let tile of this.grid) {
      points += tile ? tile.value : 0;
    }
    return points;
  }

}