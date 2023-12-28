<script lang="ts">
    import { getArticles } from "$lib/articles";

    const articles = getArticles();
</script>

<h1>Blog</h1>

<p>Here you can find me writing about coding and engineering that I've been delving into recently.</p>

<div class="articles">
    {#each articles as article}
        <div class="article">
            {#if article.external}
                <a class="article" href="{article.href}">
                    <img class="thumbnail" src="/images/thumbnails/{article.thumbnail}" alt="{article.title}" />
                    <h2>{article.title}</h2>
                </a>
            {:else}
                <a class="article" href="/blog/articles/{article.slug}">
                    <img class="thumbnail" src="/images/thumbnails/{article.thumbnail}" alt="{article.title}" />
                    <h2>{article.title}</h2>
                </a>
            {/if}
        </div>
    {/each}
</div>

<style>
    h1 {
        padding-bottom: 1rem;
    }
    div.articles {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        gap: 1rem;
        padding: 1rem 0;
    }
    div.article {
        padding: 1rem;
        place-content: center;
        border-radius: 1rem;
    }
    div.article:hover {
        background-color: #f0f0f0;
        transition: background-color 0.2s;
    }
    img.thumbnail {
        width: 100%;
        height: auto;
    }
    a.article {
        text-decoration: none;
        color: black;
    }
    a.article:hover {
        color: grey;
    }

    @media (max-width: 600px) {
        div.articles {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
    }
</style>