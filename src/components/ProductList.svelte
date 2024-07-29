<script>
    import { store, actions } from '../store';
  
    let state;
  
    store.subscribe(value => {
      state = value;
    });
  </script>
  
  <div class="grid grid-cols-1 :hidden:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each state.filteredProducts as product}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="card border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300" on:click={() => actions.openModal(product)}>
        <img src={product.image} alt="" class="w-320px h-48 object-cover mb-4" />
        <h3 class="text-lg font-bold">{product.title}</h3>
        <p class="text-gray-700">${product.price}</p>
        <p class="text-gray-500">{product.category}</p>
        <p class="text-gray-700 mt-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <button on:click|stopPropagation={() => actions.toggleFavorite(product.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-gray-300" class:!text-gray-500={actions.isFavorite(product.id)} viewBox="0 0 24 24">
            <!-- SVG content here -->
          </svg>
        </button>
        <button class="bg-pink-600 px-4 py-1 text-pink-50">Add To Cart +</button>
      </div>
    {/each}
  </div>
  