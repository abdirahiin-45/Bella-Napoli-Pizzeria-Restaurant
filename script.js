
"use strict";

/* =========================================
   BELLA NAPOLI - COMPLETE JAVASCRIPT
   English | Somali | Arabic
   Navigation | Cart | Checkout | WhatsApp
   Tracking | Global Back Button
========================================= */

/* 1. SELECT ELEMENTS */

const $ = (selector) => document.querySelector(selector);

const welcomePage = $("#welcomePage");
const orderTypePage = $("#orderTypePage");
const experiencePage = $("#experiencePage");
const checkoutPage = $("#checkoutPage");
const confirmationPage = $("#confirmationPage");
const trackPage = $("#trackPage");

const globalBackBtn = $("#globalBackBtn");

const orderNowBtn = $("#orderNowBtn");
const dineInBtn = $("#dineInBtn");
const takeawayBtn = $("#takeawayBtn");
const backWelcomeBtn = $("#backWelcomeBtn");

const productsGrid = $("#productsGrid");
const menuSearch = $("#menuSearch");
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

const checkoutForm = $("#checkoutForm");
const checkoutItems = $("#checkoutItems");
const checkoutTotal = $("#checkoutTotal");
const backToMenuBtn = $("#backToMenuBtn");

const dineInFields = $("#dineInFields");
const takeawayFields = $("#takeawayFields");
const tableNumber = $("#tableNumber");
const pickupTime = $("#pickupTime");

const confirmationOrderNumber = $("#orderNumber");
const trackOrderBtn = $("#trackOrderBtn");
const continueShoppingBtn = $("#continueShoppingBtn");

const trackForm = $("#trackForm");
const trackOrderInput = $("#trackOrderInput");
const trackResult = $("#trackResult");
const trackStatus = $("#trackStatus");

const toast = $("#toast");
const toastMessage = $("#toastMessage");

const languageBtn = $("#languageBtn");
const languageOptions = $("#languageOptions");
const currentLanguage = $("#currentLanguage");

const mobileMenuBtn = $("#mobileMenuBtn");
const mainNavigation = $("#mainNavigation");

const currentYear = $("#currentYear");

/* 2. APPLICATION SETTINGS */

const RESTAURANT_WHATSAPP = "252617454321";

const STORAGE_ORDERS = "bellaNapoliOrders";
const STORAGE_LAST_ORDER = "bellaNapoliLastOrder";

let cart = [];
let selectedOrderType = "";
let currentCategory = "all";
let currentLanguageCode = "en";
let lastOrder = null;
let toastTimer = null;

let pageHistory = ["welcomePage"];
let currentPage = "welcomePage";

/* 3. FOOD PRODUCTS */

