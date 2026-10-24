# Ejemplo 2 Remodelación de Servicios de basura

Propuesta académica para reorganizar una sección del sitio de la Municipalidad de Carrillo. Conserva el encabezado, el escudo, el menú principal, el fondo blanco, el texto negro y el verde del sitio real. No incorpora una marca nueva.

## Abrir el prototipo

Abrí index.html en tu navegador o con Live Preview de VS Code. No se necesitan instalaciones ni compilación. Todos los recursos necesarios son locales.

En VS Code podés abrir Servicios de basura.code-workspace, que apunta a esta misma carpeta mediante una ruta relativa. Luego abrí index.html y ejecutá **Live Preview: Show Preview** o **Live Preview: Start Server** desde la paleta de comandos.

En tu instalación se encontró **Live Preview de Microsoft**, identificador ms-vscode.live-server. Es una extensión diferente de **Live Server de Ritwick Dey**. Los comandos y el puerto pueden ser distintos; Live Preview utiliza normalmente el puerto 3000.

## Por qué cambió la vista previa al mover los archivos

La ventana de VS Code estaba abierta en 05 UI proyectos. Al mover el primer ejemplo desde UI a UI/ejemplo 1, la dirección anterior UI/index.html dejó de apuntar al prototipo. Además, la carpeta abierta no tenía un index.html de entrada y no había un servidor activo en los puertos habituales cuando comenzó la revisión.

Se agregaron estas entradas relativas:

- 05 UI proyectos/index.html lleva al selector de ejemplos.
- UI/index.html permite abrir ejemplo 1 o ejemplo 2.
- El archivo de trabajo de esta carpeta permite abrir solo el segundo ejemplo, manteniendo index.html como entrada.

Las configuraciones de Live Preview usan la carpeta abierta como raíz; no fijan una ruta absoluta del equipo. Los estilos, el script, las imágenes y las fuentes también usan rutas relativas. El ejemplo 1 conserva sus archivos originales.

Si volvés a mover una carpeta, detené y reiniciá Live Preview, abrí el index.html desde su ubicación nueva y cerrá la pestaña de vista previa que conserve la dirección anterior. No es necesario renombrar carpetas para quitar espacios: las direcciones web los codifican como %20.

## Separación de archivos

- index.html contiene todas las secciones, fichas, avisos, formularios y ventanas de detalle.
- styles.css contiene el diseño municipal, las adaptaciones para celular y los estilos para papel.
- app.js maneja filtros, selección de comunidad, navegación y apertura de ventanas. No contiene plantillas HTML ni usa innerHTML, insertAdjacentHTML, document.write o creación de elementos.
- assets contiene el escudo, el logo institucional del pie y las fuentes locales Karla, Rubik y Astra. El icono del buscador usa el glifo original de Astra.
- revision contiene capturas y el resultado de la revisión.

Las secciones se alternan dentro de una misma página. La estructura completa existe en el HTML desde que se abre el archivo. Con JavaScript desactivado se pueden leer las secciones; los filtros y las ventanas requieren activarlo.

## Qué se conserva y qué se remodela

Se conservan los rasgos visuales observados en la página municipal: verde #358B27, encabezado blanco con sombra, escudo de 70 píxeles en escritorio, Karla para texto y menú, Rubik para títulos y un ancho de contenido de aproximadamente 1080 píxeles. La navegación institucional enlaza al sitio real.

Se remodela la consulta del servicio: acceso por comunidad; avisos destacados; horarios como tabla de texto, en vez de depender de una imagen; directorio filtrable; condiciones de entrega; y guía de materiales. La estructura es una propuesta inicial pendiente de card sorting y pruebas con personas reales.

La opción Vista para papel quita el color de la interfaz. Imprimir esta pantalla imprime la sección seleccionada; una ficha abierta se imprime como detalle. La impresión física no se ha probado.

## Fuentes de los recursos

Página principal: https://www.municarrillo.go.cr/

Sección de referencia: https://www.municarrillo.go.cr/tag/servicios-basura/

Recursos descargados del sitio, consultados el 23 de octubre de 2026:

- Escudo: https://www.municarrillo.go.cr/wp-content/uploads/2023/11/escudo_muni_nuevo-80x80.png
- Logo del pie: https://www.municarrillo.go.cr/wp-content/uploads/2025/02/LOGO_Construyamos_Juntos-1024x318.png
- Fuentes Karla y Rubik indicadas en https://www.municarrillo.go.cr/wp-content/astra-local-fonts/astra-local-fonts.css

El pie del sitio de referencia indica licencia Creative Commons Attribution 4.0. Los recursos se atribuyen a la Municipalidad; no se implica su aval sobre esta propuesta.

## Alcance de los datos

Los horarios de servicio, fechas de avisos, campañas, lugares de entrega y sus condiciones son ficticios para evaluar la interfaz. Las direcciones y los contactos de esos lugares se indican pendientes de verificar. El contacto general del pie reproduce información pública del sitio municipal; no equivale a un contacto verificado del servicio de residuos.

La información de la investigación orienta las tareas, sin publicar nombres ni respuestas de participantes. No se simulan resultados de card sorting o pruebas. No hay notificaciones, cuentas, base de datos, envío de consultas ni integración municipal.
