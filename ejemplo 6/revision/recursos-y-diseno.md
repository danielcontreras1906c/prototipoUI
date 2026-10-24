# Dirección de diseño del ejemplo 6

Se aplicaron Product Design index, get-context, ideate, image-to-code y design-qa. El usuario pidió una única propuesta a criterio del diseñador; por ello se produjo un solo concepto visual y se eligió como objetivo de implementación.

## Intención
Ayudar a una persona del cantón de Carrillo a encontrar su recolección por comunidad y luego preparar o entregar residuos. Se conserva la identidad de la Municipalidad; no se crea una marca independiente.

## Sistema visual
Fondo blanco #ffffff, superficie verde clara #edf4eb, verde municipal #358b27, verde de texto #163d2c, tinta #203027, gris secundario #626c68 y aviso #fff6e8. Rubik local para títulos y Karla local para cuerpo. Navegación horizontal, portada dividida con consulta a la izquierda y paisaje a la derecha, aviso compacto y materiales separados con divisores. Las seis vistas mantienen esa jerarquía y el mismo lenguaje de controles.

## Concepto visual
revision/concepto-product-design.png, creado con ImageGen integrado a partir de una captura municipal del ejemplo 2 y la fotografía costera del ejemplo 4. Prompt: crear un único diseño de sitio municipal 1440 × 1024, cabecera institucional con escudo, navegación horizontal por las seis vistas, portada con consulta de comunidad a la izquierda sobre fondo verde claro y foto costera a la derecha, aviso de cambio ficticio, cuatro materiales sobre blanco con divisores y panel lateral de centros y reportes. Tipografía Rubik/Karla, verde municipal, sin cuentas, buscador general, estadísticas, ilustraciones decorativas ni tarjetas anidadas. Fecha de contexto: 24 de octubre de 2026. La imagen generada es un objetivo visual, no una imagen plana usada como página.

## Recursos implementados
Foto costera, escudo y logo del pie heredados del proyecto. Se reutiliza la biblioteca de iconos de contorno local del ejemplo 3, con su licencia, y algunos iconos sólidos locales auxiliares. La portada usa object-fit:cover con posición ajustada para mostrar la costa; nunca se dibuja con CSS. No se generaron recursos adicionales porque los originales cubren el concepto.

## Decisiones de contenido
Se corrigieron frases del concepto que sugerían instrucciones de reciclaje no verificadas. No se afirma que retirar tapas o comprimir envases sea una norma municipal. Se indica que el horario es ficticio, la cartografía real es de OpenStreetMap y las líneas/puntos son ejemplos. No hay cuentas, geolocalización, envío ni persistencia de reportes. CSS y JavaScript se usan para diseño e interacción; el contenido de interfaz está en index.html.

Se incorporaron también los iconos file-text, cylinder, house y triangle-alert desde el repositorio oficial https://github.com/lucide-icons/lucide/tree/main/icons para representar papel, metales, inicio y aviso. Se conserva la licencia de contorno local.
