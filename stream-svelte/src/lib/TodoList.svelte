<script>
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let todos = [];

    const dispatch = createEventDispatcher();
    let inputText = "";
    function handleAddTodo() {
        const isNotCancelled = dispatch(
            "addtodo",
            {
                title: inputText,
            },
            { cancelable: true }
        );
        if (isNotCancelled) {
            inputText = "";
        }
    }
    function handleRemoveTodo(id) {
        dispatch("removetodo", {
            id,
        });
    }
    function handleToggleTodo(id, value) {
        dispatch('toggletodo', {
            id, value
        })
    }
</script>

<!-- todo.id is not required but helps svelte to id dom nodes -->
<div class="todo-list-wrapper">
    <ul>
        {#each todos as { id, title, completed }}
            <li>
                <label>
                    <input
                        on:input={(event) => {
                            event.currentTarget.checked = completed;
                            handleToggleTodo(id, !completed)
                        }}
                        type="checkbox"
                        checked={completed}
                    />
                    {title}
                </label>
                <button on:click={() => handleRemoveTodo(id)}> Remove</button>
            </li>
        {/each}
    </ul>
    {inputText}
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <input bind:value={inputText} />
        <Button type="submit" disable={!inputText}>Add</Button>
    </form>
</div>
