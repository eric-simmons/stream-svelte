<script>
    import Button from "./Button.svelte";
    import {createEventDispatcher} from 'svelte'
    export let todos = [];


    const dispatch = createEventDispatcher()
    let inputText = "";
    function handleAddToDo() {
       dispatch('addtodo', {
        title: inputText,
       })
    }
</script>




<!-- todo.id is not required but helps svelte to id dom nodes -->
<div class="todo-list-wrapper">
    <ul>
        {#each todos as { id, title }, i (id)}
            {@const number = i + 1}
            <li>{number}- {title}</li>
        {/each}
    </ul>
    {inputText}
    <form class="add-todo-form" on:submit|preventDefault={handleAddToDo}>
        <input bind:value={inputText} />
        <Button type="submit" disable={!inputText}>Add</Button>
    </form>
</div>
