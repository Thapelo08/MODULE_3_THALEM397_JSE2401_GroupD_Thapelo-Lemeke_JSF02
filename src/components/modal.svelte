<script>
  import { store, actions } from '../store';
  import { onMount } from 'svelte';

  let state;

  onMount(() => {
    const unsubscribe = store.subscribe(value => {
      state = value;
    });

    return () => {
      unsubscribe();
    };
  });

  const closeModal = () => {
    actions.closeModal();
  };
</script>

{#if state.showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" on:click={closeModal}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-content bg-white p-6 rounded shadow-lg w-full max-w-md" on:click|stopPropagation>
      <button class="text-red-500" on:click={closeModal}>Close</button>
      <h3 class="text-xl font-bold mt-4">{state.modalProduct.title}</h3>
      <img src={state.modalProduct.image} alt="" class="w-full h-48 object-cover my-4" />
      <p class="text-gray-700">${state.modalProduct.price}</p>
      <p class="text-gray-500">{state.modalProduct.category}</p>
      <p class="text-gray-600">{state.modalProduct.description}</p>
      <p class="text-gray-700 mt-2">Rating: {state.modalProduct.rating.rate} ({state.modalProduct.rating.count} reviews)</p>
    </div>
  </div>
{/if}
