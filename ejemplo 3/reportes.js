"use strict";
let photoUrl = null;
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


window.addEventListener('beforeunload', () => { if (photoUrl) URL.revokeObjectURL(photoUrl); });

document.getElementById('report-description').addEventListener('input', event => event.target.setCustomValidity(''));
