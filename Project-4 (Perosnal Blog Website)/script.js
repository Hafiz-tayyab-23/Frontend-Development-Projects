// Sample data for posts (5 per category)
const posts = [
  // Tech
  { id: 1, title: "Understanding Closures in JavaScript", category: "Tech", date: "2025-08-12", image: "images/tech1.jpg", description: "A beginner-friendly explanation of closures with practical examples." },
  { id: 2, title: "A Simple Guide to TypeScript Narrowing", category: "Tech", date: "2025-07-01", image: "images/tech2.jpg", description: "How control flow analysis helps you write safer code." },
  { id: 3, title: "From Callbacks to Async/Await", category: "Tech", date: "2025-02-20", image: "images/tech3.jpg", description: "Modernizing async code without getting lost in Promises." },
  { id: 4, title: "Debugging Like a Pro: DevTools Tips", category: "Tech", date: "2025-06-24", image: "images/tech4.jpg", description: "Console tricks, breakpoints, and performance profiling you should know." },
  { id: 5, title: "CSS Grid Layout Patterns", category: "Tech", date: "2025-05-28", image: "images/tech5.jpg", description: "Real-world grid patterns for modern, responsive layouts." },

  // Travel
  { id: 6, title: "Weekend in Kyoto: Temples and Tea", category: "Travel", date: "2025-05-02", image: "images/travel1.jpg", description: "My favorite spots to slow down and soak in Kyoto's calm energy." },
  { id: 7, title: "How I Plan Lightweight Solo Trips", category: "Travel", date: "2025-01-30", image: "images/travel2.jpg", description: "Packing lists and small hacks to feel prepared yet flexible." },
  { id: 8, title: "Hiking the Dolomites on a Budget", category: "Travel", date: "2025-06-03", image: "images/travel3.jpg", description: "Routes, huts, and the gear that kept my pack light." },
  { id: 9, title: "Istanbul Street Food Crawl", category: "Travel", date: "2025-07-18", image: "images/travel4.jpg", description: "Simit, balik ekmek, and other bites between two continents." },
  { id: 10, title: "Sunrise at Bagan: A Photo Guide", category: "Travel", date: "2025-03-22", image: "images/travel5.jpg", description: "Best pagodas and vantage points for golden-hour shots." },

  // Food
  { id: 11, title: "Sourdough Basics You Can Master at Home", category: "Food", date: "2025-04-18", image: "images/food1.jpg", description: "Starter, bulk fermentation, and baking tips to get that perfect crumb." },
  { id: 12, title: "Street Tacos, Three Ways", category: "Food", date: "2025-03-07", image: "images/food2.jpg", description: "Carnitas, veggie, and fish tacos with zesty toppings." },
  { id: 13, title: "Comfort Ramen at Home", category: "Food", date: "2025-02-05", image: "images/food3.jpg", description: "Broth, tare, and toppings simplified for weeknights." },
  { id: 14, title: "The Perfect Iced Coffee Science", category: "Food", date: "2025-06-12", image: "images/food4.jpg", description: "Ratios and ice tricks for crisp, flavorful brews." },
  { id: 15, title: "Baking Chewy Chocolate Chip Cookies", category: "Food", date: "2025-07-05", image: "images/food5.jpg", description: "Butter temperature, flours, and rest times that matter." },

  // Design
  { id: 16, title: "Designing With Contrast: Dark UI Tips", category: "Design", date: "2025-06-10", image: "images/design1.jpg", description: "Use color, depth, and spacing to build accessible dark interfaces." },
  { id: 17, title: "Accessible Color Palettes in 10 Minutes", category: "Design", date: "2025-08-01", image: "images/design2.jpg", description: "Quick checks to ensure your palette plays well with everyone." },
  { id: 18, title: "Microinteractions That Delight", category: "Design", date: "2025-05-16", image: "images/design3.jpg", description: "Small animations that guide without distracting." },
  { id: 19, title: "Typography Hierarchy for the Web", category: "Design", date: "2025-03-12", image: "images/design4.jpg", description: "Scale systems and rhythm that read comfortably." },
  { id: 20, title: "Design Critique: Give and Receive Better Feedback", category: "Design", date: "2025-07-20", image: "images/design5.jpg", description: "Structure critique sessions that move work forward." },

  // Lifestyle
  { id: 21, title: "Morning Routines That Actually Stick", category: "Lifestyle", date: "2024-12-11", image: "images/lifestyle1.jpg", description: "Tiny habits that compound into a calmer, focused day." },
  { id: 22, title: "Minimalist Desk Setup for Focus", category: "Lifestyle", date: "2025-06-08", image: "images/lifestyle2.jpg", description: "Declutter, lighting, and ergonomics that reduce friction." },
  { id: 23, title: "How to Journal Without Overthinking", category: "Lifestyle", date: "2025-05-05", image: "images/lifestyle3.jpg", description: "Simple prompts and constraints that keep it sustainable." },
  { id: 24, title: "Weekend Reset: Cleaning in 45 Minutes", category: "Lifestyle", date: "2025-02-18", image: "images/lifestyle4.jpg", description: "Fast routine to start the week fresher and lighter." },
  { id: 25, title: "Walking for Creativity: My 5K Loop", category: "Lifestyle", date: "2025-07-11", image: "images/lifestyle5.jpg", description: "Why short walks spark ideas and how to build the habit." }
];

