<!-- immutable true means when we update components we MUST pass new data, not a mutated version of the same data. it will take the guess off of svelte so it doesnt have to check if the component needs to be recreated.  -->
<svelte:options immutable={true} />

<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { tick, onMount } from "svelte";
  import { fade, fly, slide, blur } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import spin from "./lib/transitions/spin"
// import fade from "./lib/transitions/fade"

  let todoList;
  let showList = true;
  let todos = null;
  let error = null;
  let isLoading = false;
  let isAdding = false;
  let disabledItems = [];
  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(
      async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "An Error has occured";
        }
      }
    );
    isLoading = false;
  }

  async function handleAddTodo(event) {
    event.preventDefault();
    isAdding = true;
    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();
        todos = [{ ...todo, id: uuid() }, ...todos];
        todoList.clearInput();
      } else {
        alert("Error adding new todo!");
      }
    });
    isAdding = false;
    await tick();
    todoList.focusInput();
    //set timeout would simulating clearing input only after fetch of some kind
  }

  async function handleRemoveTodo(event) {
    const id = event.detail.id;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        todos = todos.filter((todo) => todo.id !== event.detail.id);
      } else {
        alert("An error has occurred");
      }
    });
    disabledItems = disabledItems.filter((item) => item !== id);
  }

  async function handleToggleTodo(event) {
    const id = event.detail.id;
    const value = event.detail.value;
    if (disabledItems.includes(id)) return;
    disabledItems = [...disabledItems, id];

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const updatedTodo = await response.json();
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return { ...todo };
        });
      } else {
        alert("An error has occurred");
      }
    });
    disabledItems = disabledItems.filter((item) => item !== id);
  }
</script>

<label>
  <input type="checkbox" bind:checked={showList} />
  Show/Hide List
</label>

{#if showList}
  <div transition:spin={{spin: 100, duration:4000}} style:max-width="800px">
    <TodoList
      {todos}
      {isAdding}
      {error}
      {isLoading}
      {disabledItems}
      scrollOnAdd="top"
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleRemoveTodo}
      on:toggletodo={handleToggleTodo}
      let:todo
      let:handleToggleTodo
      let:index
    >
      <!-- svelte fragment doesnt add html element -->
      <svelte:fragment slot="title">{index + 1}-{todo.title}</svelte:fragment>

      <!-- slot -->
      <!-- {@const {id, completed, title} = todo} -->
      <!-- <div>
        <input
          disabled={disabledItems.includes(id)}
          on:input={(event) => {
            event.currentTarget.checked = completed;
            handleToggleTodo(id, !completed);
          }}
          type="checkbox"
          checked={completed}
        />{title}
      </div>  -->
    </TodoList>>
  </div>
  {#if todos}
    <p>
      Number of todos: {#key todos.length}<span
          style:display="inline-block"
          in:fly|local={{ y: -10 }}>{todos.length}</span
        >{/key}
    </p>
  {/if}
{/if}

<style>
</style>
