document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 📦 PRODUCTS
  // =========================
  const products = [
    { name: "Smart Watch", desc: "Latest fitness + notifications", price: 199 },
    { name: "Wireless Earbuds", desc: "High-quality audio with noise reduction", price: 149 },
    { name: "Gaming Mouse", desc: "Ergonomic mouse with RGB lighting", price: 59 },
    { name: "Mechanical Keyboard", desc: "Tactile switches for fast typing", price: 129 },
    { name: "Bluetooth Speaker", desc: "Portable speaker with deep bass", price: 89 },
    { name: "External SSD", desc: "Fast and compact storage", price: 109 }
  ];

  const productList = document.getElementById("productList");
  const cartList = document.getElementById("cartList");
  const cartTotalEl = document.getElementById("cartTotal");
  const checkoutModal = document.getElementById("checkoutModal");

  let cart = [];

  // =========================
  // Render products
  // =========================
  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "bg-purple-800/70 p-6 rounded-2xl shadow-lg cursor-pointer hover:bg-purple-900 transition-all";

      productCard.innerHTML = `
        <h3 class="text-xl font-semibold mb-1">${product.name}</h3>
        <p class="text-teal-200 mb-2">${product.desc}</p>
        <p class="text-teal-100 font-bold mb-3">$${product.price}</p>
        <button data-index="${index}" class="addBtn bg-teal-400 hover:bg-teal-500 text-black px-3 py-1 rounded-lg font-semibold">
          Add to Cart
        </button>
      `;

      productList.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".addBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        addToCart(products[index]);
      });
    });
  }

  // =========================
  // Cart functions
  // =========================
  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function clearCart() {
    cart = [];
    renderCart();
  }

  function renderCart() {
    cartList.innerHTML = "";

    if (cart.length === 0) {
      cartTotalEl.textContent = "Cart is empty";
      return;
    }

    cart.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "flex justify-between bg-purple-700/50 p-2 rounded-lg";
      li.textContent = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `Total: $${total}`;
  }

  function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    checkoutModal.classList.remove("hidden");
    clearCart();
  }

  function closeModal() {
    checkoutModal.classList.add("hidden");
  }

  // =========================
  // Event Listeners
  // =========================
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);
  document.getElementById("checkoutBtn").addEventListener("click", checkout);
  document.getElementById("closeModal").addEventListener("click", closeModal);

  // =========================
  // Initial Render
  // =========================
  renderProducts();
});