const products = [
  {
    id: 1,
    name: "Margherita Pizza",
    somaliName: "Pizza Margherita",
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
    somaliDescription: "Sandwich saddex lakab leh.",
    badge: "Popular"
  },
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
    somaliDescription: "Cabitaan strawberry cusub.",
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

/* 4. ARABIC PRODUCTS */

const arabicProducts = {
  1: ["بيتزا مارغريتا", "صلصة طماطم طازجة وجبن موزاريلا وريحان."],
  2: ["بيتزا بيبروني", "بيبروني كلاسيكي مع جبن موزاريلا ذائب."],
  3: ["بيتزا الدجاج بالباربكيو", "دجاج مشوي وصلصة باربكيو وجبن."],
  4: ["بيتزا الأجبان الأربعة", "مزيج لذيذ من أربعة أنواع من الجبن الإيطالي."],
  5: ["سباغيتي بولونيز", "سباغيتي مع صلصة الطماطم واللحم."],
  6: ["باستا ألفريدو بالكريمة", "صلصة ألفريدو الكريمية مع جبن البارميزان."],
  7: ["باستا بيني بالدجاج", "معكرونة بيني مع الدجاج المشوي."],
  8: ["ساندويتش الدجاج", "خبز طازج مع الدجاج والخضروات."],
  9: ["كلوب ساندويتش", "ساندويتش من ثلاث طبقات بمكونات طازجة."],
  10: ["كيكة الشوكولاتة", "كيكة شوكولاتة غنية بطبقة كريمية."],
  11: ["تيراميسو", "حلوى إيطالية كلاسيكية بنكهة القهوة."],
  12: ["عصير البرتقال الطازج", "عصير برتقال طازج."],
  13: ["سموذي الفراولة", "مشروب سموذي بالفراولة الطازجة."],
  14: ["قهوة باردة", "قهوة مثلجة ناعمة ومنعشة."]
};

/* 5. TRANSLATIONS */

const translations = {
  en: {
    orderNow: "ORDER NOW",
    question: "How would you like to enjoy your meal?",
    orderDescription: "Choose your preferred dining experience.",
    dineIn: "DINE IN",
    takeaway: "TAKEAWAY",
    dineDescription: "Enjoy your meal at our restaurant.",
    takeawayDescription: "Order your food and take it away.",
    home: "Home",
    menu: "Menu",
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
    orderNotFound: "Order not found in this browser.",
    emptyError: "Your cart is empty.",
    addFirst: "Please add food to your cart first.",
    allowPopup: "WhatsApp could not open. Please allow pop-ups.",
    remove: "Remove item",
    back: "Back"
  },

  so: {
    orderNow: "DALBO HADA",
    question: "Sidee ayaad rabtaa inaad cuntadaada u qaadato?",
    orderDescription: "Dooro qaabka aad cuntada u rabto.",
    dineIn: "KU CUN MAQAAYADDA",
    takeaway: "QAADO",
    dineDescription: "Cuntadaada ku cun maqaayaddeenna.",
    takeawayDescription: "Dalbo cuntadaada oo qaado.",
    home: "Bogga Hore",
    menu: "Cuntooyinka",
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
    orderNotFound: "Dalabkan lagama helin browser-kan.",
    emptyError: "Gaarigaagu waa madhan yahay.",
    addFirst: "Fadlan marka hore cunto ku dar gaariga.",
    allowPopup: "WhatsApp ma furmin. Oggolow pop-ups.",
    remove: "Ka saar cuntadan",
    back: "Dib u noqo"
  },

  ar: {
    orderNow: "اطلب الآن",
    question: "كيف ترغب في الاستمتاع بوجبتك؟",
    orderDescription: "اختر طريقة تناول الطعام المفضلة لديك.",
    dineIn: "تناول الطعام في المطعم",
    takeaway: "طلب خارجي",
    dineDescription: "استمتع بوجبتك داخل مطعمنا.",
    takeawayDescription: "اطلب طعامك وخذه معك.",
    home: "الرئيسية",
    menu: "قائمة الطعام",
    about: "من نحن",
    contact: "اتصل بنا",
    search: "ابحث عن طعامك المفضل...",
    all: "الكل",
    pizza: "بيتزا",
    pasta: "معكرونة",
    sandwich: "ساندويتش",
    dessert: "حلويات",
    drinks: "مشروبات",
    addCart: "أضف إلى السلة",
    cart: "سلة التسوق",
    emptyCart: "سلة التسوق فارغة",
    emptyDescription: "أضف شيئاً لذيذاً!",
    checkout: "إتمام الطلب",
    total: "الإجمالي",
    checkoutTitle: "إتمام الطلب",
    customerInfo: "معلومات العميل",
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    table: "رقم الطاولة",
    pickup: "وقت الاستلام",
    notes: "ملاحظات الطلب",
    placeOrder: "تأكيد الطلب",
    thankYou: "شكراً لك!",
    orderSuccess: "تم استلام طلبك بنجاح.",
    track: "تتبع طلبك",
    continue: "متابعة التسوق",
    searchEmpty: "لم يتم العثور على أي أطعمة.",
    successCart: "تمت إضافة الطعام إلى السلة!",
    orderReceived: "تم استلام الطلب",
    orderNotFound: "لم يتم العثور على الطلب في هذا المتصفح.",
    emptyError: "سلة التسوق فارغة.",
    addFirst: "يرجى إضافة الطعام إلى السلة أولاً.",
    allowPopup: "يرجى السماح بالنوافذ المنبثقة لفتح واتساب.",
    remove: "إزالة المنتج",
    back: "رجوع"
  }
};

/* 6. HELPER FUNCTIONS */

function formatPrice(price) {
  return "$" + Number(price).toFixed(2);
}

function getText(key) {
  return translations[currentLanguageCode]?.[key]
    || translations.en[key]
    || key;
}

function getProductName(product) {
  if (currentLanguageCode === "so") {
    return product.somaliName;
  }

  if (currentLanguageCode === "ar") {
    return arabicProducts[product.id]?.[0] || product.name;
  }

  return product.name;
}

function getProductDescription(product) {
  if (currentLanguageCode === "so") {
    return product.somaliDescription;
  }

  if (currentLanguageCode === "ar") {
    return arabicProducts[product.id]?.[1] || product.description;
  }

  return product.description;
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* 7. GLOBAL PAGE NAVIGATION */

const allPages = {
  welcomePage,
  orderTypePage,
  experiencePage,
  checkoutPage,
  confirmationPage,
  trackPage
};

function showPage(pageId, addHistory = true) {
  if (!allPages[pageId]) return;

  Object.entries(allPages).forEach(([id, page]) => {
    page?.classList.toggle("hidden", id !== pageId);
  });

  currentPage = pageId;

  if (addHistory) {
    if (pageHistory[pageHistory.length - 1] !== pageId) {
      pageHistory.push(pageId);
    }
  }

  closeCart();
  closeMobileMenu();

  if (globalBackBtn) {
    globalBackBtn.style.display =
      pageId === "welcomePage" ? "none" : "flex";

    globalBackBtn.setAttribute(
      "aria-hidden",
      String(pageId === "welcomePage")
    );
  }

  scrollTop();
}

function goBack() {
  if (cartDrawer && !cartDrawer.classList.contains("hidden")) {
    closeCart();
    return;
  }

  if (languageOptions && !languageOptions.classList.contains("hidden")) {
    languageOptions.classList.add("hidden");
    return;
  }

  if (pageHistory.length > 1) {
    pageHistory.pop();

    const previousPage = pageHistory[pageHistory.length - 1];

    showPage(previousPage, false);
  } else {
    showPage("welcomePage", false);
  }
}

globalBackBtn?.addEventListener("click", goBack);

orderNowBtn?.addEventListener("click", () => {
  showPage("orderTypePage");
});

backWelcomeBtn?.addEventListener("click", goBack);

dineInBtn?.addEventListener("click", () => {
  selectedOrderType = "dine-in";
  updateOrderFields();
  showPage("experiencePage");
});

takeawayBtn?.addEventListener("click", () => {
  selectedOrderType = "takeaway";
  updateOrderFields();
  showPage("experiencePage");
});

/* 8. ORDER TYPE FIELDS */

function updateOrderFields() {
  const isDineIn = selectedOrderType === "dine-in";

  dineInFields?.classList.toggle("hidden", !isDineIn);
  takeawayFields?.classList.toggle("hidden", isDineIn);

  if (tableNumber) {
    tableNumber.required = isDineIn;
  }

  if (pickupTime) {
    pickupTime.required = !isDineIn;
  }
}

/* 9. DISPLAY PRODUCTS */

function displayProducts() {
  if (!productsGrid) return;

  const searchText = (menuSearch?.value || "").toLowerCase().trim();

  const filteredProducts = products.filter((product) => {
    const searchable = [
      product.name,
      product.somaliName,
      product.description,
      product.somaliDescription,
      ...(arabicProducts[product.id] || [])
    ].join(" ").toLowerCase();

    const matchesCategory =
      currentCategory === "all" ||
      product.category === currentCategory;

    return matchesCategory && searchable.includes(searchText);
  });

  productsGrid.innerHTML = "";

  if (!filteredProducts.length) {
    noProducts?.classList.remove("hidden");

    if (noProducts) {
      noProducts.textContent = getText("searchEmpty");
    }

    return;
  }

  noProducts?.classList.add("hidden");

  filteredProducts.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image-container";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = getProductName(product);
    image.loading = "lazy";

    imageContainer.appendChild(image);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.className = "product-badge";
      badge.textContent = product.badge;
      imageContainer.appendChild(badge);
    }

    const content = document.createElement("div");
    content.className = "product-content";

    const heading = document.createElement("h3");
    heading.textContent = getProductName(product);

    const description = document.createElement("p");
    description.textContent = getProductDescription(product);

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "add-to-cart-btn";
    addButton.dataset.productId = product.id;
    addButton.innerHTML =
      `<i class="fa-solid fa-cart-plus"></i> ${getText("addCart")}`;

    bottom.append(price, addButton);
    content.append(heading, description, bottom);
    card.append(imageContainer, content);

    productsGrid.appendChild(card);
  });
}

