import { Component, OnInit } from '@angular/core';

const FALSE: boolean[][] = [
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
];

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  whitePawnMoves: number[][] = [];
  blackPawnMoves: number[][] = [];

  constructor() {}

  grid: string[][] = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ];

  boolean: boolean[][] = FALSE;
  pause: boolean = false;
  copycontent: string = '';
  prevX: number = 0;
  prevY: number = 0;
  whites: string[] = ['r', 'n', 'b', 'k', 'q', 'p'];
  blacks: string[] = ['R', 'N', 'B', 'K', 'Q', 'P'];
  user: string[] = this.whites;
  role: boolean = true;
  ngOnInit(): void {}

  // get the piece at the given position
  getPiece(x: number, y: number): string {
    return this.grid[y][x];
  }

  reset() {
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) this.boolean[i][j] = false;
  }

  selected(val: string, x: number, y: number, bool: boolean): void {
    console.log(this.boolean);

    if (bool == false) {
      if (this.role) this.user = this.whites;
      else this.user = this.blacks;

      this.copycontent = val;
      console.log(this.boolean);

      this.prevX = x;
      this.prevY = y;
      console.log(val + ' at ' + x + ',' + y);
      this.pause = true;

      this.reset();

      if (val === 'p') {
        this.getWhitePawnMoves(x, y);
      } else if (val === 'P') {
        this.getBlackPawnMoves(x, y);
      } else if (val === 'K') {
        this.getBlackKingMoves(x, y);
      }
    } else {
      console.log(val + ' at ' + x + ',' + y);
      // console.log(bool);

      this.pause = false;
      this.grid[x][y] = this.copycontent;
      this.grid[this.prevX][this.prevY] = ' ';
      this.role = !this.role;
      if (!this.role) this.user = this.blacks;
      else this.user = this.whites;
      this.reset();
      console.log(this.grid);
    }
  }
  getWhitePawnMoves(x: number, y: number): void {
    console.log('white pawn at ' + x + ',' + y);
    const moves = [];
    if (
      x == 1 &&
      !this.whites.includes(this.grid[x + 1][y]) &&
      !this.blacks.includes(this.grid[x + 1][y])
    ) {
      if (this.grid[x + 1][y] === ' ') {
        moves.push([x + 1, y]);
        this.boolean[x + 1][y] = true;
      }
      if (this.grid[x + 2][y] === ' ') {
        moves.push([x + 2, y]);
        this.boolean[x + 2][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x + 1][y + 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y + 1])
      ) {
        moves.push([x + 1, y + 1]);
        this.boolean[x + 1][y + 1] = true;
      }
      if (
        y - 1 >= 0 &&
        this.grid[x + 1][y - 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y - 1])
      ) {
        moves.push([x + 1, y - 1]);
        this.boolean[x + 1][y - 1] = true;
      }
    } else if (
      x + 1 <
      8
      // && !this.whites.includes(this.grid[x + 1][y]) &&
      // !this.blacks.includes(this.grid[x + 1][y])
    ) {
      if (this.grid[x + 1][y] === ' ') {
        moves.push([x + 1, y]);
        this.boolean[x + 1][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x + 1][y + 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y + 1])
      ) {
        moves.push([x + 1, y + 1]);
        this.boolean[x + 1][y + 1] = true;
      }
      if (
        y - 1 >= 0 &&
        this.grid[x + 1][y - 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y - 1])
      ) {
        moves.push([x + 1, y - 1]);
        this.boolean[x + 1][y - 1] = true;
      }
    }
    this.whitePawnMoves = moves;
    console.log(moves);
  }
  getBlackPawnMoves(x: number, y: number): void {
    console.log('black pawn at ' + x + ',' + y);
    const moves = [];
    if (
      x == 6 &&
      !this.whites.includes(this.grid[x - 1][y]) &&
      !this.blacks.includes(this.grid[x - 1][y])
    ) {
      if (this.grid[x - 1][y] === ' ') {
        moves.push([x - 1, y]);
        this.boolean[x - 1][y] = true;
      }
      if (this.grid[x - 2][y] === ' ') {
        moves.push([x - 2, y]);
        this.boolean[x - 2][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x - 1][y + 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y + 1])
      ) {
        moves.push([x - 1, y + 1]);
        this.boolean[x - 1][y + 1] = true;
      }
      if (
        y - 1 >= 0 &&
        this.grid[x - 1][y - 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y - 1])
      ) {
        moves.push([x - 1, y - 1]);
        this.boolean[x - 1][y - 1] = true;
      }
    } else if (
      x - 1 >=
      0
      // && !this.whites.includes(this.grid[x - 1][y]) &&
      // !this.blacks.includes(this.grid[x - 1][y])
    ) {
      if (this.grid[x - 1][y] === ' ') {
        moves.push([x - 1, y]);
        this.boolean[x - 1][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x - 1][y + 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y + 1])
      ) {
        moves.push([x - 1, y + 1]);
        this.boolean[x - 1][y + 1] = true;
      }
      if (
        y - 1 >= 0 &&
        this.grid[x - 1][y - 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y - 1])
      ) {
        moves.push([x - 1, y - 1]);
        this.boolean[x - 1][y - 1] = true;
      }
    }
    this.blackPawnMoves = moves;
    console.log(moves);
  }
  getBlackKingMoves(x: number, y: number) {}
}
