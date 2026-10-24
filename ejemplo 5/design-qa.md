# Revisión final del ejemplo 5

Fecha: 24 de octubre de 2026. Remodelación académica de la sección municipal de Carrillo.

## Evidencias

- Fuente visual: revision/referencia.jpeg, proporcionada por el usuario (1536 × 1024 px).
- Implementación: revision/ejemplo-5-inicio-final.png y revision/ejemplo-5-inicio-final-completa.png.
- Comparación conjunta: revision/comparacion-portada.png.
- Comparación ampliada de tarjetas, textos y paneles: revision/comparacion-detalle.png.
- Estado comparado: Inicio, Sardinal, guía de plástico, sin diálogos abiertos.
- Vista CSS de comparación: 1536 × 1024, devicePixelRatio 1. Captura de navegador: 1521 × 1014 px. Para comparar se normalizó la captura a 1536 × 1024, ajuste uniforme aproximado del 1%; no se interpretó esa diferencia como un defecto visual.
- Otras vistas: capturas de inicio, rutas, reciclaje, centros, avisos y reportes con anchos CSS de 1536, 768 y 390 px en revision/. Hay también captura final móvil de inicio y confirmación móvil.

## Hallazgos y correcciones

No quedan problemas P0, P1 o P2 detectados en la revisión de las vistas y recorridos indicados.

1. [P2, resuelto] La primera portada cortaba el planeta y los contenedores en la vista ancha. Evidencia inicial: revision/ejemplo-5-inicio-desktop.png. Se probó mostrarla completa, pero quedaba pequeña y se veía una unión en el paisaje (revision/ejemplo-5-inicio-1536.png). Se generó una nueva panorámica con margen interno; la captura final muestra los objetos completos, sin unión rectangular.
2. [P2, resuelto] El primer resumen repetía las mismas fechas entre comunidades y proponía una fecha de reciclables que no coincidía con la información de rutas. Se escribieron filas estáticas para cada comunidad, se alineó la recolección ordinaria con el día de rutas y se mantuvo la entrega de reciclables por confirmar. Se comprobó la sincronización de los tres selectores.
3. [P2, resuelto] El formulario móvil dedicaba demasiado espacio a la introducción. Se acortó visualmente el bloque y se ocultó el botón redundante de nuevo reporte en esa presentación. Evidencia final: revision/ejemplo-5-reportes-390.png.
4. [P2, resuelto] Al reutilizar iconos SVG como archivos, los iconos sobre fondos oscuros necesitaban color claro. Se ajustó el contraste en botones, servicios y fichas, manteniendo tinta oscura sobre amarillo. Evidencia: revision/ejemplo-5-reciclaje-1536.png.

## Fidelidad y decisiones intencionales

- **Tipografía:** Rubik y Karla locales, heredadas del marco municipal. Títulos compactos, cuerpo legible, controles coherentes. No se añadió una familia decorativa. La referencia tiene rasgos redondeados similares; se priorizó la continuidad municipal. Se revisaron saltos de línea y etiquetas en móvil.
- **Espaciado y composición:** lateral de 224 px, portada panorámica, cuatro accesos y tres paneles inferiores. Bordes suaves sin sombras decorativas repetidas. La cabecera y el contexto institucional añaden algo de altura respecto a la foto. En tableta y móvil las vistas se reorganizan sin ocultar controles ni desbordar horizontalmente.
- **Colores:** tinta azul, verde de acción, celeste de portada y fondos lila, verde suave, azul y amarillo en los cuatro accesos. Las fichas de materiales mantienen los colores funcionales existentes. Se comprobó el contraste de los iconos sobre fondos de color.
- **Imágenes:** portada raster panorámica y envases transparentes realizados con ImageGen integrado. Escudo municipal y logo del pie originales. Sin sustituir ilustraciones por dibujos HTML/CSS ni iconos artesanales. Se revisaron nitidez, proporción, recorte y transparencia.
- **Contenido:** identidad de la Municipalidad de Carrillo, sin crear la marca independiente de la referencia. Se omiten el buscador superior y cualquier cuenta. El buscador de la portada es de comunidad. Avisos se conserva como sexta vista útil. Las fechas y lugares se identifican como ejemplos y no se agregan servicios municipales confirmados sin evidencia.
- **Iconos:** biblioteca local existente, reutilizada de forma consistente. El trazo sólido de algunos iconos difiere del contorno de la foto; es una adaptación al sistema disponible, no un error funcional.

## Verificación funcional

