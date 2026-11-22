'use strict';

const byId = id => document.getElementById(id);
const screens = [...document.querySelectorAll('[data-screen]')];
const tabs = [...document.querySelectorAll('[data-screen-link]')];
const steps = [...document.querySelectorAll('[data-report-step]')];
const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
const words = value => normalize(value).split(/\s+/).filter(Boolean);
const localityStorageKey = 'carrillo-comunidad';
const localityName = value => {
  const [district, locality] = value.split('|');
  return district === locality ? locality : locality + ' · ' + district;
};
const isKnownLocality = value => [...document.querySelectorAll('#district-directory [data-locality]')]
  .some(button => button.dataset.locality === value);
let pickerTarget = 'rutas';
let activeScreen = '';
let selectedLocality = '';
let reportStep = 'introduction';
let description = '';
let photo = false;
let pendingDestination = '';
let dialogTrigger = null;

function closeDialog() {
  document.querySelector('dialog[open]')?.close();
}

function openDialog(id, trigger = document.activeElement) {
  if (!document.querySelector('dialog[open]')) dialogTrigger = trigger;
  closeDialog();
  byId(id).showModal();
}

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]') && dialogTrigger?.getClientRects().length) {
      dialogTrigger.focus({preventScroll:true});
    }
  });
});

function setMenu(open) {
  byId('menu-button').setAttribute('aria-expanded', String(open));
  byId('service-tabs').classList.toggle('is-open', open);
  if (mobilePreview) byId('menu-label').textContent = open ? 'Cerrar' : 'Menú';
}

