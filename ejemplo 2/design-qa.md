# Revisión del ejemplo 2

Fecha: 23 de octubre de 2026.

## Alcance de la comparación

La referencia visual es https://www.municarrillo.go.cr/tag/servicios-basura/. Se compara la continuidad con el sitio municipal: encabezado, escudo, tipografías, paleta y presentación de la sección. El contenido central se remodela deliberadamente para permitir las consultas identificadas en la investigación; no se busca reproducir la antigua imagen del horario.

- Fuente visual: revision/referencia-municipal.png.
- Implementación: revision/prototipo-escritorio.png.
- Comparación conjunta: revision/comparacion-escritorio.png.
- Comparación enfocada del encabezado: revision/comparacion-encabezado.png.
- Comparación móvil: revision/comparacion-movil.png.
- Implementación revisada mediante Live Preview real de VS Code en http://127.0.0.1:3000/UI/ejemplo%202/index.html.

En escritorio se verificó un viewport CSS de 1366 × 900; las dos capturas guardadas miden 1350 × 890 píxeles. En celular se usó 390 × 844 CSS; ambas capturas miden 375 × 811 píxeles. En cada par las dimensiones y la escala coinciden; no se redimensionó una sola imagen para simular coincidencia. Las comparaciones agregan únicamente títulos y márgenes para reunir las capturas en un mismo archivo. Estado: parte superior de la sección, menú cerrado, tema claro, sin diálogo abierto.

## Resultados de fidelidad

- **Tipografía:** fuentes locales Karla para cuerpo y menú, Rubik para títulos y Astra para el icono original del buscador. Se comprobó su carga. El título principal usa 40 píxeles y el menú de escritorio 17, como la referencia observada.
- **Espaciado y estructura:** encabezado blanco de 103 píxeles en escritorio, escudo de 70 píxeles y ancho de contenido de aproximadamente 1080. Se revisaron juntas las capturas completas y un acercamiento del encabezado. La navegación interna de la sección y sus formularios son cambios intencionales.
- **Colores:** el verde de títulos y navegación es #358B27, RGB 53, 139, 39, medido en el sitio real. Se usan negro, blanco y grises para el resto. Se retiró el lenguaje visual del primer ejemplo, incluida su marca independiente.
- **Recursos gráficos:** escudo y logo del pie descargados de las URLs observadas en el sitio municipal, con atribución. El icono de búsqueda usa el glifo original de Astra. No hay ilustraciones o escudos recreados.
- **Contenido:** se presenta como Servicios de basura dentro del marco municipal. Se mantienen visibles las etiquetas de prototipo y datos ficticios. Los datos de servicio y las fichas no se presentan como información municipal vigente.

## Historial de correcciones

1. En la primera comparación del encabezado, el inicio del menú aparecía desplazado unos 35 píxeles. Se corrigió el espacio entre elementos y el margen derecho. Se volvió a capturar la implementación al mismo tamaño y se inspeccionó la comparación enfocada actualizada.
2. En la prueba de navegación se observó que una ventana de detalle permanecía abierta al cambiar la sección desde el navegador. Se cerraron los diálogos al cambiar la vista y se volvió a probar la misma secuencia: el diálogo queda cerrado y la sección de destino visible.

No quedan hallazgos P0, P1 o P2 dentro del alcance revisado. Las diferencias en los textos del título y en la distribución del contenido central responden a la remodelación solicitada. En celular se acortó el botón de menú para que no tape el título, como sucede en la referencia.

## Comprobaciones funcionales

- Las cinco secciones muestran una sola vista activa y no generan desplazamiento horizontal a 390 píxeles ni en escritorio.
- Cambiar a Artola actualiza el selector y deja una sola fila de horario visible, correspondiente al viernes del escenario.
- Filtrar electrónicos muestra la jornada de Belén; su ficha abre y enlaza a la preparación de electrónicos.
- Combinar electrónicos con Sardinal produce un estado vacío; limpiar filtros recupera los tres ejemplos.
- Buscar electronicos y carton sin tildes encuentra sus materiales.
- Filtrar avisos por Sardinal y cambio de recolección deja un aviso; su detalle muestra lunes 26 y martes 27 del escenario.
- El menú móvil se abre y se cierra al navegar. La búsqueda del encabezado lleva a los contenidos de la sección.
- Omitir e ir al contenido conserva la vista y mueve el foco al contenido.
- La opción para papel se activa y se desactiva sin reconstruir el documento.
- No se detectaron errores de consola durante las comprobaciones.
- app.js pasa la revisión de sintaxis. El análisis de archivos confirma 56 identificadores únicos, recursos locales presentes, configuraciones JSON válidas y ausencia de HTML generado desde JavaScript.
- Se inició la extensión instalada de VS Code, Live Preview de Microsoft. La entrada general, el selector y los dos ejemplos respondieron con HTTP 200. También se verificó visualmente el selector en la vista integrada de VS Code.

## Límites de la revisión

No se realizaron pruebas con participantes ni evaluación formal de accesibilidad. No se verificó una impresión física. Las rutas reales, horarios, campañas, puntos y condiciones siguen pendientes de verificación municipal. Las secciones institucionales externas enlazan al sitio real y quedan fuera del prototipo académico.

final result: passed
