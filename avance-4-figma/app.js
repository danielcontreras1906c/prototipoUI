'use strict';

const byId = id => document.getElementById(id);
const screens = [...document.querySelectorAll('[data-screen]')];
const tabs = [...document.querySelectorAll('[data-screen-link]')];
const steps = [...document.querySelectorAll('[data-report-step]')];
const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
const words = value => normalize(value).split(/\s+/).filter(Boolean);
const localityOptions = [...byId('report-community').options].filter(option => option.value);
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
  return (reportStep === 'edit' || reportStep === 'review')
    && Boolean(byId('report-type').value || byId('report-community').value || description || photo);
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

function selectLocality(value) {
  selectedLocality = value;
  const selection = value || 'Sardinal|Sardinal';
  const [district, locality] = selection.split('|');
  document.querySelectorAll('[data-community-name]').forEach(label => { label.textContent = locality; });
  byId('route-district').textContent = 'Distrito de ' + district;
  byId('reading-route-choice').textContent = 'Filtro por comunidad: ' + locality;
  byId('reading-route-choice').hidden = !value;
  byId('reading-route-reset').hidden = !value;
  const routePrompt = byId('reading-route-button');
  routePrompt.textContent = value ? 'Cambiar comunidad' : 'Filtrar por comunidad';
  byId('route-community').setAttribute('aria-labelledby', readingActive ? 'reading-route-button' : 'route-community-label route-choice');
  const sardinal = selection === 'Sardinal|Sardinal';
  byId('sardinal-pickup').hidden = !sardinal;
  byId('unknown-pickup').hidden = sardinal;
  byId('route-change').hidden = !sardinal;
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
  byId('material-count').textContent = count + (count === 1 ? ' material de referencia' : ' materiales de referencia');
  byId('materials-empty').hidden = count > 0;
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
  byId('center-count').textContent = count + (count === 1 ? ' centro de ejemplo' : ' centros de ejemplo');
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
  byId('notice-count').textContent = count + (count === 1 ? ' aviso de ejemplo' : ' avisos de ejemplo');
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
    const field = byId(id);
    const hints = [id + '-help'];
    if (field.hasAttribute('aria-invalid')) hints.push(id + '-error');
    if (id === 'report-description' && description) hints.push('reading-description-text');
    if (readingActive) field.setAttribute('aria-describedby', hints.join(' '));
    else field.removeAttribute('aria-describedby');
  });
  if (readingActive) byId('sample-photo-button').setAttribute('aria-describedby', 'report-photo-help');
  else byId('sample-photo-button').removeAttribute('aria-describedby');
}

function showReportFieldError(field, invalid) {
  if (invalid) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  byId(field.id + '-error').hidden = !invalid;
  refreshReportFieldHints();
}

function setReportDescription(text) {
  description = text;
  byId('description-text').textContent = text || 'Elegí una descripción de ejemplo';
  byId('reading-description-text').textContent = text;
  byId('reading-description-text').hidden = !text;
  byId('reading-description-action').textContent = text ? 'Cambiar descripción de ejemplo' : 'Ver descripción de ejemplo';
  showReportFieldError(byId('report-description'), false);
}

function resetReport() {
  byId('report-form').reset();
  setReportDescription('');
  updateReportExample();
  byId('report-error').hidden = true;
  reportFieldIds.forEach(id => showReportFieldError(byId(id), false));
  ['type', 'community', 'description', 'photo'].forEach(key => { byId('review-' + key).textContent = ''; });
  setPhoto(false);
}

function validateReport() {
  const fields = [
    [byId('report-type'), Boolean(byId('report-type').value)],
    [byId('report-community'), Boolean(byId('report-community').value)],
    [byId('report-description'), Boolean(description)]
  ];
  fields.forEach(([field, valid]) => showReportFieldError(field, !valid));
  const invalid = fields.find(([, valid]) => !valid);
  byId('report-error').hidden = !invalid;
  if (invalid) invalid[0].focus();
  return !invalid;
}

byId('home-search').addEventListener('submit', event => {
  event.preventDefault();
  const query = normalize(byId('community-query').value);
  const matches = localityOptions.filter(option => normalize(option.textContent).includes(query));
  const exact = matches.filter(option => normalize(option.textContent) === query);
  const selected = exact.length === 1 ? exact[0] : matches.length === 1 ? matches[0] : null;
  byId('home-search-error').hidden = Boolean(query && selected);
  if (!query || !selected) return;
  selectLocality(selected.value);
  navigate('rutas');
});
byId('community-query').addEventListener('input', () => { byId('home-search-error').hidden = true; });
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
  selectLocality('');
  byId('route-community').focus();
});
byId('menu-button').addEventListener('click', event => setMenu(event.currentTarget.getAttribute('aria-expanded') !== 'true'));
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
byId('notice-community').addEventListener('change', filterNotices);
byId('notice-kind').addEventListener('change', filterNotices);
byId('reset-notices').addEventListener('click', () => {
  byId('notice-community').value = '';
  byId('notice-kind').value = '';
  filterNotices();
});
byId('new-report').addEventListener('click', () => showReportStep('edit'));
byId('another-report').addEventListener('click', () => showReportStep('edit'));
byId('edit-report').addEventListener('click', () => showReportStep('edit'));
byId('report-type').addEventListener('change', event => {
  if (event.currentTarget.value) showReportFieldError(event.currentTarget, false);
  if (readingActive && description) setReportDescription('');
  updateReportExample();
});
byId('report-community').addEventListener('change', event => {
  if (event.currentTarget.value) showReportFieldError(event.currentTarget, false);
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
    selectLocality(locality.dataset.locality);
    closeDialog();
    if (activeScreen === 'rutas') byId('route-community').focus({preventScroll:true});
    else navigate('rutas');
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
    openDialog(dialogButton.dataset.open || 'material-' + dialogButton.dataset.openMaterial, dialogButton);
    return;
  }
  const anchor = target.closest('a[href^="#"]');
  if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const id = anchor.hash.slice(1);
  if (!screens.some(screen => screen.id === id)) return;
  event.preventDefault();
  if (anchor.hasAttribute('data-campaign')) {
    byId('notice-community').value = 'Belén|Belén';
    byId('notice-kind').value = 'campana';
    filterNotices();
  }
  if (anchor.hasAttribute('data-material-filter')) {
    const terms = {carton:'cartón', plastico:'plástico', metal:'metal', vidrio:'vidrio'};
    byId('center-query').value = terms[anchor.dataset.materialFilter] || '';
    filterCenters();
  }
  navigate(id);
});
window.addEventListener('hashchange', syncHash);
selectLocality('');
syncHash();
initReadingMode();
