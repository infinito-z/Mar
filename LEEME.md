# Nuestra historia — cómo usarla

## 1. Ver la página
Doble clic en `index.html` (se abre en el navegador). No necesita instalar nada.

## 2. Poner tu contenido
Todo se edita en **`contenido.js`** (ábrelo con Bloc de notas o VS Code):
- Textos de la carta, de cada etapa y del cierre.
- Fecha de inicio (`inicio`), ya está en `2023-10-06`.
- Nombres de las fotos de cada etapa.

### Fotos
1. Copia tus fotos a la carpeta `fotos/`.
2. En `contenido.js`, en la lista `fotos` de cada sección, escribe el nombre exacto, por ejemplo `"fotos/primera-cita.jpg"`.
3. Puedes poner las que quieras por sección (1, 2, 5...). Se ven como carrusel deslizable.
4. Recomendado: fotos horizontales, de máximo ~1600 px de ancho (que pesen poco y carguen rápido).
5. `fotos/portada.jpg` es la imagen que aparece al compartir el link por WhatsApp.

Si una foto no existe, se muestra un recuadro rosa "Tu foto aquí".

### Música
Pon su canción en `musica/cancion.mp3`. Empieza a sonar al abrir el sobre. Si no hay archivo, el botón de música simplemente no aparece.

## 3. Probar el mensaje de aniversario
Abre la página con `?hoy=2026-10-06` al final de la dirección, ej:
`file:///C:/.../Mar/index.html?hoy=2026-10-06`

## 4. Publicar (link para enviarle)
**Netlify Drop (más fácil):**
1. Entra a https://app.netlify.com/drop y crea una cuenta gratis (si no, el link expira).
2. Arrastra la carpeta `Mar` completa a la página.
3. En *Site configuration → Change site name* ponle un nombre, ej. `nuestra-historia-mar` → queda `https://nuestra-historia-mar.netlify.app`.
4. Para actualizar: *Deploys* → arrastra la carpeta otra vez.

**Alternativa: GitHub Pages** — sube la carpeta a un repositorio, *Settings → Pages → Deploy from branch (main)*.

> Ojo: cualquiera con el link puede verla. Usa un nombre de sitio poco obvio y no pongas datos sensibles.
