
"use strict";

/* =========================================
   BELLA NAPOLI - COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   1. SELECT HTML ELEMENTS
========================================= */

const $ = (selector) => document.querySelector(selector);

const welcomePage = $("#welcomePage");
const orderTypePage = $("#orderTypePage");
const experiencePage = $("#experiencePage");

const orderNowBtn = $("#orderNowBtn");
const dineInBtn = $("#dineInBtn");
const takeawayBtn = $("#takeawayBtn");
const backWelcomeBtn = $("#backWelcomeBtn");

const menuSearch = $("#menuSearch");
const productsGrid = $("#productsGrid");
const menuCategories = $("#menuCategories");
const noProducts = $("#noProducts");

const cartButton = $("#cartButton");
const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");
const closeCartBtn = $("#closeCartBtn");
const cartItems = $("#cartItems");
const cartCount = $("#cartCount");
const cartTotal = $("#cartTotal");
const checkoutBtn = $("#checkoutBtn");

const checkoutPage = $("#checkoutPage");
const checkoutForm = $("#checkoutForm");
const checkoutItems = $("#checkoutItems");
const checkoutTotal = $("#checkoutTotal");
const backToMenuBtn = $("#backToMenuBtn");

const dineInFields = $("#dineInFields");
const takeawayFields = $("#takeawayFields");
const tableNumber = $("#tableNumber");
const pickupTime = $("#pickupTime");

const confirmationPage = $("#confirmationPage");
const orderNumber = $("#orderNumber");
const trackOrderBtn = $("#trackOrderBtn");
const continueShoppingBtn = $("#continueShoppingBtn");

const trackPage = $("#trackPage");
const trackForm = $("#trackForm");
const trackOrderInput = $("#trackOrderInput");
const trackResult = $("#trackResult");
const trackStatus = $("#trackStatus");
const backFromTrackBtn = $("#backFromTrackBtn");

const toast = $("#toast");
const toastMessage = $("#toastMessage");

const languageBtn = $("#languageBtn");
const languageOptions = $("#languageOptions");
const currentLanguage = $("#currentLanguage");

const mobileMenuBtn = $("#mobileMenuBtn");
const mainNavigation = $("#mainNavigation");


/* =========================================
   2. APPLICATION DATA
========================================= */

let cart = [];

let selectedOrderType = "";

let currentCategory = "all";

let currentLanguageCode = "en";

let lastOrder = null;

let toastTimer;


/* =========================================
   3. FOOD MENU DATA
========================================= */