function showScreen(id, focus = true) {
  const index = screens.findIndex(screen => screen.id === id);
  activeScreen = id;
  closeDialog();
  setMenu(false);
  screens.forEach(screen => { screen.hidden = screen.id !== id; });
  activateCarrilloMap(screens[index]);
  tabs.forEach(tab => {
    if (tab.dataset.screenLink === id) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  const prev = byId('previous-view');
  const next = byId('next-view');
  prev.hidden = index === 0;
  next.hidden = index === screens.length - 1;
  if (!prev.hidden) prev.href = '#' + screens[index - 1].id;
  if (!next.hidden) next.href = '#' + screens[index + 1].id;
  document.title = tabs[index].textContent.trim() + ' · Avance 4 · Carrillo';
  if (focus) {
    const heading = screens[index].querySelector('h1:not([data-report-step] h1)')
      || screens[index].querySelector('[data-report-step]:not([hidden]) h1');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
    window.scrollTo(0, 0);
  }
}

function isDraft() {
  const community = byId('report-community').value;
  return (reportStep === 'edit' || reportStep === 'review')
    && Boolean(byId('report-type').value || (community && community !== selectedLocality) || description || photo);
}

function rememberLocality(value) {
  try {
    if (value) localStorage.setItem(localityStorageKey, value);
    else localStorage.removeItem(localityStorageKey);
  } catch { /* El recordatorio es opcional. */ }
}

function storedLocality() {
  try {
    const value = localStorage.getItem(localityStorageKey) || '';
    return isKnownLocality(value) ? value : '';
  } catch {
    return '';
  }
}

function setNoticeCommunity(value) {
  byId('notice-community').value = value;
  byId('notice-community-choice').textContent = value ? localityName(value) : 'Todas las comunidades';
  filterNotices();
}

function setReportCommunity(value) {
  byId('report-community').value = value;
  byId('report-community-choice').textContent = value ? localityName(value) : 'Seleccioná tu comunidad';
  if (value) showReportFieldError('report-community', false);
}

// Una sola lista de comunidades sirve a Inicio, Rutas, Avisos y Reportes.
function pickerValue(target) {
  if (target === 'notice') return byId('notice-community').value;
  if (target === 'report') return byId('report-community').value;
  return readingActive ? selectedLocality : selectedLocality || 'Sardinal|Sardinal';
}

function openCommunityPicker(target) {
  pickerTarget = target;
  const current = pickerValue(target);
  byId('district-directory').querySelectorAll('[data-locality]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.locality === current));
  });
}

function chooseLocality(value, target) {
  closeDialog();
  if (target === 'notice') {
    setNoticeCommunity(value);
    byId('notice-community-button').focus({preventScroll:true});
    return;
  }
  if (target === 'report') {
    setReportCommunity(value);
    byId('report-community-button').focus({preventScroll:true});
    return;
  }
  selectLocality(value);
  rememberLocality(value);
  if (activeScreen === 'rutas') byId('route-community').focus({preventScroll:true});
  else navigate('rutas');
}

function navigate(id) {
  if (activeScreen === 'reportes' && id !== 'reportes') {
    if (isDraft()) {
      pendingDestination = id;
      openDialog('discard-report');
      return;
    }
    resetReport();
    showReportStep('introduction', false);
  }
  if (location.hash !== '#' + id) location.hash = id;
  else if (activeScreen !== id) showScreen(id);
}

function syncHash() {
  const hash = location.hash.slice(1);
  const target = screens.some(screen => screen.id === hash) ? hash : 'inicio';
  if (target === activeScreen) return;
  if (activeScreen === 'reportes' && isDraft()) {
    history.replaceState(null, '', '#reportes');
    pendingDestination = target;
    openDialog('discard-report');
    return;
  }
  if (activeScreen === 'reportes') {
    resetReport();
    showReportStep('introduction', false);
  }
  showScreen(target, Boolean(activeScreen));
}

// Horarios de ejemplo por distrito. Las localidades sin ruta asignada muestran el estado pendiente.
const sampleSchedules = {
  Sardinal: {date: '2026-10-27', day: '27', weekday: 'Martes', long: 'Martes 27 de octubre de 2026', hours: '6:00 a. m. a 12:00 m. d.', hoursLong: 'De 6:00 de la mañana a 12:00 del mediodía'},
  Filadelfia: {date: '2026-10-28', day: '28', weekday: 'Miércoles', long: 'Miércoles 28 de octubre de 2026', hours: '6:00 a. m. a 12:00 m. d.', hoursLong: 'De 6:00 de la mañana a 12:00 del mediodía'},
  Palmira: {date: '2026-10-29', day: '29', weekday: 'Jueves', long: 'Jueves 29 de octubre de 2026', hours: '7:00 a. m. a 1:00 p. m.', hoursLong: 'De 7:00 de la mañana a 1:00 de la tarde'},
  Belén: {date: '2026-10-30', day: '30', weekday: 'Viernes', long: 'Viernes 30 de octubre de 2026', hours: '6:00 a. m. a 12:00 m. d.', hoursLong: 'De 6:00 de la mañana a 12:00 del mediodía'},
};
const pendingLocalities = new Set(['Filadelfia|Ballena (parte)']);

function showSchedule(selection) {
  const [district] = selection.split('|');
  const schedule = pendingLocalities.has(selection) ? null : sampleSchedules[district];
  byId('sardinal-pickup').hidden = !schedule;
  byId('unknown-pickup').hidden = Boolean(schedule);
  if (!schedule) return;
  byId('pickup-tile').dateTime = schedule.date;
  byId('pickup-day').textContent = schedule.day;
  byId('pickup-summary').textContent = schedule.weekday + ' · ' + schedule.hours;
  byId('pickup-date').dateTime = schedule.date;
  byId('pickup-date').textContent = schedule.long;
  byId('pickup-hours').textContent = schedule.hoursLong;
}

function selectLocality(value) {
  selectedLocality = value;
  const selection = value || 'Sardinal|Sardinal';
  const [district, locality] = selection.split('|');
  document.querySelectorAll('[data-community-name]').forEach(label => { label.textContent = locality; });
  byId('home-community-choice').textContent = value ? localityName(value) : 'Elegí tu comunidad';
  byId('route-district').textContent = 'Distrito de ' + district;
  byId('reading-route-choice').textContent = 'Filtro por comunidad: ' + locality;
  byId('reading-route-choice').hidden = !value;
  byId('reading-route-reset').hidden = !value;
  const routePrompt = byId('reading-route-button');
  routePrompt.textContent = value ? 'Cambiar comunidad' : 'Filtrar por comunidad';
  byId('route-community').setAttribute('aria-labelledby', readingActive ? 'reading-route-button' : 'route-community-label route-choice');
  showSchedule(selection);
  byId('route-change').hidden = selection !== 'Sardinal|Sardinal';
  document.querySelectorAll('[data-locality]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.locality === (readingActive ? value : selection)));
  });
}

