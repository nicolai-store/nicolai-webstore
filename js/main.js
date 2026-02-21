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
  const priceOriginalAttr = card.dataset.priceOriginal;

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
  const specsData = card.dataset.specs ? JSON.parse(card.dataset.specs) : [];
  specsData.forEach(spec => {
    const div = document.createElement('div');
    div.className = 'spec';
    div.innerHTML = `<i class="${spec.icon}"></i><span><strong>${spec.label}:</strong> ${spec.value}</span>`;
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

// ========== EVENT LISTENERS ==========

/**
 * Inicialización al cargar el DOM
 */
/**
 * Mueve las tarjetas con estado "Vendido" al final del catálogo.
 * Llamar cada vez que se actualice el catálogo.
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

  const available = cards.filter(c => !c.classList.contains('card--sold'));
  const sold      = cards.filter(c =>  c.classList.contains('card--sold'));
  [...available, ...sold].forEach(card => catalog.appendChild(card));
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', function() {
  console.log('Nicolai Store cargado correctamente ✅');

  // Guardar el número de WhatsApp del HTML para usarlo siempre en openModal
  const wspBtn = document.getElementById('wspBtn');
  wspBtn.dataset.phone = wspBtn.getAttribute('href').split('wa.me/')[1]?.split('?')[0];

  // Ordenar productos (vendidos al final)
  sortProducts();

  // Inicializar carrusel de banners
  initBannerSlider();
  
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



