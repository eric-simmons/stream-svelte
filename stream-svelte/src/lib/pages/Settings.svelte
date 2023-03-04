<script>
    import settings from "../stores/settings";
    import direction from "../stores/direction";

    //the dollar sign allows to share the store globally and subscribe/unsubscribe and update globally
</script>

<h2>Settings</h2>
<!-- for this settings method from our custom store the $ is not needed for methods only for values.  -->
<button
    on:click={() => {
        settings.toggleColorScheme();
    }}
>
    Toggle Color Scheme
</button>

<button
    on:click={() => {
        settings.updateSetting("language", Math.random());
    }}
>
    update language
</button>

{$direction}

<button
    on:click={() => {
        settings.reset();
    }}
>
    Reset Settings
</button>

<br />
{$settings.colorScheme}
<br />
{$settings.language}
<br />
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

<select bind:value={$settings.language}>
    <option value="en">English</option>
    <option value="ar">Arabic</option>
</select>
