'use strict';

// La interfaz, los textos y las ventanas están en index.html.
// Este archivo controla estados; Leaflet dibuja únicamente la cartografía.
const screens = Array.from(document.querySelectorAll('[data-screen]'));
const validScreens = new Set(screens.map(screen => screen.id));
const communityNames = Array.from(document.querySelector('#route-community').options).map(option => option.value);
const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const schedules = {
  Sardinal: {day:'Martes 27 de octubre', time:'6:00 a. m. a 12:00 m. d.'},
  Artola: {day:'Viernes', time:'6:00 a. m. a 12:00 m. d.'},
  Filadelfia: {day:'Martes', time:'6:00 a. m. a 1:00 p. m.'},
  'Belén': {day:'Miércoles', time:'6:00 a. m. a 12:00 m. d.'},
  Palmira: {day:'Jueves', time:'6:00 a. m. a 12:00 m. d.'},
  Corralillos: {day:'Martes', time:'6:00 a. m. a 1:00 p. m.'},
  'Paso Tempisque': {day:'Miércoles', time:'6:00 a. m. a 12:00 m. d.'},
  'Los Jocotes': {day:'Martes', time:'6:00 a. m. a 1:00 p. m.'},
  'Playas del Coco': {day:'Viernes', time:'6:00 a. m. a 2:00 p. m.'}
};
const centers = [
  {id:'sardinal', position:[10.495,-85.648]},
  {id:'filadelfia', position:[10.446,-85.551]},
  {id:'belen', position:[10.408,-85.596]}
];
const materialTerms = {carton:'papel cartón',plastico:'plástico',metal:'metales latas',vidrio:'vidrio',electronicos:'electrónicos computadoras celulares equipos',muebles:'muebles sillones colchones'};
let community = 'Sardinal';
let selectedCenter = 'sardinal';
let dialogTrigger = null;
let routeMap = null;
let centerMap = null;
let routeLine = null;
let routeReferences = null;
let photoUrl = null;
let centerMarkers = new Map();

function closeDialogs() {
  document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
}

function openDialog(id, trigger) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;
  closeDialogs();
  dialogTrigger = trigger || document.activeElement;
  dialog.showModal();
}

