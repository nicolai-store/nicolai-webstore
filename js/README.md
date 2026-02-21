# ⚙️ JavaScript - Manual de Funcionalidades

Esta carpeta contiene la lógica y funcionalidades del sitio.

---

## 📁 Archivo: `main.js`

### 🎯 MODIFICACIONES COMUNES

---

## 1️⃣ VELOCIDAD DEL CARRUSEL DE BANNERS

**Ubicación:** Línea 8  
**Buscar:** `const slideDelay`

```javascript
const slideDelay = 5000; // En milisegundos
```

**Ejemplos:**
- 3 segundos: `3000`
- 5 segundos: `5000` (actual)
- 7 segundos: `7000`
- 10 segundos: `10000`

---

## 2️⃣ DESACTIVAR AUTO-PLAY DEL CARRUSEL

**Ubicación:** Línea ~50  
**Buscar:** `function initBannerSlider()`

**Para desactivar el auto-play:**
```javascript
function initBannerSlider() {
  const slides = document.querySelectorAll('.banner-slide');
  const indicatorsContainer = document.getElementById('bannerIndicators');
  
  // Crear indicadores
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `banner-dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    indicatorsContainer.appendChild(dot);
  });
  
  // Comentar esta línea para desactivar auto-play:
  // startAutoPlay();
  
  console.log(`Carrusel inicializado con ${slides.length} slides ✅`);
}
```

---

## 3️⃣ CAMBIAR COMPORTAMIENTO DEL MODAL

### Pausar carrusel al abrir modal (actual)

**Ubicación:** Línea ~100  
**Buscar:** `function openModal(btn)`

Si NO quieres que se pause:
```javascript
// Comentar esta línea:
// stopAutoPlay();
```

### Reanudar carrusel al cerrar modal (actual)

**Ubicación:** Línea ~130  
**Buscar:** `function closeModal()`

Si NO quieres que se reanude:
```javascript
// Comentar esta línea:
// startAutoPlay();
```

---

## 4️⃣ FORMATO DE FECHA DE ACTUALIZACIÓN

**Ubicación:** Línea ~200  
**Buscar:** `function updateDate()`

**Formato actual:**
```javascript
const options = { year: 'numeric', month: 'long', day: 'numeric' };
// Resultado: "4 de febrero de 2025"
```

**Otras opciones:**

### Formato corto:
```javascript
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
// Resultado: "04/02/2025"
```

### Formato con hora:
```javascript
const options = { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};
// Resultado: "4 de febrero de 2025, 14:30"
```

### Solo mes y día:
```javascript
const options = { month: 'long', day: 'numeric' };
// Resultado: "4 de febrero"
```

---

## 🔍 ENTENDIENDO LAS FUNCIONES PRINCIPALES

### **Carrusel de Banners**

```javascript
initBannerSlider()    // Inicializa el carrusel
showSlide(index)      // Muestra un slide específico
nextSlide()           // Avanza al siguiente
prevSlide()           // Retrocede al anterior
goToSlide(index)      // Va a un slide directamente
startAutoPlay()       // Inicia reproducción automática
stopAutoPlay()        // Pausa reproducción
resetAutoPlay()       // Reinicia el temporizador
```

### **Modal de Productos**

```javascript
openModal(btn)           // Abre el modal
closeModal()             // Cierra el modal
closeModalOnOutside(e)   // Cierra al hacer clic fuera
setImg(imgElement)       // Cambia la imagen principal
```

### **Utilidades**

```javascript
updateDate()  // Actualiza la fecha de última actualización
```

---

## 🎨 SISTEMA DE MINIATURAS DINÁMICO

### Cómo funciona:

El modal lee el atributo `data-thumbnails` de cada producto:

**En HTML:**
```html
<div class="card" data-thumbnails="images/img1.jpg, images/img2.jpg, images/img3.jpg">
  <!-- contenido del producto -->
</div>
```

**En JavaScript (línea ~95):**
```javascript
const thumbnails = card.dataset.thumbnails ? card.dataset.thumbnails.split(',') : [];
```

### Ventajas:
- ✅ Cada producto tiene sus propias miniaturas
- ✅ Puedes tener 0 a 10+ miniaturas
- ✅ La imagen principal siempre es la primera miniatura
- ✅ Si no hay `data-thumbnails`, solo muestra la imagen principal

---

## 🔧 PERSONALIZACIÓN AVANZADA

### 1. Cambiar dirección del carrusel

**Ubicación:** Línea ~68  
**Buscar:** `function nextSlide()`

**Para que vaya en reversa:**
```javascript
function nextSlide() {
  showSlide(currentSlide - 1);  // Cambiar + por -
  resetAutoPlay();
}
```

### 2. Agregar efecto de sonido al cambiar slide

```javascript
function showSlide(index) {
  // ... código existente ...
  
  // Agregar al final:
  const audio = new Audio('sounds/slide-change.mp3');
  audio.play();
}
```

### 3. Contador de vistas de productos

Agregar después de `openModal()`:

```javascript
function openModal(btn) {
  // ... código existente ...
  
  // Contador simple en consola
  console.log(`Vistas del producto: ${title}`);
}
```

---

## ⚠️ CONSEJOS IMPORTANTES

1. **No modifiques los nombres de las funciones** si no sabes lo que haces
2. **Siempre cierra las llaves `{ }`** correctamente
3. **Los punto y coma `;` son importantes** al final de cada línea
4. **Las comillas deben coincidir:** `'texto'` o `"texto"`
5. **Prueba en la consola del navegador** (F12 > Console)

---

## 🐛 DEBUGGING (Encontrar Errores)

1. Abre el navegador
2. Presiona **F12** (o clic derecho > Inspeccionar)
3. Ve a la pestaña **Console**
4. Busca mensajes en rojo (errores)

**Mensajes comunes:**

```
✅ "Nicolai Store cargado correctamente ✅"
   → Todo funciona bien

✅ "Carrusel inicializado con 3 slides ✅"
   → Carrusel funcionando

❌ "Uncaught SyntaxError"
   → Error de sintaxis, revisa llaves o punto y coma

❌ "Cannot read property of undefined"
   → Falta algún elemento en el HTML
```

---

## 🆘 PROBLEMAS COMUNES

**El carrusel no avanza:**
- Verifica que `slideDelay` tenga un valor numérico
- Asegúrate de que `startAutoPlay()` no esté comentado

**Las miniaturas no aparecen:**
- Revisa que `data-thumbnails` esté bien escrito en HTML
- Verifica que las rutas de imágenes sean correctas

**El modal no se abre:**
- Verifica que el botón tenga `onclick="openModal(this)"`
- Revisa la consola (F12) para ver errores

**Los cambios no se ven:**
- Presiona Ctrl+Shift+R (Windows) o Cmd+Shift+R (Mac)
- Limpia la caché del navegador

---

## 📚 RECURSOS ÚTILES

- **JavaScript Docs:** [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript)
- **Debugging:** Usa `console.log(variable)` para ver valores
- **Validador JS:** [JSHint](https://jshint.com/)

---

## 💡 TIPS PROFESIONALES

1. **Usa console.log()** para debuggear:
   ```javascript
   console.log('Valor de currentSlide:', currentSlide);
   ```

2. **Comenta código temporalmente** para probar:
   ```javascript
   // Esta línea no se ejecutará
   // startAutoPlay();
   ```

3. **Guarda copias de respaldo** antes de hacer cambios grandes

4. **Prueba en diferentes navegadores** (Chrome, Firefox, Safari)
