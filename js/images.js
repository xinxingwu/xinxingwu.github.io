window.addEventListener('load', () => {
  const imgs = document.querySelectorAll('.gallery .photo-frame img');
  if (imgs.length >= 4) {
    const h1 = imgs[0].clientHeight;
    const h2 = imgs[1].clientHeight;
    const h4 = imgs[3].clientHeight;
    const targetH = Math.max(h1, h2, h4);

    // apply uniform height to 3rd img
    imgs[2].style.height = `${targetH}px`;
    // width will auto‑cover via CSS object-fit
  }
});