- Navegación por las seis vistas a 1536 × 1024, 768 × 1024 y 390 × 844: una sola vista activa y sin desbordamiento horizontal.
- Búsqueda de comunidad inexistente: error visible; búsqueda sin tilde de «belen»: abre rutas de Belén.
- Selección de Filadelfia en el resumen: mapa, filas y selector de rutas sincronizados.
- Guía rápida: cambio a vidrio y apertura de su ficha de preparación.
- Guía completa: búsqueda inexistente muestra cero materiales; plástico muestra un material.
- Centros: vidrio muestra un lugar; búsqueda inexistente muestra estado vacío; limpiar restaura tres lugares.
- Avisos: filtro Campaña muestra un aviso; abre la ficha de la jornada; limpiar restaura el listado.
- Menú municipal móvil: abre y cierra con estado accesible.
- Mapa de portada: teselas reales cargadas de OpenStreetMap, atribución estática enlazada y recorrido identificado como ilustrativo. Sin geolocalización.
- Reporte del ejemplo 5 en móvil: campos completos, confirmación con comunidad seleccionada y reinicio.
- Vista para papel: activa y desactiva el estado correspondiente. No se abrió el diálogo de impresión del sistema.
- Consola revisada: sin errores ni advertencias del sitio en los recorridos probados.
- Comprobaciones de archivos: sin recursos locales ausentes ni IDs duplicados; sintaxis JavaScript válida; sin innerHTML, outerHTML, insertAdjacentHTML, document.write ni creación de elementos en los scripts propios.

## Ejemplos 2 y 3

Se añadieron formularios independientes del ejemplo 4, adaptados a cada diseño: formulario a la izquierda con orientación lateral en el ejemplo 2; ficha de orientación a la izquierda, bordes suaves e iconos de trazo en el ejemplo 3. Se conserva el contenido anterior y se añade acceso desde inicio y navegación.

Se verificaron campos vacíos, descripción hecha solo de espacios, confirmación, reinicio y una foto válida con vista previa en el ejemplo 3. Los dos usan el mismo controlador de estados para reportes. Se probó también un archivo de 6 MB en el ejemplo 5: se rechazó, se descartó el adjunto, se conservaron los campos y se pudo confirmar sin foto. Los ejemplos 2 y 3 usan la misma recuperación al rechazar el adjunto. Las vistas de reportes se revisaron a 1265, 768 y 390 px sin desbordamiento.

Copias previas: revision/antes-de-reportes-2026-10-24 en cada ejemplo. Capturas nuevas en revision/. Los ejemplos 1 y 4 no se modificaron.

## Límites y detalles menores

- Los mapas requieren conexión a OpenStreetMap; se conserva aviso de fallo para indisponibilidad.
- El prototipo no envía ni guarda reportes o fotos y no tiene servidor de datos.
- La cartografía y los iconos presentan diferencias intencionales frente al dibujo de la referencia. Los recorridos no son rutas municipales reales.
- P3 opcional: explorar una biblioteca de iconos de contorno más cercana a la foto si en otra iteración se quiere igualar también ese detalle.

## Lista final

- [x] Referencia y captura comparadas juntas y con ampliación.
- [x] Tipografía, espaciado, colores, imágenes y contenido revisados.
- [x] Navegación, filtros, fichas, reportes y mapas probados.
- [x] Computadora, tableta y móvil revisados.
- [x] Contenido estático y ausencia de cuentas comprobados.
- [x] Ejemplos anteriores conservados y selector actualizado.

## Revisión independiente y cierre
+
+Una segunda revisión de código encontró tres P2 y se corrigieron antes de entregar:
+
+- Artola y Playas del Coco habían perdido la fila ordinaria al sustituir una fila del viernes. Se regeneraron las filas estáticas y se comprobó en navegador que ambas muestran viernes 30 de octubre, reciclables por confirmar y un solo aviso.
+- En los ejemplos 2 y 3, «consulta» coincidía primero con el texto de preparación de materiales. La rama de reportes ahora tiene prioridad; la búsqueda exacta abre #reportes en ambos ejemplos.
+- Una foto inválida bloqueaba continuar sin adjunto. Ahora se descarta y explica el rechazo manteniendo los demás campos. Se verificó con un archivo de 6 MB y una confirmación sin fotografía. Evidencia: revision/ejemplo-5-confirmacion-sin-foto-rechazada.png.
+
+El revisor confirmó el cierre de los tres hallazgos, sin problemas pendientes. Se revisó la consola tras las correcciones, sin errores ni advertencias. El selector general conserva cinco enlaces y abre el ejemplo 5.
+
+final result: passed
