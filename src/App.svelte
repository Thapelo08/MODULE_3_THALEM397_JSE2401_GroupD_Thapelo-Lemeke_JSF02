<script>
    import { onMount } from 'svelte';
  
    let products = [];
    let filteredProducts = [];
    let categories = [];
    let searchQuery = "";
    let selectedCategory = "";
    let sortOrder = "";
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let showModal = false;
    let modalProduct = {};
    let loading = true;
    let isOpen = false; // Define isOpen here
  
    onMount(async () => {
      await fetchCategories();
      await fetchProducts();
    });
  
    async function fetchProducts() {
      loading = true;
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      products = data;
      filteredProducts = data;
      loading = false;
    }
  
    async function fetchCategories() {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      categories = data;
    }
  
    function openModal(product) {
      loading = true;
      fetch(`https://fakestoreapi.com/products/${product.id}`)
        .then(response => response.json())
        .then(data => {
          modalProduct = data;
          showModal = true;
          loading = false;
        });
    }
  
    function closeModal() {
      showModal = false;
    }
  
    function filterProducts() {
      loading = true;
      filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
      sortProducts();
      loading = false;
    }
  
    function sortProducts() {
      if (sortOrder) {
        filteredProducts.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.price - b.price;
          } else if (sortOrder === "desc") {
            return b.price - a.price;
          }
          return 0;
        });
      }
    }
  
    function toggleFavorite(productId) {
      if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
      } else {
        favorites.push(productId);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  
    function isFavorite(productId) {
      return favorites.includes(productId);
    }
  </script>
  
  <style>
    /* Add any custom styles here */
  </style>
  
  <!-- Navigation Bar -->
  <nav class="bg-gray-500 border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/">
        <button type="button" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="src/assets/online-shop.png" class="h-8" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">SwiftCart</span>
        </button>
      </a>
      <div>
        <button
          on:click="{() => isOpen = !isOpen}"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div class={isOpen ? 'block' : 'hidden'} id="navbar-dropdown">
          <ul class="flex flex-col top-10 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li><a href="/wishlist" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Wishlist</a></li>
            <li class="hidden lg:block md:block relative">
              <a href="/cart">
                <div class="t-0 absolute left-3 -top-4">
                  <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs-white text-white">2</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: h-6 w-6 stroke-white cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </a>
            </li>
            <li class="lg:hidden md:hidden"><a href="/cart" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Cart</a></li>
            <li><a href="/login" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Login</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Main Content -->
  <div class="container mx-auto p-6">
    <div class="flex justify-between mb-4">
      <select bind:value={selectedCategory} on:change={filterProducts} class="border p-2 rounded">
        <option value="">All Categories</option>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
      <div class="flex items-center">
        <input type="text" bind:value={searchQuery} placeholder="Search products..." class="border p-2 rounded-l" />
        <button on:click={filterProducts} class="bg-blue-500 text-black hover:bg-white border border-l-0 p-2 rounded-r">Search</button>
      </div>
      <select bind:value={sortOrder} on:change={sortProducts} class="border p-2 rounded">
        <option value="">Sort by Price</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>
    </div>
  
    {#if loading}
      <div class="loading text-center text-2xl">Loading...</div>
    {/if}
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:shadow-lg">
      {#each filteredProducts as product}
        <div class="border p-4 rounded-lg shadow hover:shadow-lg bg-white transition-shadow duration-600 text-center" on:click={() => openModal(product)}>
          <img src={product.image} alt={product.title} class="w-320px h-48 object-cover mb-4" />
          <h3 class="text-lg font-bold">{product.title}</h3>
          <p class="text-gray-700">${product.price}</p>
          <p class="text-gray-500">{product.category}</p>
          <p class="text-gray-700 mt-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
          <button on:click|stopPropagation={() => toggleFavorite(product.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-gray-300 {isFavorite(product.id) ? 'text-gray-500' : ''}" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- Modal -->
  {#if showModal}
    <div class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center" on:click={() => closeModal()}>
      <div class="modal-content bg-white p-6 rounded shadow-lg w-full max-w-md" on:click|self={() => {}}>
        <button class="text-red-500" on:click={closeModal}>❎</button>
        <h3 class="text-xl font-bold mt-4">{modalProduct.title}</h3>
        <img src={modalProduct.image} alt="" class="w-full h-48 object-cover my-4" />
        <p class="text-gray-700">${modalProduct.price}</p>
        <p class="text-gray-500">{modalProduct.category}</p>
        <p class="text-gray-600">{modalProduct.description}</p>
        <p class="text-gray-700 mt-2">Rating: {modalProduct.rating.rate} ({modalProduct.rating.count} reviews)</p>
        <button class="bg-blue-600 px-4 py-1 text-pink-50">Add To Cart +</button>
      </div>
    </div>
  {/if}
  