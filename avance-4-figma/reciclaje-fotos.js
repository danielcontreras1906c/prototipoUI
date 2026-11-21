'use strict';

const recycling = document.querySelector('#reciclaje');
const search = recycling.querySelector('#material-query');
const count = recycling.querySelector('#material-count');
const emptyState = recycling.querySelector('#materials-empty');
const rows = [...recycling.querySelectorAll('[data-material-card]')];

function filterMaterials() {
  const query = search.value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
  const terms = query ? query.split(/\s+/) : [];
  let visible = 0;

  rows.forEach(row => {
    row.hidden = !terms.every(term => row.dataset.name.includes(term));
    if (!row.hidden) visible++;
  });

  count.textContent = visible + (visible === 1 ? ' material de referencia' : ' materiales de referencia');
  emptyState.hidden = visible > 0;
}

search.addEventListener('input', filterMaterials);
recycling.querySelector('#reset-materials').addEventListener('click', () => {
  search.value = '';
  filterMaterials();
  search.focus();
});

recycling.addEventListener('click', event => {
  const trigger = event.target.closest('[data-open]');
  if (trigger) document.getElementById(trigger.dataset.open).showModal();
});

document.querySelectorAll('dialog [data-close]').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog').close());
});

filterMaterials();
