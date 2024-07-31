<script>
    import { onMount } from 'svelte';
    let selectedCategory = '';
    let sorting = 'default';
    let categories = [];
  
    onMount(() => {
      // Fetch or initialize categories
      categories = ['Electronics', 'Books', 'Clothing']; // Example categories
    });
  
    function filterProducts() {
      // Logic to filter products based on selectedCategory
      console.log('Filtering products by:', selectedCategory);
    }
  
    function handleSort() {
      // Logic to sort products based on sorting
      console.log('Sorting products by:', sorting);
    }
  </script>
  
  <div class="max-w-screen-xl mx-auto mt-8">
    <label for="browse" class="w-20 my-auto font-semibold">Browse: </label>
    <select bind:value={selectedCategory} on:change={filterProducts} class="p-2 w-full text-sm text-gray-900 bg-gray-200 rounded border-s-gray-200 border-s-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
      <option value="">All Categories</option>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
    <div class="max-w-screen-xl mx-auto mt-8">
      <label for="sort" class="w-20 my-auto font-semibold">Sort by: </label>
      <select bind:value={sorting} on:change={handleSort} id="sort" class="p-2 w-full text-sm text-gray-900 bg-gray-200 rounded border-s-gray-200 border-s-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        <option value="default">Default</option>
        <option value="low">Price: Low - High</option>
        <option value="high">Price: High - Low</option>
      </select>
    </div>
  </div>
  
  <style>
    /* Add any required styles here */
  </style>
  