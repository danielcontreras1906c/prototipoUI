# Ejemplo 4 Servicios de basura y reciclaje

Propuesta académica inspirada en la imagen aportada por el usuario. Conserva el escudo y el marco de navegación de la Municipalidad de Carrillo y aplica al servicio una portada costera, verde profundo, tarjetas por material y vistas con mapas de referencia.

## Abrir los ejemplos

El index.html de la carpeta UI permite elegir los ejemplos 1, 2, 3 y 4. Se agregaron los enlaces de los ejemplos 3 y 4 con sus respectivas descripciones; los anteriores se conservan.

Para abrir todo en VS Code, usá Prototipos de Carrillo.code-workspace, dentro de esta carpeta. Este archivo abre la carpeta padre UI mediante una ruta relativa. Ejecutá Live Preview: Start Server y elegí el ejemplo desde el índice general.

También podés abrir directamente ejemplo 4/index.html. Los mapas requieren conexión y una vista HTTP como Live Preview. Las demás pantallas, los iconos, la portada, las fuentes y la simulación del formulario son locales. No se necesita instalar dependencias.

## Pantallas

- Inicio: fotografía costera ilustrativa, búsqueda de comunidad y cuatro accesos principales.
- Rutas y horarios: calendario por comunidad y mapa con una línea ficticia de referencia.
- Cómo reciclar: papel y cartón, plástico, metales y vidrio por color; preparación de electrónicos y muebles.
- Centros: búsqueda por comunidad o material, fichas de condiciones y mapa de puntos ficticios.
- Avisos: cambios de recolección y campañas del escenario.
- Reportes y consultas: formulario de prueba con validación, fotografía opcional y confirmación local.

El prototipo es de acceso directo. No incorpora cuentas ni autenticación.

## Separación de archivos

index.html contiene todos los textos, pantallas, formularios, fichas e iconos de la interfaz. app.js controla estados y actualiza textos; no contiene plantillas HTML ni utiliza innerHTML, document.write o creación de elementos. Leaflet, conservado en vendor, construye internamente la cartografía como biblioteca de terceros.

municipal.css conserva la base del encabezado municipal. styles.css define el aspecto del cuarto ejemplo. assets contiene los recursos gráficos y las fuentes. revision guarda las comprobaciones y capturas.

## Datos y simulaciones

Los horarios de servicio, avisos, campañas, puntos, posiciones y línea de recorrido son ficticios. No se confirma un servicio de recolección selectiva u orgánica: esas condiciones se indican pendientes de verificar. Los colores de las tarjetas identifican contenidos y no indican un color oficial de bolsa.

Los mapas usan cartografía real de OpenStreetMap como fondo, pero los marcadores y la línea del escenario no representan servicios ni direcciones confirmados. No se solicita la ubicación del dispositivo ni se ofrecen instrucciones de traslado a esos puntos ficticios.

El reporte no se envía a la Municipalidad, no genera un número de solicitud oficial y no se guarda en una base de datos. La fotografía opcional, de hasta 5 MB, se muestra mediante una referencia local del navegador; no se sube a ningún servidor. Crear otro reporte limpia los campos de la simulación.

## Recursos

- Referencia de estilo: WhatsApp Image 2026-10-23 at 10.17.23 PM.jpeg, aportada por el usuario.
- Marco institucional y recursos municipales: conservados del ejemplo 3; referencia https://www.municarrillo.go.cr/tag/servicios-basura/.
- Portada: assets/portada-costa.webp, imagen nueva creada con la herramienta integrada image_gen. Es un paisaje inspirado en Guanacaste, sin una ubicación real documentada. El modo y el prompt están en assets/portada-nota.md.
- Iconos: Font Awesome Free 6.7.2, por su estilo sólido similar al de la imagen. Licencia y atribución en assets/iconos/LICENSE.txt. Los marcadores son variantes de color del icono original location-dot.
- Mapas: Leaflet 1.9.4, licencia en vendor/leaflet/LICENSE.txt, con mosaicos de OpenStreetMap bajo sus políticas de uso y atribución visible. Las solicitudes se limitan a la vista interactiva, sin descargar zonas para uso fuera de línea.

Referencias: https://fontawesome.com/license/free, https://leafletjs.com y https://operations.osmfoundation.org/policies/tiles/.

La revisión técnica no sustituye el card sorting, las pruebas con participantes ni la validación de la información municipal del proyecto.
