# Comprobación del prototipo

Revisión técnica y visual realizada el 23 de octubre de 2026. No sustituye las pruebas con usuarios del curso.

Se comprobó en navegador mediante una vista local:

- Apertura del inicio y navegación por los ocho tipos de pantalla.
- Ancho de celular de 390 píxeles sin desplazamiento horizontal en las ocho pantallas.
- Composición de escritorio y menú adaptable.
- Cambio de comunidad a Artola: el escenario muestra viernes en la recolección.
- Filtro de electrónicos: muestra una jornada de ejemplo en Belén y permite abrir su ficha.
- Combinación sin resultados: electrónicos en Sardinal muestra un estado vacío; limpiar filtros recupera los tres lugares.
- Búsqueda de «electronicos» sin tilde: encuentra Electrónicos.
- Avisos filtrados por Sardinal y cambio de recolección: abre el detalle con lunes 26 y martes 27 como fechas ficticias.
- Activación y desactivación del modo en blanco y negro.
- Acceso con teclado mediante Saltar al contenido, conservando la pantalla actual.
- Ocho láminas generadas, sin identificadores duplicados; composición compacta revisada en pantalla.
- Sintaxis de app.js válida y sin errores de consola en las vistas revisadas.

Las capturas inicio-computadora.png e inicio-celular.png muestran el aspecto revisado. El tamaño explícito del navegador se utilizó únicamente para comprobar el diseño adaptable.

La revisión se hizo con un servidor temporal, ya que el navegador integrado bloquea la apertura de direcciones file:. El prototipo usa archivos clásicos y rutas relativas, sin módulos ni servicios externos necesarios, para permitir que el usuario abra index.html con su navegador. Esa apertura directa y la impresión física no se verificaron en el visor integrado.

No se realizaron ni se inventaron resultados de card sorting, pruebas con participantes ni evaluación formal de accesibilidad. La información operativa sigue pendiente de validación municipal.
