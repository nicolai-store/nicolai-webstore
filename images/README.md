# 📸 Carpeta de Imágenes

Coloca aquí todas las imágenes de tus productos.

---

## 🖼️ IMÁGENES NECESARIAS

### **Logos (IMPORTANTE)**
- `logo.png` - Logo principal para el header (recomendado: 200x200px con fondo transparente)
- `logo-small.png` - Logo pequeño para favicon/pestaña del navegador (recomendado: 64x64px)

### **Banners del Carrusel (IMPORTANTE)**
- `banner-1.jpg` (1200x380px recomendado)
- `banner-2.jpg` (1200x380px recomendado)
- `banner-3.jpg` (1200x380px recomendado)
- Puedes agregar más: `banner-4.jpg`, `banner-5.jpg`, etc.

### **Productos - Imágenes Principales**
- `naruto-shippuden.jpg`
- `zoro-one-piece.jpg`
- `goku-ultra-instinct.jpg`
- `luffy-gear-5.jpg`
- `tanjiro-demon-slayer.jpg`
- `eren-attack-titan.jpg`

### **Productos - Vistas Adicionales (Miniaturas)**
Estas son opcionales pero recomendadas para el modal:

**Ejemplo para Naruto:**
- `naruto-vista2.jpg` (vista lateral)
- `naruto-vista3.jpg` (vista trasera)
- `naruto-caja.jpg` (con caja)

**Ejemplo para Zoro:**
- `zoro-vista2.jpg`
- `zoro-vista3.jpg`

**Y así sucesivamente para cada producto...**

### **Otros**
- `placeholder.jpg` - Imagen genérica de respaldo (400x400px)

---

## 📐 ESPECIFICACIONES TÉCNICAS

### **Para Logo Principal:**
- **Formato:** PNG con fondo transparente
- **Dimensiones:** 200x200px (o similar cuadrado)
- **Peso:** Menos de 100KB
- **Contenido:** Debe verse bien sobre fondo naranja

### **Para Favicon (logo pequeño):**
- **Formato:** PNG
- **Dimensiones:** 64x64px o 128x128px
- **Peso:** Menos de 50KB
- **Contenido:** Versión simplificada del logo

### **Para Banners del Carrusel:**
- **Formato:** JPG o PNG
- **Dimensiones:** 1200x380px (IMPORTANTE para mantener proporción)
- **Peso:** Menos de 300KB cada uno (optimizar para carga rápida)
- **Contenido:** Coloca el texto importante en el centro, ya que los lados pueden quedar ocultos en móviles
- **Tip:** Usa filtros oscuros o degradados en la parte inferior para que el texto overlay se lea bien

### **Para Productos (imagen principal):**
- **Formato:** JPG o PNG con fondo transparente
- **Tamaño:** Al menos 600x600px (cuadradas preferiblemente)
- **Peso:** Optimiza para web (menos de 500KB cada una)
- **Nombre:** Usa nombres descriptivos sin espacios (usa guiones)
- **Ejemplo:** `goku-ultra-instinct.jpg` ✅ | `Goku UI.jpg` ❌

### **Para Miniaturas (vistas adicionales):**
- **Formato:** JPG o PNG
- **Tamaño:** Al menos 400x400px
- **Peso:** Menos de 300KB
- **Sugerencias de vistas:**
  - Vista frontal (imagen principal)
  - Vista lateral
  - Vista trasera
  - Vista con caja
  - Vista de detalles/accesorios

---

## 🎨 CONVENCIONES DE NOMBRES

### **Sistema recomendado:**

```
nombre-producto.jpg          → Imagen principal
nombre-producto-vista2.jpg   → Vista adicional 1
nombre-producto-vista3.jpg   → Vista adicional 2
nombre-producto-caja.jpg     → Con caja
```

**Ejemplos:**
```
goku-ultra-instinct.jpg
goku-ultra-instinct-vista2.jpg
goku-ultra-instinct-vista3.jpg
goku-ultra-instinct-caja.jpg

luffy-gear-5.jpg
luffy-gear-5-lateral.jpg
luffy-gear-5-trasera.jpg
```

---

## 🔧 HERRAMIENTAS DE OPTIMIZACIÓN