const products = [

  // PIZZA

  {
    id: 1,
    name: "Margherita Pizza",
    somaliName: "Baastada Margherita",
    category: "pizza",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80",
    description: "Fresh tomato sauce, mozzarella and basil.",
    somaliDescription: "Yaanyo, farmaajo mozzarella iyo basil cusub.",
    badge: "Popular"
  },

  {
    id: 2,
    name: "Pepperoni Pizza",
    somaliName: "Pizza Pepperoni",
    category: "pizza",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
    description: "Classic pepperoni with melted mozzarella.",
    somaliDescription: "Pepperoni iyo farmaajo mozzarella.",
    badge: "Best Seller"
  },

  {
    id: 3,
    name: "BBQ Chicken Pizza",
    somaliName: "Pizza Digaag BBQ",
    category: "pizza",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    description: "Grilled chicken, BBQ sauce and cheese.",
    somaliDescription: "Digaag duban, suugo BBQ iyo farmaajo.",
    badge: ""
  },

  {
    id: 4,
    name: "Four Cheese Pizza",
    somaliName: "Pizza Afar Farmaajo",
    category: "pizza",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80",
    description: "A delicious blend of four Italian cheeses.",
    somaliDescription: "Afar nooc oo farmaajo Talyaani ah.",
    badge: "Special"
  },


  // PASTA

  {
    id: 5,
    name: "Spaghetti Bolognese",
    somaliName: "Spaghetti Bolognese",
    category: "pasta",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=700&q=80",
    description: "Spaghetti with rich beef tomato sauce.",
    somaliDescription: "Spaghetti leh suugo hilib iyo yaanyo.",
    badge: "Popular"
  },

  {
    id: 6,
    name: "Creamy Alfredo Pasta",
    somaliName: "Baasto Alfredo",
    category: "pasta",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80",
    description: "Creamy Alfredo sauce with parmesan cheese.",
    somaliDescription: "Suugo kareem ah iyo farmaajo parmesan.",
    badge: ""
  },

  {
    id: 7,
    name: "Chicken Penne",
    somaliName: "Baasto Digaag Penne",
    category: "pasta",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    description: "Penne pasta with grilled chicken.",
    somaliDescription: "Baasto Penne iyo digaag duban.",
    badge: ""
  },


  // SANDWICHES

  {
    id: 8,
    name: "Chicken Sandwich",
    somaliName: "Sandwich Digaag",
    category: "sandwich",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80",
    description: "Fresh bread, chicken and vegetables.",
    somaliDescription: "Rooti cusub, digaag iyo khudaar.",
    badge: ""
  },

  {
    id: 9,
    name: "Club Sandwich",
    somaliName: "Club Sandwich",
    category: "sandwich",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=700&q=80",
    description: "Triple-layer sandwich with fresh ingredients.",
    somaliDescription: "Sandwich saddex lakab leh iyo waxyaabo cusub.",
    badge: "Popular"
  },


  // DESSERTS

  {
    id: 10,
    name: "Chocolate Cake",
    somaliName: "Keeg Shukulaato",
    category: "dessert",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    description: "Rich chocolate cake with creamy topping.",
    somaliDescription: "Keeg shukulaato leh kareem macaan.",
    badge: ""
  },

  {
    id: 11,
    name: "Tiramisu",
    somaliName: "Tiramisu",
    category: "dessert",
    price: 7.50,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80",
    description: "Classic Italian coffee-flavored dessert.",
    somaliDescription: "Macmacaan Talyaani ah oo qaxwo leh.",
    badge: "Special"
  },


  // DRINKS

  {
    id: 12,
    name: "Fresh Orange Juice",
    somaliName: "Casiir Liin Macaan",
    category: "drinks",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
    description: "Freshly squeezed orange juice.",
    somaliDescription: "Casiir liin macaan oo cusub.",
    badge: ""
  },

  {
    id: 13,
    name: "Strawberry Smoothie",
    somaliName: "Cabitaan Strawberry",
    category: "drinks",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80",
    description: "Fresh strawberry blended smoothie.",
    somaliDescription: "Cabitaan strawberry cusub oo la shiiday.",
    badge: ""
  },

  {
    id: 14,
    name: "Cold Coffee",
    somaliName: "Qaxwo Qabow",
    category: "drinks",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    description: "Smooth and refreshing iced coffee.",
    somaliDescription: "Qaxwo qabow oo macaan.",
    badge: ""
  }

];


/* =========================================
   4. LANGUAGE TRANSLATIONS
========================================= */