function showScreen(focus = false) {
  const requested = location.hash.slice(1) || 'inicio';
  const selected = validScreens.has(requested) ? requested : 'inicio';
  if (focus) closeDialogs();
  screens.forEach(screen => { screen.hidden = screen.id !== selected; });
  document.querySelectorAll('[data-screen-link]').forEach(link => {
    if (link.dataset.screenLink === selected) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.getElementById('municipal-nav').classList.remove('open');
  document.getElementById('menu-button').setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-dropdown').forEach(menu => { menu.open = false; });
  document.title = 'Servicios de basura · ' + document.querySelector('[data-screen-link="' + selected + '"]').textContent.trim() + ' · Ejemplo 5';
  if (focus) {
    document.getElementById('contenido').focus({preventScroll:true});
    window.scrollTo(0, 0);
  }
  if (selected === 'inicio') initHomeMap();
  if (selected === 'rutas') initRouteMap();
  if (selected === 'centros') initCenterMap();
}

function updateCommunity(value) {
  if (!schedules[value]) return;
  community = value;
  document.getElementById('route-community').value = value;
  document.querySelectorAll('[data-community-name]').forEach(label => { label.textContent = value; });
  document.getElementById('ordinary-day').textContent = schedules[value].day;
  document.getElementById('ordinary-time').textContent = schedules[value].time;
  document.getElementById('route-change').hidden = value !== 'Sardinal';
  document.getElementById('route-caption').textContent = value === 'Sardinal'
    ? 'La línea no representa una ruta municipal confirmada.'
    : value + ': recorrido pendiente de verificar. El mapa conserva una vista general de referencia.';
  if (routeMap) updateRouteDisplay();
  updateHomeSummary(value);
}

function createBaseMap(id, errorId) {
  const error = document.getElementById(errorId);
  if (!window.L || !['http:', 'https:'].includes(location.protocol)) {
    error.hidden = false;
    return null;
  }
  const map = L.map(id, {scrollWheelZoom:false, attributionControl:false});
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {minZoom:8, maxZoom:18, keepBuffer:1});
  tiles.on('tileerror', () => { error.hidden = false; });
  tiles.on('load', () => {
    const hasTiles = Array.from(document.querySelectorAll('#' + id + ' img.leaflet-tile')).some(image => image.complete && image.naturalWidth > 0);
    error.hidden = hasTiles;
  });
  tiles.addTo(map);
  return map;
}

function initRouteMap() {
  if (!routeMap) {
    routeMap = createBaseMap('route-map', 'route-map-error');
    if (!routeMap) return;
    const path = [[10.55,-85.68],[10.52,-85.66],[10.49,-85.64],[10.465,-85.63],[10.45,-85.60]];
    routeLine = L.polyline(path, {color:'#2878c3',weight:4,opacity:.95});
    routeReferences = L.layerGroup([path[0],path[2],path[4]].map(position => L.circleMarker(position, {radius:5,color:'#246fbd',weight:3,fillColor:'#fff',fillOpacity:1})));
    updateRouteDisplay();
  }
  requestAnimationFrame(() => routeMap.invalidateSize(false));
}

function updateRouteDisplay() {
  if (!routeMap) return;
  if (community === 'Sardinal') {
    routeLine.addTo(routeMap);
    routeReferences.addTo(routeMap);
    routeMap.fitBounds(routeLine.getBounds(), {padding:[23,23],maxZoom:11,animate:false});
  } else {
    routeMap.removeLayer(routeLine);
    routeMap.removeLayer(routeReferences);
    routeMap.setView([10.48,-85.62], 10, {animate:false});
  }
}

function markerIcon(active) {
  return L.icon({iconUrl:active?'assets/marker-blue.svg':'assets/marker-green.svg',iconSize:[24,32],iconAnchor:[12,32],tooltipAnchor:[0,-32]});
}

function initCenterMap() {
  if (!centerMap) {
    centerMap = createBaseMap('centers-map','centers-map-error');
    if (!centerMap) return;
    centerMap.setView([10.46,-85.60],10);
    centers.forEach(center => {
      const name = document.querySelector('[data-select-center="' + center.id + '"]').textContent.trim();
      const marker = L.marker(center.position, {icon:markerIcon(center.id === selectedCenter),title:name});
      marker.bindTooltip(name, {direction:'top',opacity:.96});
      marker.on('click', () => selectCenter(center.id, false));
      centerMarkers.set(center.id, marker);
    });
    updateCenterMarkers();
  }
  requestAnimationFrame(() => centerMap.invalidateSize(false));
}

function updateCenterMarkers() {
  if (!centerMap) return;
  centerMarkers.forEach((marker,id) => {
    const visible = !document.querySelector('[data-center="' + id + '"]').hidden;
    marker.setIcon(markerIcon(id === selectedCenter));
    if (visible) marker.addTo(centerMap);
    else centerMap.removeLayer(marker);
  });
}

function selectCenter(id, pan = true) {
  const center = centers.find(item => item.id === id);
  const card = document.querySelector('[data-center="' + id + '"]');
  if (!center || !card || card.hidden) return;
  selectedCenter = id;
  document.querySelectorAll('[data-center]').forEach(row => row.classList.toggle('is-selected',row.dataset.center === id));
  document.querySelectorAll('[data-select-center]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.selectCenter === id)));
  const name = card.querySelector('.center-title').textContent.trim();
  document.getElementById('center-map-caption').textContent = name + '. Posición ilustrativa, sin una dirección real confirmada.';
  if (centerMap) {
    updateCenterMarkers();
    if (pan) centerMap.setView(center.position,11,{animate:false});
    centerMarkers.get(id)?.openTooltip();
  }
}

function filterCenters() {
  const terms = normalize(document.getElementById('center-query').value).split(/\s+/).filter(Boolean);
  const found = [];
  document.querySelectorAll('[data-center]').forEach(card => {
    const text = normalize(card.textContent + ' ' + card.dataset.materials);
    const matches = terms.every(term => text.includes(term));
    card.hidden = !matches;
    if (matches) found.push(card.dataset.center);
  });
  document.getElementById('center-count').textContent = found.length + (found.length === 1?' lugar de ejemplo':' lugares de ejemplo');
  document.getElementById('centers-empty').hidden = found.length !== 0;
  if (found.length) selectCenter(found.includes(selectedCenter)?selectedCenter:found[0],false);
  else {
    selectedCenter = null;
    document.querySelectorAll('[data-center]').forEach(card => card.classList.remove('is-selected'));
    document.querySelectorAll('[data-select-center]').forEach(button => button.setAttribute('aria-pressed','false'));
    document.getElementById('center-map-caption').textContent = 'No hay puntos del escenario que coincidan con la búsqueda.';
  }
  updateCenterMarkers();
}

function filterMaterials() {
  const terms = normalize(document.getElementById('material-query').value).split(/\s+/).filter(Boolean);
  let count = 0;
  document.querySelectorAll('[data-material-card]').forEach(card => {
    const matches = terms.every(term => normalize(card.dataset.name).includes(term));
    card.hidden = !matches;
    if (matches) count += 1;
  });
  document.getElementById('material-count').textContent = count + (count === 1?' material de referencia':' materiales de referencia');
  document.getElementById('materials-empty').hidden = count !== 0;
}

function filterNotices() {
  const selected = document.getElementById('notice-community').value;
  const kind = document.getElementById('notice-kind').value;
  let count = 0;
  document.querySelectorAll('[data-notice]').forEach(article => {
    const matches = (!selected || selected === article.dataset.community) && (!kind || kind === article.dataset.kind);
    article.hidden = !matches;
    if (matches) count += 1;
  });
  document.getElementById('notice-count').textContent = count + (count === 1?' aviso de ejemplo':' avisos de ejemplo');
  document.getElementById('notices-empty').hidden = count !== 0;
}

function clearPhoto() {
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = null;
  const field = document.getElementById('report-photo');
  field.value = '';
  field.setCustomValidity('');
  document.getElementById('photo-preview').hidden = true;
  document.getElementById('photo-error').hidden = true;
  document.getElementById('photo-image').removeAttribute('src');
  document.getElementById('photo-name').textContent = '';
}

function resetReport(focus = false) {
  document.getElementById('report-form').reset();
  document.getElementById('report-description').setCustomValidity('');
  clearPhoto();
  document.getElementById('report-form').hidden = false;
  document.getElementById('report-success').hidden = true;
  ['success-type','success-community','success-description','success-photo'].forEach(id => { document.getElementById(id).textContent = ''; });
  if (focus) document.getElementById('report-type').focus();
}

document.getElementById('route-community').addEventListener('change',event => updateCommunity(event.target.value));
document.getElementById('home-search').addEventListener('submit',event => {
  event.preventDefault();
  const query = normalize(document.getElementById('community-query').value);
  const match = communityNames.find(name => normalize(name) === query) || communityNames.find(name => normalize(name).includes(query));
  document.getElementById('home-search-error').hidden = Boolean(match);
  if (match) { updateCommunity(match); location.hash = 'rutas'; }
});
document.getElementById('center-query').addEventListener('input',filterCenters);
document.getElementById('center-search').addEventListener('submit',event => { event.preventDefault(); filterCenters(); });
document.getElementById('center-search').addEventListener('reset',() => requestAnimationFrame(filterCenters));
document.getElementById('reset-centers').addEventListener('click',() => document.getElementById('center-search').reset());
document.getElementById('material-query').addEventListener('input',filterMaterials);
document.getElementById('reset-materials').addEventListener('click',() => { document.getElementById('material-query').value = ''; filterMaterials(); });
['notice-community','notice-kind'].forEach(id => document.getElementById(id).addEventListener('change',filterNotices));
document.getElementById('reset-notices').addEventListener('click',() => { document.getElementById('notice-community').value=''; document.getElementById('notice-kind').value=''; filterNotices(); });

document.getElementById('report-photo').addEventListener('change',event => {
  const file = event.target.files[0];
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = null;
  document.getElementById('photo-preview').hidden = true;
  event.target.setCustomValidity('');
  const invalid = file && (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024);
  document.getElementById('photo-error').hidden = !invalid;
  if (invalid) {
    event.target.value = '';
    document.getElementById('photo-image').removeAttribute('src');
    document.getElementById('photo-name').textContent = '';
    return;
  }
  if (!file) return;
  photoUrl = URL.createObjectURL(file);
  document.getElementById('photo-image').src = photoUrl;
  document.getElementById('photo-name').textContent = file.name;
  document.getElementById('photo-preview').hidden = false;
});
document.getElementById('remove-photo').addEventListener('click',clearPhoto);
document.getElementById('new-report').addEventListener('click',() => resetReport(true));
document.getElementById('another-report').addEventListener('click',() => resetReport(true));
document.getElementById('report-form').addEventListener('submit',event => {
  event.preventDefault();
  const form = event.currentTarget;
  const description = document.getElementById('report-description');
  description.setCustomValidity(description.value.trim().length < 15 ? 'Escribí al menos 15 caracteres, sin contar espacios al inicio o al final.' : '');
  if (!form.reportValidity()) return;
  document.getElementById('success-type').textContent = document.getElementById('report-type').value;
  document.getElementById('success-community').textContent = document.getElementById('report-community').value;
  document.getElementById('success-description').textContent = document.getElementById('report-description').value.trim();
  document.getElementById('success-photo').textContent = document.getElementById('report-photo').files[0]?.name || 'Sin foto adjunta.';
  form.hidden = true;
  document.getElementById('report-success').hidden = false;
  document.getElementById('report-success-title').focus();
});

document.addEventListener('click',event => {
  const close = event.target.closest('[data-close]');
  if (close) closeDialogs();
  const opener = event.target.closest('[data-open]');
  if (opener) openDialog(opener.dataset.open,opener);
  const material = event.target.closest('[data-open-material]');
  if (material) { event.preventDefault(); openDialog('material-'+material.dataset.openMaterial,material); }
  const materialFilter = event.target.closest('[data-material-filter]');
  if (materialFilter) {
    closeDialogs();
    const key = materialFilter.dataset.materialFilter;
    document.getElementById('center-query').value = key === 'metal'?'metal':(materialTerms[key] || key).split(' ')[0];
    filterCenters();
  }
  const center = event.target.closest('[data-select-center]');
  if (center) selectCenter(center.dataset.selectCenter);
  if (!event.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown').forEach(menu => { menu.open = false; });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('click',event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close',() => {
    if (document.querySelector('dialog[open]')) return;
    if (dialogTrigger?.getClientRects().length) dialogTrigger.focus();
  });
});
document.getElementById('section-search-form').addEventListener('submit',event => {
  event.preventDefault();
  const raw = document.getElementById('section-query').value;
  const query = normalize(raw);
  if (!query) return;
  if (['horario','ruta','camion','recoleccion','basura'].some(term => query.includes(term))) {
    closeDialogs(); location.hash = 'rutas';
  } else if (['centro','acopio','donde','entrega','especial'].some(term => query.includes(term))) {
    document.getElementById('center-query').value = query.includes('especial')?'electronicos':'';
    filterCenters(); closeDialogs(); location.hash = 'centros';
  } else if (['aviso','campana','cambio'].some(term => query.includes(term))) {
    closeDialogs(); location.hash = 'avisos';
  } else if (['reporte','consulta'].some(term => query.includes(term))) {
    closeDialogs(); location.hash = 'reportes';
  } else if (Array.from(document.querySelectorAll('[data-material-card]')).some(card => normalize(card.dataset.name).includes(query))) {
    document.getElementById('material-query').value = raw; filterMaterials(); closeDialogs(); location.hash = 'reciclaje';
  } else document.getElementById('search-options').hidden = false;
});
document.getElementById('menu-button').addEventListener('click',event => {
  const open = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded',String(!open));
  document.getElementById('municipal-nav').classList.toggle('open',!open);
});
document.querySelectorAll('.nav-dropdown').forEach(menu => menu.addEventListener('toggle',() => {
  if (menu.open) document.querySelectorAll('.nav-dropdown').forEach(other => { if (other !== menu) other.open = false; });
}));
document.querySelector('.skip-link').addEventListener('click',event => { event.preventDefault(); document.getElementById('contenido').focus(); document.getElementById('contenido').scrollIntoView(); });
document.getElementById('paper-view').addEventListener('change',event => document.body.classList.toggle('paper-view',event.target.checked));
document.getElementById('print-view').addEventListener('click',() => window.print());

// Resumen de portada: los textos y las fichas ya están en index.html.
let homeMap = null;
let homeRoute = null;
const homeCenters = {
  Sardinal:[10.495,-85.648], Artola:[10.535,-85.679], Filadelfia:[10.446,-85.551],
  'Belén':[10.408,-85.596], Palmira:[10.445,-85.58], Corralillos:[10.42,-85.52],
  'Paso Tempisque':[10.39,-85.51], 'Los Jocotes':[10.45,-85.56], 'Playas del Coco':[10.55,-85.697]
};
function updateHomeSummary(value) {
  document.querySelectorAll('[data-home-select]').forEach(select => { select.value=value; });
  document.querySelectorAll('[data-home-community]').forEach(rows => { rows.hidden=rows.dataset.homeCommunity!==value; });
  if (homeMap) {
    homeMap.setView(homeCenters[value], value==='Sardinal'?12:11, {animate:false});
    if (value==='Sardinal') homeRoute.addTo(homeMap); else homeMap.removeLayer(homeRoute);
  }
}
function initHomeMap() {
  if (!homeMap) {
    homeMap=createBaseMap('home-map','home-map-error');
    if (!homeMap) return;
    const path=[[10.525,-85.66],[10.512,-85.67],[10.5,-85.652],[10.489,-85.649],[10.479,-85.63]];
    homeRoute=L.layerGroup([L.polyline(path,{color:'#3478cb',weight:3}),...path.map(position=>L.circleMarker(position,{color:'#3478cb',radius:4,weight:2,fillColor:'#fff',fillOpacity:1}))]);
    updateHomeSummary(community);
  }
  requestAnimationFrame(()=>homeMap.invalidateSize(false));
}
document.querySelectorAll('[data-home-select]').forEach(select=>select.addEventListener('change',()=>updateCommunity(select.value)));
document.querySelectorAll('[data-quick-material]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-quick-material]').forEach(tab=>tab.setAttribute('aria-pressed',String(tab===button)));
  document.querySelectorAll('[data-quick-panel]').forEach(panel=>{panel.hidden=panel.dataset.quickPanel!==button.dataset.quickMaterial;});
  document.getElementById('quick-more').dataset.openMaterial=button.dataset.quickMaterial;
}));
document.getElementById('report-description').addEventListener('input', event=>event.target.setCustomValidity(''));

window.addEventListener('hashchange',() => showScreen(true));
window.addEventListener('beforeunload',() => { if (photoUrl) URL.revokeObjectURL(photoUrl); });
updateCommunity(community);
showScreen();
