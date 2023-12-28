<script lang="ts">
    export let text: string;
    export let href: string;
    export let src: string;
    export let width = "25";
    export let height = "25";
    export let alt = "Icon";
</script>


<a {href}>
    <div>
        <p>{text}</p>
        <img src={src} {alt} {width} {height} />
    </div>
</a>


<style>
    a {
        text-decoration: none;
        color: black;
    }
    div {
        display: flex;
        flex-direction: row;
        place-content: center;
        place-items: center;
        padding: 0 0.5rem;
    }
    p {
        font-size: small;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
    }
</style>


