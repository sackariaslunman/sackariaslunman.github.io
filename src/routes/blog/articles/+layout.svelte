<script lang="ts">
    import { getArticle } from "$lib/articles";
    import { page } from "$app/stores";
    import PyScript from "$lib/components/PyScript.svelte";

    const path = $page.url.pathname;
    const article = getArticle(path);
</script>

{#if article}
    {#if article.use_pyscript}
        <PyScript />
    {/if}

    <div class="article">
        <div class="article-header">
            <img class="thumbnail" src="/images/thumbnails/{article.thumbnail}" alt="{article.title}" />

            <h1>{article.title}</h1>
        </div>
        
        <div class="article-body">
            <slot/>
        </div>

    </div>

{:else}
    <h1>404</h1>
    <p>Article not found :(</p>
{/if}

<style>
    .article {
        padding: 1rem;
    }
    .article-header {
        text-align: center;
        width: 70%;
        margin: 0 auto;
    }
    .article-body {
        width: 60%;
        margin: 0 auto;
    }
    .thumbnail {
        width: 100%;
        height: auto;
        border-radius: 0.5rem;
    }
    h1 {
        padding: 2rem 0;
    }

    @media (max-width: 900px) {
        .article {
            padding: 0;
        }
        .article-header {
            width: 80%;
        }
        .article-body {
            width: 80%;
        }
    }
    @media (max-width: 600px) {
        .article {
            padding: 0;
        }
        .article-header {
            width: 100%;
        }
        .article-body {
            width: 100%;
        }
    }
</style>