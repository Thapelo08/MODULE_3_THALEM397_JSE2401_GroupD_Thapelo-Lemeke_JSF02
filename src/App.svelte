<script>
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
  
  <Navbar />
  
  <main class="container mx-auto p-6">
    <div class="flex justify-between mb-4">
      <select bind:value={state.selectedCategory} on:change={store.filterProducts} class="border p-2 rounded">
        <option value="">All Categories</option>
        {#each state.categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
  
      <div class="flex items-center">
        <input type="text" bind:value={state.searchQuery} placeholder="Search products..." class="border p-2 rounded-l" />
        <button on:click={store.filterProducts} class="bg-white text-black border border-l-0 p-2 rounded-r">Search</button>
      </div>
  
      <select bind:value={state.sortOrder} on:change={store.sortProducts} class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
  
    {#if state.loading}
      <div class="loading text-center text-2xl">Loading...</div>
    {:else}
      <ProductList {products} />
    {/if}
  </main>
  
  {#if state.showModal}
    <Modal {product} />
  {/if}
  