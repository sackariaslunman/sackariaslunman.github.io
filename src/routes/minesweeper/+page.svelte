<script lang='ts'>
    import type { GameState} from './minesweeper';
    import { createEmptyBoard, createBoard, revealCell, flagCell, updateGameState, GameStatus} from './minesweeper';
    import CellContainer from './cellcontainer.svelte';
    import type { Writable } from 'svelte/store';
    import { writable } from 'svelte/store';
    
    let rows = 9;
    let columns = 9;
    let mines = 10;
    
    let initBoard = createEmptyBoard(rows, columns);
    
    let gameState = {
        board: initBoard,
        status: GameStatus.INIT,
        revealedCount: 0,
    }

    let setBoard: Writable<GameState> = writable(gameState);

    setBoard.subscribe(val => {
        gameState = val;
    });

    function onClickCell(x: number, y: number) {
        if (gameState.status === GameStatus.INIT) {
            gameState.board = createBoard(x, y, rows, columns, mines);
            gameState.status = GameStatus.RUNNING;
            setBoard.set(gameState);
        }

        if (gameState.status !== GameStatus.RUNNING) {
            return;
        }
        const cell = gameState.board[x][y];

        if (cell.isRevealed) {
            return;
        }
        gameState.board = revealCell(gameState.board, cell);
        gameState = updateGameState(gameState);
        setBoard.set(gameState);
    }

    function onFlagClick(x: number, y: number) {
        if (gameState.status !== GameStatus.RUNNING) {
            return;
        }

        const cell = gameState.board[x][y];
        if (cell.isRevealed) {
            return;
        }
        gameState.board = flagCell(gameState.board, cell);
        gameState = updateGameState(gameState);
        setBoard.set(gameState);
    }

</script>

<div class="board">
    {#each gameState.board as row}
        <div class="row">
            {#each row as cell}
                <CellContainer 
                    cell={cell} 
                    onClickCell={onClickCell} 
                    onFlagCell={onFlagClick} 
                />
            {/each}
        </div>
    {/each}
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
</style>