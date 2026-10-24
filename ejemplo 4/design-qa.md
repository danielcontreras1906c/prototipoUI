# Revisión del ejemplo 4

Fecha: 24 de octubre de 2026.

final result: passed

## Hallazgos y correcciones

- **[P2, corregido] Contraste de las tarjetas de reciclaje.** La referencia usa blanco sobre amarillo y tonos brillantes en botones pequeños. La primera versión conservaba un contraste de 4,37:1 en azul y 4,31:1 en verde. Se ajustaron `--paper` a `#2477c2` y `--plastic` a `#218347`: el blanco alcanza 4,67:1 y 4,77:1. El icono y el texto del botón amarillo usan `#243c41`, con 6,01:1. La estructura y la familia de colores se conservan. Evidencia anterior: `revision/reciclaje-antes-contraste.png`; evidencia posterior: `revision/reciclaje-final.png` y `revision/comparacion-tarjetas.png`.
- **[P2, corregido] Legibilidad de textos secundarios.** Se oscurecieron las ayudas y etiquetas de contexto a `#526d76` y se aumentaron a 11 px las notas de contexto y de horario. Ese tono alcanza 5,17:1 sobre el fondo principal. Las capturas finales incluyen el ajuste.
- No quedan diferencias P0, P1 o P2 pendientes respecto del alcance solicitado. Esta revisión no es una certificación de accesibilidad ni una prueba de usabilidad con participantes.

## Fuente, implementación y comparación

Fuente visual original: `C:/Users/kecac/Downloads/WhatsApp Image 2026-10-23 at 10.17.23 PM.jpeg`. Copia de revisión: `revision/referencia.jpeg`, 1312 × 1199 píxeles. Se considera una referencia de composición y estilo; la solicitud pide una mejora de la sección municipal y excluye expresamente el acceso a cuentas.

Implementación: `http://127.0.0.1:5528/ejemplo%204/index.html`, guardada en `C:/Users/kecac/Documents/UTN 2026/UI prototipo/UI/ejemplo 4`.

Captura principal: `C:/Users/kecac/Documents/UTN 2026/UI prototipo/UI/ejemplo 4/revision/inicio-final.png`. Las seis vistas finales están en `revision/inicio-final.png`, `rutas-final.png`, `reciclaje-final.png`, `centros-final.png`, `avisos-final.png` y `reportes-final.png`.

Viewport solicitado al navegador: 1365 × 1000 CSS px. Capturas devueltas por el navegador: 1350 × 989 píxeles de contenido visible. Se documenta esta diferencia de encuadre del navegador, sin atribuirle desviaciones de diseño. No se cambió la densidad del dispositivo. Para la comparación general se escalaron proporcionalmente las capturas a marcos de 640 × 370, sin estirar ni recortar contenido. El tablero de referencia es una composición de pantallas, no una única ventana con un viewport verificable; no se pretende una comparación exacta de píxeles.

Comparaciones abiertas e inspeccionadas conjuntamente:

- `revision/comparacion-general.png`: referencia completa e implementación de las seis vistas en un mismo archivo. Evalúa orden, jerarquía, proporciones y familia visual.
- `revision/comparacion-inicio.png`: portada de referencia y portada implementada en un mismo archivo. Permite comprobar la costa, la distribución del buscador, los cuatro accesos y la cabecera municipal.
- `revision/comparacion-tarjetas.png`: recortes de las tarjetas originales e implementadas, normalizados a un ancho máximo de 640 px. Evalúa iconos, orden, colores, listas y botones.

Estados de las capturas finales: inicio sin consulta; rutas de Sardinal con cambio ilustrativo; reciclaje sin filtro; tres centros ficticios; dos avisos de ejemplo; reporte nuevo vacío. La confirmación local con datos sintéticos está en `revision/reporte-confirmacion.png`.

## Cinco superficies de fidelidad

| Superficie | Resultado y diferencias aceptadas |
| --- | --- |
| Tipografía | Karla y Rubik locales, conservadas de la base municipal. La imagen no identifica una familia exacta. Se mantiene la jerarquía de títulos oscuros y textos breves. No hay títulos cortados ni superpuestos en los anchos revisados. |
| Espaciado y distribución | Cuatro accesos en inicio; calendario y mapa en columnas; cuatro tarjetas por material; listado y mapa de centros; panel introductorio junto al formulario. Los márgenes, bordes suaves y fondos claros siguen la referencia. En móvil las columnas se apilan o pasan a dos tarjetas. |
| Colores | Verde institucional, azul oscuro y fondo gris muy claro; azul, verde, amarillo y morado para materiales. Ajustes de contraste documentados arriba. El color no es la única señal: cada material tiene título e icono. |
| Imágenes e iconos | Paisaje nuevo inspirado en Guanacaste, nítido en la portada y sin texto incrustado. Escudo y logotipo municipales conservados. Iconos sólidos de Font Awesome, con licencia local, en vez de dibujos improvisados. Cartografía real de OpenStreetMap con atribución visible y posiciones ficticias identificadas. |
| Textos y contenido | Voseo coherente con el contexto; acciones concretas; condiciones de entrega y preparación separadas. Horarios, puntos y campañas se identifican como ejemplos; el formulario informa su simulación antes y después de completarlo. |

