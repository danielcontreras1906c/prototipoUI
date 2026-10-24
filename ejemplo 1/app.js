'use strict';

// Todos los registros operativos de este archivo son escenarios ficticios.
const paths = {
  truck:'M3 6h11v11H3z M14 10h4l4 4v3h-8 M1 12h2 M9 19a2 2 0 1 0-4 0 2 2 0 0 0 4 0 M20 19a2 2 0 1 0-4 0 2 2 0 0 0 4 0',
  pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0',
  bell:'M18 8a6 6 0 0 0-12 0c0 7-3 8-3 10h18c0-2-3-3-3-10 M9 21h6',
  clock:'M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0 M12 6v6l4 2',
  calendar:'M4 5h16v16H4z M8 2v6 M16 2v6 M4 10h16 M8 14h2 M14 14h2 M8 18h2',
  bag:'M6 7h12l3 15H3L6 7Z M9 7V5a3 3 0 0 1 6 0v2 M8 12h8 M8 16h8',
  bottle:'M9 2h6v4l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3Z M9 6h6 M7 12h10 M7 17h10',
  box:'m12 2 10 5-10 5L2 7l10-5Z M2 7v12l10 4 10-4V7 M12 12v11 M7 4.5l10 5',
  glass:'M9 2h6v5l3 5v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8l3-5Z M9 7h6 M6 15h12',
  can:'M5 5c0-4 14-4 14 0s-14 4-14 0Z M5 5v14c0 4 14 4 14 0V5 M8 12h8 M8 16h8',
  laptop:'M4 3h16v13H4z M4 16l-3 5h22l-3-5 M10 19h4',
  sofa:'M5 12V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v5 M5 12c-4-3-5 3-2 5v3h18v-3c3-2 2-8-2-5v4H5Z M5 20v2 M19 20v2',
  search:'M17 10a7 7 0 1 0-14 0 7 7 0 0 0 14 0 M15 15l7 7',
  arrow:'M5 12h14 M14 7l5 5-5 5',
  info:'M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0 M12 11v6 M12 7v.1',
  check:'m5 12 4 4L19 6',
  leaf:'M20 3C8 2 2 7 5 15c7 8 16 0 15-12Z M3 22 16 9'
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.info}"/></svg>`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const communities = ['Sardinal','Artola','Filadelfia','Belén','Palmira','Corralillos','Paso Tempisque','Los Jocotes','Playas del Coco'];
const schedules = {
  Sardinal:{day:'Lunes',time:'6:00 a. m. a 12:00 m. d.',index:0},
  Artola:{day:'Viernes',time:'6:00 a. m. a 12:00 m. d.',index:4},
  Filadelfia:{day:'Martes',time:'6:00 a. m. a 1:00 p. m.',index:1},
  'Belén':{day:'Miércoles',time:'6:00 a. m. a 12:00 m. d.',index:2},
  Palmira:{day:'Jueves',time:'6:00 a. m. a 12:00 m. d.',index:3},
  Corralillos:{day:'Martes',time:'6:00 a. m. a 1:00 p. m.',index:1},
  'Paso Tempisque':{day:'Miércoles',time:'6:00 a. m. a 12:00 m. d.',index:2},
  'Los Jocotes':{day:'Martes',time:'6:00 a. m. a 1:00 p. m.',index:1},
  'Playas del Coco':{day:'Viernes',time:'6:00 a. m. a 2:00 p. m.',index:4}
};
const materials = [
  {id:'plastico',name:'Plástico',icon:'bottle',group:'Reciclables',short:'Botellas y envases vacíos.',examples:'Botellas y envases aceptados por el receptor.',steps:['Vaciá los envases y retirales los restos.','Si hace falta, enjuagá y dejá secar.','Separá el plástico de los demás materiales.'],container:'Un recipiente limpio y seco. Consultá si las tapas se reciben juntas o separadas.',exclude:'Envases con sustancias peligrosas o materiales que el receptor no acepte.'},
  {id:'carton',name:'Papel y cartón',icon:'box',group:'Reciclables',short:'Hojas y cajas limpias y secas.',examples:'Papel y cajas sin grasa ni restos de comida.',steps:['Separá el papel y el cartón contaminados.','Plegá las cajas para ocupar menos espacio.','Guardá los materiales bajo techo para que se mantengan secos.'],container:'Una caja o recipiente seco. Confirmá si el receptor pide que se entreguen atados.',exclude:'Papel sanitario, papel mojado y cartón con grasa.'},
  {id:'vidrio',name:'Vidrio',icon:'glass',group:'Reciclables',short:'Botellas y frascos, según recepción.',examples:'Envases de vidrio que acepte el punto de entrega.',steps:['Vaciá y limpiá los envases.','Separá el vidrio de otros materiales.','Protegé los envases de golpes y confirmá las condiciones de recepción.'],container:'Un recipiente resistente. No coloqués vidrio suelto en bolsas que se puedan romper.',exclude:'Espejos, cerámica, bombillos o vidrio roto sin consultar al receptor.'},
  {id:'metal',name:'Latas y metales',icon:'can',group:'Reciclables',short:'Latas y envases metálicos vacíos.',examples:'Latas de bebidas y envases aceptados por el receptor.',steps:['Vaciá completamente los envases.','Retirá los restos y dejá secar.','Separá las latas y evitá manipular bordes cortantes.'],container:'Un recipiente limpio y resistente, según las condiciones del punto de entrega.',exclude:'Aerosoles o envases con residuos peligrosos sin consultar.'},
  {id:'electronicos',name:'Electrónicos',icon:'laptop',group:'Especiales',short:'Celulares, computadoras y equipos.',examples:'Equipos que reciba una campaña o un gestor autorizado.',steps:['Guardá los equipos en un lugar seco.','Consultá cuáles equipos recibe la campaña o el gestor.','Coordiná la entrega y confirmá si deben entregarse completos.'],container:'No hay un color de bolsa definido en este prototipo. Consultá cómo transportar el equipo.',exclude:'No se confirma recepción en el camión ordinario. No dejés equipos en la vía pública.'},
  {id:'muebles',name:'Muebles',icon:'sofa',group:'Especiales',short:'Sillones, colchones y objetos grandes.',examples:'Únicamente los objetos autorizados en una jornada o por un gestor.',steps:['Consultá si hay una jornada para residuos voluminosos.','Confirmá tamaños, cantidades y condiciones de entrega.','Coordiná el traslado en la fecha y el lugar autorizados.'],container:'No se utiliza una bolsa común. El receptor debe indicar cómo entregar cada objeto.',exclude:'No se confirma recepción en el camión ordinario. No dejés muebles en lotes ni aceras.'}
];
const centers = [
  {id:'sardinal',name:'Punto de ejemplo de Sardinal',community:'Sardinal',type:'Punto de entrega',materials:['plastico','carton','metal'],days:'Lunes a viernes',hours:'8:00 a. m. a 3:00 p. m.',x:36,y:58},
  {id:'filadelfia',name:'Punto de ejemplo de Filadelfia',community:'Filadelfia',type:'Punto de entrega',materials:['plastico','carton','vidrio','metal'],days:'Lunes a viernes',hours:'8:00 a. m. a 2:00 p. m.',x:72,y:35},
  {id:'belen',name:'Jornada de ejemplo en Belén',community:'Belén',type:'Residuos especiales',materials:['electronicos','muebles'],days:'Sábado 31 de octubre de 2026',hours:'8:00 a. m. a 12:00 m. d.',x:63,y:76}
];
const notices = [
  {id:'cambio',kind:'Cambio de recolección',community:'Sardinal',title:'Cambio en la recolección de Sardinal',summary:'En este escenario, la recolección del lunes se traslada al martes. Revisá la nueva fecha antes de sacar tus residuos.',date:'23 de octubre de 2026',icon:'bell'},
  {id:'jornada',kind:'Campaña',community:'Belén',title:'Jornada de residuos especiales en Belén',summary:'Ejemplo de una jornada para entregar electrónicos y muebles. Consultá qué se recibe y cómo preparar la entrega.',date:'22 de octubre de 2026',icon:'laptop'},
  {id:'preparacion',kind:'Orientación',community:'Todas',title:'Antes de llevar tus reciclables',summary:'Revisá las condiciones de recepción y el recipiente solicitado por cada punto de entrega.',date:'21 de octubre de 2026',icon:'bag'}
];
const state = {community:'Sardinal'};
const materialName = id => materials.find(m=>m.id===id)?.name || '';
const options = (values,selected,all='') => `${all?`<option value="">${esc(all)}</option>`:''}${values.map(v=>`<option value="${esc(v)}" ${v===selected?'selected':''}>${esc(v)}</option>`).join('')}`;
const materialOptions = selected => `<option value="">Todos los materiales</option>${materials.map(m=>`<option value="${m.id}" ${m.id===selected?'selected':''}>${m.name}</option>`).join('')}`;
const communityField = (id='community') => `<div class="community-field">${icon('pin')}<div><label for="${id}">Tu comunidad</label><select id="${id}" data-community>${options(communities,state.community)}</select></div></div>`;
const demoNote = (text='Los horarios, avisos y lugares son ficticios. Usalos solo para probar el diseño.') => `<div class="demo-note">${icon('info')}<span><strong>Datos de ejemplo.</strong> ${text}</span></div>`;
const sourceLine = () => `<p class="source-line">Fuente: escenario académico UTN, 23 de octubre de 2026. Información operativa pendiente de verificación municipal.</p>`;
const breadcrumb = (title,parent) => `<div class="container breadcrumb"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span>${parent?`<a href="#${parent.hash}">${parent.text}</a><span aria-hidden="true">/</span>`:''}<span>${title}</span></div>`;
const intro = (title,desc,community=false) => `<div class="page-intro"><div><h1>${title}</h1><p>${desc}</p></div>${community?communityField():''}</div>`;
const materialChips = ids => `<div class="chips">${ids.map(id=>`<span class="tag neutral">${materialName(id)}</span>`).join('')}</div>`;

