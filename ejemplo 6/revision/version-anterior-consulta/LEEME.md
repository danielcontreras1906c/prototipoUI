# Ejemplo 6 · Consulta municipal clara

Última propuesta del proyecto académico UTN para remodelar Servicios de basura y reciclaje de la Municipalidad de Carrillo. Dirección propia realizada con Product Design, basada en la identidad y el contenido existentes.

## Abrir
Desde UI/index.html, elegir Ejemplo 6. Usar un servidor local; en esta sesión se utiliza http://127.0.0.1:5528/ejemplo%206/index.html.

## Vistas
Inicio, Rutas y horarios, Cómo reciclar, Centros de acopio, Avisos y Reportes y consultas. La portada prioriza seleccionar una comunidad y consultar su horario. Los accesos por material abren las fichas de preparación. Las demás vistas incluyen filtros, mapas, estados vacíos y formulario de prueba. La vista para papel y la impresión están al pie del contenido.

## Archivos
index.html contiene todas las pantallas, formularios, iconos y fichas. app.js controla estados e interacciones. municipal.css conserva la base y fuentes; styles.css los componentes funcionales heredados; sexto.css el diseño específico. assets contiene recursos locales y sus licencias; vendor/leaflet, la cartografía. revision contiene el concepto, capturas, comparación y decisiones. design-qa.md documenta la verificación.

## Límites
Datos operativos ficticios. Los horarios, campañas, centros y recorridos no representan información municipal confirmada. OpenStreetMap suministra cartografía real con conexión; las líneas y puntos son ilustrativos. No se solicita la ubicación del dispositivo. El formulario es una simulación local: no envía información, no sube fotografías, no persiste reportes y no tiene servidor de datos. Una foto opcional se previsualiza solo en memoria; si no es imagen o supera 5 MB se descarta manteniendo el resto de campos.

Se conservaron los ejemplos 1 a 5. El selector general contiene también este ejemplo.