function filterMaterials() {
  const query = words(byId('material-query').value);
  let count = 0;
  document.querySelectorAll('[data-material-card]').forEach(card => {
    card.hidden = !query.every(word => normalize(card.dataset.name).includes(word));
    if (!card.hidden) count++;
  });
  byId('material-count').textContent = count + (count === 1 ? ' material' : ' materiales');
  // Sin resultados, el aviso aparece junto al buscador y la guía general se oculta.
  byId('materials-empty').hidden = count > 0;
  byId('materials-empty-query').textContent = byId('material-query').value.trim();
  document.querySelector('#reciclaje .sorting-guide').hidden = count === 0;
}

function filterCenters() {
  const query = words(byId('center-query').value).filter(word => word !== 'y');
  let count = 0;
  document.querySelectorAll('[data-center]').forEach(card => {
    const searchable = normalize(card.textContent + ' ' + card.dataset.materials);
    const visible = query.every(word => searchable.includes(word));
    card.hidden = !visible;
    document.querySelectorAll('[data-map-center="' + card.dataset.center + '"]').forEach(pin => {
      pin.hidden = !visible;
    });
    if (visible) count++;
  });
  const campaign = query.some(word => /belen|electronico|mueble/.test(word));
  byId('campaign-callout').hidden = query.length > 0 && !campaign;
  byId('center-count').textContent = count + (count === 1 ? ' centro' : ' centros');
  byId('centers-empty').hidden = count > 0 || campaign;
}

function filterNotices() {
  const parts = byId('notice-community').value.split('|');
  const selected = parts[1] || '';
  const kind = byId('notice-kind').value;
  let count = 0;
  document.querySelectorAll('[data-notice]').forEach(card => {
    card.hidden = Boolean((selected && selected !== card.dataset.community) || (kind && kind !== card.dataset.kind));
    if (!card.hidden) count++;
  });
  byId('notice-count').textContent = count + (count === 1 ? ' aviso' : ' avisos');
  byId('notices-empty').hidden = count > 0;
}

function showReportStep(step, focus = true) {
  reportStep = step;
  steps.forEach(panel => { panel.hidden = panel.id !== 'report-' + step; });
  const heading = byId('report-' + step).querySelector('h1');
  heading.id ||= 'report-heading-' + step;
  byId('reportes').setAttribute('aria-labelledby', heading.id);
  if (focus) {
    heading.focus({preventScroll:true});
    window.scrollTo(0, 0);
  }
}

function setPhoto(value) {
  photo = value;
  byId('report-photo-label').textContent = photo ? 'foto-ejemplo.jpg' : 'Sin foto adjunta';
  byId('remove-photo').hidden = !photo;
  byId('sample-photo-button').textContent = photo
    ? 'Cambiar foto de ejemplo'
    : readingActive ? 'Agregar foto de ejemplo' : 'Elegir archivo de ejemplo';
}

const reportFieldIds = ['report-type', 'report-community', 'report-description'];
// La comunidad guarda su valor en un campo oculto; el botón que abre la lista es el control visible.
const reportControl = id => byId(id === 'report-community' ? 'report-community-button' : id);
const readingReportExamples = {
  'El camión no pasó': 'El martes por la mañana dejé la basura en el lugar de recolección, pero el camión no pasó.',
  'Duda sobre un residuo': 'Tengo botellas de vidrio vacías. Quisiera saber dónde puedo llevarlas y cómo prepararlas.',
  'Información de un punto de entrega': 'Quisiera saber en qué horario reciben cartón y plástico cerca de mi comunidad.',
  'Otra consulta': 'Quisiera saber con quién comunicarme para hacer una consulta sobre la recolección.',
};

function updateReportExample() {
  const type = byId('report-type').value;
  const normalExample = 'No pasó el camión en el horario del escenario de ejemplo.';
  const readingExample = readingReportExamples[type] || 'Quiero hacer una consulta sobre la recolección en mi comunidad.';
  byId('sample-description-text').textContent = readingActive ? readingExample : normalExample;
}

function refreshReportFieldHints() {
  reportFieldIds.forEach(id => {
    const field = reportControl(id);
    const hints = readingActive ? [id + '-help'] : [];
    if (field.hasAttribute('aria-invalid')) hints.push(id + '-error');
    if (readingActive && id === 'report-description' && description) hints.push('reading-description-text');
    if (hints.length) field.setAttribute('aria-describedby', hints.join(' '));
    else field.removeAttribute('aria-describedby');
  });
  if (readingActive) byId('sample-photo-button').setAttribute('aria-describedby', 'report-photo-help');
  else byId('sample-photo-button').removeAttribute('aria-describedby');
}

