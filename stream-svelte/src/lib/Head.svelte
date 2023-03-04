<script>
    import settings from "./stores/settings";
</script>

<svelte:head>
    <!-- google font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz@6..96&family=Roboto:ital@1&display=swap"
        rel="stylesheet"
    />

    {#if $settings.colorScheme === "dark"}
        <style>
            :root {
                --backgroundColor: #2d2d2d;
                --textColor: #fff;
            }
        </style>
    {:else}
        <style>
            :root {
                --backgroundColor: #ffffff;
                --textColor: #000000;
            }
        </style>
    {/if}
</svelte:head>
