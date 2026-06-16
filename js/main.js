/**
 * NICOLAI STORE - JAVASCRIPT PRINCIPAL
 * Manejo del modal de productos y funcionalidades interactivas
 */

// ========== VARIABLES GLOBALES DEL CARRUSEL ==========
let currentSlide = 0;
let slideInterval;
const slideDelay = 5000; // 5 segundos entre slides

// ========== FUNCIONES DEL CARRUSEL ==========

/**
 * Inicializa el carrusel de banners
 */
function initBannerSlider() {
  const slides = document.querySelectorAll('.banner-slide');
  const indicatorsContainer = document.getElementById('bannerIndicators');
  
  // Crear indicadores dinámicamente
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `banner-dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    indicatorsContainer.appendChild(dot);
  });
  
  // Iniciar auto-play
  startAutoPlay();
  
  console.log(`Carrusel inicializado con ${slides.length} slides ✅`);
}

/**
 * Muestra un slide específico
 * @param {number} index - Índice del slide a mostrar
 */
function showSlide(index) {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  
  // Validar índice
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  
  // Ocultar todos los slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Mostrar slide actual
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

/**
 * Avanza al siguiente slide
 */
function nextSlide() {
  showSlide(currentSlide + 1);
  resetAutoPlay();
}

/**
 * Retrocede al slide anterior
 */
function prevSlide() {
  showSlide(currentSlide - 1);
  resetAutoPlay();
}

/**
 * Va a un slide específico
 * @param {number} index - Índice del slide
 */
function goToSlide(index) {
  showSlide(index);
  resetAutoPlay();
}

/**
 * Inicia el auto-play del carrusel
 */
function startAutoPlay() {
  slideInterval = setInterval(() => {
    nextSlide();
  }, slideDelay);
}

/**
 * Detiene el auto-play
 */
function stopAutoPlay() {
  clearInterval(slideInterval);
}

/**
 * Reinicia el auto-play
 */
function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// ========== FUNCIONES DEL MODAL ==========

/**
 * Abre el modal con la información del producto
 * @param {HTMLElement} btn - Botón que disparó el evento
 */
function openModal(btn) {
  const card = btn.closest('.card');
  const title = card.querySelector('h3').innerText;
  const price = card.querySelector('.price').innerText;
  const mainImg = card.querySelector('img').src;

  // Obtener imágenes adicionales del data-attribute (miniaturas)
  const thumbnails = card.dataset.thumbnails ? card.dataset.thumbnails.split(',') : [];
  
  // Siempre incluir la imagen principal como primera miniatura
  const allImages = [mainImg, ...thumbnails];

  // Mostrar modal
  document.getElementById('modal').style.display = 'flex';

  // Actualizar información
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('mainImg').src = mainImg;

  // Precio: normal u oferta
  const priceOriginalBig = document.getElementById('priceOriginalBig');
  const priceBig = document.getElementById('priceBig');
  const priceOriginalAttr = card.querySelector('.price').dataset.original;

  if (priceOriginalAttr) {
    priceOriginalBig.innerText = priceOriginalAttr;
    priceOriginalBig.style.display = 'block';
    priceBig.classList.add('price-big--offer');
  } else {
    priceOriginalBig.style.display = 'none';
    priceBig.classList.remove('price-big--offer');
  }
  priceBig.innerText = price;
  
  // Actualizar miniaturas dinámicamente
  const thumbsContainer = document.getElementById('thumbsContainer');
  thumbsContainer.innerHTML = '';

  allImages.forEach((imgSrc, index) => {
    const thumb = document.createElement('img');
    thumb.src = imgSrc.trim();
    thumb.alt = `Vista ${index + 1}`;
    thumb.className = index === 0 ? 'active' : '';
    thumb.onclick = function() { setImg(this); };
    thumbsContainer.appendChild(thumb);
  });

  // Renderizar especificaciones independientes del producto
  const specsContainer = document.getElementById('specsContainer');
  specsContainer.innerHTML = '<div class="specs-title">📋 Especificaciones</div>';
  let specsData = [];
  try {
    specsData = card.dataset.specs ? JSON.parse(card.dataset.specs) : [];
  } catch (e) {
    specsData = [];
  }
  specsData.forEach(spec => {
    const div = document.createElement('div');
    div.className = 'spec';
    const icon = document.createElement('i');
    icon.className = spec.icon;
    const span = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = spec.label + ': ';
    span.appendChild(strong);
    span.appendChild(document.createTextNode(spec.value));
    div.appendChild(icon);
    div.appendChild(span);
    specsContainer.appendChild(div);
  });

  // Actualizar botón de WhatsApp
  const wspBtn = document.getElementById('wspBtn');
  if (card.classList.contains('card--sold')) {
    // Producto vendido: deshabilitar el botón WhatsApp
    wspBtn.classList.add('btn-wsp--sold');
    wspBtn.removeAttribute('href');
  } else {
    // Producto disponible: generar enlace con nombre e imagen
    wspBtn.classList.remove('btn-wsp--sold');
    const phone = wspBtn.dataset.phone;
    const msg = encodeURIComponent(`Hola, me interesa la figura: ${title}\nImagen: ${mainImg}`);
    wspBtn.href = `https://wa.me/${phone}?text=${msg}`;
  }

  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
  
  // Pausar carrusel cuando el modal está abierto
  stopAutoPlay();
}