function showReportFieldError(id, invalid) {
  const field = reportControl(id);
  if (invalid) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  byId(id + '-error').hidden = !invalid;
  // El resumen desaparece en cuanto todos los campos quedan completos.
  if (!invalid && reportFieldIds.every(other => !reportControl(other).hasAttribute('aria-invalid'))) {
    byId('report-error').hidden = true;
  }
  refreshReportFieldHints();
}

function setReportDescription(text) {
  description = text;
  byId('description-text').textContent = text || 'Elegí una descripción de ejemplo';
  byId('reading-description-text').textContent = text;
  byId('reading-description-text').hidden = !text;
  byId('reading-description-action').textContent = text ? 'Cambiar descripción de ejemplo' : 'Ver descripción de ejemplo';
  if (text) showReportFieldError('report-description', false);
}

function resetReport() {
  byId('report-form').reset();
  setReportCommunity('');
  setReportDescription('');
  updateReportExample();
  byId('report-error').hidden = true;
  reportFieldIds.forEach(id => showReportFieldError(id, false));
  ['type', 'community', 'description', 'photo'].forEach(key => { byId('review-' + key).textContent = ''; });
  setPhoto(false);
}

function validateReport() {
  const fields = [
    ['report-type', Boolean(byId('report-type').value)],
    ['report-community', Boolean(byId('report-community').value)],
    ['report-description', Boolean(description)]
  ];
  fields.forEach(([id, valid]) => showReportFieldError(id, !valid));
  const invalid = fields.find(([, valid]) => !valid);
  byId('report-error').hidden = !invalid;
  if (invalid) reportControl(invalid[0]).focus();
  return !invalid;
}

const directory = byId('district-directory');
const communityQuery = byId('directory-query');
const communityGroups = [...directory.querySelectorAll('.directory-grid details')];

function filterDirectory() {
  const query = words(communityQuery.value);
  let count = 0;
  communityGroups.forEach(group => {
    let matches = 0;
    group.querySelectorAll('[data-locality]').forEach(button => {
      const name = normalize(button.textContent);
      const visible = query.every(term => name.includes(term));
      button.closest('li').hidden = !visible;
      if (visible) matches++;
    });
    group.hidden = matches === 0;
    group.open = !readingActive || (query.length > 0 && matches > 0);
    count += matches;
  });
  byId('directory-empty').hidden = count > 0;
  byId('directory-reset').hidden = !query.length;
  const resultLabel = count === 1 ? ' comunidad encontrada' : ' comunidades encontradas';
  byId('directory-status').textContent = query.length ? count + resultLabel : '';
}