function home(){
  const s=schedules[state.community];
  const hasChange=state.community==='Sardinal';
  return `<section class="hero"><div class="container hero-inner"><div><h1>La información de tus residuos, en un solo lugar.</h1><p class="hero-description">Consultá la recolección, encontrá dónde llevar tus residuos y preparalos para su entrega.</p>${communityField('home-community')}<div class="hero-actions"><a class="button" href="#horarios">Consultar mi recolección ${icon('arrow')}</a><a class="button secondary" href="#puntos">Dónde llevar residuos</a></div></div><aside class="collection-ticket" aria-label="Recolección de ejemplo"><div class="ticket-heading"><span>Recolección en ${esc(state.community)}</span>${icon('truck')}</div><div class="ticket-body"><span class="tag ${hasChange?'amber':''}">${hasChange?'Cambio de día · Ejemplo':'Horario ilustrativo'}</span><strong class="day" style="margin-top:13px">${hasChange?'Martes':s.day}</strong><p>${hasChange?'27 de octubre · Reprogramación de ejemplo':'Día semanal del escenario de prueba'}</p><div class="ticket-time">${icon('clock')}<span>${s.time}</span></div><p style="margin-top:10px;margin-bottom:0">Residuos ordinarios</p></div><div class="ticket-bottom"><span>Confirmá el horario en el servicio real.</span><span class="tag neutral">Ejemplo</span></div></aside></div></section>
  <div class="container">${hasChange?`<aside class="notice-strip">${icon('bell')}<p><strong>Hay un cambio de recolección en Sardinal</strong>En el ejemplo, el recorrido del lunes pasa al martes 27 de octubre.</p><a class="text-link" href="#aviso/cambio">Ver aviso ${icon('arrow')}</a></aside>`:`<aside class="notice-strip">${icon('info')}<p><strong>Consultá los avisos antes de sacar tus residuos</strong>Este prototipo solo muestra escenarios de prueba, sin información vigente.</p><a class="text-link" href="#avisos">Ver avisos ${icon('arrow')}</a></aside>`}
  <section class="section"><div class="section-heading"><div><h2>¿Qué necesitás hacer?</h2><p>Elegí una opción para empezar.</p></div></div><div class="action-grid">
  <a class="action-card" href="#horarios"><span class="action-icon">${icon('truck')}</span><h3>Consultar la recolección</h3><p>Días, horarios y sector de cobertura de tu comunidad.</p><span class="text-link">Ver días y horarios ${icon('arrow')}</span></a>
  <a class="action-card" href="#puntos"><span class="action-icon">${icon('pin')}</span><h3>Encontrar dónde entregarlos</h3><p>Lugares para reciclables, electrónicos y muebles.</p><span class="text-link">Buscar un lugar ${icon('arrow')}</span></a>
  <a class="action-card" href="#guia"><span class="action-icon">${icon('bag')}</span><h3>Preparar los materiales</h3><p>Qué separar y qué bolsa o recipiente consultar.</p><span class="text-link">Consultar la guía ${icon('arrow')}</span></a>
  </div></section></div>
  <section class="guide-band"><div class="container section"><div class="section-heading"><div><h2>Cada residuo tiene su lugar</h2><p>Conocé cómo prepararlo y dónde buscar una opción de entrega.</p></div><a class="text-link" href="#guia">Ver toda la guía ${icon('arrow')}</a></div><div class="material-row">${materials.map(m=>`<a class="material-tile" href="#material/${m.id}">${icon(m.icon)}<span>${m.name}</span></a>`).join('')}</div><div class="home-bottom">${icon('info')}<span>¿Tenés electrónicos o muebles? Revisá las opciones de <a href="#puntos?material=electronicos"><u>residuos especiales</u></a> antes de trasladarlos.</span></div></div></section>`;
}
function schedule(){
  const s=schedules[state.community],changed=state.community==='Sardinal';
  return `${breadcrumb('Recolección')}<section class="container page">${intro('Tu recolección, más clara','Consultá días, horarios y cambios para tu comunidad.',true)}${demoNote()}<div class="schedule-layout"><div>${changed?`<aside class="notice-strip" style="margin:0 0 20px">${icon('bell')}<p><strong>Cambio en el próximo recorrido</strong>Lunes 26 pasa a martes 27 de octubre, en este ejemplo.</p><a class="text-link" href="#aviso/cambio">Ver aviso ${icon('arrow')}</a></aside>`:''}<div class="panel"><h2 class="panel-title">${icon('calendar')} Horarios de ejemplo · ${esc(state.community)}</h2><div class="service-row"><span class="action-icon">${icon('truck')}</span><div><h3>Basura ordinaria</h3><p class="days">${changed?'Martes 27 de octubre':s.day}</p><p>${s.time}</p><p>Horario habitual del escenario: ${s.day.toLowerCase()}.</p><div class="week" aria-label="Semana de ejemplo, día de recolección marcado">${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map((d,i)=>`<span class="${i===(changed?1:s.index)?'selected':''}">${d}<i aria-hidden="true">${i===(changed?1:s.index)?'●':'—'}</i>${i===(changed?1:s.index)?'<span class="sr-day">Recolección</span>':''}</span>`).join('')}</div></div><span class="tag ${changed?'amber':'neutral'}">${changed?'Reprogramado':'Ejemplo'}</span></div><div class="service-row"><span class="action-icon">${icon('leaf')}</span><div><h3>Reciclables</h3><p>No hay una ruta selectiva confirmada en este prototipo.</p><a class="text-link" href="#puntos">Buscar puntos de entrega ${icon('arrow')}</a></div></div></div>${sourceLine()}</div><aside><div class="soft-panel"><h2>Antes de sacar tus residuos</h2><ul class="tip-list"><li>Revisá si hay un aviso que cambie el recorrido.</li><li>Confirmá el horario y el sector de tu comunidad.</li><li>Consultá qué residuos recibe el servicio y cómo entregarlos.</li></ul><a class="button secondary" href="#guia">Cómo prepararlos ${icon('arrow')}</a></div><div class="panel" style="margin-top:20px"><div class="panel-body"><h3 style="font-size:18px">Sector de cobertura</h3><p class="small muted">${esc(state.community)} centro, en el escenario ficticio. El detalle de calles y rutas está pendiente de verificación.</p></div></div></aside></div></section>`;
}
function centerFilters(params=new URLSearchParams()){
  return `<form class="filters" id="center-filters" role="search" aria-label="Buscar lugares de entrega"><div class="field"><label for="point-search">Buscar por nombre o material</label><div class="search-input">${icon('search')}<input id="point-search" type="search" placeholder="Por ejemplo: cartón" value="${esc(params.get('q')||'')}"></div></div><div class="field"><label for="point-material">¿Qué vas a entregar?</label><select id="point-material">${materialOptions(params.get('material'))}</select></div><div class="field"><label for="point-community">Comunidad del lugar</label><select id="point-community">${options(communities,params.get('comunidad'),'Todas las comunidades')}</select></div><button type="button" class="text-button filter-reset" data-reset-points>Limpiar filtros</button></form>`;
}
function centerCard(c){return `<article class="place-card"><div class="card-top"><span class="tag">${c.type} · Ejemplo</span>${icon('pin')}</div><h2>${c.name}</h2><p>${c.community} · ${c.days}<br>${c.hours}</p>${materialChips(c.materials)}<a class="text-link" href="#punto/${c.id}">Ver ubicación y condiciones ${icon('arrow')}</a></article>`;}
function mapView(list=centers){
  return `<aside class="map-shell" aria-label="Esquema ilustrativo de puntos ficticios"><div class="map-head"><strong>Ubicación de los ejemplos</strong><span class="tag neutral">Esquema</span></div><div class="map"><div class="map-water"></div><div class="map-road"></div><div class="map-road second"></div><span class="map-label">Sin escala ni ubicación real</span>${list.map(c=>`<a class="map-pin" href="#punto/${c.id}" style="left:${c.x}%;top:${c.y}%" aria-label="Ver ${c.name}"><b>${icon('pin')}</b><span>${c.community}</span></a>`).join('')}</div><div class="map-caption">Los marcadores son ficticios. Este esquema no sirve para llegar a un lugar real. Elegí un punto para ver su ficha.</div></aside>`;
}
function points(params=new URLSearchParams()){
  return `${breadcrumb('Dónde llevar residuos')}<section class="container page">${intro('Encontrá dónde llevar tus residuos','Buscá por material y revisá las condiciones antes de ir.')}${demoNote('Los puntos y sus condiciones son inventados para probar la navegación; no representan servicios confirmados.')}${centerFilters(params)}<div class="results-meta" id="point-count" role="status" aria-live="polite">3 lugares de ejemplo</div><div class="centers-layout"><div id="point-results">${centers.map(centerCard).join('')}</div><div id="point-map">${mapView()}</div></div>${sourceLine()}</section>`;
}
function pointDetail(id){
  const c=centers.find(c=>c.id===id);if(!c)return notFound();
  return `${breadcrumb('Detalle del lugar',{hash:'puntos',text:'Dónde llevar residuos'})}<section class="container page"><div class="detail-heading"><span class="action-icon">${icon('pin')}</span><div><span class="tag">${c.type} · Ficticio</span><h1>${c.name}</h1><p>${c.community}, Carrillo · Ficha de ejemplo</p></div></div>${demoNote('Este lugar no ha sido confirmado. No hay una dirección ni un teléfono reales asociados a esta ficha.')}<div class="detail-layout"><div class="detail-main"><section class="detail-section"><h2>Información para la entrega</h2><dl class="info-list"><div><dt>Días de recepción de ejemplo</dt><dd>${c.days}</dd></div><div><dt>Horario de ejemplo</dt><dd>${c.hours}</dd></div><div><dt>Dirección</dt><dd>Pendiente de verificación municipal.</dd></div><div><dt>Contacto</dt><dd>Pendiente de confirmar con el receptor.</dd></div></dl></section><section class="detail-section"><h2>Materiales aceptados en el escenario</h2>${materialChips(c.materials)}</section><section class="detail-section"><h2>Condiciones de entrega de ejemplo</h2><ul class="conditions"><li>${icon('check')}<span>Separá los materiales por tipo.</span></li><li>${icon('check')}<span>${c.id==='belen'?'Consultá qué equipos y tamaños de muebles se reciben.':'Entregá los envases vacíos y el papel y cartón secos.'}</span></li><li>${icon('check')}<span>Confirmá el recipiente, la cantidad y el horario con el receptor.</span></li><li>${icon('check')}<span>No dejés materiales fuera del lugar ni fuera del horario autorizado.</span></li></ul></section><a class="text-link" href="#puntos">${icon('arrow')} Volver a los lugares de entrega</a>${sourceLine()}</div><aside><div class="soft-panel">${icon('bag')}<h2>Prepará tu entrega</h2><p>Revisá qué consultar sobre bolsas, recipientes y preparación de cada material.</p><a class="button" href="#material/${c.materials[0]}">Ver cómo prepararlo ${icon('arrow')}</a></div><div class="panel" style="margin-top:20px"><div class="panel-body"><h3 style="font-size:18px">Antes de trasladarte</h3><p class="small muted">Verificá que exista un punto autorizado y que reciba tu residuo. La ficha ilustra dónde aparecerían los datos confirmados.</p><a class="text-link" href="https://www.municarrillo.go.cr/" target="_blank" rel="noopener noreferrer">Consultar sitio municipal ↗</a></div></div></aside></div></section>`;
}
function guideCard(m){return `<article class="guide-card">${icon(m.icon)}<h2>${m.name}</h2><p>${m.short}</p><span class="tag ${m.group==='Especiales'?'amber':'neutral'}">${m.group==='Especiales'?'Residuo especial':'Reciclable'}</span><br><a class="text-link" href="#material/${m.id}">Cómo prepararlo ${icon('arrow')}</a></article>`;}
function guide(){
  return `${breadcrumb('Cómo prepararlos')}<section class="container page">${intro('Prepará tus residuos para entregarlos','Orientación sobre materiales, bolsas y recipientes.')}${demoNote('La guía es orientativa. Los materiales aceptados y recipientes deben confirmarse con el receptor.')}<div class="field guide-search"><label for="guide-search">¿Qué material tenés?</label><div class="search-input">${icon('search')}<input id="guide-search" type="search" placeholder="Buscá plástico, electrónicos, muebles…"></div></div><div class="filter-chips" aria-label="Filtrar materiales"><button data-group="Todos" aria-pressed="true">Todos</button><button data-group="Reciclables" aria-pressed="false">Reciclables</button><button data-group="Especiales" aria-pressed="false">Residuos especiales</button></div><div class="guide-grid" id="guide-results">${materials.map(guideCard).join('')}</div><p class="small muted" id="guide-count" role="status" aria-live="polite" style="margin-top:14px">6 materiales</p><aside class="guide-callout"><div><h2>¿Qué bolsa o recipiente uso?</h2><p>No hay un color de bolsa municipal confirmado. Consultá la ficha de cada material y al receptor.</p></div><a class="button secondary" href="#puntos">Buscar dónde entregarlo ${icon('arrow')}</a></aside></section>`;
}
function materialDetail(id){
  const m=materials.find(m=>m.id===id);if(!m)return notFound();
  return `${breadcrumb(m.name,{hash:'guia',text:'Cómo prepararlos'})}<section class="container page"><div class="detail-heading"><span class="action-icon">${icon(m.icon)}</span><div><span class="tag ${m.group==='Especiales'?'amber':''}">${m.group==='Especiales'?'Residuo especial':'Material reciclable'}</span><h1>${m.name}</h1><p>${m.short}</p></div></div>${demoNote('Esta orientación no confirma la recepción del material ni sustituye las condiciones del servicio local.')}<div class="detail-layout"><div class="detail-main"><section class="detail-section"><h2>Cómo prepararlo</h2><ol class="steps">${m.steps.map(s=>`<li><span>${s}</span></li>`).join('')}</ol></section><section class="detail-section"><h2>Bolsa o recipiente</h2><p>${m.container}</p><p>No hay un color de bolsa municipal verificado para este prototipo.</p></section><section class="detail-section"><h2>Qué consultar antes de entregar</h2><p>${m.examples}</p><p><strong>Tomá en cuenta:</strong> ${m.exclude}</p></section><a class="text-link" href="#guia">Volver a la guía ${icon('arrow')}</a>${sourceLine()}</div><aside><div class="soft-panel">${icon('pin')}<h2>¿Dónde puedo entregarlo?</h2><p>Buscá lugares de ejemplo que reciban ${m.name.toLowerCase()} y revisá sus condiciones.</p><a class="button" href="#puntos?material=${m.id}">Ver lugares de entrega ${icon('arrow')}</a></div></aside></div></section>`;
}
function noticeCard(n){return `<article class="notice-card"><span class="action-icon">${icon(n.icon)}</span><div><span class="tag ${n.id==='cambio'?'amber':'neutral'}">${n.kind} · Ejemplo</span><h2>${n.title}</h2><p>${n.summary}</p><p class="notice-meta">${n.community==='Todas'?'Todas las comunidades':n.community} · Publicación ficticia: ${n.date}</p></div><a class="text-link" href="#aviso/${n.id}">Leer aviso ${icon('arrow')}</a></article>`;}
function noticePage(){
  return `${breadcrumb('Avisos')}<section class="container page">${intro('Enterate de los cambios a tiempo','Cambios en recolección, campañas y orientación para tu comunidad.')}${demoNote('Estos avisos son inventados y no tienen vigencia operativa.')}<form id="notice-filters" class="filters" style="grid-template-columns:1fr 1fr auto"><div class="field"><label for="notice-community">Comunidad</label><select id="notice-community">${options(communities,'','Todas las comunidades')}</select></div><div class="field"><label for="notice-kind">Tipo de aviso</label><select id="notice-kind">${options(['Cambio de recolección','Campaña','Orientación'],'','Todos los avisos')}</select></div><button type="button" class="text-button filter-reset" data-reset-notices>Limpiar filtros</button></form><p class="results-meta" id="notice-count" role="status" aria-live="polite">3 avisos de ejemplo</p><div class="notice-list" id="notice-results">${notices.map(noticeCard).join('')}</div>${sourceLine()}</section>`;
}
function noticeDetail(id){
  const n=notices.find(n=>n.id===id);if(!n)return notFound();
  let content='';
  if(id==='cambio')content=`<p class="lead">La recolección de basura ordinaria de Sardinal cambia de día en este escenario de prueba.</p><div class="change-comparison"><div><span>Día habitual del ejemplo</span><strong>Lunes 26</strong><p>Octubre de 2026</p></div><div><span>Nuevo día del ejemplo</span><strong>Martes 27</strong><p>6:00 a. m. a 12:00 m. d.</p></div></div><h2>¿Qué tengo que hacer?</h2><ul class="tip-list"><li>En la tarea de prueba, esperá hasta el nuevo día indicado.</li><li>Mantené los residuos en tu propiedad hasta la entrega.</li><li>En el servicio real, confirmá el aviso municipal antes de actuar.</li></ul><a class="button" href="#horarios">Consultar la recolección ${icon('arrow')}</a>`;
  else if(id==='jornada')content=`<p class="lead">Una jornada ficticia para explorar la entrega de electrónicos y muebles en Belén.</p><div class="change-comparison"><div><span>Fecha de ejemplo</span><strong>Sábado 31</strong><p>Octubre de 2026</p></div><div><span>Horario de ejemplo</span><strong>8:00 a. m.</strong><p>Hasta las 12:00 m. d.</p></div></div><h2>Consultá antes de ir</h2><p>La ficha de la jornada muestra los materiales y las condiciones del escenario. Su dirección y contacto reales están pendientes de verificar.</p><a class="button" href="#punto/belen">Ver ficha de la jornada ${icon('arrow')}</a>`;
  else content=`<p class="lead">Consultá cómo preparar cada material y qué recipiente debés confirmar antes de llevarlo.</p><h2>Preparación y recepción</h2><p>Los requisitos pueden variar entre receptores. Revisá el material, el estado en que debe entregarse y las condiciones del lugar.</p><a class="button" href="#guia">Consultar la guía ${icon('arrow')}</a>`;
  return `${breadcrumb('Detalle del aviso',{hash:'avisos',text:'Avisos'})}<article class="container page"><div class="notice-content"><span class="tag ${id==='cambio'?'amber':''}">${n.kind} · Ficticio</span><h1>${n.title}</h1><p class="small muted">${n.community==='Todas'?'Todas las comunidades':n.community} · Publicación de ejemplo: ${n.date}</p>${demoNote('Aviso sin validez oficial. Las fechas y los cambios solo forman parte de una tarea de prueba.')}${content}${sourceLine()}<a class="text-link" href="#avisos">Volver a todos los avisos ${icon('arrow')}</a></div></article>`;
}
function notFound(){return `${breadcrumb('Pantalla no encontrada')}<section class="container page">${intro('No encontramos esta pantalla','Usá la navegación para continuar con el prototipo.')}<a class="button" href="#inicio">Volver al inicio</a></section>`;}
function empty(title,desc,reset){return `<div class="empty"><h2>${title}</h2><p>${desc}</p>${reset||''}</div>`;}

