document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Falling Hearts ---------- */
  const heartsContainer = document.querySelector('.hearts');

  function createHeart() {
    if (!heartsContainer) return;

    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '💛';

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 14 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 6 + 6 + 's';
    heart.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');

    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }

  setInterval(createHeart, 350);

  /* ---------- Music ---------- */
  const music = document.getElementById('bg-music');
  const toggleBtn = document.getElementById('music-toggle');
  let started = false;

  function startMusic() {
    if (!music) return;
    music.volume = 0.6;
    music.muted = false;

    music.play().then(() => {
      toggleBtn.textContent = '🔇';
      started = true;
    }).catch(() => {});
  }

  document.addEventListener('click', () => {
    if (!started) startMusic();
  }, { once: true });

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!started) {
      startMusic();
      return;
    }
    music.muted = !music.muted;
    toggleBtn.textContent = music.muted ? '🔊' : '🔇';
  });

  /* ---------- Buttons ---------- */
  const noBtn = document.querySelector('.no');
  const yesBtn = document.querySelector('.yes');
  const revealPhoto = document.getElementById('revealPhoto');
  const response = document.getElementById('response');
  const valentine = document.getElementById('valentine');

  // YES button
  yesBtn.addEventListener('click', () => {
    const yesSound = document.getElementById('yesSound');
    if (yesSound) {
      yesSound.currentTime = 0;
      yesSound.play().catch(() => {});
    }

    valentine.style.display = 'none';
    revealPhoto.classList.remove('hidden');
    response.classList.remove('hidden');

    setTimeout(() => revealPhoto.classList.add('show'), 50);
  });

  // NO button (runs away 😈)
  let intensity = 80;

  noBtn.addEventListener('mouseenter', () => {
    intensity += 40;

    const maxX = Math.min(intensity, 300);
    const maxY = Math.min(intensity / 1.5, 200);

    const x = (Math.random() * maxX * 2) - maxX;
    const y = (Math.random() * maxY * 2) - maxY;

    noBtn.style.transition = 'transform 0.12s ease';
    noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.9)`;
  });

});
