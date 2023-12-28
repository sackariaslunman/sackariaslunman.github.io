<script lang="ts">
    import "./global.css";
    import { page } from '$app/stores';  
    import IconLink from '$lib/components/header/IconLink.svelte';
    import LinkedInIcon from "$lib/images/linkedin_icon.png";
    import GitHubIcon from "$lib/images/github_icon.png";

    $: path = $page.url.pathname;
    $: realPath = path;
    $: index = path.indexOf('/', 1);
    $: if (index != -1) {
        realPath = path.substring(0, index);
        console.log(realPath);
    }
</script>

<div id="app">
    <header>
        <a href="/"><h1>Sackarias Lunman</h1></a>
        <nav>
            <a class="nav" class:active={realPath==='/'} href="/">Home</a>
            <!-- <a class="nav" class:active={$page.url.pathname==='/about'} href="/about">About</a> -->
            <!-- <a class="nav" class:active={$page.url.pathname==='/minesweeper'} href="/minesweeper">Minesweeper</a> -->

            <a class="nav" class:active={realPath==='/blog'} href="/blog">Blog</a>
            <!-- <a class="nav" href="https://blog.sackarias.se">Old blog</a> -->
        </nav>
        <div class="links">
            <IconLink 
                text="LinkedIn" 
                src={LinkedInIcon}
                alt="LinkedIn Icon"  
                href="https://www.linkedin.com/in/sackarias-lunman-368bbb1a5/"
            />
            <IconLink 
                text="GitHub" 
                src={GitHubIcon}
                alt="GitHub Icon"  
                href="https://github.com/sackariaslunman"
            />
        </div>
    </header>

    <main>
        <slot></slot>
    </main>

    <footer>
        <p>© 2023 Sackarias Lunman</p>
    </footer>
</div>

<style>
    #app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    header {
        display: flex;
        flex-direction: row;
        text-align: center;
        background-color: #eee;
        padding: 2rem;
    }
    a {
        text-decoration: none;
    }
    a.nav {
        padding: 0 3rem;
        text-decoration: none;
    }
    a.active {
        text-decoration: underline;
    }
    main {
        padding: 2rem;
        flex: 1;
    }
    nav {
        flex: 1;
        display: flex;
        justify-content: left;
        text-align: center;
        align-items: center;
    }
    footer {
        text-align: center;
        background-color: #eee;
        padding: 1rem;
    }
    div.links {
        display: flex;
        justify-content: right;
        text-align: center;
        align-items: center;
    }

    @media (max-width: 900px) {
        header {
            flex-direction: column;
            padding: 0rem 1rem;
            padding-top: 0.5rem;
        }
        nav {
            flex-direction: column;
        }
        a.nav {
            padding: 0.5rem 0;
        }
        div.links {
            justify-content: center;
        }
    }
</style>