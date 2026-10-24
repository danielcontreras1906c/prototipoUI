# Revisión del rediseño del ejemplo 6

Fecha: 24 de octubre de 2026.

## Resultado y alcance

Se reemplazó la composición anterior por una consulta de recolección con calendario semanal. El cambio abarca la presentación de las seis vistas: navegación verde continua, selector azul oscuro, horario visible en inicio, buscador de residuos, guía en filas, mapa a la izquierda del directorio y formulario de una columna. Se conserva la identidad municipal y el funcionamiento local del prototipo.

Los ejemplos 1 a 5 se comprobaron sin modificaciones (261 archivos). La versión anterior del sexto se guardó en revision/version-anterior-consulta/ como copia de sus archivos principales, concepto y captura. Para restaurarla se deben devolver esos archivos a la raíz del ejemplo 6; no es una copia independiente con todos sus recursos.

## Fuente y comparación visual

- Objetivo: revision/concepto-calendario-comunidad.png, generado con Product Design e ImageGen integrado. El usuario pidió rediseñar el sexto a criterio del diseñador; se elaboró un único concepto.
- Captura final: revision/calendario-inicio-final.png. Página completa: revision/calendario-inicio-completo.png.
- Comparación conjunta: revision/comparacion-concepto-calendario.png.
- Ampliación del selector y el calendario: revision/comparacion-detalle-calendario.png.
- Estado: Inicio, Sardinal, semana de ejemplo del 26 de octubre al 1 de noviembre de 2026, sin diálogos y con desplazamiento vertical 0.
- Vista CSS: 1440 × 1024, devicePixelRatio 1. Concepto: 1487 × 1058 px. Captura: 1425 × 1013 px. Ambas se normalizaron a 1440 × 1024 para la comparación. La densidad de captura y las barras del navegador no se interpretaron como diferencias del diseño.
- Otras capturas: las seis vistas a 1440, 768 y 390 px de ancho CSS. revision/calendario-movil-final.png muestra la presentación móvil definitiva.

## Hallazgos y reparación

1. **P2, resuelto: contraste del menú móvil.** El componente heredado fijaba un fondo blanco por debajo de 700 px. Con texto e iconos blancos, cinco enlaces quedaban invisibles. Se reprodujo en navegador: fondo rgb(255,255,255) y texto blanco. Evidencia: revision/movil-antes-navegacion.png. Se fijó fondo transparente sobre la barra verde. Después de la corrección se comprobó el fondo transparente, se recorrieron las seis vistas en móvil y se capturó el resultado final.
2. **P2, resuelto: navegación en vista para papel.** La superficie pasaba a blanco con enlaces blancos. Se excluyó la barra de esa presentación. Se comprobó que el control de papel la oculta y que desactivarlo restaura la navegación.
3. **P2, resuelto: etiquetas semanales demasiado pequeñas en pantallas reducidas.** Se ajustaron a 10–12 px para metadatos y se abrevia la etiqueta seleccionada a «ordinaria» en móvil y tableta; el encabezado conserva el contexto de recolección. No se fuerza texto de 7 px ni se desborda la celda.
4. **P3, resuelto: texto heredado sobre tarjetas de colores.** La guía ya no tiene tarjetas por color. Se sustituyó esa explicación por una indicación para confirmar recipiente, bolsa y condiciones con el lugar de entrega.

No quedan hallazgos P0/P1/P2 pendientes. El revisor independiente verificó el cierre del problema del menú y la coherencia de las comunidades, fechas y destinos.

## Superficies de fidelidad

