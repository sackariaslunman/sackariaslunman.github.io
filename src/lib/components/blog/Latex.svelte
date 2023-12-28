<script>
    import Katex from 'svelte-katex';
    export let displayMode = false;
    export let math = "";
</script>

<Katex {displayMode}>
    {math}
</Katex>