/**
 * Cierra el modal
 */
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = 'auto';
  
  // Reanudar carrusel
  startAutoPlay();
}

/**
 * Cierra el modal al hacer clic fuera de él
 * @param {Event} event - Evento del clic
 */
function closeModalOnOutside(event) {
  if (event.target.id === 'modal') {
    closeModal();
  }
}

/**
 * Cambia la imagen principal del modal
 * @param {HTMLElement} imgElement - Elemento de imagen clickeado
 */
function setImg(imgElement) {
  // Cambiar imagen principal
  document.getElementById('mainImg').src = imgElement.src;
  
  // Actualizar clase active en miniaturas
  const thumbs = document.querySelectorAll('.thumbs img');
  thumbs.forEach(thumb => thumb.classList.remove('active'));
  imgElement.classList.add('active');
}

// ========== PARTÍCULAS DEL HEADER ==========

/**
 * Anima partículas flotantes en el canvas del header
 * 55 partículas con drift ascendente y dos colores (naranja + dorado)
 */
function initHeaderParticles() {
  const canvas = document.getElementById('headerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['255,115,0', '255,200,80'];

  const particles = Array.from({ length: 55 }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    r:     Math.random() * 1.5 + 0.5,
    dx:    (Math.random() - 0.5) * 0.25,
    dy:    -(Math.random() * 0.35 + 0.15), // deriva ascendente
    alpha: Math.random() * 0.5 + 0.1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx / canvas.width;
      p.y += p.dy / canvas.height;
      if (p.x < 0 || p.x > 1) p.dx *= -1;
      if (p.y < 0) p.y = 1; // reaparece por abajo al salir por arriba
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ========== EVENT LISTENERS ==========

/**
 * Inicialización al cargar el DOM
 */
/**
 * Ordena el catálogo: ofertas primero, luego disponibles, vendidos al final.
 */
function sortProducts() {
  const catalog = document.querySelector('.catalog');
  const cards = Array.from(catalog.querySelectorAll('.card'));

  cards.forEach(card => {
    const stockText = card.querySelector('.stock')?.innerText || '';
    const isSold = stockText.toLowerCase().includes('vendido');
    if (isSold) {
      card.classList.add('card--sold');
    } else {
      card.classList.remove('card--sold');
    }
  });

  const offers    = cards.filter(c => !c.classList.contains('card--sold') &&  c.classList.contains('card--offer'));
  const available = cards.filter(c => !c.classList.contains('card--sold') && !c.classList.contains('card--offer'));
  const sold      = cards.filter(c =>  c.classList.contains('card--sold'));
  [...offers, ...available, ...sold].forEach(card => catalog.appendChild(card));
}

// ========== FILTROS DEL CATÁLOGO ==========

let activeStatusFilter = 'all';
let activeTagFilter = 'all';

// Nombres legibles para los tags de origen/marca conocidos
const TAG_LABELS = {
  japon: 'Japón',
  china: 'China',
};

function tagLabel(tag) {
  return TAG_LABELS[tag] || (tag.charAt(0).toUpperCase() + tag.slice(1));
}

/**
 * Genera los botones de tags (Todas las marcas + uno por cada valor único de data-tags)
 */
function initTagFilters() {
  const tagsContainer = document.getElementById('catalogTags');
  if (!tagsContainer) return;

  const cards = document.querySelectorAll('.catalog .card');
  const tags = new Set();
  cards.forEach(card => {
    (card.dataset.tags || '').split(',').forEach(t => {
      const tag = t.trim().toLowerCase();
      if (tag) tags.add(tag);
    });
  });

  tagsContainer.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = 'tag-btn active';
  allBtn.dataset.tag = 'all';
  allBtn.textContent = 'Todas las marcas';
  tagsContainer.appendChild(allBtn);

  Array.from(tags).sort().forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn';
    btn.dataset.tag = tag;
    btn.textContent = tagLabel(tag);
    tagsContainer.appendChild(btn);
  });
}

/**
 * Aplica los filtros activos (estado + tag) a las tarjetas del catálogo
 */
function applyFilters() {
  const cards = document.querySelectorAll('.catalog .card');

  cards.forEach(card => {
    const isSold = card.classList.contains('card--sold');
    const isOffer = card.classList.contains('card--offer');
    const cardTags = (card.dataset.tags || '').toLowerCase().split(',').map(t => t.trim());

    let statusMatch = true;
    if (activeStatusFilter === 'offer') statusMatch = isOffer;
    else if (activeStatusFilter === 'available') statusMatch = !isSold;
    else if (activeStatusFilter === 'sold') statusMatch = isSold;

    const tagMatch = activeTagFilter === 'all' || cardTags.includes(activeTagFilter);
    const visible = statusMatch && tagMatch;

    card.classList.toggle('card--hidden', !visible);

    if (visible) {
      // Reinicia la animación de entrada en cada tarjeta visible
      card.classList.remove('card--anim');
      void card.offsetWidth;
      card.classList.add('card--anim');
    }
  });
}

/**
 * Inicializa los listeners de los grupos de filtros (estado y tags)
 */
function initCatalogFilters() {
  const statusContainer = document.getElementById('catalogFilters');
  const tagsContainer = document.getElementById('catalogTags');

  if (statusContainer) {
    statusContainer.addEventListener('click', function(e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      statusContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStatusFilter = btn.dataset.filter;
      applyFilters();
    });
  }

  if (tagsContainer) {
    tagsContainer.addEventListener('click', function(e) {
      const btn = e.target.closest('.tag-btn');
      if (!btn) return;
      tagsContainer.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTagFilter = btn.dataset.tag;
      applyFilters();
    });
  }
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', function() {
  console.log('Nicolai Store cargado correctamente ✅');

  // Guardar el número de WhatsApp del HTML para usarlo siempre en openModal
  const wspBtn = document.getElementById('wspBtn');
  wspBtn.dataset.phone = wspBtn.getAttribute('href').split('wa.me/')[1]?.split('?')[0];

  // Ordenar productos (vendidos al final)
  sortProducts();

  // Filtros del catálogo (estado + tags de marca/origen)
  initTagFilters();
  initCatalogFilters();
  applyFilters();

  // Inicializar carrusel de banners
  initBannerSlider();

  // Partículas del header
  initHeaderParticles();
  
  // Pausar carrusel cuando el usuario está en otra pestaña
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });
  
  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const modal = document.getElementById('modal');
      if (modal.style.display === 'flex') {
        closeModal();
      }
    }
  });
  
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});



