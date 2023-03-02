<!-- immutable true means when we update components we MUST pass new data, not a mutated version of the same data. it will take the guess off of svelte so it doesnt have to check if the component needs to be recreated.  -->
<svelte:options immutable={true} />

<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { tick } from "svelte";

  let todoList;
  let showList = true;
  let todos = [
    {
      id: uuid(),
      title: "Todo 1",
      completed: true,
    },
    {
      id: uuid(),
      title: "Todo 2",
      completed: false,
    },
    {
      id: uuid(),
      title: "Todo 3",
      completed: false,
    },
  ];

  async function handleAddTodo(event) {
    event.preventDefault();
    //set timeout would simulating clearing input only after fetch of some kind
    console.log(document.querySelectorAll(".todo-list ul li"));
    todos = [
      ...todos,
      {
        id: uuid(),
        title: event.detail.title,
        completed: false,
      },
    ];
    await tick()
    console.log(document.querySelectorAll(".todo-list ul li"));
    todoList.clearInput();
  }
  function handleRemoveTodo(event) {
    todos = todos.filter((todo) => todo.id !== event.detail.id);
  }
  function handleToggleTodo(event) {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id) {
        return {
          ...todo,
          completed: event.detail.value,
        };
      }
      return { ...todo };
    });
  }
</script>

<label>
  <input type="checkbox" bind:checked={showList} />
  Show/Hide List
</label>

{#if showList}
  <div style:max-width="200px">
    <TodoList
      {todos}
      bind:this={todoList}
      on:addtodo={handleAddTodo}
      on:removetodo={handleRemoveTodo}
      on:toggletodo={handleToggleTodo}
    />
  </div>
{/if}

<style>
</style>