menuSearch?.addEventListener("input", displayProducts);

/* 10. CATEGORY FILTER */

menuCategories?.addEventListener("click", (event) => {
  const button = event.target.closest(".category-btn");

  if (!button) return;

  document.querySelectorAll(".category-btn").forEach((item) => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  currentCategory = button.dataset.category || "all";

  displayProducts();
});

/* 11. ADD TO CART */

productsGrid?.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-btn");

  if (!button) return;

  addToCart(Number(button.dataset.productId));
});

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

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

/* 12. UPDATE CART */

function updateCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = getProductName(item);

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const heading = document.createElement("h4");
    heading.textContent = getProductName(item);

    const price = document.createElement("p");
    price.textContent = formatPrice(item.price * item.quantity);

    const quantity = document.createElement("div");
    quantity.className = "cart-quantity";

    quantity.innerHTML = `
      <button type="button" data-action="decrease" data-id="${item.id}">-</button>
      <span>${item.quantity}</span>
      <button type="button" data-action="increase" data-id="${item.id}">+</button>
    `;

    info.append(heading, price, quantity);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-cart-item";
    removeButton.dataset.action = "remove";
    removeButton.dataset.id = item.id;
    removeButton.setAttribute("aria-label", getText("remove"));
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    cartItem.append(image, info, removeButton);
    cartItems.appendChild(cartItem);
  });

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-basket-shopping"></i>
        <h3>${getText("emptyCart")}</h3>
        <p>${getText("emptyDescription")}</p>
      </div>
    `;
  }

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }

  if (cartTotal) {
    cartTotal.textContent = formatPrice(getCartTotal());
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(getCartTotal());
  }

  updateCheckoutSummary();
}

/* 13. CART QUANTITY BUTTONS */

cartItems?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  const item = cart.find((product) => product.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity++;
  } else if (action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter((product) => product.id !== id);
    }
  } else if (action === "remove") {
    cart = cart.filter((product) => product.id !== id);
  }

  updateCart();
});

/* 14. CART DRAWER */

function openCart() {
  if (!cartDrawer || !cartOverlay) return;

  cartDrawer.classList.remove("hidden");
  cartOverlay.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer?.classList.add("hidden");
  cartOverlay?.classList.add("hidden");

  document.body.style.overflow = "";
}

cartButton?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

/* 15. CHECKOUT SUMMARY */

function updateCheckoutSummary() {
  if (!checkoutItems) return;

  checkoutItems.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "checkout-summary-item";

    const name = document.createElement("span");
    name.textContent = `${getProductName(item)} × ${item.quantity}`;

    const price = document.createElement("span");
    price.textContent = formatPrice(item.price * item.quantity);

    row.append(name, price);
    checkoutItems.appendChild(row);
  });

  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(getCartTotal());
  }

  updatePlaceOrderButton();
}

/* 16. PAYMENT BUTTON TOTAL */

function updatePlaceOrderButton() {
  const button = $("#placeOrderBtn");

  if (!button) return;

  button.innerHTML = `
    PAY ${formatPrice(getCartTotal())}
    <i class="fa-solid fa-lock"></i>
  `;
}

/* 17. OPEN CHECKOUT */

checkoutBtn?.addEventListener("click", () => {
  if (!cart.length) {
    showToast(getText("addFirst"));
    return;
  }

  closeCart();
  updateOrderFields();
  updateCheckoutSummary();

  showPage("checkoutPage");
});

/* 18. BACK TO MENU */

backToMenuBtn?.addEventListener("click", goBack);

/* 19. PAYMENT METHOD */

function getSelectedPaymentMethod() {
  return document.querySelector(
    'input[name="paymentMethod"]:checked'
  )?.value || "";
}

/* 20. ORDER STORAGE */

function getStoredOrders() {
  try {
    const orders = JSON.parse(
      localStorage.getItem(STORAGE_ORDERS) || "[]"
    );

    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error("Order storage error:", error);
    return [];
  }
}

function saveOrder(order) {
  const orders = getStoredOrders();

  orders.push(order);

  localStorage.setItem(
    STORAGE_ORDERS,
    JSON.stringify(orders)
  );

  localStorage.setItem(
    STORAGE_LAST_ORDER,
    JSON.stringify(order)
  );
}

/* 21. WHATSAPP ORDER MESSAGE */

function sendOrderToWhatsApp(order) {
  const orderedItems = order.items.map((item, index) => {
    return `${index + 1}. ${item.name}\n   Quantity: ${item.quantity}\n   Price: ${formatPrice(item.price * item.quantity)}`;
  }).join("\n\n");

  const orderDetails = order.orderType === "dine-in"
    ? `Table Number: ${order.tableNumber}`
    : `Pickup Time: ${order.pickupTime}`;

  const message = `
