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
    // console.log(this.boolean);

    if (bool == false) {
      if (this.role) this.user = this.whites;
      else this.user = this.blacks;

      this.copycontent = val;
      // console.log(this.boolean);

      this.prevX = x;
      this.prevY = y;
      // console.log(val + ' at ' + x + ',' + y);
      this.pause = true;

      this.reset();

      if (val === 'p') {
        this.getWhitePawnMoves(x, y);
      } else if (val === 'P') {
        this.getBlackPawnMoves(x, y);
      } else if (val === 'K') {
        this.getBlackKingMoves(x, y);
      } else if (val === 'r') {
        this.getWhiteRookMoves(x, y);
      } else if (val === 'R') {
        this.getBlackRookMoves(x, y);
      } else if (val === 'b') {
        this.getWhiteBishopMoves(x, y);
      } else if (val === 'B') {
        this.getBlackBishopMoves(x, y);
      } else if (val === 'q') {
        this.getWhiteQueenMoves(x, y);
      } else if (val === 'Q') {
        this.getBlackQueenMoves(x, y);
      } else if (val === 'k') {
        this.getWhiteKingMoves(x, y);
      } else if (val === 'K') {
        this.getBlackKingMoves(x, y);
      } else if (val === 'n') {
        this.getWhiteKnightMoves(x, y);
      } else if (val === 'N') {
        this.getBlackKnightMoves(x, y);
      }
    } else {
      // console.log(val + ' at ' + x + ',' + y);
      // console.log(bool);

      this.pause = false;
      this.grid[x][y] = this.copycontent;
      this.grid[this.prevX][this.prevY] = ' ';
      this.role = !this.role;
      if (!this.role) this.user = this.blacks;
      else this.user = this.whites;
      this.reset();
      // console.log(this.grid);
    }
  }
  getWhitePawnMoves(x: number, y: number): void {
    // console.log('white pawn at ' + x + ',' + y);
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
    // this.whitePawnMoves = moves;
    // console.log(moves);
  }
  getBlackPawnMoves(x: number, y: number): void {
    // console.log('black pawn at ' + x + ',' + y);
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
    // console.log(moves);
  }
  getBlackKingMoves(x: number, y: number) {}

  getWhiteRookMoves(x: number, y: number) {
    // top
    if (x - 1 >= 0) {
      for (let i = x - 1; i >= 0; i--) {
        if (this.grid[i][y] === ' ') {
          this.boolean[i][y] = true;
        } else {
          if (!this.whites.includes(this.grid[i][y])) {
            this.boolean[i][y] = true;
          }
          break;
        }
      }
    }
    // right
    if (y + 1 < 8) {
      for (let j = y + 1; j < 8; j++) {
        if (this.grid[x][j] === ' ') {
          this.boolean[x][j] = true;
        } else {
          if (!this.whites.includes(this.grid[x][j])) {
            this.boolean[x][j] = true;
          }
          break;
        }
      }
    }
    // bottom

    if (x + 1 < 8) {
      for (let i = x + 1; i < 8; i++) {
        if (this.grid[i][y] === ' ') {
          this.boolean[i][y] = true;
        } else {
          if (!this.whites.includes(this.grid[i][y])) {
            this.boolean[i][y] = true;
          }
          break;
        }
      }
    }
    // left
    if (y - 1 >= 0) {
      for (let j = y - 1; j >= 0; j--) {
        if (this.grid[x][j] === ' ') {
          this.boolean[x][j] = true;
        } else {
          if (!this.whites.includes(this.grid[x][j])) {
            this.boolean[x][j] = true;
          }
          break;
        }
      }
    }

    console.log(this.boolean);
  }

  getBlackRookMoves(x: number, y: number) {
    // top
    if (x - 1 >= 0) {
      for (let i = x - 1; i >= 0; i--) {
        if (this.grid[i][y] === ' ') {
          this.boolean[i][y] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][y])) {
            this.boolean[i][y] = true;
          }
          break;
        }
      }
    }
    // right
    if (y + 1 < 8) {
      for (let j = y + 1; j < 8; j++) {
        if (this.grid[x][j] === ' ') {
          this.boolean[x][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[x][j])) {
            this.boolean[x][j] = true;
          }
          break;
        }
      }
    }
    // bottom

    if (x + 1 < 8) {
      for (let i = x + 1; i < 8; i++) {
        if (this.grid[i][y] === ' ') {
          this.boolean[i][y] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][y])) {
            this.boolean[i][y] = true;
          }
          break;
        }
      }
    }
    // left
    if (y - 1 >= 0) {
      for (let j = y - 1; j >= 0; j--) {
        if (this.grid[x][j] === ' ') {
          this.boolean[x][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[x][j])) {
            this.boolean[x][j] = true;
          }
          break;
        }
      }
    }

    console.log(this.boolean);
  }

  getWhiteBishopMoves(x: number, y: number) {
    // top right
    if (x - 1 >= 0 && y + 1 < 8) {
      for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // right bottom
    if (y + 1 < 8 && x + 1 < 8) {
      for (let j = y + 1, i = x + 1; j < 8 && i < 8; j++, i++) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // left bottom

    if (x + 1 < 8 && y - 1 >= 0) {
      for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // top left
    if (y - 1 >= 0 && x - 1 >= 0) {
      for (let j = y - 1, i = x - 1; j >= 0 && i >= 0; j--, i--) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }

    // console.log(this.boolean);
  }

  getBlackBishopMoves(x: number, y: number) {
    // top right
    if (x - 1 >= 0 && y + 1 < 8) {
      for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // right bottom
    if (y + 1 < 8 && x + 1 < 8) {
      for (let j = y + 1, i = x + 1; j < 8 && i < 8; j++, i++) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // left bottom

    if (x + 1 < 8 && y - 1 >= 0) {
      for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // top left
    if (y - 1 >= 0 && x - 1 >= 0) {
      for (let j = y - 1, i = x - 1; j >= 0 && i >= 0; j--, i--) {
        console.log(i, j);

        if (this.grid[i][j] === ' ') {
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }

    console.log(this.boolean);
  }

  getWhiteQueenMoves(x: number, y: number) {
    this.getWhiteRookMoves(x, y);
    this.getWhiteBishopMoves(x, y);
  }

  getBlackQueenMoves(x: number, y: number) {
    this.getBlackRookMoves(x, y);
    this.getBlackBishopMoves(x, y);
  }

  getWhiteKingMoves(x: number, y: number) {
    if (x - 1 >= 0) {
      if (this.grid[x - 1][y] === ' ') {
        this.boolean[x - 1][y] = true;
      } else {
        if (!this.whites.includes(this.grid[x - 1][y])) {
          this.boolean[x - 1][y] = true;
        }
      }
    }
    // right
    if (y + 1 < 8) {
      if (this.grid[x][y + 1] === ' ') {
        this.boolean[x][y + 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x][y + 1])) {
          this.boolean[x][y + 1] = true;
        }
      }
    }
    // bottom

    if (x + 1 < 8) {
      if (this.grid[x + 1][y] === ' ') {
        this.boolean[x + 1][y] = true;
      } else {
        if (!this.whites.includes(this.grid[x + 1][y])) {
          this.boolean[x + 1][y] = true;
        }
      }
    }
    // left
    if (y - 1 >= 0) {
      if (this.grid[x][y - 1] === ' ') {
        this.boolean[x][y - 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x][y - 1])) {
          this.boolean[x][y - 1] = true;
        }
      }
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      if (this.grid[x - 1][y + 1] === ' ') {
        this.boolean[x - 1][y + 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x - 1][y + 1])) {
          this.boolean[x - 1][y + 1] = true;
        }
      }
    }
    // right bottom
    if (y + 1 < 8 && x + 1 < 8) {
      if (this.grid[x + 1][y + 1] === ' ') {
        this.boolean[x + 1][y + 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x + 1][y + 1])) {
          this.boolean[x + 1][y + 1] = true;
        }
      }
    }
    // left bottom

    if (x + 1 < 8 && y - 1 >= 0) {
      if (this.grid[x + 1][y - 1] === ' ') {
        this.boolean[x + 1][y - 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x + 1][y - 1])) {
          this.boolean[x + 1][y - 1] = true;
        }
      }
    }
    // top left
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (this.grid[x - 1][y - 1] === ' ') {
        this.boolean[x - 1][y - 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x - 1][y - 1])) {
          this.boolean[x - 1][y - 1] = true;
        }
      }
    }
  }

  getBlackKnightMoves(x: number, y: number) {
    // top left right
    if (x - 2 >= 0) {
      if (y - 1 >= 0) {
        if (
          this.grid[x - 2][y - 1] === ' ' ||
          !this.blacks.includes(this.grid[x - 2][y - 1])
        ) {
          this.boolean[x - 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x - 2][y + 1] === ' ' ||
          !this.blacks.includes(this.grid[x - 2][y + 1])
        ) {
          this.boolean[x - 2][y + 1] = true;
        }
      }
    }

    // top right left
    if (x + 2 < 8) {
      if (y - 1 >= 0) {
        if (
          this.grid[x + 2][y - 1] === ' ' ||
          !this.blacks.includes(this.grid[x + 2][y - 1])
        ) {
          this.boolean[x + 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x + 2][y + 1] === ' ' ||
          !this.blacks.includes(this.grid[x + 2][y + 1])
        ) {
          this.boolean[x + 2][y + 1] = true;
        }
      }
    }
    // left top right
    if (y - 2 >= 0) {
      if (x - 1 >= 0) {
        if (
          this.grid[x - 1][y - 2] === ' ' ||
          !this.blacks.includes(this.grid[x - 1][y - 2])
        ) {
          this.boolean[x - 1][y - 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y - 2] === ' ' ||
          !this.blacks.includes(this.grid[x + 1][y - 2])
        ) {
          this.boolean[x + 1][y - 2] = true;
        }
      }
    }
    // right top left
    if (y + 2 < 8) {
      if (x - 1 >= 0) {
        if (
          this.grid[x - 1][y + 2] === ' ' ||
          !this.blacks.includes(this.grid[x - 1][y + 2])
        ) {
          this.boolean[x - 1][y + 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y + 2] === ' ' ||
          !this.blacks.includes(this.grid[x + 1][y + 2])
        ) {
          this.boolean[x + 1][y + 2] = true;
        }
      }
    }
  }

  getWhiteKnightMoves(x: number, y: number) {
    if (x - 2 >= 0) {
      if (y - 1 >= 0) {
        if (
          this.grid[x - 2][y - 1] === ' ' ||
          !this.whites.includes(this.grid[x - 2][y - 1])
        ) {
          this.boolean[x - 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x - 2][y + 1] === ' ' ||
          !this.whites.includes(this.grid[x - 2][y + 1])
        ) {
          this.boolean[x - 2][y + 1] = true;
        }
      }
    }

    // top right left
    if (x + 2 < 8) {
      if (y - 1 >= 0) {
        if (
          this.grid[x + 2][y - 1] === ' ' ||
          !this.whites.includes(this.grid[x + 2][y - 1])
        ) {
          this.boolean[x + 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x + 2][y + 1] === ' ' ||
          !this.whites.includes(this.grid[x + 2][y + 1])
        ) {
          this.boolean[x + 2][y + 1] = true;
        }
      }
    }
    // left top right
    if (y - 2 >= 0) {
      if (x - 1 >= 0) {
        if (
          this.grid[x - 1][y - 2] === ' ' ||
          !this.whites.includes(this.grid[x - 1][y - 2])
        ) {
          this.boolean[x - 1][y - 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y - 2] === ' ' ||
          !this.whites.includes(this.grid[x + 1][y - 2])
        ) {
          this.boolean[x + 1][y - 2] = true;
        }
      }
    }
    // right top left
    if (y + 2 < 8) {
      if (x - 1 >= 0) {
        if (
          this.grid[x - 1][y + 2] === ' ' ||
          !this.whites.includes(this.grid[x - 1][y + 2])
        ) {
          this.boolean[x - 1][y + 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y + 2] === ' ' ||
          !this.whites.includes(this.grid[x + 1][y + 2])
        ) {
          this.boolean[x + 1][y + 2] = true;
        }
      }
    }
  }
}
