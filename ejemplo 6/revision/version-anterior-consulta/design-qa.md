# Revisión de diseño del ejemplo 6

Fecha: 24 de octubre de 2026. Prototipo académico UTN.

## Fuente y evidencias

- Concepto elegido: revision/concepto-product-design.png, generado con Product Design e ImageGen integrado. El usuario delegó la dirección y pidió una única propuesta; se desarrolló ese concepto.
- Captura final: revision/inicio-final-1440.png. Versión completa: revision/inicio-final-completo.png.
- Comparación conjunta: revision/comparacion-general.png. Ampliación de portada, materiales y accesos: revision/comparacion-detalle.png.
- Estado: Inicio, Sardinal, sin diálogos ni menús abiertos.
- Concepto: 1487 × 1058 px. Captura de navegador: 1425 × 1013 px. Vista CSS: 1440 × 1024, devicePixelRatio 1. Se normalizaron ambas imágenes a 1440 × 1024 para comparar. La diferencia del área de captura y las barras del navegador no se trató como defecto del diseño.
- Capturas de las seis vistas con anchos CSS de 1440, 768 y 390 px en revision/. Captura final móvil: revision/inicio-final-movil.png. Confirmación del reporte: revision/confirmacion-movil.png.

## Hallazgos corregidos

- [P2, resuelto] El formulario de comunidad heredaba una superficie blanca detrás de la etiqueta. Se dejó transparente para reservar el blanco al selector y mantener la continuidad del fondo verde. Evidencia inicial: revision/inicio-1440.png; final: revision/inicio-final-1440.png.
- [P2, resuelto] Los iconos iniciales de papel y metales no correspondían bien a sus materiales. Se usaron file-text y cylinder de la fuente oficial de la biblioteca y se renovaron las referencias para evitar la caché anterior. Se revisaron en la portada y la guía. Evidencia: revision/reciclaje-final.png.
- [P2, resuelto] La tipografía principal quedaba más pequeña que la del concepto. Se ajustó a 46 px en la presentación ancha, con tres líneas y reducción propia para tableta y móvil. Los controles se mantienen completos.
- [P3, resuelto] El pie institucional conservaba relleno exterior y una altura mínima del diseño anterior. Se retiraron ambos para que el contenido determine su altura. El pie puede quedar bajo el primer pliegue por la fila adicional de herramientas académicas; todas las acciones principales y la vista para papel quedan accesibles con desplazamiento normal.

No quedan hallazgos P0/P1/P2 pendientes en los recorridos revisados.

## Cinco superficies de fidelidad

**Tipografía.** Rubik y Karla locales del proyecto. Título principal de 46 px en escritorio, títulos secundarios de 30/22 px, cuerpo de 14–16 px. Se comprobaron pesos, líneas, etiquetas, foco visible y saltos de línea en las tres dimensiones. Se conserva el carácter municipal del concepto.

**Espaciado y estructura.** Cabecera institucional, navegación horizontal por seis vistas, portada dividida, aviso compacto, materiales con divisores y apoyos en una superficie verde grisácea. La portada usa un ancho máximo de 1296 px. En móvil el selector y el botón se apilan, la foto pasa debajo y los cuatro materiales forman dos columnas. Los mapas y formularios se apilan sin desbordamiento. No se añadieron módulos ajenos al servicio.

**Color.** Verde municipal #358b27, texto verde oscuro #163d2c, superficie #edf4eb, fondo blanco y aviso ámbar claro. Marcadores discretos de color para materiales. Sin degradados ni saturación innecesaria; se revisó el contraste visible de texto, enlaces y botones.

**Imágenes e iconos.** Foto costera existente con recorte natural, escudo y logo institucionales originales. Se reutiliza la biblioteca local de contorno y cuatro iconos de su fuente oficial. No hay ilustraciones sustituidas por dibujos CSS ni iconos artesanales. La fotografía es ilustrativa; no se afirma una ubicación municipal exacta. La implementación usa recursos reales, no la imagen plana del concepto.

**Contenido.** Consulta por comunidad como tarea principal. Se evita inventar instrucciones oficiales para tapas, compresión o colores de bolsas. Los horarios, centros, campañas y recorridos están identificados como ficticios. Se mantiene el nombre de la Municipalidad, sin cuentas, registro, buscador global redundante ni marca nueva. Los cambios de redacción frente al concepto corrigen orientaciones no verificadas y aclaran el carácter académico.

## Pruebas funcionales

- Seis vistas a 1440 × 1024, 768 × 1024 y 390 × 844: exactamente una vista activa, sin desbordamiento horizontal ni imágenes locales rotas.
- Consulta de las nueve comunidades desde la portada: abre rutas con el nombre, día y horario del escenario correspondiente. Sardinal conserva su aviso de cambio; Artola y Playas del Coco muestran viernes.
- Acceso de papel desde inicio: abre su ficha de preparación. El aviso compacto abre el cambio de Sardinal.
- Centros: búsqueda de vidrio devuelve un lugar; búsqueda inexistente, cero; limpiar restaura tres.
- Materiales: plástico devuelve una ficha; búsqueda inexistente muestra estado vacío; limpiar restaura la guía.
- Avisos: Campaña devuelve un aviso; limpiar restaura el listado.
- Mapas: cartografía de OpenStreetMap cargada en el mapa de centros; mapas de rutas inicializados durante las consultas. Atribución y leyendas visibles. Sin geolocalización.
- Reporte en móvil: bloqueo de campos vacíos y de descripción de espacios; foto válida con vista previa; confirmación con comunidad, descripción y nombre de la foto; reinicio limpia el formulario. No se transmitió ni persistió información.
- La recuperación de foto inválida/mayor de 5 MB se conserva del controlador del ejemplo 5, ya probado en esta conversación; en el sexto se revisó el código y se probó una foto válida, sin repetir el archivo grande.
- Vista para papel: activación y desactivación comprobadas. Menú municipal móvil: abre y cierra con aria-expanded correcto. No se abrió el diálogo de impresión del sistema.
- Consola: sin errores ni advertencias del sitio en los recorridos probados.
- Selector general: contiene seis enlaces y abre el ejemplo 6. Se verificó la preservación de 261 archivos de los ejemplos anteriores durante la creación, registrada en revision/preservacion.json.
- Revisión independiente de código: sin bloqueantes; destinos, controles y recursos existen, sin IDs duplicados. Scripts propios sin generación de HTML.

## Alcance y límites

Prototipo local, sin publicación. El formulario no crea solicitudes municipales ni sube fotos. Los mapas necesitan conexión a OpenStreetMap y mantienen avisos de indisponibilidad. No se contactó a la Municipalidad ni se validaron datos operativos: se conserva su identificación como ejemplos. La revisión de impresión se limita al control y los estilos para papel, sin impresión física.

## Lista de cierre

- [x] Concepto y captura comparados juntos, con detalle ampliado.
- [x] Tipografía, estructura, colores, recursos y contenido revisados.
- [x] Navegación, comunidad, filtros, fichas y reportes probados.
- [x] Computadora, tableta y móvil revisados.
- [x] Revisión de código y comprobaciones de recursos realizadas.
- [x] Selector actualizado y propuestas anteriores conservadas.

final result: passed