La cabecera y el escudo municipales sustituyen intencionalmente la marca «Carrillo Limpio» del boceto para presentar una remodelación de la sección existente. Se mantiene una segunda navegación para el servicio. La pantalla y los botones de login de la imagen no se implementaron por instrucción expresa. Se añadió Avisos como vista del escenario académico. No se reprodujeron las fechas ni los lugares no verificados del boceto como si fueran información oficial. Estas diferencias son aceptadas por el alcance; no son defectos pendientes.

## Comprobaciones funcionales

- Consulta de Sardinal desde inicio: abre Rutas y horarios y muestra el cambio del escenario. Artola modifica comunidad y calendario, y retira la línea ficticia reservada a Sardinal.
- Ambos mapas cargaron mosaicos visibles: al menos seis imágenes con dimensiones válidas en cada mapa. Se revisaron sus créditos y leyendas de ejemplo.
- Preparación de metales abre la ficha estática. El enlace a centros filtra los lugares que admiten el material en el escenario.
- Búsqueda de centros: todos (3), metales (2), electrónicos (1), término inexistente (0) y limpieza del filtro. La selección y sus marcadores acompañan el filtro. La ficha de Sardinal muestra condiciones y ausencia de dirección confirmada.
- Avisos: filtro por Artola muestra el estado vacío; limpiar restaura los dos avisos.
- Formulario vacío: tres campos inválidos y ninguna confirmación. Formulario válido: confirmación con tipo, comunidad y descripción sintéticos. Se adjuntó el escudo público como imagen de prueba: vista previa y nombre visibles. No se subió a un servidor. Crear otro reporte restaura campos y oculta la imagen.
- Buscador de cabecera con «vidrio»: abre reciclaje filtrado. Vista para papel: activa y desactiva su presentación en escala de grises.
- Menú institucional móvil: abre y cierra. Todas las pantallas mantienen etiquetas y títulos reconocibles.
- Índice general: se abrieron los enlaces de ejemplos 3 y 4 y se verificaron sus títulos y URL correspondientes. Las descripciones se ven en `revision/indice-general.png`.
- Consola del navegador: sin errores registrados durante la revisión.

## Adaptación y pruebas estáticas

Se recorrieron las seis vistas en 1365 × 1000, 768 × 1024 y 320 × 760 CSS px. El ancho del documento no excedió el viewport en ninguna. Se inspeccionaron además capturas móviles de 390 × 844, incluidas las páginas completas de portada, reciclaje, centros, rutas y reportes. Evidencia final posterior al contraste: `revision/inicio-movil-final.png` y `revision/reciclaje-movil-final.png`.

Las verificaciones de archivos revisan IDs únicos, recursos locales presentes, enlaces a los otros ejemplos y ausencia de controles de autenticación. `app.js` pasa la comprobación de sintaxis de Node y no utiliza plantillas HTML, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write` ni creación de elementos. La biblioteca cartográfica de terceros se conserva aparte en `vendor/leaflet`.

## Límites y seguimiento

La información operativa requiere validación municipal. No se probaron envíos reales porque no existen. No se ejecutó una prueba de usabilidad con participantes, una auditoría completa con lector de pantalla ni todos los navegadores. Se probó una foto válida; el límite de tamaño y los formatos inválidos están implementados, pero no se recorrieron todos sus casos en la interfaz. Los mapas dependen de conexión y un servidor HTTP; al abrir como archivo local se presenta una alternativa textual. No se descargaron mapas para uso fuera de línea.

## Lista final

- [x] Referencia e implementación abiertas e inspeccionadas juntas.
- [x] Contraste corregido y capturas posteriores guardadas.
- [x] Sin cuentas, contraseña, login ni registro en el prototipo.
- [x] Contenido de interfaz escrito en HTML.
- [x] Pantallas, filtros y reporte local comprobados.
- [x] Enlaces de ejemplos 3 y 4 presentes y comprobados.
- [x] Archivos y evidencias guardados en la carpeta solicitada.