const translations = {

  en: {
    orderNow: "ORDER NOW",
    question: "How would you like to enjoy your meal?",
    orderDescription: "Choose your preferred dining experience.",
    dineIn: "DINE IN",
    takeaway: "TAKEAWAY",
    dineDescription: "Enjoy your meal at our restaurant.",
    takeawayDescription: "Order your food and take it away.",
    menu: "Menu",
    home: "Home",
    about: "About",
    contact: "Contact",
    search: "Search your favorite food...",
    all: "All",
    pizza: "Pizza",
    pasta: "Pasta",
    sandwich: "Sandwiches",
    dessert: "Desserts",
    drinks: "Drinks",
    addCart: "ADD TO CART",
    cart: "Your Cart",
    emptyCart: "Your cart is empty",
    emptyDescription: "Add something delicious!",
    checkout: "PROCEED TO CHECKOUT",
    total: "Total",
    checkoutTitle: "Checkout",
    customerInfo: "Customer Information",
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    table: "Table Number",
    pickup: "Pickup Time",
    notes: "Order Notes",
    placeOrder: "PLACE ORDER",
    thankYou: "Thank You!",
    orderSuccess: "Your order has been received successfully.",
    track: "TRACK YOUR ORDER",
    continue: "CONTINUE SHOPPING",
    searchEmpty: "No food items found.",
    successCart: "Added to your cart!",
    orderReceived: "Order received",
    selectPickup: "Select pickup time"
  },

  so: {
    orderNow: "DALBO HADA",
    question: "Sidee ayaad rabtaa inaad cuntadaada u qaadato?",
    orderDescription: "Dooro qaabka aad cuntada u rabto.",
    dineIn: "KU CUN MAQAAYADDA",
    takeaway: "QAADO",
    dineDescription: "Cuntadaada ku cun maqaayaddeenna.",
    takeawayDescription: "Dalbo cuntadaada oo qaado.",
    menu: "Cuntooyinka",
    home: "Bogga Hore",
    about: "Nagu Saabsan",
    contact: "Nala Soo Xiriir",
    search: "Raadi cuntada aad jeceshahay...",
    all: "Dhammaan",
    pizza: "Pizza",
    pasta: "Baasto",
    sandwich: "Sandwich",
    dessert: "Macmacaan",
    drinks: "Cabitaanno",
    addCart: "KU DAR GAARIGA",
    cart: "Gaarigaaga",
    emptyCart: "Gaarigaagu waa madhan yahay",
    emptyDescription: "Ku dar cunto macaan!",
    checkout: "U GUDBI BIXINTA",
    total: "Wadarta",
    checkoutTitle: "Dalabkaaga",
    customerInfo: "Macluumaadka Macmiilka",
    fullName: "Magaca oo buuxa",
    phone: "Lambarka telefoonka",
    email: "Cinwaanka Email-ka",
    table: "Lambarka Miiska",
    pickup: "Waqtiga Qaadashada",
    notes: "Faahfaahinta Dalabka",
    placeOrder: "XAQIIJI DALABKA",
    thankYou: "Mahadsanid!",
    orderSuccess: "Dalabkaaga si guul leh ayaa loo helay.",
    track: "LA SOCODSII DALABKA",
    continue: "DALBO MAR KALE",
    searchEmpty: "Wax cunto ah lama helin.",
    successCart: "Cuntada waa lagu daray gaariga!",
    orderReceived: "Dalabka waa la helay",
    selectPickup: "Dooro waqtiga qaadashada"
  }

};


/* =========================================
   5. HELPER FUNCTIONS
========================================= */

function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}


function showToast(message) {

  if (!toast || !toastMessage) return;

  clearTimeout(toastTimer);

  toastMessage.textContent = message;

  toast.classList.remove("hidden");

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);

}


function getText(key) {
  return translations[currentLanguageCode][key] || key;
}


/* =========================================
   6. WELCOME PAGE NAVIGATION
========================================= */

