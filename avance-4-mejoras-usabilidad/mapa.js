'use strict';

const carrilloMaps = new WeakMap();

function activateCarrilloMap(screen) {
  const panel = screen.querySelector('.map-panel');
  if (!panel) return;

  const existing = carrilloMaps.get(panel);
  if (existing) {
    if (!existing.canvas.hidden) existing.map.invalidateSize({pan: false});
    return;
  }

  const status = panel.querySelector('[data-map-status]');
  if (!window.L || location.protocol === 'file:') {
    status.textContent = 'Mapa local de Carrillo. Abrí el prototipo desde su enlace web para explorar otros lugares.';
    return;
  }

  const canvas = panel.querySelector('[data-live-map]');
  const local = panel.querySelector('[data-local-map]');
  const retry = panel.querySelector('[data-map-retry]');
  canvas.hidden = false;
  local.hidden = true;

  const map = L.map(canvas, {
    minZoom: 2,
    maxZoom: 19,
    scrollWheelZoom: false,
    worldCopyJump: true,
    zoomControl: false,
  });
  L.control.zoom({zoomInTitle: 'Acercar mapa', zoomOutTitle: 'Alejar mapa'}).addTo(map);
  map.attributionControl.setPrefix(false);

  // Coordenadas de las cabeceras distritales, La Gaceta n.º 100, 26/05/2009.
  // Los centros del escenario usan la cabecera como referencia, sin dirección real.
  const bounds = L.latLngBounds([]);
  local.querySelectorAll('[data-latlng]').forEach(button => {
    const coordinates = button.dataset.latlng.split(',').map(Number);
    bounds.extend(coordinates);
    const pin = button.cloneNode(true);
    L.DomEvent.on(pin, 'mousedown touchstart dblclick', L.DomEvent.stopPropagation);
    pin.addEventListener('focus', () => {
      map.panInside(coordinates, {animate: false, paddingTopLeft: [28, 40], paddingBottomRight: [96, 22]});
    });
    L.marker(coordinates, {
      icon: L.divIcon({className: 'carrillo-marker', html: pin, iconSize: [26,31], iconAnchor: [13,29]}),
      keyboard: false,
      interactive: false,
    }).addTo(map);
  });

  function fitCarrillo() {
    map.fitBounds(bounds, {paddingTopLeft: [26, 40], paddingBottomRight: [82, 20], maxZoom: 12, animate: false});
  }

  let loadedTiles = 0;
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    referrerPolicy: 'strict-origin-when-cross-origin',
    keepBuffer: 1,
  });
  tiles.on('loading', () => { loadedTiles = 0; });
  tiles.on('tileload', () => { loadedTiles++; });
  tiles.on('load', () => {
    if (loadedTiles || canvas.hidden) return;
    canvas.hidden = true;
    local.hidden = false;
    retry.hidden = false;
    status.textContent = 'El mapa en línea no está disponible. Podés seguir usando los puntos del mapa local.';
  });

  retry.addEventListener('click', () => {
    local.hidden = true;
    canvas.hidden = false;
    retry.hidden = true;
    status.textContent = '';
    map.invalidateSize({pan: false});
    tiles.redraw();
    canvas.focus({preventScroll: true});
  });

  carrilloMaps.set(panel, {canvas, map, fitCarrillo});
  tiles.addTo(map);
  fitCarrillo();
}

function recenterCarrilloMap(panel) {
  const interactive = carrilloMaps.get(panel);
  if (interactive && !interactive.canvas.hidden) {
    interactive.fitCarrillo();
    interactive.canvas.focus({preventScroll: true});
    return;
  }
  const local = panel.querySelector('[data-local-map]');
  local.scrollTo(0, 0);
  local.focus({preventScroll: true});
}
