<!-- src/components/ProductFilter.svelte -->
<script>
    export let categories = [];
    export let searchQuery = "";
    export let selectedCategory = "";
    export let sortOrder = "";
    export let onFilter = () => {};
  </script>
  
  <div class="flex justify-between mb-4">
    <select bind:value={selectedCategory} on:change={onFilter} class="border p-2 rounded">
      <option value="">All Categories</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
    <div class="flex items-center">
      <input type="text" bind:value={searchQuery} placeholder="Search products..." class="border p-2 rounded-l" />
      <button on:click={onFilter} class="bg-blue-500 text-black hover:bg-white border border-l-0 p-2 rounded-r">Search</button>
    </div>
    <select bind:value={sortOrder} on:change={onFilter} class="border p-2 rounded">
      <option value="">Sort by Price</option>
      <option value="asc">Lowest to Highest</option>
      <option value="desc">Highest to Lowest</option>
    </select>
  </div>
  