<script lang="ts">
    import { page } from "$app/stores";
    import { store } from "./references.ts";

    export let ref: string;
    export let src: string;
    export let text: string;
    export let alt = text;

    const slug = $page.url.pathname.split("/").slice(-1);
    const path = "/images/articles/" + slug + "/" + src;

    let index = 0;
    store.add(ref, "figure")
    store.subscribe((value) => {
        index = value["figure"].indexOf(ref) + 1;
    });
</script>

<div class="figure" id={ref}>
    <img src="{path}" alt="{alt}"/>
    <p><b>Figure {index}</b>: {text}</p>
</div>

<style>
    .figure {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem 0;
    }
    p {
        padding-top: 1rem;
    }
    img {
        width: 50%;
        height: auto;
    }

    @media (max-width: 900px) {
        img {
            width: 80%;
        }
    }
    @media (max-width: 600px) {
        img {
            width: 100%;
        }
    }
</style>