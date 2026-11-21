'use strict';

const readingUrl = new URL(location.href);
const mobilePreview = readingUrl.searchParams.get('vista') === 'movil';
const readingParameter = readingUrl.searchParams.get('lectura');
const readingAvailable = mobilePreview || readingParameter === 'normal' || readingParameter === 'ampliada';
let readingActive = readingParameter === 'ampliada';
document.documentElement.toggleAttribute('data-vista-movil', mobilePreview);

function setReadingMode(active) {
  readingActive = active;
  document.documentElement.toggleAttribute('data-lectura-ampliada', active);
  byId('lectura-style').media = active ? 'all' : 'not all';
  byId('reading-toggle').textContent = active ? 'Salir del modo adulto mayor' : 'Activar modo adulto mayor';
  document.querySelectorAll('[data-texto-ampliado]').forEach(element => {
    element.dataset.textoNormal ??= element.textContent;
    element.textContent = active ? element.dataset.textoAmpliado : element.dataset.textoNormal;
  });
  byId('report-description').setAttribute(
    'aria-labelledby',
    active ? 'description-label reading-description-action' : 'description-label description-text',
  );
  document.querySelectorAll('.material-body').forEach(body => {
    const photos = body.querySelector('.material-photos');
    const steps = body.querySelector('ol');
    if (active) steps.after(photos);
    else steps.before(photos);
  });
  const pickup = byId('sardinal-pickup');
  if (active) pickup.after(byId('route-change'));
  else pickup.before(byId('route-change'));
  resetDirectory();
  selectLocality(selectedLocality);
  refreshReportFieldHints();
  setPhoto(photo);
  updateReportExample();
  document.title = tabs.find(tab => tab.dataset.screenLink === activeScreen).textContent.trim() + ' · Avance 4 · Carrillo';
  requestAnimationFrame(() => activateCarrilloMap(byId(activeScreen)));
}

function initReadingMode() {
  if (!readingAvailable) return;
  byId('reading-control').hidden = false;
  byId('reading-toggle').addEventListener('click', () => {
    if (mobilePreview) setMenu(false);
    setReadingMode(!readingActive);
    const current = new URL(location.href);
    current.searchParams.set('lectura', readingActive ? 'ampliada' : 'normal');
    history.replaceState(history.state, '', current);
    byId('reading-status').textContent = readingActive ? 'Modo adulto mayor activado.' : 'Vista habitual activada.';
  });
  setReadingMode(readingActive);
}
