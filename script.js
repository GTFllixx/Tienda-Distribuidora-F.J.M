// ---------------------- script.js ----------------------
document.addEventListener("DOMContentLoaded", function () {

  // =================== 🔍 BUSCADOR DE PRODUCTOS ===================
  const searchInput = document.getElementById("productSearch");
  const searchButton = document.getElementById("searchButton");
  let productCards = [];

  function updateProductCards() {
    productCards = document.querySelectorAll(".product-card");
  }

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase();
    let matches = 0;

    productCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(searchText)) {
        card.style.display = "block";
        matches++;
      } else {
        card.style.display = "none";
      }
    });

    // 🔸 Mostrar mensaje si no hay coincidencias
    let noResultsMsg = document.getElementById("noResultsMsg");
    if (matches === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("p");
        noResultsMsg.id = "noResultsMsg";
        noResultsMsg.textContent = "❌ No se encontraron productos.";
        noResultsMsg.style.textAlign = "center";
        noResultsMsg.style.color = "#f87171";
        document.querySelector("main").appendChild(noResultsMsg);
      }
    } else {
      noResultsMsg?.remove();
    }
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
    searchButton.addEventListener("click", e => {
      e.preventDefault();
      filterProducts();
    });
  }

  // =================== 📱 MENÚ MÓVIL ===================
  const toggleBtn = document.getElementById("mobileNavToggle");
  const categoryNav = document.getElementById("categoryNav");

  if (toggleBtn && categoryNav) {
    toggleBtn.addEventListener("click", () => {
      categoryNav.classList.toggle("show");
    });

    const menuLinks = categoryNav.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          categoryNav.classList.remove("show");
        }
      });
    });
  }

  // =================== 💬 MODAL DE CONTACTO ===================
  const contactLink = document.getElementById("contactLink");
  const contactModal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".modal .close");

  if (contactLink && contactModal) {
    contactLink.addEventListener("click", e => {
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

  window.addEventListener("click", e => {
    if (e.target === contactModal) {
      contactModal.style.display = "none";
    }
  });

  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && contactModal.style.display === "block") {
      contactModal.style.display = "none";
    }
  });

  // =================== 📥 CARGAR CONTENIDO DE CATEGORÍAS ===================
  function loadCategoryContent(id, file) {
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`No se pudo cargar ${file}`);
        return response.text();
      })
      .then(html => {
        const container = document.getElementById(id);
        container.innerHTML = html;
        loader.style.display = "none";

        // Mostrar solo los primeros 3 productos
        const cards = container.querySelectorAll(".product-card");
        cards.forEach((card, index) => {
          if (index >= 3) card.style.display = "none";
        });

        updateProductCards(); // Actualiza el listado para el buscador
      })
      .catch(error => {
        console.error(`Error cargando ${file}:`, error);
        loader.style.display = "none";
        document.getElementById(id).innerHTML = `<p style="color:red;">Error al cargar productos de esta categoría.</p>`;
      });
  }

  loadCategoryContent("contenido-hogar", "categorias/hogar.html");
  loadCategoryContent("contenido-ferreteria", "categorias/ferreteria.html");
  loadCategoryContent("contenido-automotriz", "categorias/automotriz.html");
  loadCategoryContent("contenido-tecnologia", "categorias/tecnologia.html");
  loadCategoryContent("contenido-terminales", "categorias/terminales.html");

  // =================== 🎯 BARRA DE BÚSQUEDA COMPACTA ===================
  const searchBar = document.querySelector(".search-bar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      searchBar?.classList.add("compact");
    } else {
      searchBar?.classList.remove("compact");
    }
  });

  // =================== 🔁 BOTÓN "VER MÁS / VER MENOS" ===================
  const toggleButtons = document.querySelectorAll(".toggle-category-btn");

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const container = document.getElementById(targetId);
      const allCards = container.querySelectorAll(".product-card");
      const hiddenCards = Array.from(allCards).filter(card => card.style.display === "none");

      if (hiddenCards.length > 0) {
        allCards.forEach(card => card.style.display = "block");
        btn.textContent = "Ver menos";
      } else {
        allCards.forEach((card, index) => {
          card.style.display = index < 3 ? "block" : "none";
        });
        btn.textContent = "Ver más";
      }
    });
  });

}); // ✅ ← Cierra correctamente el DOMContentLoaded

// =================== 💡 MENSAJE DE INFORMACIÓN PROFESIONAL ===================
window.addEventListener("load", () => {
  const infoBanner = document.createElement("div");
  infoBanner.classList.add("info-banner");
  infoBanner.innerHTML = `
    ⚠️ <strong>Importante:</strong> Los precios, existencias y marcas pueden variar según el proveedor.
  `;

  document.body.appendChild(infoBanner);

  // Oculta automáticamente después de 7 segundos
  setTimeout(() => {
    infoBanner.classList.add("hide");
    setTimeout(() => infoBanner.remove(), 1000);
  }, 7000);
});
