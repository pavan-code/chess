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
  whitePaths: string[] = [];
  blacks: string[] = ['R', 'N', 'B', 'K', 'Q', 'P'];
  blackPaths: string[] = [];
  user: string[] = this.whites;
  role: boolean = true;
  paths: string[] = [];
  ngOnInit(): void {
    if (this.role) this.paths = this.blackPaths;
    else this.paths = this.whitePaths;
    // console.log('paths: ' + this.paths);
  }

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
      console.warn('after copied: ' + this.paths);

      this.copycontent = val;

      if (this.role) this.user = this.whites;
      else this.user = this.blacks;

      this.paths = [];

      if (!this.role) {
        this.user = this.blacks;
        // this.paths = this.whitePaths;
        this.paths = this.getAllWhiteMoves();
      } else {
        this.user = this.whites;
        // this.paths = this.blackPaths;
        this.paths = this.getAllBlackMoves();
      }

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

      this.paths = [];
      if (!this.role) {
        this.user = this.blacks;
        // this.paths = this.whitePaths;
        this.paths = this.getAllWhiteMoves();
      } else {
        this.user = this.whites;
        // this.paths = this.blackPaths;
        this.paths = this.getAllBlackMoves();
      }
      console.error('after kept: ' + this.paths);

      // this.blackPaths = [];
      // this.whitePaths = [];

      // this.getAllWhiteMoves();

      // this.getAllBlackMoves();
      this.reset();
      // console.log(this.grid);
    }
  }

  getAllWhiteMoves() {
    this.whitePaths = [];
    let moves: number[][] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.grid[i][j] === 'p') {
          moves = this.getWhitePawnMoves(i, j);
          this.copyToWhite(moves);
          console.log('w pawns:' + moves);
        }
        // else if (this.grid[i][j] === 'r') {
        //   moves = this.getWhiteRookMoves(i, j);
        //   this.copyToWhite(moves);
        //   console.log('w rooks: ' + moves);
        // }
        // else if (this.grid[i][j] === 'b') {
        //   moves = this.getWhiteBishopMoves(i, j);
        //   this.copyToWhite(moves);
        //   console.log('bishops: ' + moves);
        // } else if (this.grid[i][j] === 'q') {
        //   moves = this.getWhiteQueenMoves(i, j);
        //   this.copyToWhite(moves);
        //   console.log('queens: ' + moves);
        // }
        else if (this.grid[i][j] === 'k') {
          moves = this.getWhiteKingMoves(i, j);
          this.copyToWhite(moves);
          console.log('w kings: ' + moves);
        }
        // else if (this.grid[i][j] === 'n') {
        //   moves = this.getWhiteKnightMoves(i, j);
        //   this.copyToWhite(moves);
        //   console.log('knights: ' + moves);
        // }
      }
    }
    console.log('whites:' + this.whitePaths);
    return this.whitePaths;
  }

  copyToWhite(moves: number[][]) {
    for (let i = 0; i < moves.length; i++) {
      let val = moves[i][0].toString() + moves[i][1].toString();
      if (!this.whitePaths.includes(val)) this.whitePaths.push(val);
    }
  }

  copyToBlack(moves: number[][]) {
    for (let i = 0; i < moves.length; i++) {
      let val = moves[i][0].toString() + moves[i][1].toString();
      if (!this.blackPaths.includes(val)) this.blackPaths.push(val);
    }
  }

  getAllBlackMoves() {
    this.blackPaths = [];
    let moves: number[][] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.grid[i][j] === 'P') {
          moves = this.getBlackPawnMoves(i, j);
          this.copyToBlack(moves);
          console.log('b pawns:' + moves);
        }
        // else if (this.grid[i][j] === 'R') {
        //   moves = this.getBlackRookMoves(i, j);
        //   this.copyToBlack(moves);
        //   console.log('rooks: ' + moves);
        // } else if (this.grid[i][j] === 'B') {
        //   moves = this.getBlackBishopMoves(i, j);
        //   this.copyToBlack(moves);
        //   console.log('bishops: ' + moves);
        // } else if (this.grid[i][j] === 'Q') {
        //   moves = this.getBlackQueenMoves(i, j);
        //   this.copyToBlack(moves);
        //   console.log('queens: ' + moves);
        // }
        if (this.grid[i][j] === 'K') {
          moves = this.getBlackKingMoves(i, j);
          this.copyToBlack(moves);
          console.log('b kings: ' + moves);
        }
        // else if (this.grid[i][j] === 'N') {
        //   moves = this.getBlackKnightMoves(i, j);
        //   this.copyToBlack(moves);
        //   console.log('knights: ' + moves);
        // }
      }
    }
    // console.log('blacks:' + this.blackPaths);
    return this.blackPaths;
  }

  getWhitePawnMoves(x: number, y: number): number[][] {
    // console.log('white pawn at ' + x + ',' + y);
    const moves: number[][] = [];
    if (
      x == 1 &&
      !this.whites.includes(this.grid[x + 1][y]) &&
      !this.blacks.includes(this.grid[x + 1][y])
    ) {
      if (this.grid[x + 1][y] === ' ') {
        // moves.push([x + 1, y]);
        this.boolean[x + 1][y] = true;
      }
      if (this.grid[x + 2][y] === ' ') {
        // moves.push([x + 2, y]);
        this.boolean[x + 2][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x + 1][y + 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y + 1])
      ) {
        // if (this.grid[x + 1][y + 1] === 'K') {
        //   moves.push([x + 1, y + 1]);
        // }
        this.boolean[x + 1][y + 1] = true;
      } else if (
        y + 1 < 8 &&
        (this.grid[x + 1][y + 1] === ' ' ||
          this.whites.includes(this.grid[x + 1][y + 1]))
      ) {
        moves.push([x + 1, y + 1]);
      }
      if (
        y - 1 >= 0 &&
        this.grid[x + 1][y - 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y - 1])
      ) {
        // if (this.grid[x + 1][y - 1] === 'K') {
        //   moves.push([x + 1, y - 1]);
        // }
        this.boolean[x + 1][y - 1] = true;
      } else if (
        (y - 1 >= 0 && this.grid[x + 1][y - 1] === ' ') ||
        this.whites.includes(this.grid[x + 1][y - 1])
      ) {
        moves.push([x + 1, y - 1]);
      }
    } else if (
      x + 1 <
      8
      // && !this.whites.includes(this.grid[x + 1][y]) &&
      // !this.blacks.includes(this.grid[x + 1][y])
    ) {
      if (this.grid[x + 1][y] === ' ') {
        // moves.push([x + 1, y]);
        this.boolean[x + 1][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x + 1][y + 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y + 1])
      ) {
        // if (this.grid[x + 1][y + 1] === 'K') {
        // moves.push([x + 1, y + 1]);
        // }
        this.boolean[x + 1][y + 1] = true;
      } else if (
        y + 1 < 8 &&
        this.grid[x + 1][y + 1] !== ' ' &&
        this.whites.includes(this.grid[x + 1][y + 1])
      ) {
        moves.push([x + 1, y + 1]);
      } else if (y + 1 < 8 && this.grid[x + 1][y + 1] === ' ') {
        moves.push([x + 1, y + 1]);
      }
      if (
        y - 1 >= 0 &&
        this.grid[x + 1][y - 1] !== ' ' &&
        !this.whites.includes(this.grid[x + 1][y - 1])
      ) {
        // if (this.grid[x + 1][y - 1] === 'K') {
        // moves.push([x + 1, y - 1]);
        // }
        this.boolean[x + 1][y - 1] = true;
      } else if (
        y - 1 >= 0 &&
        this.grid[x + 1][y - 1] !== ' ' &&
        this.whites.includes(this.grid[x + 1][y - 1])
      ) {
        moves.push([x + 1, y - 1]);
      } else if (y - 1 >= 0 && this.grid[x + 1][y - 1] === ' ') {
        moves.push([x + 1, y - 1]);
      }
    }

    return moves;
    // this.whitePawnMoves = moves;
  }
  getBlackPawnMoves(x: number, y: number): number[][] {
    // console.log('black pawn at ' + x + ',' + y);
    const moves: number[][] = [];
    if (
      x == 6 &&
      !this.whites.includes(this.grid[x - 1][y]) &&
      !this.blacks.includes(this.grid[x - 1][y])
    ) {
      if (this.grid[x - 1][y] === ' ') {
        // moves.push([x - 1, y]);
        this.boolean[x - 1][y] = true;
      }
      if (this.grid[x - 2][y] === ' ') {
        // moves.push([x - 2, y]);
        this.boolean[x - 2][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x - 1][y + 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y + 1])
      ) {
        this.boolean[x - 1][y + 1] = true;
      } else if (
        y + 1 < 8 &&
        (this.grid[x - 1][y + 1] === ' ' ||
          this.blacks.includes(this.grid[x - 1][y + 1]))
      ) {
        moves.push([x - 1, y + 1]);
      }
      if (
        y - 1 >= 0 &&
        this.grid[x - 1][y - 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y - 1])
      ) {
        // moves.push([x - 1, y - 1]);
        this.boolean[x - 1][y - 1] = true;
      } else if (
        (y - 1 >= 0 && this.grid[x - 1][y - 1] === ' ') ||
        this.blacks.includes(this.grid[x - 1][y - 1])
      ) {
        moves.push([x - 1, y - 1]);
      }
    } else if (
      x - 1 >=
      0
      // && !this.whites.includes(this.grid[x - 1][y]) &&
      // !this.blacks.includes(this.grid[x - 1][y])
    ) {
      if (this.grid[x - 1][y] === ' ') {
        // moves.push([x - 1, y]);
        this.boolean[x - 1][y] = true;
      }
      if (
        y + 1 < 8 &&
        this.grid[x - 1][y + 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y + 1])
      ) {
        // moves.push([x - 1, y + 1]);

        this.boolean[x - 1][y + 1] = true;
      } else if (
        y + 1 < 8 &&
        this.grid[x - 1][y + 1] !== ' ' &&
        this.blacks.includes(this.grid[x - 1][y + 1])
      ) {
        moves.push([x - 1, y + 1]);
      } else if (y + 1 < 8 && this.grid[x - 1][y + 1] === ' ') {
        moves.push([x - 1, y + 1]);
      }
      if (
        y - 1 >= 0 &&
        this.grid[x - 1][y - 1] !== ' ' &&
        !this.blacks.includes(this.grid[x - 1][y - 1])
      ) {
        moves.push([x - 1, y - 1]);
        this.boolean[x - 1][y - 1] = true;
      } else if (
        y - 1 >= 0 &&
        this.grid[x - 1][y - 1] !== ' ' &&
        this.blacks.includes(this.grid[x - 1][y - 1])
      ) {
        moves.push([x - 1, y - 1]);
      } else if (y - 1 >= 0 && this.grid[x - 1][y - 1] === ' ') {
        moves.push([x - 1, y - 1]);
      }
    }
    // this.blackPawnMoves = moves;
    return moves;
    // console.log(moves);
  }
  getBlackKingMoves(x: number, y: number): number[][] {
    const moves = [];

    if (x - 1 >= 0) {
      if (this.grid[x - 1][y] === ' ') {
        moves.push([x - 1, y]);
        this.boolean[x - 1][y] = true;
      } else {
        if (!this.blacks.includes(this.grid[x - 1][y])) {
          moves.push([x - 1, y]);
          this.boolean[x - 1][y] = true;
        }
      }
    }
    // right
    if (y + 1 < 8) {
      if (this.grid[x][y + 1] === ' ') {
        moves.push([x, y + 1]);
        this.boolean[x][y + 1] = true;
      } else {
        if (!this.blacks.includes(this.grid[x][y + 1])) {
          moves.push([x, y + 1]);
          this.boolean[x][y + 1] = true;
        }
      }
    }
    // bottom

    if (x + 1 < 8) {
      if (this.grid[x + 1][y] === ' ') {
        moves.push([x + 1, y]);
        this.boolean[x + 1][y] = true;
      } else {
        if (!this.blacks.includes(this.grid[x + 1][y])) {
          moves.push([x + 1, y]);
          this.boolean[x + 1][y] = true;
        }
      }
    }
    // left
    if (y - 1 >= 0) {
      if (this.grid[x][y - 1] === ' ') {
        moves.push([x, y - 1]);
        this.boolean[x][y - 1] = true;
      } else {
        if (!this.blacks.includes(this.grid[x][y - 1])) {
          moves.push([x, y - 1]);
          this.boolean[x][y - 1] = true;
        }
      }
    }
    if (x - 1 >= 0 && y + 1 < 8) {
      if (this.grid[x - 1][y + 1] === ' ') {
        moves.push([x - 1, y + 1]);
        this.boolean[x - 1][y + 1] = true;
      } else {
        if (!this.blacks.includes(this.grid[x - 1][y + 1])) {
          moves.push([x - 1, y + 1]);
          this.boolean[x - 1][y + 1] = true;
        }
      }
    }
    // right bottom
    if (y + 1 < 8 && x + 1 < 8) {
      if (this.grid[x + 1][y + 1] === ' ') {
        moves.push([x + 1, y + 1]);
        this.boolean[x + 1][y + 1] = true;
      } else {
        if (!this.blacks.includes(this.grid[x + 1][y + 1])) {
          moves.push([x + 1, y + 1]);
          this.boolean[x + 1][y + 1] = true;
        }
      }
    }
    // left bottom

    if (x + 1 < 8 && y - 1 >= 0) {
      if (this.grid[x + 1][y - 1] === ' ') {
        moves.push([x + 1, y - 1]);
        this.boolean[x + 1][y - 1] = true;
      } else {
        if (!this.blacks.includes(this.grid[x + 1][y - 1])) {
          moves.push([x + 1, y - 1]);
          this.boolean[x + 1][y - 1] = true;
        }
      }
    }
    // top left
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (this.grid[x - 1][y - 1] === ' ') {
        moves.push([x - 1, y - 1]);
        this.boolean[x - 1][y - 1] = true;
      } else {
        if (!this.blacks.includes(this.grid[x - 1][y - 1])) {
          moves.push([x - 1, y - 1]);
          this.boolean[x - 1][y - 1] = true;
        }
      }
    }
    return moves;
  }

  getWhiteRookMoves(x: number, y: number) {
    const moves = [];
    // top
    if (x - 1 >= 0) {
      for (let i = x - 1; i >= 0; i--) {
        if (this.grid[i][y] === ' ') {
          moves.push([i, y]);
          this.boolean[i][y] = true;
        } else {
          if (!this.whites.includes(this.grid[i][y])) {
            moves.push([i, y]);
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
          moves.push([x, j]);
          this.boolean[x][j] = true;
        } else {
          if (!this.whites.includes(this.grid[x][j])) {
            moves.push([x, j]);
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
          moves.push([i, y]);
          this.boolean[i][y] = true;
        } else {
          if (!this.whites.includes(this.grid[i][y])) {
            moves.push([i, y]);
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
          moves.push([x, j]);
          this.boolean[x][j] = true;
        } else {
          if (!this.whites.includes(this.grid[x][j])) {
            moves.push([x, j]);
            this.boolean[x][j] = true;
          }
          break;
        }
      }
    }
    return moves;
  }

  getBlackRookMoves(x: number, y: number) {
    const moves = [];
    // top
    if (x - 1 >= 0) {
      for (let i = x - 1; i >= 0; i--) {
        if (this.grid[i][y] === ' ') {
          moves.push([i, y]);
          this.boolean[i][y] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][y])) {
            if (this.grid[i][y] === 'k') {
              for (let k = i - 1; i >= 0; i--) {
                if (this.grid[k][y] === ' ') {
                  moves.push([k, y]);
                } else {
                  break;
                }
              }
            }
            moves.push([i, y]);
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
          moves.push([x, j]);
          this.boolean[x][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[x][j])) {
            if (this.grid[x][j] === 'k') {
              for (let k = j + 1; k < 8; k++) {
                if (this.grid[x][k] === ' ') {
                  moves.push([x, k]);
                } else {
                  break;
                }
              }
            }
            moves.push([x, j]);
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
          moves.push([i, y]);
          this.boolean[i][y] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][y])) {
            if (this.grid[i][y] === 'k') {
              for (let k = i + 1; k < 8; k++) {
                if (this.grid[k][y] === ' ') {
                  moves.push([k, y]);
                } else {
                  break;
                }
              }
            }
            moves.push([i, y]);
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
          moves.push([x, j]);
          this.boolean[x][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[x][j])) {
            if (this.grid[x][j] === 'k') {
              for (let k = j - 1; k >= 0; k--) {
                if (this.grid[x][k] === ' ') {
                  moves.push([x, k]);
                } else {
                  break;
                }
              }
            }
            moves.push([x, j]);
            this.boolean[x][j] = true;
          }
          break;
        }
      }
    }
    return moves;
  }

  getWhiteBishopMoves(x: number, y: number) {
    const moves = [];
    // top right
    if (x - 1 >= 0 && y + 1 < 8) {
      for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
        if (this.grid[i][j] === ' ') {
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            moves.push([i, j]);
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
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            moves.push([i, j]);
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
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            moves.push([i, j]);
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
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.whites.includes(this.grid[i][j])) {
            moves.push([i, j]);
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    return moves;
    // console.log(this.boolean);
  }

  getBlackBishopMoves(x: number, y: number) {
    const moves = [];
    // top right
    if (x - 1 >= 0 && y + 1 < 8) {
      for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
        if (this.grid[i][j] === ' ') {
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            moves.push([i, j]);
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
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            moves.push([i, j]);
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
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            moves.push([i, j]);
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    // top left
    if (y - 1 >= 0 && x - 1 >= 0) {
      for (let j = y - 1, i = x - 1; j >= 0 && i >= 0; j--, i--) {
        // console.log(i, j);

        if (this.grid[i][j] === ' ') {
          moves.push([i, j]);
          this.boolean[i][j] = true;
        } else {
          if (!this.blacks.includes(this.grid[i][j])) {
            moves.push([i, j]);
            this.boolean[i][j] = true;
          }
          break;
        }
      }
    }
    return moves;
  }

  getWhiteQueenMoves(x: number, y: number) {
    const moves: number[][] = [];

    let move = this.getWhiteRookMoves(x, y);
    move.forEach((element) => {
      moves.push(element);
    });
    move = this.getWhiteBishopMoves(x, y);
    move.forEach((element) => {
      moves.push(element);
    });
    return moves;
  }

  getBlackQueenMoves(x: number, y: number) {
    const moves: number[][] = [];

    let move = this.getBlackRookMoves(x, y);
    move.forEach((element) => {
      moves.push(element);
    });
    move = this.getBlackBishopMoves(x, y);
    move.forEach((element) => {
      moves.push(element);
    });
    return moves;
  }

  getWhiteKingMoves(x: number, y: number) {
    const moves: number[][] = [];
    // top
    if (x - 1 >= 0) {
      if (this.grid[x - 1][y] === ' ') {
        moves.push([x - 1, y]);
        this.boolean[x - 1][y] = true;
      } else {
        if (!this.whites.includes(this.grid[x - 1][y])) {
          moves.push([x - 1, y]);
          this.boolean[x - 1][y] = true;
        }
      }
    }
    // right
    if (y + 1 < 8) {
      if (this.grid[x][y + 1] === ' ') {
        moves.push([x, y + 1]);
        this.boolean[x][y + 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x][y + 1])) {
          moves.push([x, y + 1]);
          this.boolean[x][y + 1] = true;
        }
      }
    }
    // bottom

    if (x + 1 < 8) {
      if (this.grid[x + 1][y] === ' ') {
        moves.push([x + 1, y]);
        this.boolean[x + 1][y] = true;
      } else {
        if (!this.whites.includes(this.grid[x + 1][y])) {
          moves.push([x + 1, y]);
          this.boolean[x + 1][y] = true;
        }
      }
    }
    // left
    if (y - 1 >= 0) {
      if (this.grid[x][y - 1] === ' ') {
        moves.push([x, y - 1]);
        this.boolean[x][y - 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x][y - 1])) {
          moves.push([x, y - 1]);
          this.boolean[x][y - 1] = true;
        }
      }
    }
    // top right
    if (x - 1 >= 0 && y + 1 < 8) {
      if (this.grid[x - 1][y + 1] === ' ') {
        moves.push([x - 1, y + 1]);
        this.boolean[x - 1][y + 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x - 1][y + 1])) {
          moves.push([x - 1, y + 1]);
          this.boolean[x - 1][y + 1] = true;
        }
      }
    }
    // right bottom
    if (y + 1 < 8 && x + 1 < 8) {
      if (this.grid[x + 1][y + 1] === ' ') {
        moves.push([x + 1, y + 1]);
        this.boolean[x + 1][y + 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x + 1][y + 1])) {
          moves.push([x + 1, y + 1]);
          this.boolean[x + 1][y + 1] = true;
        }
      }
    }
    // left bottom

    if (x + 1 < 8 && y - 1 >= 0) {
      if (this.grid[x + 1][y - 1] === ' ') {
        moves.push([x + 1, y - 1]);
        this.boolean[x + 1][y - 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x + 1][y - 1])) {
          moves.push([x + 1, y - 1]);
          this.boolean[x + 1][y - 1] = true;
        }
      }
    }
    // top left
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (this.grid[x - 1][y - 1] === ' ') {
        moves.push([x - 1, y - 1]);
        this.boolean[x - 1][y - 1] = true;
      } else {
        if (!this.whites.includes(this.grid[x - 1][y - 1])) {
          moves.push([x - 1, y - 1]);
          this.boolean[x - 1][y - 1] = true;
        }
      }
    }
    return moves;
  }

  getBlackKnightMoves(x: number, y: number) {
    const moves: number[][] = [];
    // top left right

    if (x - 2 >= 0) {
      if (y - 1 >= 0) {
        if (
          this.grid[x - 2][y - 1] === ' ' ||
          !this.blacks.includes(this.grid[x - 2][y - 1])
        ) {
          moves.push([x - 2, y - 1]);
          this.boolean[x - 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x - 2][y + 1] === ' ' ||
          !this.blacks.includes(this.grid[x - 2][y + 1])
        ) {
          moves.push([x - 2, y + 1]);
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
          moves.push([x + 2, y - 1]);
          this.boolean[x + 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x + 2][y + 1] === ' ' ||
          !this.blacks.includes(this.grid[x + 2][y + 1])
        ) {
          moves.push([x + 2, y + 1]);
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
          moves.push([x - 1, y - 2]);
          this.boolean[x - 1][y - 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y - 2] === ' ' ||
          !this.blacks.includes(this.grid[x + 1][y - 2])
        ) {
          moves.push([x + 1, y - 2]);
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
          moves.push([x - 1, y + 2]);
          this.boolean[x - 1][y + 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y + 2] === ' ' ||
          !this.blacks.includes(this.grid[x + 1][y + 2])
        ) {
          moves.push([x + 1, y + 2]);
          this.boolean[x + 1][y + 2] = true;
        }
      }
    }
    return moves;
  }

  getWhiteKnightMoves(x: number, y: number) {
    const moves: number[][] = [];
    if (x - 2 >= 0) {
      if (y - 1 >= 0) {
        if (
          this.grid[x - 2][y - 1] === ' ' ||
          !this.whites.includes(this.grid[x - 2][y - 1])
        ) {
          moves.push([x - 2, y - 1]);
          this.boolean[x - 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x - 2][y + 1] === ' ' ||
          !this.whites.includes(this.grid[x - 2][y + 1])
        ) {
          moves.push([x - 2, y + 1]);
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
          moves.push([x + 2, y - 1]);
          this.boolean[x + 2][y - 1] = true;
        }
      }
      if (y + 1 < 8) {
        if (
          this.grid[x + 2][y + 1] === ' ' ||
          !this.whites.includes(this.grid[x + 2][y + 1])
        ) {
          moves.push([x + 2, y + 1]);
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
          moves.push([x - 1, y - 2]);
          this.boolean[x - 1][y - 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y - 2] === ' ' ||
          !this.whites.includes(this.grid[x + 1][y - 2])
        ) {
          moves.push([x + 1, y - 2]);
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
          moves.push([x - 1, y + 2]);
          this.boolean[x - 1][y + 2] = true;
        }
      }
      if (x + 1 < 8) {
        if (
          this.grid[x + 1][y + 2] === ' ' ||
          !this.whites.includes(this.grid[x + 1][y + 2])
        ) {
          moves.push([x + 1, y + 2]);
          this.boolean[x + 1][y + 2] = true;
        }
      }
    }
    return moves;
  }
}
