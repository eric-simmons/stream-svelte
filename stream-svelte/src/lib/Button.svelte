<script>
    export let size = "small";
    export let shadow = false;
    export let bgColor = "inherit";
    export let textColor = "inherit";

    let isLeftHovered;
    // console.log($$restProps);
    //can use slot for conditionals
    // console.log($$slots);
</script>

<button
    on:click
    style:background-color={bgColor}
    style:color={textColor}
    class:size-lg={size === "large"}
    class:size-sm={size === "small"}
    class:has-left={$$slots.leftContent}
    class:shadow
    {...$$restProps}
>
    {#if $$slots.leftContent}
        <div
            class="left-content"
            on:mouseenter={() => (isLeftHovered = true)}
            on:mouseleave={() => (isLeftHovered = false)}
        >
            <slot name="leftContent" />
        </div>
    {/if}
    <slot {isLeftHovered}>Fallback</slot>
</button>

<style lang="scss">
    button {
        display: flex;
        align-items: center;
        border: none;
        background-color: var(--buttonBgColor);
        color: var(--buttonTextColor);
        font-weight: bold;
        cursor: pointer;
        .left-content {
            margin-right: 10px;
        }
        &:disabled {
            opacity: 0.8;
            cursor: not-allowed;
        }
        &:hover {
            background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
        }
        &:active {
            background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
        }
        &.size-sm {
            padding: 15px 20px;
        }
        &.size-lg {
            padding: 20px 25px;
            font-size: 20px;
        }
        &.shadow {
            box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
        }
    }
</style>