function filterPoints(){
  const q=document.querySelector('#point-search').value;
  const material=document.querySelector('#point-material').value;
  const community=document.querySelector('#point-community').value;
  const found=centers.filter(c=>(!material||c.materials.includes(material))&&(!community||c.community===community)&&normalize([c.name,c.community,...c.materials.map(materialName)].join(' ')).includes(normalize(q)));
  document.querySelector('#point-count').textContent=`${found.length} ${found.length===1?'lugar de ejemplo':'lugares de ejemplo'}`;
  document.querySelector('#point-results').innerHTML=found.length?found.map(centerCard).join(''):empty('No hay lugares para esta búsqueda','Probá otra comunidad o quitá un filtro. El directorio solo contiene tres lugares ficticios.','<button class="text-button" type="button" data-reset-points>Limpiar filtros</button>');
  document.querySelector('#point-map').innerHTML=mapView(found);
}
function filterGuide(){
  const q=normalize(document.querySelector('#guide-search').value),group=document.querySelector('[data-group][aria-pressed="true"]').dataset.group;
  const found=materials.filter(m=>(group==='Todos'||m.group===group)&&normalize(m.name+' '+m.short+' '+m.group).includes(q));
  document.querySelector('#guide-results').innerHTML=found.length?found.map(guideCard).join(''):empty('No encontramos ese material','Probá con otro nombre o elegí la opción Todos.');
  document.querySelector('#guide-count').textContent=`${found.length} ${found.length===1?'material':'materiales'}`;
}
function filterNotices(){
  const community=document.querySelector('#notice-community').value,kind=document.querySelector('#notice-kind').value;
  const found=notices.filter(n=>(!community||n.community==='Todas'||n.community===community)&&(!kind||n.kind===kind));
  document.querySelector('#notice-results').innerHTML=found.length?found.map(noticeCard).join(''):empty('No hay avisos de ejemplo con estos filtros','Probá otro tipo de aviso o seleccioná todas las comunidades.','<button class="text-button" type="button" data-reset-notices>Limpiar filtros</button>');
  document.querySelector('#notice-count').textContent=`${found.length} ${found.length===1?'aviso de ejemplo':'avisos de ejemplo'}`;
}
function render(focus=false){
  const [route,query='']=(location.hash.slice(1)||'inicio').split('?'),[page,id]=route.split('/');
  const params=new URLSearchParams(query);
  const pages={inicio:()=>home(),horarios:()=>schedule(),puntos:()=>points(params),punto:()=>pointDetail(id),guia:()=>guide(),material:()=>materialDetail(id),avisos:()=>noticePage(),aviso:()=>noticeDetail(id)};
  const main=document.querySelector('#contenido');
  main.innerHTML=pages[page]?pages[page]():notFound();
  const active={punto:'puntos',material:'guia',aviso:'avisos'}[page]||page;
  document.querySelectorAll('[data-nav]').forEach(a=>a.dataset.nav===active?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  document.querySelector('#main-nav').classList.remove('open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded','false');
  document.querySelectorAll('[data-community]').forEach(select=>select.addEventListener('change',()=>{state.community=select.value;render();document.querySelector('[data-community]')?.focus();}));
  if(page==='puntos'){
    filterPoints();
    document.querySelector('#point-search').addEventListener('input',filterPoints);
    ['point-material','point-community'].forEach(el=>document.getElementById(el).addEventListener('change',filterPoints));
    document.querySelector('#center-filters').addEventListener('submit',e=>{e.preventDefault();filterPoints();});
  }
  if(page==='guia')document.querySelector('#guide-search').addEventListener('input',filterGuide);
  if(page==='avisos'){
    ['notice-community','notice-kind'].forEach(el=>document.getElementById(el).addEventListener('change',filterNotices));
    document.querySelector('#notice-filters').addEventListener('submit',e=>{e.preventDefault();filterNotices();});
  }
  document.title=`${{inicio:'Inicio',horarios:'Recolección',puntos:'Dónde llevar residuos',punto:'Detalle del lugar',guia:'Cómo prepararlos',material:materialName(id)||'Material',avisos:'Avisos',aviso:'Detalle del aviso'}[page]||'Prototipo'} | Carrillo · Prototipo`;
  if(focus){window.scrollTo(0,0);main.focus({preventScroll:true});}
}
function renderPaper(){
  state.community='Sardinal';
  const sheets=[
    {title:'Inicio',active:'inicio',html:home(),note:'Desde Inicio se puede elegir comunidad, consultar el aviso o entrar en cualquiera de las tres tareas principales.'},
    {title:'Recolección por comunidad',active:'horarios',html:schedule(),note:'Recorrido: Inicio → Recolección. El selector cambia el contexto; el aviso lleva a la lámina 8.'},
    {title:'Lugares de entrega',active:'puntos',html:points(new URLSearchParams('material=electronicos')),note:'Recorrido: Inicio → Dónde llevar residuos. Para la tarea de electrónicos, mostrar la jornada de Belén y pasar a la lámina 4.'},
    {title:'Ficha del lugar de entrega',active:'puntos',html:pointDetail('belen'),note:'Recorrido: lista de lugares → ficha. La persona debe encontrar recepción, horario y condiciones; dirección y contacto siguen pendientes de verificar.'},
    {title:'Guía de preparación',active:'guia',html:guide(),note:'Recorrido: Inicio → Cómo prepararlos. Seleccionar un material abre su preparación, como en la lámina 6.'},
    {title:'Preparación de un material',active:'guia',html:materialDetail('electronicos'),note:'Recorrido: guía → Electrónicos → Ver lugares de entrega. El último botón lleva a la lámina 3 con el filtro aplicado.'},
    {title:'Lista de avisos',active:'avisos',html:noticePage(),note:'Recorrido: Inicio → Avisos. Aplicar comunidad o tipo; leer el cambio de Sardinal abre la lámina 8.'},
    {title:'Detalle de un cambio de recolección',active:'avisos',html:noticeDetail('cambio'),note:'Recorrido: aviso destacado o lista → detalle. La persona debe identificar el nuevo día y volver a la recolección en la lámina 2.'}
  ];
  document.querySelector('#paper-sheets').innerHTML=sheets.map((s,i)=>`<section class="paper-sheet"><div class="sheet-label"><strong>${i+1}. ${s.title}</strong><span>Prototipo académico UTN · Datos ficticios</span></div><div class="sheet-header"><a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">♻</span><span><strong>Carrillo</strong><small>Residuos y reciclaje</small></span></a><div class="sheet-nav">${[['inicio','Inicio'],['horarios','Recolección'],['puntos','Dónde llevar residuos'],['guia','Cómo prepararlos'],['avisos','Avisos']].map(([key,label])=>`<a href="index.html#${key}" ${key===s.active?'aria-current="page"':''}>${label}</a>`).join('')}</div></div><div class="sheet-content">${s.html.replace(/id="([^"]+)"/g,(_,id)=>`id="sheet${i+1}-${id}"`).replace(/for="([^"]+)"/g,(_,id)=>`for="sheet${i+1}-${id}"`)}</div><p class="sheet-note">${s.note} Las acciones se representan moviendo láminas; esta hoja no es un servicio real.</p></section>`).join('');
  // Las láminas muestran el estado filtrado, sin activar controles de la aplicación.
  const pointSheet=document.querySelectorAll('.paper-sheet')[2];
  pointSheet.querySelector('[id$="point-count"]').textContent='1 lugar de ejemplo';
  pointSheet.querySelector('[id$="point-results"]').innerHTML=centerCard(centers[2]);
  pointSheet.querySelector('[id$="point-map"]').innerHTML=mapView([centers[2]]);
  document.querySelectorAll('.sheet-content a[href^="#"]').forEach(a=>a.setAttribute('href','index.html'+a.getAttribute('href')));
  document.querySelector('#print-sheets').addEventListener('click',()=>window.print());
}

if(document.body.dataset.paperDocument==='true')renderPaper();
else{
  document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();document.querySelector('#contenido').focus();document.querySelector('#contenido').scrollIntoView();});
  document.addEventListener('click',e=>{
    const group=e.target.closest('[data-group]');
    if(group){document.querySelectorAll('[data-group]').forEach(b=>b.setAttribute('aria-pressed',String(b===group)));filterGuide();}
    if(e.target.closest('[data-reset-points]')){document.querySelector('#point-search').value='';document.querySelector('#point-material').value='';document.querySelector('#point-community').value='';filterPoints();}
    if(e.target.closest('[data-reset-notices]')){document.querySelector('#notice-community').value='';document.querySelector('#notice-kind').value='';filterNotices();}
  });
  document.querySelector('#paper-mode').addEventListener('change',e=>document.body.classList.toggle('wireframe',e.target.checked));
  document.querySelector('#menu-toggle').addEventListener('click',e=>{const expanded=e.currentTarget.getAttribute('aria-expanded')==='true';e.currentTarget.setAttribute('aria-expanded',String(!expanded));document.querySelector('#main-nav').classList.toggle('open',!expanded);});
  const dialog=document.querySelector('#about-dialog');
  document.querySelector('#about-button').addEventListener('click',()=>dialog.showModal());
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  window.addEventListener('hashchange',()=>render(true));
  render();
}
