<script lang="ts">
  let count = $state(0);

  function increment(): void {
    count += 1;
  }

  function decrement(): void {
    count -= 1;
  }

  function reset(): void {
    count = 0;
  }
</script>

<div class="counter">
  <h2>Counter</h2>
  <div class="value">{count}</div>
  <div class="buttons">
    <button onclick={decrement}>-</button>
    <button onclick={reset}>Reset</button>
    <button onclick={increment}>+</button>
  </div>
</div>

<style>
  .counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin: 1rem;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .buttons {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>