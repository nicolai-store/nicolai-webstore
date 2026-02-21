# 🎨 CSS - Manual de Personalización

Esta carpeta contiene todos los estilos visuales de Nicolai Store.

---

## 📁 Archivo: `styles.css`

### 🎯 MODIFICACIONES COMUNES

---

## 1️⃣ CAMBIAR COLORES DEL TEMA

**Buscar:** Líneas con colores hexadecimales  
**Colores actuales:**
- **Naranja principal:** `#ff8a00`
- **Naranja oscuro:** `#e67600`
- **Fondo negro:** `#0e0e11`
- **Tarjetas:** `#1a1a1f`

**Cómo cambiar:**
1. Abre `styles.css`
2. Usa Ctrl+F (o Cmd+F en Mac) para buscar `#ff8a00`
3. Reemplaza TODOS por tu nuevo color

**Ejemplo:**
```css
/* Antes */
background: #ff8a00;

/* Después (color azul) */
background: #0080ff;
```

---

## 2️⃣ AJUSTAR TAMAÑO DEL LOGO

**Ubicación:** Línea ~70-75  
**Buscar:** `.site-logo`

```css
.site-logo {
  width: 80px;   /* ← Cambiar ancho */
  height: 80px;  /* ← Cambiar alto */
}
```

**Tamaños recomendados:**
- Pequeño: `60px`
- Mediano: `80px` (actual)
- Grande: `100px`
- Muy grande: `120px`

---

## 3️⃣ VELOCIDAD DEL CARRUSEL DE BANNERS

**⚠️ NOTA:** Esto se cambia en `js/main.js`, línea 8

```javascript
const slideDelay = 5000; // 5 segundos
```

---

## 4️⃣ ANIMACIÓN DEL CARRUSEL

**Ubicación:** Línea ~150-155  
**Buscar:** `.banner-slide`

**Animación actual (Fade):**
```css
.banner-slide {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}
```

**Otras opciones:**

### Slide Horizontal:
```css
.banner-slide {
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.banner-slide.active {
  opacity: 1;
  transform: translateX(0);
}
```

### Zoom:
```css
.banner-slide {
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.banner-slide.active {
  opacity: 1;
  transform: scale(1);
}
```

### Blur:
```css
.banner-slide {
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.8s ease, filter 0.8s ease;
}

.banner-slide.active {
  opacity: 1;
  filter: blur(0);
}
```

---

## 5️⃣ TAMAÑO DE MINIATURAS EN EL MODAL

**Ubicación:** Línea ~350-360  
**Buscar:** `.thumbs img`

```css
.thumbs img {
  width: 80px;   /* ← Cambiar ancho */
  height: 80px;  /* ← Cambiar alto */
}
```

**Tamaños sugeridos:**
- Pequeñas: `60px`
- Medianas: `80px` (actual)
- Grandes: `100px`

---

## 6️⃣ ESPACIO ENTRE MINIATURAS

**Ubicación:** Línea ~344  
**Buscar:** `.thumbs`

```css
.thumbs {
  gap: 12px;  /* ← Cambiar espacio */
}
```

**Opciones:**
- Juntas: `8px`
- Normal: `12px` (actual)
- Separadas: `20px`

---

## 7️⃣ ALTURA DE LAS TARJETAS DE PRODUCTO

**Ubicación:** Línea ~112  
**Buscar:** `.card-image`

```css
.card-image {
  height: 280px;  /* ← Cambiar altura */
}
```

---

## 8️⃣ NÚMERO DE COLUMNAS DEL CATÁLOGO

**Ubicación:** Línea ~95  
**Buscar:** `.catalog`

```css
.catalog {
  grid-template-columns: repeat(3, 1fr);  /* ← 3 columnas */
}
```

**Cambiar a:**
- 2 columnas: `repeat(2, 1fr)`
- 4 columnas: `repeat(4, 1fr)`
- 5 columnas: `repeat(5, 1fr)`

---

## 9️⃣ TAMAÑO DE FUENTE DEL TÍTULO

**Ubicación:** Línea ~82  
**Buscar:** `h1`

```css
h1 {
  font-size: 3rem;  /* ← Cambiar tamaño */
}
```

**Opciones:**
- Pequeño: `2rem`
- Mediano: `2.5rem`
- Grande: `3rem` (actual)
- Muy grande: `3.5rem`

---

## 🔟 VELOCIDAD DE ANIMACIONES DE BANDERAS

**Ubicación:** Línea ~110-115  
**Buscar:** `@keyframes wave`

```css
.flag-emoji {
  animation: wave 2s ease-in-out infinite;  /* ← 2 segundos */
}
```

**Opciones:**
- Rápido: `1s`
- Normal: `2s` (actual)
- Lento: `3s`

---

## 📱 RESPONSIVE (Móviles/Tablets)

Los breakpoints están al final del archivo (~línea 500+)

**Ubicaciones:**
- **Tablets:** `@media (max-width: 1024px)`
- **Móviles:** `@media (max-width: 768px)`
- **Móviles pequeños:** `@media (max-width: 640px)`

---

## ⚠️ CONSEJOS IMPORTANTES

1. **Siempre haz una copia de respaldo** antes de modificar
2. **Prueba los cambios localmente** antes de subir a Vercel
3. **Usa la búsqueda** (Ctrl+F) para encontrar elementos específicos
4. **No borres llaves** `{ }` ni puntos y comas `;`
5. **Los colores deben empezar con #** (ejemplo: `#ff8a00`)

---

## 🔧 HERRAMIENTAS ÚTILES

- **Selector de colores:** [Coolors.co](https://coolors.co/)
- **Verificar CSS:** Abre la página y presiona F12 > Console
- **Vista previa:** Abre `index.html` directamente en tu navegador

---

## 🆘 PROBLEMAS COMUNES

**El sitio se ve raro:**
- Verifica que no hayas borrado llaves `{ }` ni punto y coma `;`
- Asegúrate de que los colores empiecen con `#`

**Los cambios no se ven:**
- Presiona Ctrl+Shift+R (o Cmd+Shift+R en Mac) para recargar
- Limpia el caché del navegador

**Error en Vercel:**
- Revisa que no haya errores de sintaxis en el CSS
- Verifica que el archivo se llame exactamente `styles.css`
