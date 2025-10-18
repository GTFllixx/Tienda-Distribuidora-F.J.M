document.addEventListener("DOMContentLoaded", function () {
  // 🔍 Buscador de productos con filtro en tiempo real
  const searchInput = document.getElementById("productSearch");
  const searchButton = document.getElementById("searchButton");
  let productCards = [];

  function updateProductCards() {
    productCards = document.querySelectorAll(".product-card");
  }

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    productCards.forEach(card => {
      const title = card.querySelector("h2")?.textContent.toLowerCase() || "";
      const description = card.querySelector(".description")?.textContent.toLowerCase() || "";
      const code = card.querySelector(".product-code code")?.textContent.toLowerCase() || "";

      if (
        title.includes(searchText) ||
        description.includes(searchText) ||
        code.includes(searchText)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);

    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        filterProducts();
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      filterProducts();
    });
  }

  // 📱 Menú móvil toggle
  const toggleBtn = document.getElementById("mobileNavToggle");
  const categoryNav = document.getElementById("categoryNav");

  if (toggleBtn && categoryNav) {
    toggleBtn.addEventListener("click", () => {
      categoryNav.classList.toggle("show");
    });

    // Ocultar menú al hacer clic en cualquier enlace (solo en móviles)
    const menuLinks = categoryNav.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          categoryNav.classList.remove("show");
        }
      });
    });
  }

  // 📩 Modal de contacto
  const contactLink = document.getElementById("contactLink");
  const contactModal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".modal .close");

  if (contactLink && contactModal) {
    contactLink.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.style.display = "block";
      if (categoryNav) categoryNav.classList.remove("show");
    });
  }

  if (closeBtn && contactModal) {
    closeBtn.addEventListener("click", () => {
      contactModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && contactModal.style.display === "block") {
      contactModal.style.display = "none";
    }
  });

  // 📥 Cargar contenido dinámico
  function loadCategoryContent(id, file) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
        return response.text();
      })
      .then(html => {
        document.getElementById(id).innerHTML = html;
        updateProductCards();
      })
      .catch(error => {
        console.error(`Error cargando ${file}:`, error);
      });
  }

  loadCategoryContent("contenido-hogar", "categorias/hogar.html");
  loadCategoryContent("contenido-ferreteria", "categorias/ferreteria.html");
  loadCategoryContent("contenido-automotriz", "categorias/automotriz.html");
  loadCategoryContent("contenido-tecnologia", "categorias/tecnologia.html");

  // 🎯 Compactar barra de búsqueda al hacer scroll
  const searchBar = document.querySelector(".search-bar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      searchBar?.classList.add("compact");
    } else {
      searchBar?.classList.remove("compact");
    }
  });

  // ❌ Ya no necesitamos ajustar dinámicamente el margin-top del main
  // porque se maneja directamente en CSS con `margin-top: 180px`
});