- **Tipografía:** Rubik local en títulos y Karla en cuerpo y controles. Título de página de 37 px y fecha destacada de 34 px en escritorio; cuerpo de 14–18 px. Los metadatos del calendario se reducen sin ocultar fechas ni el tipo de evento. Se comprobaron saltos de línea, foco y legibilidad en escritorio, tableta y móvil.
- **Estructura y espacios:** barra horizontal de fondo verde, consulta en dos áreas planas y directorio inferior de listas. El calendario conserva siete columnas. En móvil el selector queda sobre el resumen y los materiales se presentan en una lista única. No hay portada costera ni cuadrícula de materiales coloreados. Las otras vistas comparten divisores, jerarquía y controles de la propuesta nueva.
- **Color:** azul oscuro #173743 para la consulta, verde #205d43 para la navegación, tinta azul para títulos, verde claro en el día seleccionado y ámbar en el cambio de Sardinal. El contraste del menú se comprobó tras corregirlo. No se imita el degradado del concepto generado: los colores son planos.
- **Recursos:** escudo y pie institucionales originales; iconos locales de biblioteca. No se dibujan imágenes mediante CSS ni se usa el concepto como imagen plana de la página. Los mapas mantienen OpenStreetMap con atribución. No se añadieron fotos ni ilustraciones.
- **Contenido:** «Sin evento» describe la ausencia de datos en el escenario, en lugar de afirmar que no hay servicio real. Los horarios y ubicaciones siguen identificados como ficticios. Se conserva la Municipalidad como institución y se mantienen las limitaciones del reporte local. El concepto incluía frases y tamaños que se ajustaron para evitar afirmaciones no verificadas y mantener controles legibles.

## Verificación funcional

- Seis vistas a 1440 × 1024, 768 × 1024 y 390 × 844: una sola vista activa, sin desbordamiento horizontal ni recursos locales rotos.
- Nueve comunidades: la selección actualiza inmediatamente fecha, horario, celda semanal y selector de rutas. Sardinal, Filadelfia, Corralillos y Los Jocotes: martes 27; Belén y Paso Tempisque: miércoles 28; Palmira: jueves 29; Artola y Playas del Coco: viernes 30. Todas las fechas corresponden a la semana ficticia indicada.
- El aviso de cambio aparece solo para Sardinal. Su botón abre el detalle correcto.
- «Ver recorrido» abre Rutas y horarios con la comunidad seleccionada. Cambiarla allí y volver a Inicio mantiene la sincronización; comprobado con Belén.
- Buscador de inicio: «PLASTICO» encuentra un material; su botón abre la ficha de plástico. Una consulta inexistente muestra cero resultados y la opción de ir a la guía. «sillon» encuentra Muebles. Vaciar la búsqueda restaura seis materiales.
- Reporte móvil: campos vacíos y descripción de espacios bloqueados; datos válidos muestran la confirmación de Palmira sin adjunto; «Crear otro reporte» restaura el formulario. Los controles de foto, previamente probados en la versión anterior de este mismo ejemplo, no cambiaron en este rediseño y no se repitió la selección de archivo.
- Menú municipal móvil: abre y cierra con aria-expanded correcto.
- Vista para papel: estado activado y desactivado; barra de navegación oculta de forma intencional. No se abrió el diálogo de impresión del sistema.
- Directorio de centros: cartografía real visible en la captura y posiciones marcadas como ilustrativas. Los filtros y fichas conservan sus conexiones probadas; no se añadieron servicios externos ni geolocalización.
- Consola: sin errores ni advertencias del sitio en los recorridos comprobados.
- Revisión estática: recursos locales existentes, IDs únicos, destinos de ficha válidos y sintaxis JavaScript correcta. Los scripts propios no generan HTML.

## Límites

Prototipo académico local. Las fechas, horarios, centros, campañas y recorridos no son datos operativos municipales verificados. Los mapas requieren conexión. El formulario no envía información, no sube fotos ni persiste solicitudes. La copia anterior es un respaldo de archivos para restauración, no otro ejemplo numerado.

## Lista de cierre

- [x] Concepto nuevo comparado con implementación, en vista completa y detalle.
- [x] Tipografía, espacios, colores, recursos y textos revisados.
- [x] Calendario, búsqueda, navegación y reporte comprobados.
- [x] Las seis vistas revisadas en computadora, tableta y móvil.
- [x] Problemas P2 corregidos y vueltos a comprobar.
- [x] Selector y respaldo actualizados; ejemplos anteriores conservados.

final result: passed