function showOrderTypePage() {

  welcomePage.classList.add("hidden");

  orderTypePage.classList.remove("hidden");

  experiencePage.classList.add("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function openRestaurant(orderType) {

  selectedOrderType = orderType;

  welcomePage.classList.add("hidden");

  orderTypePage.classList.add("hidden");

  checkoutPage.classList.add("hidden");

  confirmationPage.classList.add("hidden");

  trackPage.classList.add("hidden");

  experiencePage.classList.remove("hidden");

  closeCart();

  updateOrderFields();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


orderNowBtn.addEventListener("click", showOrderTypePage);


dineInBtn.addEventListener("click", () => {
  openRestaurant("dine-in");
});


takeawayBtn.addEventListener("click", () => {
  openRestaurant("takeaway");
});


backWelcomeBtn.addEventListener("click", () => {

  orderTypePage.classList.add("hidden");

  welcomePage.classList.remove("hidden");

  window.scrollTo(0, 0);

});


/* =========================================
   7. SHOW CORRECT ORDER FIELDS
========================================= */

function updateOrderFields() {

  const isDineIn = selectedOrderType === "dine-in";

  dineInFields.classList.toggle("hidden", !isDineIn);

  takeawayFields.classList.toggle("hidden", isDineIn);

  if (tableNumber) {
    tableNumber.required = isDineIn;
  }

  if (pickupTime) {
    pickupTime.required = !isDineIn;
  }

}


/* =========================================
   8. DISPLAY PRODUCTS
========================================= */

function displayProducts() {

  if (!productsGrid) return;

  const searchText = menuSearch.value.toLowerCase().trim();

  const filteredProducts = products.filter(product => {

    const matchesCategory =
      currentCategory === "all" ||
      product.category === currentCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.somaliName.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText) ||
      product.somaliDescription.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;

  });


  productsGrid.innerHTML = "";

  if (filteredProducts.length === 0) {

    noProducts.classList.remove("hidden");

    noProducts.textContent = getText("searchEmpty");

    return;

  }

  noProducts.classList.add("hidden");


  filteredProducts.forEach(product => {

    const productName =
      currentLanguageCode === "so"
        ? product.somaliName
        : product.name;

    const productDescription =
      currentLanguageCode === "so"
        ? product.somaliDescription
        : product.description;

    const productBadge = product.badge
      ? `<span class="product-badge">${product.badge}</span>`
      : "";

    const productCard = document.createElement("article");

    productCard.className = "product-card";

    productCard.innerHTML = `

      <div class="product-image-container">

        <img
          class="product-image"
          src="${product.image}"
          alt="${productName}"
          loading="lazy"
        >

        ${productBadge}

      </div>

      <div class="product-content">

        <h3>${productName}</h3>

        <p>${productDescription}</p>

        <div class="product-bottom">

          <span class="product-price">
            ${formatPrice(product.price)}
          </span>

          <button
            type="button"
            class="add-to-cart-btn"
            data-product-id="${product.id}"
          >

            <i class="fa-solid fa-cart-plus"></i>

            ${getText("addCart")}

          </button>

        </div>

      </div>

    `;

    productsGrid.appendChild(productCard);

  });

}


/* =========================================
   9. SEARCH PRODUCTS
========================================= */

menuSearch.addEventListener("input", displayProducts);


/* =========================================
   10. CATEGORY FILTER
========================================= */

menuCategories.addEventListener("click", (event) => {

  const categoryButton = event.target.closest(".category-btn");

  if (!categoryButton) return;

  document.querySelectorAll(".category-btn").forEach(button => {
    button.classList.remove("active");
  });

  categoryButton.classList.add("active");

  currentCategory = categoryButton.dataset.category;

  displayProducts();

});


/* =========================================
   11. ADD PRODUCT TO CART
========================================= */

productsGrid.addEventListener("click", (event) => {

  const addButton = event.target.closest(".add-to-cart-btn");

  if (!addButton) return;

  const productId = Number(addButton.dataset.productId);

  addToCart(productId);

});


function addToCart(productId) {

  const product = products.find(item => item.id === productId);

  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  updateCart();

  showToast(getText("successCart"));

}


/* =========================================
   12. UPDATE CART
========================================= */

function updateCart() {

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let totalQuantity = 0;

  let totalPrice = 0;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart" id="emptyCart">

        <i class="fa-solid fa-basket-shopping"></i>

        <h3>${getText("emptyCart")}</h3>

        <p>${getText("emptyDescription")}</p>

      </div>

    `;

  }


  cart.forEach(item => {

    totalQuantity += item.quantity;

    totalPrice += item.price * item.quantity;

    const itemName =
      currentLanguageCode === "so"
        ? item.somaliName
        : item.name;

    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

      <img src="${item.image}" alt="${itemName}">

      <div class="cart-item-info">

        <h4>${itemName}</h4>

        <p>${formatPrice(item.price * item.quantity)}</p>

        <div class="cart-quantity">

          <button
            type="button"
            data-action="decrease"
            data-id="${item.id}"
            aria-label="Decrease quantity"
          >
            -
          </button>

          <span>${item.quantity}</span>

          <button
            type="button"
            data-action="increase"
            data-id="${item.id}"
            aria-label="Increase quantity"
          >
            +
          </button>

        </div>

      </div>

      <button
        type="button"
        class="remove-cart-item"
        data-action="remove"
        data-id="${item.id}"
        aria-label="Remove item"
      >

        <i class="fa-solid fa-trash"></i>

      </button>

    `;

    cartItems.appendChild(cartItem);

  });


  cartCount.textContent = totalQuantity;

  cartTotal.textContent = formatPrice(totalPrice);

  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(totalPrice);
  }

  updateCheckoutSummary();

}


