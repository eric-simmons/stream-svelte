<script>
    import settings from "../stores/settings";

    //the dollar sign allows to share the store globally and subscribe/unsubscribe and update globally
</script>

<h2>Settings</h2>

<button
    on:click={() => {
        $settings.colorScheme =
            $settings.colorScheme === "dark" ? "light" : "dark";
    }}
>
    Toggle Color Scheme
</button>

<label>
    <input
        type="radio"
        bind:group={$settings.colorScheme}
        name="colorScheme"
        value="dark"
    />
</label>
Dark
<label>
    <input
        type="radio"
        bind:group={$settings.colorScheme}
        name="colorScheme"
        value="light"
    /> Light
</label>