🍕 BELLA NAPOLI
NEW CUSTOMER ORDER

━━━━━━━━━━━━━━━━━━

ORDER NUMBER:
${order.number}

CUSTOMER:
${order.customer}

PHONE:
${order.phone}

EMAIL:
${order.email || "Not provided"}

ORDER TYPE:
${order.orderType}

${orderDetails}

━━━━━━━━━━━━━━━━━━

ORDER ITEMS:

${orderedItems}

━━━━━━━━━━━━━━━━━━

TOTAL:
${formatPrice(order.total)}

PAYMENT METHOD:
${order.paymentMethod}

NOTES:
${order.notes || "No notes"}

STATUS:
${order.status}

━━━━━━━━━━━━━━━━━━
Bella Napoli Pizzeria & Restaurant
`;

  const whatsappURL =
    "https://wa.me/" +
    RESTAURANT_WHATSAPP +
    "?text=" +
    encodeURIComponent(message);

  /*
    Open WhatsApp directly.
    Use the same tab if popup is blocked.
  */

  const whatsappWindow = window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

  if (!whatsappWindow) {
    window.location.href = whatsappURL;
  }
}

/* 22. PLACE ORDER */

checkoutForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!cart.length) {
    showToast(getText("emptyError"));
    return;
  }

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  const paymentMethod = getSelectedPaymentMethod();

  if (!paymentMethod) {
    showToast("Please select a payment method.");
    return;
  }

  const customerName = $("#customerName")?.value.trim() || "";
  const customerPhone = $("#customerPhone")?.value.trim() || "";
  const customerEmail = $("#customerEmail")?.value.trim() || "";
  const notes = $("#orderNotes")?.value.trim() || "";

  const newOrderNumber =
    "BN" + Date.now().toString().slice(-8);

  lastOrder = {
    number: newOrderNumber,
    customer: customerName,
    phone: customerPhone,
    email: customerEmail,

    orderType: selectedOrderType,

    tableNumber: selectedOrderType === "dine-in"
      ? tableNumber?.value.trim() || ""
      : "",

    pickupTime: selectedOrderType === "takeaway"
      ? pickupTime?.value || ""
      : "",

    notes,
    paymentMethod,

    items: cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),

    total: getCartTotal(),
    status: "Order received",
    date: new Date().toISOString()
  };

  /*
    Open WhatsApp before doing other work,
    so browsers are more likely to allow it.
  */

  try {
    saveOrder(lastOrder);
  } catch (error) {
    console.error("Could not save order:", error);
    showToast("Could not save order on this device.");
    return;
  }

  if (confirmationOrderNumber) {
    confirmationOrderNumber.textContent =
      "#" + newOrderNumber;
  }

  const orderToSend = lastOrder;

  cart = [];
  updateCart();

  checkoutForm.reset();

  selectedOrderType = orderToSend.orderType;

  showPage("confirmationPage");

  sendOrderToWhatsApp(orderToSend);
});

/* 23. TRACK ORDER PAGE */

trackOrderBtn?.addEventListener("click", () => {
  trackResult?.classList.add("hidden");

  if (lastOrder && trackOrderInput) {
    trackOrderInput.value = lastOrder.number;
  }

  showPage("trackPage");

  /*
    Automatically show the latest order status.
  */

  if (lastOrder && trackForm) {
    trackForm.requestSubmit();
  }
});

/* 24. TRACK ORDER SEARCH */

trackForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredNumber =
    (trackOrderInput?.value || "").trim().toUpperCase();

  if (!enteredNumber) return;

  const orders = getStoredOrders();

  const foundOrder = orders.find((order) => {
    return String(order.number).toUpperCase() === enteredNumber;
  });

  trackResult?.classList.remove("hidden");

  if (!foundOrder) {
    if (trackStatus) {
      trackStatus.textContent = getText("orderNotFound");
      trackStatus.style.color = "#dc3545";
    }

    return;
  }

  if (trackStatus) {
    trackStatus.textContent =
      `${foundOrder.status} - ${foundOrder.number}`;

    trackStatus.style.color = "#28a745";
  }
});

/* 25. CONTINUE SHOPPING */

continueShoppingBtn?.addEventListener("click", () => {
  selectedOrderType = "";
  showPage("welcomePage");
});

/* 26. LANGUAGE SWITCHER */

function changeLanguage(language) {
  if (!translations[language]) return;

  currentLanguageCode = language;

  const isArabic = language === "ar";

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  if (currentLanguage) {
    currentLanguage.textContent = language.toUpperCase();
  }

  document.querySelectorAll("[data-en], [data-so], [data-ar]")
    .forEach((element) => {
      const translated = element.dataset[language];

      if (translated !== undefined) {
        element.textContent = translated;
      }
    });

  /* Order Now */

  if (orderNowBtn) {
    const icon = orderNowBtn.querySelector("i");

    orderNowBtn.textContent = getText("orderNow") + " ";

    if (icon) {
      orderNowBtn.appendChild(icon);
    }
  }

  /* Order Type */

  const orderHeading = $("#orderTypePage h1");
  const orderDescription = $("#orderTypePage .order-type-description");

  if (orderHeading) {
    orderHeading.textContent = getText("question");
  }

  if (orderDescription) {
    orderDescription.textContent = getText("orderDescription");
  }

  const dineHeading = $("#dineInBtn h2");
  const takeawayHeading = $("#takeawayBtn h2");

  if (dineHeading) dineHeading.textContent = getText("dineIn");
  if (takeawayHeading) takeawayHeading.textContent = getText("takeaway");

  const dineDescription = $("#dineInBtn p");
  const takeawayDescription = $("#takeawayBtn p");

  if (dineDescription) {
    dineDescription.textContent = getText("dineDescription");
  }

  if (takeawayDescription) {
    takeawayDescription.textContent = getText("takeawayDescription");
  }

  /* Navigation */

  const navKeys = ["home", "menu", "about", "contact"];

  document.querySelectorAll(".nav-link").forEach((link, index) => {
    if (navKeys[index]) {
      link.textContent = getText(navKeys[index]);
    }
  });

  /* Search */

  if (menuSearch) {
    menuSearch.placeholder = getText("search");
  }

  /* Categories */

  document.querySelectorAll(".category-btn").forEach((button) => {
    button.textContent = getText(
      button.dataset.category || "all"
    );
  });

  /* Cart */

  const cartHeading = $("#cartDrawer .cart-header h2");

  if (cartHeading) {
    cartHeading.innerHTML =
      `<i class="fa-solid fa-cart-shopping"></i> ${getText("cart")}`;
  }

  const cartTotalLabel = $("#cartDrawer .cart-total span");

  if (cartTotalLabel) {
    cartTotalLabel.textContent = getText("total");
  }

  if (checkoutBtn) {
    checkoutBtn.innerHTML =
      `${getText("checkout")} <i class="fa-solid fa-arrow-right"></i>`;
  }

  /* Checkout */

  const checkoutHeading = $("#checkoutPage .checkout-heading h1");

  if (checkoutHeading) {
    checkoutHeading.textContent = getText("checkoutTitle");
  }

  const customerHeading = $(".checkout-form-section h2");

  if (customerHeading) {
    customerHeading.textContent = getText("customerInfo");
  }

  const labelTranslations = {
    customerName: "fullName",
    customerPhone: "phone",
    customerEmail: "email",
    tableNumber: "table",
    pickupTime: "pickup",
    orderNotes: "notes"
  };

  Object.entries(labelTranslations).forEach(([id, key]) => {
    const label = document.querySelector(`label[for="${id}"]`);

    if (label) {
      label.textContent = getText(key);
    }
  });

  /* Confirmation */

  const thankYou = $("#confirmationPage .confirmation-container h1");

  if (thankYou) {
    thankYou.textContent = getText("thankYou");
  }

  const successDescription = $("#confirmationPage .confirmation-container > p");

  if (successDescription) {
    successDescription.textContent = getText("orderSuccess");
  }

  if (trackOrderBtn) {
    trackOrderBtn.textContent = getText("track");
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.textContent = getText("continue");
  }

  /* Global Back */

  if (globalBackBtn) {
    const backText = globalBackBtn.querySelector("span");

    if (backText) {
      backText.textContent = getText("back");
    }
  }

  /* Language active state */

  languageOptions?.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.lang === language
    );

    button.setAttribute(
      "aria-pressed",
      String(button.dataset.lang === language)
    );
  });

  displayProducts();
  updateCart();
  updateCheckoutSummary();

  languageOptions?.classList.add("hidden");
  languageBtn?.setAttribute("aria-expanded", "false");
}

languageBtn?.addEventListener("click", () => {
  if (!languageOptions) return;

  const opening = languageOptions.classList.contains("hidden");

  languageOptions.classList.toggle("hidden");

  languageBtn.setAttribute("aria-expanded", String(opening));
});

languageOptions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");

  if (!button) return;

  changeLanguage(button.dataset.lang);
});

/* 27. MOBILE NAVIGATION */

function closeMobileMenu() {
  mainNavigation?.classList.remove("active");

  mobileMenuBtn?.setAttribute("aria-expanded", "false");

  if (mobileMenuBtn) {
    mobileMenuBtn.innerHTML =
      '<i class="fa-solid fa-bars"></i>';
  }
}

mobileMenuBtn?.addEventListener("click", () => {
  if (!mainNavigation) return;

  const opening = !mainNavigation.classList.contains("active");

  mainNavigation.classList.toggle("active");

  mobileMenuBtn.setAttribute("aria-expanded", String(opening));

  mobileMenuBtn.innerHTML = opening
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* 28. NAVIGATION HASH LINKS */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (currentPage !== "experiencePage") return;

    const targetId = link.getAttribute("href");

    if (targetId === "#") return;

    const target = $(targetId);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 50);
    }
  });
});

/* 29. CLOSE DROPDOWNS */

document.addEventListener("click", (event) => {
  if (
    languageOptions &&
    languageBtn &&
    !event.target.closest(".language-switcher")
  ) {
    languageOptions.classList.add("hidden");
    languageBtn.setAttribute("aria-expanded", "false");
  }
});

/* 30. ESCAPE KEY */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();

    languageOptions?.classList.add("hidden");

    languageBtn?.setAttribute("aria-expanded", "false");

    closeMobileMenu();
  }
});

/* 31. CURRENT YEAR */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* 32. RESTORE LAST ORDER */

function restoreLastOrder() {
  try {
    const savedOrder = localStorage.getItem(STORAGE_LAST_ORDER);

    if (savedOrder) {
      lastOrder = JSON.parse(savedOrder);
    }
  } catch (error) {
    console.error("Could not restore order:", error);
  }
}

/* 33. INITIALIZE WEBSITE */

function initializeWebsite() {
  restoreLastOrder();

  displayProducts();
  updateCart();

  changeLanguage("en");

  showPage("welcomePage", false);

  pageHistory = ["welcomePage"];

  console.log("Bella Napoli website is ready!");
}

/* START APPLICATION */

initializeWebsite();
