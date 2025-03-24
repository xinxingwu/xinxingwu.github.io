const pupils = document.querySelectorAll('.animatorpupil');

document.addEventListener('mousemove', (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const dx = (e.clientX - centerX) / 100;
  const dy = (e.clientY - centerY) / 100;

  pupils.forEach(pupil => {
    pupil.style.setProperty('--dx', `${dx}px`);
    pupil.style.setProperty('--dy', `${dy}px`);
  });
});
