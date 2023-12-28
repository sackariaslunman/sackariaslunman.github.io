<script lang="ts">
    import type { Cell } from './minesweeper.js';
    export let cell: Cell;
    export let onClickCell: (x: number, y: number) => void;
    export let onFlagCell: (x: number, y: number) => void;

    const cellClasses: string[] = [
        'empty',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'mine',
        'flag',
    ];
    let classIndex: number;

    $: {
        classIndex = cell.isMine ? 9 : cell.isFlagged ? 10 : cell.neighbor;
    }

    function onContextMenu(event: MouseEvent, x: number, y: number) {
        event.preventDefault();
        onFlagCell(x, y);
    }
</script>

<button 
    on:click={() => onClickCell(cell.x, cell.y)} 
    on:contextmenu={(event) => onContextMenu(event, cell.x, cell.y)}
    class={cell.isRevealed ? cellClasses[classIndex] : 'hidden'}
>
    {#if cell.isRevealed}
        {#if cell.isMine}
            <!-- <img src="./mine.png" alt="Mine" /> -->
            M
        {:else}
            {cell.neighbor > 0 ? cell.neighbor : ''}
        {/if}
    {:else}
        {#if cell.isFlagged}
            <!-- <img src="./flag.png" alt="Flag" /> -->
            F
        {/if}
    {/if}
</button>

<style>
    button {
        width: 2rem;
        height: 2rem;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ccc;
    }
    button:hover {
        background-color: #aaa;
    }
    .hidden {
        background-color: #eee;
    }
    .hidden:hover {
        background-color: #ddd;
    }
    .empty {
        background-color: #ccc;
    }
    .one {
        color: blue;
    }
    .two {
        color: green;
    }
    .three {
        color: red;
    }
    .four {
        color: darkblue;
    }
    .five {
        color: maroon;
    }
    .six {
        color: cadetblue;
    }
    .seven {
        color: black;
    }   
    .eight {
        color: gray;
    }
    .mine {
        color: orange;
        background-color: #eee;
    }
    .flag {
        color: black;
        background-color: #eee;
    }

</style>