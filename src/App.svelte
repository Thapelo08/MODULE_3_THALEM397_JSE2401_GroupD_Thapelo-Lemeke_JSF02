<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    import Navbar from './components/Navbar.svelte';
    import ProductList from './components/ProductList.svelte';
    import Modal from './components/ProductModal.svelte';
    
  
    let products = [];
    let filteredProducts = [];
    let categories = [];
    let searchQuery = "";
    let selectedCategory = "";
    let sortOrder = "";
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let showModal = false;
    let modalProduct = {
      title: '',
      image: '',
      price: 0,
      category: '',
      description: '',
      rating: { rate: 0, count: 0 }
    };
    let loading = true;
    let isOpen = false;
  
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
  
   // Inside your App.svelte or wherever the sortProducts function is defined
  function sortProducts() {
    if (sortOrder) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
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
        favorites = [...favorites, productId];
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  
    function isFavorite(productId) {
      return favorites.includes(productId);
    }
  
    function toggleMenu() {
      isOpen = !isOpen;
    }
  </script>
  
  <main class="bg-blue-200 min-h-screen">
    <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
    <ProductList
      filteredProducts={filteredProducts}
      categories={categories}
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
      sortOrder={sortOrder}
      filterProducts={filterProducts}
      sortProducts={sortProducts}
      toggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
      openModal={openModal}
      loading={loading}
    />
    
    <!-- Conditionally render the Modal component -->
    {#if showModal}
      <Modal
        modalProduct={modalProduct}
        closeModal={closeModal}
      />
    {/if}
  </main>
  