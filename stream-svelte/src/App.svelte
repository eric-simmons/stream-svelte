<script>
  import Home from "./lib/pages/Home.svelte";
  import Settings from "./lib/pages/Settings.svelte";
  
  let page
  function onRouteChange(){
    console.log(window.location.hash)
  }

</script>

<svelte:window on:hashchange={onRouteChange} />



<nav>
  <a href="#/">Home</a>
  <a href="#/settings">Settings</a>
</nav>

{#if page === "home"}
  <Home />
{:else if page === "settings"}
  <Settings />
{/if}

<style></style>