- [TinyPNG](https://tinypng.com/) - Comprime imágenes PNG y JPG (RECOMENDADO)
- [Squoosh](https://squoosh.app/) - Optimizador de imágenes de Google
- [Upscayl](https://upscayl.org/) - Aumenta resolución con IA (ideal para fotos de figuras de baja calidad)
- [ImageOptim](https://imageoptim.com/) - Para macOS
- [Canva](https://canva.com/) - Para crear banners con las dimensiones exactas
- [Remove.bg](https://remove.bg/) - Para quitar fondos de imágenes

---

## 💡 TIPS PARA CREAR BUENOS BANNERS

1. **Usa colores que combinen** con el tema naranja (#ff8a00)
2. **Coloca texto legible** con buen contraste
3. **Destaca las figuras** o productos principales
4. **Mantén un estilo consistente** entre todos los banners
5. **Prueba cómo se ven en móvil** antes de publicar
6. **Agrega un degradado oscuro abajo** para que el texto overlay se lea
7. **Usa fuentes gruesas y llamativas**
8. **No coloques elementos importantes** en los bordes laterales

---

## 📱 CREAR FAVICON DESDE EL LOGO

### Opción 1: Online (Fácil)
1. Ve a [Favicon.io](https://favicon.io/)
2. Sube tu `logo.png`
3. Genera y descarga
4. Renombra a `logo-small.png`

### Opción 2: Photoshop/GIMP
1. Abre tu logo
2. Redimensiona a 64x64px o 128x128px
3. Simplifica si es necesario
4. Guarda como PNG
5. Renombra a `logo-small.png`

---

## 🗂️ ORGANIZACIÓN SUGERIDA

Si tienes muchos productos, considera crear subcarpetas:

```
images/
├── logo.png
├── logo-small.png
├── banners/
│   ├── banner-1.jpg
│   ├── banner-2.jpg
│   └── banner-3.jpg
├── productos/
│   ├── naruto/
│   │   ├── naruto-shippuden.jpg
│   │   ├── naruto-vista2.jpg
│   │   └── naruto-vista3.jpg
│   ├── one-piece/
│   │   ├── zoro.jpg
│   │   └── luffy.jpg
│   └── dragon-ball/
│       └── goku-ultra-instinct.jpg
└── placeholder.jpg
```

**Nota:** Si usas subcarpetas, actualiza las rutas en `index.html`:
```html
<!-- Antes -->
<img src="images/naruto-shippuden.jpg">

<!-- Con subcarpetas -->
<img src="images/productos/naruto/naruto-shippuden.jpg">
```

---

## ✅ CHECKLIST ANTES DE SUBIR

- [ ] Todas las imágenes están optimizadas (menos de 500KB)
- [ ] Los nombres no tienen espacios ni caracteres especiales
- [ ] Logo principal es PNG con fondo transparente
- [ ] Logo pequeño (favicon) está en 64x64px
- [ ] Banners son 1200x380px
- [ ] Todas las rutas coinciden con los nombres de archivo
- [ ] Las imágenes de productos tienen buena resolución
- [ ] Probaste que todas las imágenes cargan correctamente

---

## 🆘 PROBLEMAS COMUNES

**La imagen no aparece:**
- Verifica que el nombre coincida EXACTAMENTE (mayúsculas/minúsculas)
- Asegúrate de que la imagen esté en la carpeta `images/`
- Revisa que la extensión sea correcta (.jpg vs .png)

**El logo se ve pixelado:**
- Usa una resolución más alta
- Asegúrate de que sea PNG, no JPG

**El favicon no aparece:**
- Limpia la caché del navegador (Ctrl+Shift+R)
- Verifica que `logo-small.png` existe
- Espera unos minutos después de subir

**Los banners se ven cortados:**
- Usa exactamente 1200x380px
- No coloques elementos importantes en los bordes

---

## 🎯 WORKFLOW RECOMENDADO

1. **Fotografía** las figuras con buena iluminación
2. **Edita** y recorta en tu programa favorito
3. **Optimiza** el tamaño con TinyPNG
4. **Renombra** con el formato correcto
5. **Coloca** en la carpeta `images/`
6. **Actualiza** `index.html` con las rutas correctas
7. **Prueba** localmente
8. **Sube** a GitHub/Vercel

