const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleIcon = toggleBtn.querySelector("i");

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
  toggleIcon.classList.remove("fa-bars");
  toggleIcon.classList.add("fa-xmark");
  document.body.classList.add("sidebar-open");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  toggleIcon.classList.remove("fa-xmark");
  toggleIcon.classList.add("fa-bars");
  document.body.classList.remove("sidebar-open");
}

toggleBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener("click", closeSidebar);


// Active link handler
const sidebarLinks = Array.from(document.querySelectorAll('.sidebar a'));
sidebarLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    sidebarLinks.forEach((l) => l.classList.remove('active'));
    event.currentTarget.classList.add('active');
  });
});
