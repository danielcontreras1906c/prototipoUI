'use strict';

// Todo el contenido está en index.html. Este archivo solo cambia el estado
// de los controles y de elementos que ya existen en el documento.
const views = Array.from(document.querySelectorAll('[data-view]'));
const validViews = new Set(views.map(view => view.id));
const communitySelectors = document.querySelectorAll('select[data-community]');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
let community = 'Sardinal';
let materialGroup = 'todos';
let dialogTrigger = null;

function showView(focus = false) {
  if (focus) closeDialogs();
  const requested = location.hash.slice(1) || 'inicio';
  const selected = validViews.has(requested) ? requested : 'inicio';
  views.forEach(view => { view.hidden = view.id !== selected; });
  document.querySelectorAll('[data-section-link]').forEach(link => {
    if (link.dataset.sectionLink === selected) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const current = document.getElementById('breadcrumb-current');
  current.hidden = selected === 'inicio';
  current.textContent = selected === 'inicio' ? '' : '/ ' + document.querySelector('[data-section-link="' + selected + '"]').textContent;
  document.getElementById('municipal-nav').classList.remove('open');
  document.getElementById('menu-button').setAttribute('aria-expanded', 'false');
  document.querySelectorAll('.nav-dropdown').forEach(menu => { menu.open = false; });
  document.title = 'Servicios de basura – ' + document.querySelector('[data-section-link="' + selected + '"]').textContent + ' · Ejemplo 3';
  if (focus) {
    document.getElementById('contenido').focus({preventScroll:true});
    window.scrollTo(0, 0);
  }
}

function updateCommunity(value) {
  community = value;
  communitySelectors.forEach(select => { select.value = community; });
  document.querySelectorAll('[data-community-name]').forEach(label => { label.textContent = community; });
  document.querySelectorAll('[data-schedule-community]').forEach(row => { row.hidden = row.dataset.scheduleCommunity !== community; });
  document.getElementById('schedule-change').hidden = community !== 'Sardinal';
  const row = Array.from(document.querySelectorAll('[data-schedule-community]')).find(item => item.dataset.scheduleCommunity === community);
  if (row) {
    document.getElementById('home-collection-day').textContent = row.cells[0].firstChild.textContent.trim();
    document.getElementById('home-collection-time').textContent = row.cells[1].textContent.trim();
  }
  document.getElementById('home-change').hidden = community !== 'Sardinal';

}

function filterPoints() {
  const query = normalize(document.getElementById('point-query').value);
  const material = document.getElementById('point-material').value;
  const placeCommunity = document.getElementById('point-community').value;
  let count = 0;
  document.querySelectorAll('[data-point]').forEach(card => {
    const matches = normalize(card.textContent).includes(query) && (!material || card.dataset.materials.split(' ').includes(material)) && (!placeCommunity || card.dataset.community === placeCommunity);
    card.hidden = !matches;
    if (matches) count += 1;
  });
  document.getElementById('point-count').textContent = count + (count === 1 ? ' lugar de ejemplo' : ' lugares de ejemplo');
  document.getElementById('points-empty').hidden = count !== 0;
}

function filterGuide() {
  const query = normalize(document.getElementById('guide-query').value);
  let count = 0;
  document.querySelectorAll('[data-material]').forEach(item => {
    const matches = normalize(item.textContent).includes(query) && (materialGroup === 'todos' || item.dataset.group === materialGroup);
    item.hidden = !matches;
    if (matches) count += 1;
  });
  document.getElementById('guide-count').textContent = count + (count === 1 ? ' material' : ' materiales');
  document.getElementById('guide-empty').hidden = count !== 0;
}

function setMaterialGroup(group) {
  materialGroup = group;
  document.querySelectorAll('button[data-group]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.group === group)); });
  filterGuide();
}

function filterNotices() {
  const selectedCommunity = document.getElementById('notice-community').value;
  const type = document.getElementById('notice-type').value;
  let count = 0;
  document.querySelectorAll('[data-notice]').forEach(article => {
    const matches = (!selectedCommunity || article.dataset.community === selectedCommunity || article.dataset.community === 'Todas') && (!type || article.dataset.type === type);
    article.hidden = !matches;
    if (matches) count += 1;
  });
  document.getElementById('notice-count').textContent = count + (count === 1 ? ' aviso de ejemplo' : ' avisos de ejemplo');
  document.getElementById('notices-empty').hidden = count !== 0;
}

function closeDialogs() {
  document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
}

function openDialog(id, trigger) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return;
  closeDialogs();
  dialogTrigger = trigger;
  dialog.showModal();
}

communitySelectors.forEach(select => select.addEventListener('change', () => updateCommunity(select.value)));
document.getElementById('home-form').addEventListener('submit', event => { event.preventDefault(); location.hash = 'horarios'; });
document.getElementById('point-query').addEventListener('input', filterPoints);
document.getElementById('guide-query').addEventListener('input', filterGuide);
['point-material', 'point-community'].forEach(id => document.getElementById(id).addEventListener('change', filterPoints));
['notice-community', 'notice-type'].forEach(id => document.getElementById(id).addEventListener('change', filterNotices));
document.getElementById('points-form').addEventListener('submit', event => { event.preventDefault(); filterPoints(); });
document.getElementById('notices-form').addEventListener('submit', event => { event.preventDefault(); filterNotices(); });
document.getElementById('points-form').addEventListener('reset', () => requestAnimationFrame(filterPoints));
document.getElementById('notices-form').addEventListener('reset', () => requestAnimationFrame(filterNotices));
document.getElementById('clear-points').addEventListener('click', () => document.getElementById('points-form').reset());
document.querySelectorAll('button[data-group]').forEach(button => button.addEventListener('click', () => setMaterialGroup(button.dataset.group)));
document.getElementById('menu-button').addEventListener('click', event => {
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  document.getElementById('municipal-nav').classList.toggle('open', !expanded);
});
document.querySelectorAll('.nav-dropdown').forEach(menu => menu.addEventListener('toggle', () => {
  if (menu.open) document.querySelectorAll('.nav-dropdown').forEach(other => { if (other !== menu) other.open = false; });
}));
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.getElementById('contenido').focus();
  document.getElementById('contenido').scrollIntoView();
});