communityQuery.addEventListener('input', filterDirectory);
byId('directory-reset').addEventListener('click', () => {
  communityQuery.value = '';
  filterDirectory();
  communityQuery.focus();
});
function resetDirectory() {
  communityQuery.value = '';
  filterDirectory();
}
directory.addEventListener('close', resetDirectory);
byId('reading-route-reset').addEventListener('click', () => {
  rememberLocality('');
  selectLocality('');
  byId('route-community').focus();
});
byId('menu-button').addEventListener('click', event => setMenu(event.currentTarget.getAttribute('aria-expanded') !== 'true'));
if (mobilePreview) {
  const menuButton = byId('menu-button');
  const header = menuButton.closest('header');
  const menu = byId('service-tabs');
  const mobileWidth = window.matchMedia('(max-width: 720px)');
  const menuIsOpen = () => menu.classList.contains('is-open');

  mobileWidth.addEventListener('change', () => setMenu(false));
  document.addEventListener('pointerdown', event => {
    if (menuIsOpen() && !header.contains(event.target)) {
      if (menu.contains(document.activeElement)) menuButton.focus({preventScroll: true});
      setMenu(false);
    }
  });
  document.addEventListener('focusin', event => {
    if (menuIsOpen() && !header.contains(event.target) && !event.target.closest('dialog')) setMenu(false);
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !menuIsOpen()) return;
    setMenu(false);
    menuButton.focus({preventScroll: true});
  });
  menu.addEventListener('click', event => {
    if (menuIsOpen() && event.target.closest('[aria-current="page"]')) {
      setMenu(false);
      menuButton.focus({preventScroll: true});
    }
  });
}
byId('material-query').addEventListener('input', filterMaterials);
byId('reset-materials').addEventListener('click', () => {
  byId('material-query').value = '';
  filterMaterials();
  byId('material-query').focus();
});
byId('center-query').addEventListener('input', filterCenters);
byId('center-search').addEventListener('submit', event => event.preventDefault());
byId('center-search').addEventListener('reset', () => requestAnimationFrame(filterCenters));
byId('reset-centers').addEventListener('click', () => {
  byId('center-query').value = '';
  filterCenters();
  byId('center-query').focus();
});
byId('notice-kind').addEventListener('change', filterNotices);
byId('reset-notices').addEventListener('click', () => {
  byId('notice-kind').value = '';
  setNoticeCommunity('');
});
// Al empezar un reporte, la comunidad que la persona ya eligió aparece completada.
function startReport() {
  if (!byId('report-community').value && selectedLocality) setReportCommunity(selectedLocality);
  showReportStep('edit');
}
byId('new-report').addEventListener('click', startReport);
byId('another-report').addEventListener('click', startReport);
byId('edit-report').addEventListener('click', () => showReportStep('edit'));
byId('report-type').addEventListener('change', event => {
  if (event.currentTarget.value) showReportFieldError('report-type', false);
  if (readingActive && description) setReportDescription('');
  updateReportExample();
});
byId('use-description').addEventListener('click', () => {
  setReportDescription(byId('sample-description-text').textContent);
  closeDialog();
});
byId('use-photo').addEventListener('click', () => { setPhoto(true); closeDialog(); });
byId('remove-photo').addEventListener('click', () => {
  setPhoto(false);
  byId('sample-photo-button').focus();
});
byId('report-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!validateReport()) return;
  byId('review-type').textContent = byId('report-type').value;
  const [district, locality] = byId('report-community').value.split('|');
  byId('review-community').textContent = district === locality ? locality : locality + ' · Distrito de ' + district;
  byId('review-description').textContent = description;
  byId('review-photo').textContent = byId('report-photo-label').textContent;
  showReportStep('review');
});
byId('finish-report').addEventListener('click', () => {
  const sequence = String(Math.floor(Math.random() * 9000) + 1000);
  byId('success-reference').textContent = 'CAR-2026-' + sequence;
  byId('success-detail').textContent = photo
    ? 'Los datos y la foto se quedaron en este navegador. La Municipalidad no recibió ningún reporte.'
    : 'Los datos se quedaron en este navegador. La Municipalidad no recibió ningún reporte.';
  resetReport();
  showReportStep('success');
});
byId('confirm-discard').addEventListener('click', () => {
  closeDialog();
  resetReport();
  showReportStep('introduction');
  if (pendingDestination) navigate(pendingDestination);
  pendingDestination = '';
});

document.addEventListener('click', event => {
  const target = event.target;
  const locality = target.closest('[data-locality]');
  if (locality) {
    const fromList = locality.closest('#district-directory');
    chooseLocality(locality.dataset.locality, fromList ? pickerTarget : 'rutas');
    return;
  }
  if (target.closest('[data-recenter]')) {
    recenterCarrilloMap(target.closest('.map-panel'));
    return;
  }
  if (target.closest('[data-cancel-report]')) {
    pendingDestination = '';
    if (isDraft()) openDialog('discard-report');
    else showReportStep('introduction');
    return;
  }
  if (target.closest('[data-close]')) closeDialog();
  const dialogButton = target.closest('[data-open], [data-open-material]');
  if (dialogButton) {
    event.preventDefault();
    if (dialogButton.dataset.open === 'district-directory') {
      openCommunityPicker(dialogButton.dataset.picker || 'rutas');
    }
    openDialog(dialogButton.dataset.open || 'material-' + dialogButton.dataset.openMaterial, dialogButton);
    return;
  }
  const anchor = target.closest('a[href^="#"]');
  if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const id = anchor.hash.slice(1);
  if (!screens.some(screen => screen.id === id)) return;
  event.preventDefault();
  if (anchor.hasAttribute('data-campaign')) {
    byId('notice-kind').value = 'campana';
    setNoticeCommunity('Belén|Belén');
  }
  if (anchor.hasAttribute('data-material-filter')) {
    const terms = {carton:'cartón', plastico:'plástico', metal:'metal', vidrio:'vidrio'};
    byId('center-query').value = terms[anchor.dataset.materialFilter] || '';
    filterCenters();
  }
  navigate(id);
});
window.addEventListener('hashchange', syncHash);
selectLocality(storedLocality());
syncHash();
initReadingMode();
