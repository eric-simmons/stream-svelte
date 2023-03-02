<script>
    import Button from "./Button.svelte";
    import {
        createEventDispatcher,
        onMount,
        onDestroy,
        beforeUpdate,
        afterUpdate,
    } from "svelte";
    let input, listDiv, autoscroll, listDivScrollHeight


    onMount(() => {
        console.log("mounted");
    });
    //onDestroy is the only lifecycle function that will run serverside
    onDestroy(() => {
        console.log("destroyed");
    });

    beforeUpdate(() => {
        if (listDiv) {
            console.log(listDiv.offsetHeight);
        }
    });
    afterUpdate(() => {
        console.log(listDiv.offsetHeight);
        if(autoscroll) 
        listDiv.scrollTo(0, listDiv.scrollHeight)
        autoscroll = false
    });
    export let todos = [];
    let prevTodos = todos
    
    //reactive statement changes when a dependency changes
    $: {
        console.log(prevTodos, todos)
        autoscroll = todos.length > prevTodos.length
        prevTodos = todos
        
    }



    export function clearInput() {
        inputText = "";
    }
    export function focusInput() {
        input.focus();
    }


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
        dispatch("toggletodo", {
            id,
            value,
        });
    }
</script>

{listDivScrollHeight}
<!-- todo.id is not required but helps svelte to id dom nodes -->
<div class="todo-list-wrapper">
    <div class="todo-list" bind:this={listDiv}>
        <div bind:offsetHeight={listDivScrollHeight}>
        <ul>
            {#each todos as { id, title, completed }}
                <li>
                    <label>
                        <input
                            on:input={(event) => {
                                event.currentTarget.checked = completed;
                                handleToggleTodo(id, !completed);
                            }}
                            type="checkbox"
                            checked={completed}
                        />
                        {title}
                    </label>
                    <button on:click={() => handleRemoveTodo(id)}>
                        Remove</button
                    >
                </li>
            {/each}
        </ul>
    </div>
    </div>
    {inputText}
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <input bind:this={input} bind:value={inputText} />
        <Button type="submit" disable={!inputText}>Add</Button>
    </form>
</div>

<style>

.todo-list {
    max-height: 150px;
    overflow: auto
}


</style>
