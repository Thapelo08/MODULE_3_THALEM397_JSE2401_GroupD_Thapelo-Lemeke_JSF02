<!-- src/components/ProductModal.svelte -->
<script>
    export let product = {};
    export let onClose = () => {};
  </script>
  
  {#if product}
    <button class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center" on:click={() => onClose()}>
      <div class="modal-content bg-white p-6 rounded shadow-lg w-full max-w-md" on:click|self={() => {}}>
        <button class="text-red-500" on:click={onClose}>❎</button>
        <h3 class="text-xl font-bold mt-4">{product.title}</h3>
        <img src={product.image} alt="" class="w-full h-48 object-cover my-4" />
        <p class="text-gray-700">${product.price}</p>
        <p class="text-gray-500">{product.category}</p>
        <p class="text-gray-600">{product.description}</p>
        <p class="text-gray-700 mt-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <button class="bg-blue-600 px-4 py-1 text-pink-50">Add To Cart +</button>
      </div>
    </button>
  {/if}
  