/* =========================================
   13. CART QUANTITY CONTROLS
========================================= */

cartItems.addEventListener("click", (event) => {

  const button = event.target.closest("[data-action]");

  if (!button) return;

  const productId = Number(button.dataset.id);

  const action = button.dataset.action;

  const item = cart.find(product => product.id === productId);

  if (!item) return;


  if (action === "increase") {

    item.quantity++;

  } else if (action === "decrease") {

    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(product => product.id !== productId);
    }

  } else if (action === "remove") {

    cart = cart.filter(product => product.id !== productId);

  }

  updateCart();

});


/* =========================================
   14. OPEN AND CLOSE CART
========================================= */

function openCart() {

  cartDrawer.classList.remove("hidden");

  cartOverlay.classList.remove("hidden");

  document.body.style.overflow = "hidden";

}


function closeCart() {

  cartDrawer.classList.add("hidden");

  cartOverlay.classList.add("hidden");

  document.body.style.overflow = "";

}


cartButton.addEventListener("click", openCart);

closeCartBtn.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


/* =========================================
   15. CHECKOUT SUMMARY
========================================= */

function updateCheckoutSummary() {

  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";

  cart.forEach(item => {

    const itemName =
      currentLanguageCode === "so"
        ? item.somaliName
        : item.name;

    const summaryItem = document.createElement("div");

    summaryItem.className = "checkout-summary-item";

    summaryItem.innerHTML = `

      <span>${itemName} × ${item.quantity}</span>

      <span>${formatPrice(item.price * item.quantity)}</span>

    `;

    checkoutItems.appendChild(summaryItem);

  });

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  checkoutTotal.textContent = formatPrice(total);

}


/* =========================================
   16. OPEN CHECKOUT PAGE
========================================= */

