import { writable } from 'svelte/store';

const store = writable({
  products: [],
  filteredProducts: [],
  categories: [],
  searchQuery: "",
  selectedCategory: "",
  sortOrder: "",
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  userRating: 0,
  showModal: false,
  modalProduct: {},
  loading: true,
});

const actions = {
  async init() {
    await actions.fetchCategories();
    await actions.fetchProducts();
  },

  async fetchProducts() {
    store.update(state => ({ ...state, loading: true }));
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    store.update(state => ({ ...state, products: data, filteredProducts: data, loading: false }));
  },

  async fetchCategories() {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    store.update(state => ({ ...state, categories: data }));
  },

  openModal(product) {
    store.update(state => ({ ...state, loading: true }));
    fetch(`https://fakestoreapi.com/products/${product.id}`)
      .then(response => response.json())
      .then(data => {
        store.update(state => ({ ...state, modalProduct: data, showModal: true, loading: false }));
      });
  },

  closeModal() {
    store.update(state => ({ ...state, showModal: false }));
  },

  filterProducts() {
    store.update(state => {
      const filteredProducts = state.products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesCategory = state.selectedCategory === "" || product.category === state.selectedCategory;
        return matchesSearch && matchesCategory;
      });
      return { ...state, filteredProducts, loading: false };
    });
  },

  sortProducts() {
    store.update(state => {
      const filteredProducts = [...state.filteredProducts];
      if (state.sortOrder) {
        filteredProducts.sort((a, b) => {
          if (state.sortOrder === "asc") {
            return a.price - b.price;
          } else if (state.sortOrder === "desc") {
            return b.price - a.price;
          }
          return 0;
        });
      }
      return { ...state, filteredProducts };
    });
  },

  toggleFavorite(productId) {
    store.update(state => {
      const favorites = state.favorites.includes(productId)
        ? state.favorites.filter(id => id !== productId)
        : [...state.favorites, productId];
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return { ...state, favorites };
    });
  },

  isFavorite(productId) {
    let isFavorite = false;
    store.subscribe(state => {
      isFavorite = state.favorites.includes(productId);
    })();
    return isFavorite;
  },
};

export { store, actions };
