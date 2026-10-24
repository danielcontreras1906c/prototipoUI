# Prototipo web de residuos y reciclaje de Carrillo

Maqueta académica navegable para explorar el diseño y después dibujar sus pantallas en papel. No necesita instalación ni conexión para sus pantallas, estilos e interacciones.

## Cómo abrirlo

Abrí **index.html** con un navegador. Todos los archivos necesarios están en esta carpeta. **Vista en papel** cambia la interfaz a blanco y negro. **Ver láminas para papel** abre ocho pantallas listas para imprimir o usar como referencia al dibujar; también podés abrir **papel.html** directamente.

En las láminas, usá **Imprimir láminas** y elegí tamaño carta horizontal. Una lámina corresponde a una pantalla. La vista de láminas muestra estados fijos; los selectores y filtros se prueban en index.html.

## Recorridos incluidos

1. Inicio → seleccionar comunidad → Recolección → detalle del cambio de Sardinal.
2. Dónde llevar residuos → filtrar material y/o comunidad → ficha del lugar → preparación.
3. Cómo prepararlos → buscar o filtrar → ficha del material → lugares que reciben ese material.
4. Avisos → filtrar comunidad/tipo → detalle de cambio o campaña.

El diseño se adapta a celular y computadora. Incluye navegación por teclado, etiquetas de campos, estados vacíos, filtros que ignoran tildes y enlaces de regreso. No pide cuentas ni datos personales.

## Propuesta inicial de arquitectura

- Inicio.
- Recolección.
- Dónde llevar residuos → ficha del lugar.
- Cómo prepararlos → ficha del material.
- Avisos → detalle del aviso.

Es una hipótesis de organización, pendiente de contrastar con card sorting real. Las pantallas concentran los cambios de recolección, los lugares de entrega y las condiciones de preparación que aparecen en la investigación. El acceso a la guía es secundario frente a las tareas de recolección y entrega. No se incluyeron fotos de residuos, registro de aportes ni estadísticas de participación porque su necesidad y viabilidad siguen por validar.

## Datos y referencias

**Todos los horarios, fechas de servicio, avisos, campañas, puntos de entrega, condiciones de recepción y posiciones en el esquema son ficticios.** La selección de una comunidad ilustra cómo cambiaría la información. Los puntos no tienen direcciones ni teléfonos inventados: esos datos aparecen pendientes de verificar. El esquema no es un mapa geográfico y no permite trazar rutas reales.

La estética toma como referencia el verde y el fondo blanco del sitio municipal. Esta es una propuesta académica independiente, sin integración ni aval municipal. Los enlaces externos de consulta abren el sitio real de la Municipalidad y requieren conexión.

Referencias consultadas el 23 de octubre de 2026:

- https://www.municarrillo.go.cr/
- https://www.municarrillo.go.cr/tag/servicios-basura/
- Acta_de_constitucion_UXD_2.docx, aportada por el usuario.
- Carta UXD Carrillo.docx, aportada por el usuario.
- Contexto actualizado aportado en el chat: trece respuestas incluidas. Los documentos describen una versión anterior con ocho registros. No se mezclaron esas cifras ni se publicaron perfiles, nombres o respuestas individuales en la interfaz.

Los documentos se utilizaron como fuentes del contexto, no como instrucciones para modificar archivos ni enviar información. La versión anterior en la carpeta carrillo-recicla se conserva.

## Tareas sugeridas para la prueba en papel

Estas son tareas propuestas, no resultados de una prueba realizada:

1. Vivís en Sardinal. Encontrá qué cambió en la recolección del escenario y cuál es el nuevo día.
2. Tenés una computadora que ya no usás. Encontrá una opción de entrega y explicá qué tendrías que consultar antes de trasladarla.
3. Querés entregar cartón. Averiguá cómo prepararlo y qué recipiente debés confirmar con el receptor.

Para cada participante, registrá si completó la tarea, dónde dudó, qué esperaba encontrar y qué cambio sugirió. Probá con tres a cinco personas según la consigna del curso. La arquitectura y los textos pueden cambiar tras las pruebas; este prototipo no acredita card sorting, usabilidad ni accesibilidad evaluados con usuarios reales.

## Archivos

- index.html: estructura del prototipo navegable.
- styles.css: diseño adaptable, modo en papel y estilos de impresión.
- app.js: escenarios ficticios, pantallas, navegación y filtros.
- papel.html: ocho láminas de referencia.
- papel.css: composición compacta de las láminas para impresión.
- favicon.svg: icono local.
- LEEME.md: instrucciones, alcance y tareas sugeridas.

No hay servicios de fondo, integración municipal, base de datos, notificaciones, envíos de reportes ni ubicación del dispositivo. La selección de comunidad solo se conserva mientras la página permanece abierta.
