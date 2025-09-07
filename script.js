let plants = [];
let cart = [];

//  FETCH ALL PLANTS 

async function fetchPlants() {
  try {
    const container = document.getElementById("cards");
    container.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600"></div>
      </div>
    `;

    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    plants = data.plants || [];

    setTimeout(() => {
      displayCards(plants);
    }, 500);
  } catch (err) {
    console.error("Error fetching plants:", err);
  }
}

// FETCH ALL CATEGORIES 
async function fetchCategories() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const categories = data.categories || [];

    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = "";

    // All Trees option
    const allLi = document.createElement("li");
    allLi.className =
      "cursor-pointer px-3 py-2 rounded hover:bg-green-100 active-category";
    allLi.innerText = "All Trees";
    allLi.addEventListener("click", () => filterCategory("All Trees", allLi));
    categoriesContainer.appendChild(allLi);

    // Add other categories dynamically
    categories.forEach((cat) => {
      const li = document.createElement("li");
      li.className = "cursor-pointer px-3 py-2 rounded hover:bg-green-100";
      li.innerText = cat.category_name;
      li.dataset.id = cat.id;
      li.addEventListener("click", () => filterCategory(cat.category_name, li));
      categoriesContainer.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}

// DISPLAY CARDS 
function displayCards(data) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-gray-500">No plants found.</p>`;
    return;
  }

  data.forEach((plant) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow-md p-4 rounded-lg flex flex-col justify-between h-full";
    card.innerHTML = `
      <div class="h-36 bg-gray-200 rounded-md flex items-center justify-center">
        <img src="${plant.image}" alt="${plant.name}" class="h-full object-cover"/>
      </div>
      <h2 class="text-lg font-semibold mt-2 cursor-pointer" onclick="openModal(${plant.id})">${plant.name}</h2>
      <p class="text-sm text-gray-600 mb-2">${plant.description}</p>
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">${plant.category}</span>
        <span class="font-bold">৳${plant.price}</span>
      </div>
      <div class="flex justify-center mt-2">
        <button onclick="addToCart(${plant.id})" class="bg-green-600 text-white w-50 px-4 py-1 rounded-lg hover:bg-green-700"> Add to Cart </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// OPEN MODAL (Plant Details)
async function openModal(id) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    const plant = data.plants; // single object

    document.getElementById("modalName").innerText = plant.name;
    document.getElementById("modalImg").src = plant.image;
    document.getElementById("modalCategory").innerText = `Category: ${plant.category}`;
    document.getElementById("modalPrice").innerText = `Price: ৳${plant.price}`;
    document.getElementById("modalDesc").innerText = `Description: ${plant.description}`;
    document.getElementById("treeModal").classList.remove("hidden");
  } catch (err) {
    console.error("Error fetching plant details:", err);
  }
}

//  CLOSE MODAL 
function closeModal() {
  document.getElementById("treeModal").classList.add("hidden");
}

//  FILTER CATEGORY 
async function filterCategory(cat, btn) {
  document
    .querySelectorAll("#categories li")
    .forEach((b) => b.classList.remove("active-category"));
  btn.classList.add("active-category");

  const container = document.getElementById("cards");
  container.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-green-600"></div>
    </div>
  `;

  if (cat === "All Trees") {
    setTimeout(() => displayCards(plants), 500);
  } else {
    try {
      const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${btn.dataset.id}`
      );
      const data = await res.json();
      const filteredPlants = data.plants || [];
      setTimeout(() => displayCards(filteredPlants), 500);
    } catch (err) {
      console.error("Error fetching category plants:", err);
    }
  }
}

//  ADD TO CART 
function addToCart(id) {
  const plant = plants.find((p) => p.id === id) || cart.find((p) => p.id === id);
  if (!plant) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ ...plant, qty: 1 });

  displayCart();
  alert(`${plant.name} has been added to your cart!`);
}

//  DISPLAY CART 
function displayCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "flex justify-between items-center mb-2";
    div.innerHTML = `
      <span>${item.name} <br/> ৳${item.price}</span>
      <button onclick="removeFromCart(${item.id})" class="text-red-500">✕</button>
    `;
    cartContainer.appendChild(div);
  });
  const totalDiv = document.createElement("div");
  totalDiv.className = "mt-4 text-right font-bold";
  totalDiv.innerText = `Total: ৳${total}`;
  cartContainer.appendChild(totalDiv);
}

//  REMOVE FROM CART 
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  displayCart();
}

// Fetch plants and categories
document.addEventListener("DOMContentLoaded", () => {
  fetchPlants();
  fetchCategories();
});
