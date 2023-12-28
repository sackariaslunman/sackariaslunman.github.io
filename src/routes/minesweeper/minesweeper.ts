export interface Cell {
    x: number;
    y: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighbor: number;
}

export type Board = Cell[][];

export enum GameStatus {
    INIT = 'INIT',
    WON = 'WON',
    LOST = 'LOST',
    RUNNING = 'RUNNING'
}

export interface GameState {
    revealedCount: number;
    board: Board;
    status: GameStatus;
}

export function createEmptyBoard(rows: number, cols: number) {
    let board: Board = [];
    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < cols; j++) {
            const cell: Cell = {
                x: i,
                y: j,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighbor: 0
            };
            board[i].push(cell);
        }
    }
    return board;
}

export function createBoard(safe_x: number, safe_y: number, rows: number, cols: number, mines: number) {
    let board = createEmptyBoard(rows, cols);
    board = plantMines(safe_x, safe_y, board, rows, cols, mines);
    board = getNeighbors(board, rows, cols);
    return board;
}

function plantMines(safe_x: number, safe_y: number, board: Board, rows: number, cols: number, mines: number) {
    let randomRow: number, randomCol: number, minesPlanted = 0;
    while (minesPlanted < mines) {
        randomRow = Math.floor(Math.random() * rows);
        randomCol = Math.floor(Math.random() * cols);
        if (randomRow != safe_y && randomCol != safe_x && !board[randomRow][randomCol].isMine) {
            board[randomRow][randomCol].isMine = true;
            minesPlanted++;
        }
    }
    return board;
}

function getNeighbors(board: Board, rows: number, cols: number) {
    let updatedBoard = board;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            updatedBoard[i][j].neighbor = getNeighborCount(board, i, j, rows, cols);
        }
    }
    return updatedBoard;
}

function getNeighborCount(board: Board, x: number, y: number, rows: number, cols: number) {
    let count = 0;
    const neighbors = [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1], [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
    ];
    neighbors.forEach(neighbor => {
        const i = neighbor[0];
        const j = neighbor[1];
        if (i >= 0 && i < rows && j >= 0 && j < cols) {
            if (board[i][j].isMine) {
                count++;
            }
        }
    });
    return count;
}

export function revealCell(board: Board, cell: Cell) {
    let updatedBoard = board;

    updatedBoard[cell.x][cell.y].isRevealed = true;
    if (cell.neighbor === 0) {
        updatedBoard = revealNearby(updatedBoard, cell);
    }
    
    return updatedBoard;
}

export function flagCell(board: Board, cell: Cell) {
    let updatedBoard = board;
    updatedBoard[cell.x][cell.y].isFlagged = !cell.isFlagged;
    return updatedBoard;
}

function revealNearby(board: Board, cell: Cell) {
    const neighbors = [
        [cell.x - 1, cell.y - 1], [cell.x - 1, cell.y], [cell.x - 1, cell.y + 1],
        [cell.x, cell.y - 1], [cell.x, cell.y + 1],
        [cell.x + 1, cell.y - 1], [cell.x + 1, cell.y], [cell.x + 1, cell.y + 1]
    ];
    neighbors.forEach(neighbor => {
        const i = neighbor[0];
        const j = neighbor[1];
        if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
            if (!board[i][j].isRevealed && !board[i][j].isMine) {
                board[i][j].isRevealed = true;
                if (board[i][j].neighbor === 0) {
                    board = revealNearby(board, board[i][j]);
                }
            }
        }
    });
    return board;
}

export function updateGameState(gameState: GameState) {
    if (gameState.status !== GameStatus.RUNNING) {
        return gameState;
    }

    let updatedGameState = gameState;
    let revealedCount = 0;
    let status: GameStatus = GameStatus.RUNNING;
    let unrevealedCount = 0;

    gameState.board.forEach(row => {
        row.forEach(cell => {
            if (cell.isRevealed) {
                revealedCount++;

                if (cell.isMine) {
                    status = GameStatus.LOST;
                }
            }
            else if (!cell.isMine) {
                unrevealedCount++;
            }
        });
    });

    if (unrevealedCount === 0) {
        status = GameStatus.WON;
    }

    if (status !== GameStatus.RUNNING) {
        updatedGameState.board.forEach(row => {
            row.forEach(cell => {
                cell.isRevealed = true;
            });
        });
    }
    return updatedGameState;
}
