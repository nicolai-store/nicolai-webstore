# 🚀 Guía de Despliegue y Actualización en Vercel

Esta guía te enseña cómo subir tu sitio a Vercel y cómo actualizarlo cuando agregues o quites productos.

---

## ✅ CONFIGURACIÓN ACTUAL (Ya lista)

| Campo | Valor |
|---|---|
| **Carpeta local** | `d:/Web Nicolai/GitHub Pages/repogit/prod` |
| **Repositorio GitHub** | `https://github.com/nicolai-store/nicolai-webstore` |
| **Rama activa** | `main` |
| **Vercel** | Lee automáticamente desde `main` |

**El flujo completo ya está configurado.** Para actualizar el sitio solo necesitas:

```bash
git add .
git commit -m "descripción del cambio"
git push
```

Vercel detecta el push y actualiza el sitio en ~30 segundos. ✨

---

## 📋 REQUISITOS PREVIOS

*(Ya completados — solo como referencia)*

- [x] Cuenta en [GitHub](https://github.com)
- [x] Cuenta en [Vercel](https://vercel.com)
- [x] Git instalado y configurado
- [x] Repositorio conectado a Vercel

---

## 🎯 PASO 1: CONFIGURACIÓN INICIAL (Solo la primera vez)

### A) Instalar Git

**Windows:**
1. Descarga desde [git-scm.com](https://git-scm.com/download/win)
2. Instala con opciones por defecto
3. Abre "Git Bash" desde el menú inicio

**Mac:**
1. Abre Terminal
2. Ejecuta: `git --version`
3. Si no está instalado, se instalará automáticamente

**Linux:**
```bash
sudo apt-get install git
```

### B) Configurar Git (Primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## 📂 PASO 2: CREAR REPOSITORIO EN GITHUB

### Opción A: Desde GitHub Web

1. Ve a [github.com](https://github.com)
2. Inicia sesión
3. Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
4. Llena el formulario:
   - **Repository name:** `nicolai-store` (o el nombre que prefieras)
   - **Description:** "Tienda de figuras de anime"
   - **Public** o **Private** (tú eliges)
   - ❌ NO marques "Add a README file"
5. Haz clic en **"Create repository"**

### Opción B: Desde tu computadora

```bash
# 1. Abre la terminal en la carpeta nicolai-store
cd ruta/a/nicolai-store

# 2. Inicializa Git
git init

# 3. Agrega todos los archivos
git add .

# 4. Haz el primer commit
git commit -m "Primer commit - Nicolai Store"

# 5. Conecta con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/nicolai-store.git

# 6. Sube los archivos
git branch -M main
git push -u origin main
```

---

## 🌐 PASO 3: DESPLEGAR EN VERCEL

### Método Recomendado: Conexión con GitHub

1. **Ve a [vercel.com](https://vercel.com)**
2. **Inicia sesión** (usa tu cuenta de GitHub)
3. **Haz clic en "Add New Project"**
4. **Importa tu repositorio:**
   - Busca `nicolai-store` en la lista
   - Haz clic en **"Import"**
5. **Configura el proyecto:**
   - **Project Name:** `nicolai-store` (o personaliza)
   - **Framework Preset:** None (déjalo en None)
   - **Root Directory:** `./` (raíz del proyecto)
   - ❌ No cambies nada más
6. **Haz clic en "Deploy"**
7. **¡Espera 30-60 segundos!** ☕

### ✅ ¡Listo! Tu sitio está en línea

URL será algo como: `https://nicolai-store.vercel.app`

---

## 🔄 FLUJO DE TRABAJO PARA ACTUALIZAR PRODUCTOS

Este es el proceso que seguirás cada semana al rotar productos:

### 📝 PASO A PASO

#### 1. Preparar las Imágenes (En tu computadora)

```bash
# Coloca las nuevas imágenes en:
nicolai-store/images/

# Ejemplo:
# - nueva-figura-1.jpg
# - nueva-figura-1-vista2.jpg
# - nueva-figura-2.jpg
```

#### 2. Actualizar el Catálogo (En index.html)

**Opción A: Agregar un producto nuevo**

Abre `index.html` y busca la sección del catálogo (línea ~100), copia este bloque:

```html
<!-- Producto Nuevo -->
<div class="card" data-thumbnails="images/producto-vista2.jpg, images/producto-vista3.jpg">
  <div class="card-image">
    <img src="images/nueva-figura-1.jpg" alt="Descripción">
  </div>
  <div class="card-body">
    <h3>Nombre de la Figura</h3>
    <div class="price">S/ 450</div>
    <div class="stock">🟧 Stock: 1 unidad disponible</div>
    <div class="btn-group">
      <button class="btn btn-desc" onclick="openModal(this)">Ver descripción</button>
    </div>
  </div>
</div>
```

**Opción B: Quitar un producto vendido**

1. Busca el producto en `index.html`
2. Elimina TODO el bloque desde `<!-- Producto X -->` hasta `</div>` (cierre del card)
3. También puedes comentarlo en vez de borrarlo:

```html
<!-- VENDIDO
<div class="card">
  ...todo el contenido...
</div>
-->
```

#### 3. Guardar los Cambios

Guarda el archivo `index.html` (Ctrl+S o Cmd+S)

#### 4. Subir a GitHub

Abre la terminal en la carpeta del proyecto:

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar todos los cambios
git add .

# 3. Hacer commit con mensaje descriptivo
git commit -m "Actualización semanal: Agregado Goku SSJ Blue, removido Naruto (vendido)"

# 4. Subir a GitHub
git push
```

#### 5. Vercel Actualiza Automáticamente ✨

**¡Eso es todo!** Vercel detecta el cambio en GitHub y actualiza tu sitio automáticamente en ~30 segundos.

---

## 📅 EJEMPLO DE FLUJO SEMANAL

**Lunes:** Llegan 3 figuras nuevas

```bash
# 1. Agregar imágenes a /images
cp ~/Downloads/vegeta-*.jpg nicolai-store/images/

# 2. Editar index.html (agregar productos)

# 3. Guardar y subir
git add .
git commit -m "Semana 12/Feb: Agregados Vegeta, Piccolo y Trunks"
git push
```

**Miércoles:** Se vendió Vegeta

```bash
# 1. Editar index.html (comentar o borrar el producto)

# 2. Guardar y subir
git add .
git commit -m "Vegeta vendido - removido del catálogo"
git push
```

**Viernes:** Nuevo banner promocional

```bash
# 1. Agregar banner-promo.jpg a /images

# 2. Editar index.html (agregar slide en el carrusel)

# 3. Guardar y subir
git add .
git commit -m "Nuevo banner promocional fin de semana"
git push
```

---

## 🎨 ACTUALIZACIONES COMUNES

### Cambiar Banners del Carrusel

1. Reemplaza las imágenes en `/images/banner-1.jpg`, etc.
2. O edita el HTML en `index.html` (busca `banner-slide`)

```bash
git add images/banner-*.jpg
git commit -m "Banners actualizados para promoción de marzo"
git push
```

### Cambiar Precios

1. Busca el producto en `index.html`
2. Modifica `<div class="price">S/ 450</div>`

```bash
git add index.html
git commit -m "Actualización de precios Febrero 2025"
git push
```

### Actualizar Redes Sociales

1. Busca la sección `<div class="socials">` en `index.html`
2. Actualiza los enlaces

```bash
git add index.html
git commit -m "Actualizado link de Instagram"
git push
```

---

## 🔧 COMANDOS GIT ÚTILES

```bash
# Ver estado de archivos
git status

# Ver historial de cambios
git log

# Descartar cambios no guardados
git checkout -- archivo.html

# Ver diferencias antes de hacer commit
git diff

# Crear una rama para probar cambios
git checkout -b prueba-nueva-caracteristica

# Volver a la rama principal
git checkout main

# Deshacer el último commit (mantiene cambios)
git reset --soft HEAD~1

# Ver todos los archivos rastreados
git ls-files
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "fatal: not a git repository"

```bash
# Estás en la carpeta incorrecta, navega a tu proyecto:
cd ruta/a/nicolai-store
```

### "Permission denied (publickey)"

```bash
# Usa HTTPS en vez de SSH:
git remote set-url origin https://github.com/TU-USUARIO/nicolai-store.git
```

### "Your local changes would be overwritten"

```bash
# Guarda cambios primero:
git add .
git commit -m "Guardar cambios locales"
git push
```

### Vercel no actualiza

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a la pestaña "Deployments"
4. Verifica el último despliegue
5. Si hay error, haz clic en el deploy para ver los logs

### Archivos grandes no se suben

```bash
# Git no acepta archivos > 100MB
# Optimiza tus imágenes primero con TinyPNG
```

---

## 📊 BUENAS PRÁCTICAS

### ✅ Hacer

- Commit frecuentemente (después de cada cambio importante)
- Usa mensajes descriptivos en los commits
- Prueba localmente antes de hacer push
- Mantén las imágenes optimizadas
- Haz backup de la carpeta completa semanalmente

### ❌ Evitar

- Subir archivos gigantes (>5MB)
- Hacer commits con mensaje "update" genérico
- Subir archivos temporales o de sistema (.DS_Store)
- Editar directamente en producción
- Olvidarte de hacer git pull antes de empezar a trabajar

---

## 🎓 MENSAJES DE COMMIT SUGERIDOS

```bash
# Buenos ejemplos:
git commit -m "Agregado producto: Ichigo Bankai"
git commit -m "Removido Sasuke (vendido)"
git commit -m "Actualizado banner promocional marzo"
git commit -m "Cambio de precio: One Piece collection -10%"
git commit -m "Fix: Corregida imagen de Vegeta que no cargaba"

# Malos ejemplos:
git commit -m "update"
git commit -m "changes"
git commit -m "asdf"
```

---

## 🔐 CONFIGURAR DOMINIO PERSONALIZADO (Opcional)

Si compraste un dominio (ej: nicolaistore.com):

1. Ve a Vercel Dashboard → Tu proyecto
2. Haz clic en "Settings" → "Domains"
3. Haz clic en "Add"
4. Ingresa tu dominio: `nicolaistore.com`
5. Sigue las instrucciones para configurar DNS
6. Espera 24-48 horas para propagación

---

## 📞 SOPORTE

**Vercel:**
- Docs: [vercel.com/docs](https://vercel.com/docs)
- Discord: [vercel.com/discord](https://vercel.com/discord)

**Git:**
- Guía oficial: [git-scm.com/doc](https://git-scm.com/doc)
- Cheatsheet: [training.github.com/downloads/github-git-cheat-sheet.pdf](https://training.github.com/downloads/github-git-cheat-sheet.pdf)

---

## ✅ CHECKLIST SEMANAL

- [ ] Preparar imágenes nuevas (optimizadas)
- [ ] Actualizar `index.html` (agregar/quitar productos)
- [ ] Probar localmente (abrir index.html en navegador)
- [ ] `git add .`
- [ ] `git commit -m "Descripción del cambio"`
- [ ] `git push`
- [ ] Esperar 30 segundos
- [ ] Verificar en URL de Vercel
- [ ] Compartir en redes sociales 📱

---

¡Listo! Con este flujo puedes mantener tu catálogo actualizado fácilmente cada semana. 🎉
