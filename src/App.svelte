<script>
    import { Router, Route, Link } from 'svelte-routing'
    import { onMount } from 'svelte';
    import { store } from './store';
    import Navbar from './components/Navbar.svelte';
    import ProductList from './components/ProductList.svelte';
    import Modal from './components/modal.svelte';
    
    
  
    let state;
  
    onMount(() => {
      store.subscribe(value => {
        state = value;
      });
    });
  </script>
  
  <Router>
    <Navbar />
    <main class="container mx-auto p-6">
      <Route path="/" let:params>
      <div class="flex justify-between mb-4">
        <select bind:value={state.selectedCategory} on:change={actions.filterProductions} class="border p-2 rounded">
          <option value="">All categories</option>
          {#each state.categories as category}
          <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
      </Route>

    </main>
  </Router>