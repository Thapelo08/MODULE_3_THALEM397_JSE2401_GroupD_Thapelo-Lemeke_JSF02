<script>
    import { Router, Route, Link } from 'svelte-routing'
    import { onMount } from 'svelte';
    import { actions, store } from './store';
    import Navbar from './components/Navbar.svelte';
    import ProductList from './components/ProductList.svelte';
    import Modal from './components/modal.svelte';
    
    
  
    let state;
  
    onMount(() => {
      store.subscribe(value => {
        state = value;
      });
      actions.init();
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

        <div class="flex items-center">
          <input type="text" bind:value={state.searchQuery} placeholder="Search products..." class="border p-2 rounded-l" />
          <button on:click={actions.filterProducts} class="bg-white text-black border border-l-0 p-2 rounded-r">Search</button>
        </div>

        <select bind:value={state.sortOrder} on:change={actions.sortProducts} class="border p-2 rounded">
          <option value="">Sort By Price</option>
          <option value="asc">Lowest to Highest</option>
          <opton value="desc">Highest to Lowest</opton>
        </select>
       </div>
       
      {#if state.loading}
       <div class="loading text-center text-2xl">Loading...</div>
       {:else}
       <ProductList {products} />
       {/if}
       </Route>

       {#if state.showModal}
       <Modal {state.modalProduct} />
       {/if}
    </main>
  </Router>