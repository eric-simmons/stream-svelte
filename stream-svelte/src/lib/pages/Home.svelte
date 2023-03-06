<script>
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";


    const scale = tweened(1, {
        duration: 1500,
        easing: cubicOut,
    });
</script>

<button
    on:click={() => {
        $scale += 1;
    }}
>
    Bigger
</button>
<button
    on:click={() => {
        $scale -= 1;
    }}>Smaller</button
>

<div
    style="width: 100px;
height: 100px;
background-color: green;
transform: scale({$scale});
transform-origin: 0 0 "
/>

<div
    style="width: 125px;
height: 125px;
background-color: blue;
transform: scale({$scale});
transform-origin: 0 0 "
/>

<div
    style="width: 150px;
height: 150px;
background-color: red;
transform: scale({$scale});
transform-origin: 0 0 "
/>

<div
    style="width: 175px;
height: 175px;
background-color: purple;
transform: scale({$scale});
transform-origin: 0 0 "
/>