// State
let state = {
  page: 1,
  perPage: 6,
  category: "All",
  query: ""
};

// Elements
const grid = document.getElementById("postsGrid");
const categorySelect = document.getElementById("categorySelect");
const perPageSelect = document.getElementById("perPageSelect");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// Helpers
function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function createCard(post) {
  const article = document.createElement("article");
  article.className = "card";
  article.innerHTML = `
    <img class="card-img" src="${post.image}" alt="${post.title}" loading="lazy" referrerpolicy="no-referrer" data-category="${post.category}">
    <div class="card-body">
      <div class="card-meta"><span class="badge">${post.category}</span><span>·</span><span>${formatDate(post.date)}</span></div>
      <h3 class="card-title">${post.title}</h3>
      <p class="card-desc">${post.description}</p>
    </div>
  `;
  const img = article.querySelector("img");
  img.addEventListener("error", () => imgFallback(img));
  return article;
}

// Category-aware image fallback
function imgFallback(imgEl) {
  const cat = (imgEl.getAttribute("data-category") || "").toLowerCase();
  const fallbackByCat = {
    tech: "images/fallback_tech.jpg",
    travel: "images/fallback_travel.jpg",
    food: "images/fallback_food.jpg",
    design: "images/fallback_design.jpg",
    lifestyle: "images/fallback_lifestyle.jpg"
  };
  const url = fallbackByCat[cat] || "images/fallback_default.jpg";
  // Prevent infinite loop
  imgEl.onerror = null;
  imgEl.src = url;
}

function applyFilters(data) {
  let filtered = data;
  if (state.category !== "All") {
    filtered = filtered.filter(p => p.category === state.category);
  }
  if (state.query.trim() !== "") {
    const q = state.query.trim().toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  }
  // sort newest first
  filtered = filtered.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  return filtered;
}

function paginate(data) {
  const total = data.length;
  const pages = Math.max(1, Math.ceil(total / state.perPage));
  const clampedPage = Math.min(Math.max(1, state.page), pages);
  const start = (clampedPage - 1) * state.perPage;
  const slice = data.slice(start, start + state.perPage);
  return { slice, total, pages, page: clampedPage };
}

function render() {
  const filtered = applyFilters(posts);
  const { slice, total, pages, page } = paginate(filtered);
  state.page = page; // keep clamped

  grid.innerHTML = "";
  slice.forEach(post => grid.appendChild(createCard(post)));

  pageInfo.textContent = `${page} / ${pages} (${total} posts)`;
  prevBtn.disabled = page <= 1;
  nextBtn.disabled = page >= pages;
}

// Event listeners
categorySelect.addEventListener("change", () => {
  state.category = categorySelect.value;
  state.page = 1;
  render();
});

perPageSelect.addEventListener("change", () => {
  state.perPage = Number(perPageSelect.value);
  state.page = 1;
  render();
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  state.page = 1;
  render();
});

prevBtn.addEventListener("click", () => {
  state.page -= 1;
  render();
});

nextBtn.addEventListener("click", () => {
  state.page += 1;
  render();
});

// Initialize from defaults in DOM
state.perPage = Number(perPageSelect.value);
render();


