const audio = document.getElementById('audio');
const btn   = document.getElementById('play');

btn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = '⏸️';
    btn.style.animation = 'none';
  } else {
    audio.pause();
    btn.textContent = '🎵';
    btn.style.animation = 'pulse 1s infinite ease-in-out';
  }
});

audio.addEventListener('ended', () => {
  btn.textContent = '🎵';
  btn.style.animation = 'pulse 1s infinite ease-in-out';
});
