'use strict';

const byId = id => document.getElementById(id);
const screens = [...document.querySelectorAll('[data-screen]')];
const tabs = [...document.querySelectorAll('[data-screen-link]')];
const steps = [...document.querySelectorAll('[data-report-step]')];
const normalize = value => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
const words = value => normalize(value).split(/\s+/).filter(Boolean);
const localityOptions = [...byId('report-community').options].filter(option => option.value);
let activeScreen = '';
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
  const [district, locality] = value.split('|');
  document.querySelectorAll('[data-community-name]').forEach(label => { label.textContent = locality; });
  byId('route-district').textContent = 'Distrito de ' + district;
  const sardinal = value === 'Sardinal|Sardinal';
  byId('sardinal-pickup').hidden = !sardinal;
  byId('unknown-pickup').hidden = sardinal;
  byId('route-change').hidden = !sardinal;
  document.querySelectorAll('[data-locality]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.locality === value));
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
  byId('sample-photo-button').textContent = photo ? 'Cambiar foto de ejemplo' : 'Elegir archivo de ejemplo';
}

function resetReport() {
  byId('report-form').reset();
  description = '';
  byId('description-text').textContent = 'Elegí una descripción de ejemplo';
  byId('report-error').hidden = true;
  byId('report-form').querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
  ['type', 'community', 'description', 'photo'].forEach(key => { byId('review-' + key).textContent = ''; });
  setPhoto(false);
}

function validateReport() {
  const fields = [
    [byId('report-type'), Boolean(byId('report-type').value)],
    [byId('report-community'), Boolean(byId('report-community').value)],
    [byId('report-description'), Boolean(description)]
  ];
  fields.forEach(([field, valid]) => {
    if (valid) field.removeAttribute('aria-invalid');
    else field.setAttribute('aria-invalid', 'true');
  });
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
byId('use-description').addEventListener('click', () => {
  description = byId('sample-description-text').textContent;
  byId('description-text').textContent = description;
  byId('report-description').removeAttribute('aria-invalid');
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
selectLocality('Sardinal|Sardinal');
syncHash();
