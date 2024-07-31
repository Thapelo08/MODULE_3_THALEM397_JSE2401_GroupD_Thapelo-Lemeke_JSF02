<script>
// @ts-nocheck

    import { Router ,Route } from "svelte-routing";
    import Home from "./pages/Home.svelte";
    import NavBar from "./components/Navbar.svelte";
    import ProductPreview from "./pages/ProductPreview.svelte";
  </script>
  
  <NavBar />
  <Router>
      <Route path="/" component={Home} />
      <Route path="products/:id" component={ProductPreview} />
  </Router>
  
  <style></style>