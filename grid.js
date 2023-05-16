import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(gridElement) {
    this.cells = []; /*створюэмо масив з 16 ячейок*/
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push( /*кожна ячейка це елемент классу селлс*/
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))/*положення ячкйок знаходиться за допомогою остачы при дыленны*/
      );
    }

    this.cellsGroupedByColumn = this.groupCellsByColumn();
    this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(column => [...column].reverse());
    this.cellsGroupedByRow = this.groupCellsByRow();
    this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map(raw => [...raw].reverse());
  }

  getRandomEmptyCell() { /*всередины цього елемента шукаємо всі пусті ячейки*/
    const emptyCells = this.cells.filter(cell => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCells.length);/*знаходимо випадкову пусту ячейку*/
    return emptyCells[randomIndex];
  }

  groupCellsByColumn() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.x] = groupedCells[cell.x] || [];
      groupedCells[cell.x][cell.y] = cell;
      return groupedCells;
    }, []);
  }

  groupCellsByRow() {
    return this.cells.reduce((groupedCells, cell) => {
      groupedCells[cell.y] = groupedCells[cell.y] || [];
      groupedCells[cell.y][cell.x] = cell;
      return groupedCells;
    }, []);
  }
}