checkoutBtn.addEventListener("click", () => {

  if (cart.length === 0) {

    showToast(
      currentLanguageCode === "so"
        ? "Fadlan marka hore cunto ku dar gaariga."
        : "Please add food to your cart first."
    );

    return;

  }

  closeCart();

  experiencePage.classList.add("hidden");

  checkoutPage.classList.remove("hidden");

  updateOrderFields();

  updateCheckoutSummary();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   17. BACK TO MENU
========================================= */

backToMenuBtn.addEventListener("click", () => {

  checkoutPage.classList.add("hidden");

  experiencePage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   18. PLACE ORDER
========================================= */

checkoutForm.addEventListener("submit", (event) => {

  event.preventDefault();

  if (cart.length === 0) {

    showToast("Your cart is empty.");

    return;

  }

  if (!checkoutForm.checkValidity()) {

    checkoutForm.reportValidity();

    return;

  }


  const customerName = $("#customerName").value.trim();

  const customerPhone = $("#customerPhone").value.trim();

  const customerEmail = $("#customerEmail").value.trim();

  const notes = $("#orderNotes").value.trim();


  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);


  const newOrderNumber =
    "BN" + Date.now().toString().slice(-8);


  lastOrder = {

    number: newOrderNumber,

    customer: customerName,

    phone: customerPhone,

    email: customerEmail,

    orderType: selectedOrderType,

    tableNumber: selectedOrderType === "dine-in"
      ? tableNumber.value.trim()
      : "",

    pickupTime: selectedOrderType === "takeaway"
      ? pickupTime.value
      : "",

    notes: notes,

    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),

    total: total,

    status: "Order received",

    date: new Date().toISOString()

  };


  // Save the latest order in the browser.
  // This is a local demo, not a restaurant server.

  try {
    localStorage.setItem(
      "bellaNapoliLastOrder",
      JSON.stringify(lastOrder)
    );
  } catch (error) {
    console.warn("Could not save order in browser storage.", error);
  }


  orderNumber.textContent = "#" + newOrderNumber;


  checkoutPage.classList.add("hidden");

  confirmationPage.classList.remove("hidden");


  cart = [];

  updateCart();

  checkoutForm.reset();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   19. TRACK ORDER PAGE
========================================= */

trackOrderBtn.addEventListener("click", () => {

  confirmationPage.classList.add("hidden");

  trackPage.classList.remove("hidden");

  trackResult.classList.add("hidden");

  if (lastOrder) {
    trackOrderInput.value = lastOrder.number;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


trackForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const enteredNumber = trackOrderInput.value.trim().toUpperCase();


  if (!lastOrder || enteredNumber !== lastOrder.number.toUpperCase()) {

    trackResult.classList.remove("hidden");

    trackStatus.textContent =
      currentLanguageCode === "so"
        ? "Dalabkan lagama helin browser-kan."
        : "Order not found in this browser.";

    trackStatus.style.color = "#dc3545";

    return;

  }


  trackResult.classList.remove("hidden");

  trackStatus.textContent =
    currentLanguageCode === "so"
      ? "Dalabka waa la helay."
      : lastOrder.status;

  trackStatus.style.color = "#28a745";

});


backFromTrackBtn.addEventListener("click", () => {

  trackPage.classList.add("hidden");

  experiencePage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   20. CONTINUE SHOPPING
========================================= */

continueShoppingBtn.addEventListener("click", () => {

  confirmationPage.classList.add("hidden");

  welcomePage.classList.remove("hidden");

  selectedOrderType = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* =========================================
   21. LANGUAGE SWITCHER
========================================= */

function changeLanguage(language) {

  if (!translations[language]) return;

  currentLanguageCode = language;

  currentLanguage.textContent =
    language.toUpperCase();

  document.documentElement.lang =
    language === "so" ? "so" : "en";


  // Translate elements with data-en and data-so.

  document.querySelectorAll("[data-en][data-so]").forEach(element => {

    element.textContent =
      element.dataset[language];

  });


  // Translate buttons and navigation.

  const navigationLinks = document.querySelectorAll(".nav-link");

  const navKeys = ["home", "menu", "about", "contact"];

  navigationLinks.forEach((link, index) => {

    if (navKeys[index]) {
      link.textContent = getText(navKeys[index]);
    }

  });


  // Translate order type cards.

  $("#dineInBtn h2").textContent = getText("dineIn");

  $("#takeawayBtn h2").textContent = getText("takeaway");

  $("#dineInBtn p").textContent = getText("dineDescription");

  $("#takeawayBtn p").textContent = getText("takeawayDescription");


  // Translate menu categories.

  document.querySelectorAll(".category-btn").forEach(button => {

    const category = button.dataset.category;

    button.textContent = getText(category);

  });


  // Translate search.

  menuSearch.placeholder = getText("search");


  // Translate checkout headings and labels.

  const checkoutHeading = $(".checkout-heading h1");

  if (checkoutHeading) {
    checkoutHeading.textContent = getText("checkoutTitle");
  }

  const checkoutSectionHeading = $(".checkout-form-section h2");

  if (checkoutSectionHeading) {
    checkoutSectionHeading.textContent = getText("customerInfo");
  }

  const customerLabels = {
    customerName: "fullName",
    customerPhone: "phone",
    customerEmail: "email",
    tableNumber: "table",
    pickupTime: "pickup",
    orderNotes: "notes"
  };

  Object.entries(customerLabels).forEach(([id, key]) => {

    const input = document.getElementById(id);

    if (!input) return;

    const label = document.querySelector(`label[for="${id}"]`);

    if (label) {
      label.textContent = getText(key);
    }

  });


  // Translate checkout button.

  const checkoutSubmit = $("#placeOrderBtn");

  if (checkoutSubmit) {

    checkoutSubmit.innerHTML = `
      ${getText("placeOrder")}
      <i class="fa-solid fa-check"></i>
    `;

  }


  // Translate cart heading.

  $(".cart-header h2").innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
    ${getText("cart")}
  `;


  // Translate cart checkout button.

  checkoutBtn.innerHTML = `
    ${getText("checkout")}
    <i class="fa-solid fa-arrow-right"></i>
  `;


  // Translate cart total label.

  $(".cart-total span").textContent = getText("total");

  $(".summary-total span").textContent = getText("total");


  // Translate confirmation page.

  $(".confirmation-container h1").textContent =
    getText("thankYou");

  $(".confirmation-container > p").textContent =
    getText("orderSuccess");

  trackOrderBtn.textContent = getText("track");

  continueShoppingBtn.textContent = getText("continue");


  // Refresh products and cart.

  displayProducts();

  updateCart();

  languageOptions.classList.add("hidden");

  languageBtn.setAttribute("aria-expanded", "false");

}


languageBtn.addEventListener("click", () => {

  const isOpening = languageOptions.classList.contains("hidden");

  languageOptions.classList.toggle("hidden");

  languageBtn.setAttribute(
    "aria-expanded",
    String(isOpening)
  );

});


languageOptions.addEventListener("click", (event) => {

  const languageButton = event.target.closest("[data-lang]");

  if (!languageButton) return;

  changeLanguage(languageButton.dataset.lang);

});


/* =========================================
   22. MOBILE NAVIGATION
========================================= */

mobileMenuBtn.addEventListener("click", () => {

  const isOpening = !mainNavigation.classList.contains("active");

  mainNavigation.classList.toggle("active");

  mobileMenuBtn.setAttribute(
    "aria-expanded",
    String(isOpening)
  );

  mobileMenuBtn.innerHTML = isOpening
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';

});


document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    mainNavigation.classList.remove("active");

    mobileMenuBtn.setAttribute("aria-expanded", "false");

    mobileMenuBtn.innerHTML =
      '<i class="fa-solid fa-bars"></i>';

  });

});


/* =========================================
   23. UPDATE CURRENT YEAR
========================================= */

const currentYear = $("#currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   24. CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", (event) => {

  if (
    !event.target.closest(".language-switcher") &&
    !languageOptions.classList.contains("hidden")
  ) {

    languageOptions.classList.add("hidden");

    languageBtn.setAttribute("aria-expanded", "false");

  }

});


/* =========================================
   25. ESCAPE KEY
========================================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeCart();

    languageOptions.classList.add("hidden");

    languageBtn.setAttribute("aria-expanded", "false");

    mainNavigation.classList.remove("active");

    mobileMenuBtn.setAttribute("aria-expanded", "false");

    mobileMenuBtn.innerHTML =
      '<i class="fa-solid fa-bars"></i>';

  }

});


/* =========================================
   26. INITIALIZE WEBSITE
========================================= */

function initializeWebsite() {

  // Show menu products.

  displayProducts();

  // Initialize cart.

  updateCart();

  // Set current year.

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Set default language.

  changeLanguage("en");

  // Make sure the welcome page appears first.

  welcomePage.classList.remove("hidden");

  orderTypePage.classList.add("hidden");

  experiencePage.classList.add("hidden");

  checkoutPage.classList.add("hidden");

  confirmationPage.classList.add("hidden");

  trackPage.classList.add("hidden");

  console.log("Bella Napoli website is ready!");

}


initializeWebsite();