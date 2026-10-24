# Ejemplo 6 · Calendario por comunidad

Rediseño original del prototipo académico de Servicios de basura y reciclaje de la Municipalidad de Carrillo. Reemplaza la composición costera anterior; su copia está en revision/version-anterior-consulta/.

## Abrir
Usar UI/index.html y elegir Ejemplo 6, o http://127.0.0.1:5528/ejemplo%206/index.html mientras esté activo el servidor local.

## Diseño y uso
Barra de navegación verde, consulta de comunidad en azul oscuro, horario visible en inicio y calendario semanal que se actualiza al cambiar la comunidad. El botón Ver recorrido abre Rutas y horarios. El buscador de residuos filtra seis accesos que abren sus fichas. Las otras cinco vistas se presentan con listas, mapas y formulario de ancho completo, conservando las interacciones probadas.

Los textos, fechas, pantallas y fichas están en index.html. app.js controla estados; Leaflet dibuja la cartografía. municipal.css conserva fuentes y base; styles.css los componentes funcionales heredados; sexto.css define la nueva presentación. revision contiene concepto, capturas y comparación; design-qa.md documenta la revisión.

## Límites
Todos los horarios, campañas, centros y recorridos son ficticios. La semana del 26 de octubre al 1 de noviembre de 2026 es un escenario de ejemplo. «Sin evento» indica ausencia de datos en ese escenario, no confirma que no exista servicio municipal. La cartografía real de OpenStreetMap requiere conexión; sus líneas y puntos son ilustrativos. Sin geolocalización ni cuentas.

El reporte es una simulación local: no envía datos ni fotos, no guarda solicitudes y no tiene servidor de datos. Admite foto opcional válida de hasta 5 MB; al rechazar un archivo se conservan los demás campos. Vista para papel e impresión disponibles al pie.

Los ejemplos 1 al 5 se conservaron. El enlace del selector sigue apuntando al ejemplo 6.
