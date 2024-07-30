<!-- ProductCard.svelte -->
<script>
    export let product;
    export let toggleFavorite;
    export let isFavorite;
    export let openModal;
  </script>
  
  <div class="border p-4 rounded-lg shadow hover:shadow-lg bg-white transition-shadow duration-600 text-center">
    <img src={product.image} alt={product.title} class="w-320px h-48 object-cover mb-4" />
    <h3 class="text-lg font-bold">{product.title}</h3>
    <p class="text-gray-700">${product.price}</p>
    <p class="text-gray-500">{product.category}</p>
    <p class="text-gray-700 mt-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    <button on:click|stopPropagation={() => toggleFavorite(product.id)} class="bg-transparent border-none p-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-gray-300" class:text-gray-500={!isFavorite(product.id)} viewBox="0 0 24 24">
        <!-- SVG content here -->
      </svg>
    </button>
    <button class="bg-blue-600 px-4 py-1 text-pink-50" on:click={() => openModal(product)}>Add To Cart +</button>
  </div>