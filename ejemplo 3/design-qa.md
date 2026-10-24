# Revisión del tercer ejemplo

Fecha: 23 de octubre de 2026.

## Referencia y alcance

La referencia elegida por el usuario es el ejemplo 2, conservado en la carpeta contigua. Se mantuvo su identidad municipal y se remodeló la presentación interna del servicio. El contenido central cambia de forma intencional: consulta por comunidad, resumen del horario, cuatro tareas principales y dos bloques de apoyo.

- Referencia visual: revision/base-ejemplo-2.png.
- Captura equivalente del tercer ejemplo: revision/inicio-comparacion.png.
- Comparación conjunta: revision/comparacion-ejemplos.png.
- Comparación enfocada del encabezado: revision/comparacion-encabezado.png.
- Vista de escritorio completa revisada: revision/inicio-computadora.png.
- Vistas de celular: revision/inicio-celular.png y revision/materiales-celular.png.

La comparación usa el mismo estado de inicio: Sardinal seleccionada, menú cerrado, tema claro y sin ventanas abiertas. Las dos capturas de comparación miden 1350 × 890 píxeles, con viewport CSS de 1366 × 900. Se reunieron en un mismo archivo sin escalar una de ellas para aparentar coincidencia. También se inspeccionó el encabezado en una comparación enfocada. La captura de escritorio adicional se hizo a 1366 × 1000 CSS; las pruebas móviles usaron 390 × 844 y 320 × 760 CSS.

## Revisión visual

- **Fuentes y jerarquía:** se conservaron Karla y Rubik locales. El encabezado y el título principal mantienen la identidad del ejemplo 2. Se diferenciaron títulos, descripciones, etiquetas y acciones en el contenido.
- **Espaciado y estructura:** se conserva el encabezado institucional. El contenido central usa un ancho máximo de 1140 píxeles para ordenar la consulta, el resumen y los cuatro accesos. En celular los bloques se apilan y los materiales conservan controles amplios.
- **Colores:** verde #358B27, negro, blanco y grises. El valor del título principal se comprobó en el navegador como RGB 53, 139, 39. No se creó una identidad de marca distinta.
- **Imágenes e iconos:** escudo y logo del pie conservados del ejemplo 2. Los iconos del contenido pertenecen a Lucide y usan tamaño, trazo y color consistentes. Son SVG estáticos incorporados en HTML, con recursos y licencia locales.
- **Contenido:** los horarios y condiciones siguen identificados como escenarios ficticios. El resumen del inicio cambia con la comunidad y conduce al horario correspondiente. Los accesos de material abren la preparación adecuada.

## Correcciones durante la revisión

Se detectó que algunos enlaces secundarios del primer pase eran demasiado pequeños, especialmente Ver aviso dentro del resumen. Se aumentaron su texto y área de interacción, así como los accesos de avisos y materiales. La comprobación posterior midió 30 píxeles de alto para Ver aviso y volvió a revisar el inicio en celular. La captura de escritorio y la comparación corresponden al resultado corregido.

La comparación del encabezado confirma que se conservan el escudo, las fuentes, el menú y la alineación institucional. La nueva distribución del contenido central y los bordes suaves son cambios solicitados, no intentos de copiar exactamente la distribución anterior.

No quedan hallazgos P0, P1 o P2 dentro del alcance revisado.

## Comprobaciones funcionales

- Las cinco secciones muestran una sola vista activa, sin desplazamiento horizontal en los anchos móviles de 390 y 320 píxeles.
- Elegir Artola cambia el resumen a viernes y oculta el cambio específico de Sardinal. Consultar horarios mantiene Artola y muestra una sola fila de la tabla.
- Ver aviso abre el cambio ficticio de lunes 26 a martes 27.
- Papel y cartón desde el inicio abre la guía correspondiente; su enlace filtra los lugares por cartón.
- Electrónicos filtra la jornada de Belén.
- Combinar electrónicos con Sardinal muestra un estado vacío; limpiar filtros recupera los tres lugares.
- Buscar electronicos y carton sin tilde devuelve el material adecuado.
- Filtrar avisos por Sardinal y cambio de recolección deja un aviso.
- El menú móvil y la búsqueda del encabezado funcionan; el menú se cierra al navegar.
- Omitir e ir al contenido mueve el foco sin cambiar la sección.
- La vista para papel se activa y se desactiva.
- No se detectaron errores de consola durante las comprobaciones.
- El análisis del HTML encontró 63 identificadores únicos y 82 usos de iconos SVG estáticos, sin atributos duplicados ni recursos locales faltantes.
- app.js pasa la comprobación de sintaxis. No utiliza HTML generado, innerHTML, insertAdjacentHTML, document.write ni creación de elementos.
- Live Preview se inició desde una ventana de VS Code abierta en la carpeta nueva del tercer ejemplo. La entrada respondió HTTP 200 y se verificó en navegador.

## Límites

La revisión técnica y visual no sustituye el card sorting ni las pruebas de usabilidad del curso. No se hicieron pruebas con participantes, una evaluación formal de accesibilidad ni una impresión física. Los datos de servicio y las fichas siguen pendientes de verificación municipal. La navegación institucional externa conserva enlaces al sitio real y queda fuera del prototipo.

final result: passed
