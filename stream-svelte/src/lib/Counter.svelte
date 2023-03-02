<script>
  export let initialCount
  export let maxCount = 10



  let count = initialCount;

  function increment() {
    if(count === maxCount) 
    return;
    count += 1;
  }

</script>

<button on:click={increment}>Clicks {count}</button>



<style>
  button {
    padding: 15px 20px;
  }
</style>