document.addEventListener('click', event => {
  const openButton = event.target.closest('[data-open]');
  if (openButton) openDialog(openButton.dataset.open, openButton);
  const closeButton = event.target.closest('[data-close]');
  if (closeButton) {
    closeDialogs();
    if (closeButton.tagName === 'BUTTON' && dialogTrigger?.isConnected) dialogTrigger.focus();
  }
  const materialLink = event.target.closest('[data-material-link]');
  if (materialLink) {
    document.getElementById('points-form').reset();
    document.getElementById('point-material').value = materialLink.dataset.materialLink;
    filterPoints();
  }
  const guideLink = event.target.closest('[data-guide-link]');
  if (guideLink) {
    document.getElementById('guide-query').value = '';
    setMaterialGroup('todos');
    document.getElementById(guideLink.dataset.guideLink).open = true;
  }
  if (!event.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown').forEach(menu => { menu.open = false; });
});
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}));
document.getElementById('paper-view').addEventListener('change', event => document.body.classList.toggle('paper-view', event.target.checked));
document.getElementById('print-view').addEventListener('click', () => window.print());

document.getElementById('section-search-form').addEventListener('submit', event => {
  event.preventDefault();
  const raw = document.getElementById('section-query').value;
  const query = normalize(raw);
  if (query === '') return;
  if (['horario', 'ruta', 'camion', 'recoleccion', 'basura'].some(term => query.includes(term))) {
    closeDialogs(); location.hash = 'horarios';
  } else if (['donde', 'centro', 'acopio', 'punto', 'lugar', 'entrega'].some(term => query.includes(term))) {
    document.getElementById('points-form').reset(); closeDialogs(); location.hash = 'puntos';
  } else if (['aviso', 'cambio', 'campana'].some(term => query.includes(term))) {
    closeDialogs(); location.hash = 'avisos';
  } else if (['reporte', 'consulta'].some(term => query.includes(term))) {
    closeDialogs(); location.hash = 'reportes';
  } else if (Array.from(document.querySelectorAll('[data-material]')).some(item => normalize(item.textContent).includes(query))) {
    document.getElementById('guide-query').value = raw; setMaterialGroup('todos'); closeDialogs(); location.hash = 'preparacion';
  } else document.getElementById('search-options').hidden = false;
});

window.addEventListener('hashchange', () => showView(true));
updateCommunity(community);
showView();
