<script>
    import { onDestroy } from "svelte";

    import settings from "../stores/settings";
    import location from "../stores/location";
</script>

<h2>Home</h2>
<!-- remember $ is to access/update global score with unsubscribe -->
{#if $location}
    {$location.latitude}, {$location.longitude}
{/if}
{$settings.colorScheme}
