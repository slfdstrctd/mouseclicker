// Params
let img_count;
let del_count = 0;
const mice_max_width = 120;
const mice_max = 104;

let countEl, inputEl, buttonEl, mainEl, miceEl, loadingEl, winMessageEl;

document.addEventListener('DOMContentLoaded', function () {
  countEl = document.getElementById('count');
  inputEl = document.getElementById('input');
  buttonEl = document.getElementById('button');
  mainEl = document.getElementById('main');
  miceEl = document.getElementById('mice');
  loadingEl = document.getElementById('loading');
  winMessageEl = document.getElementById('win-message');

  buttonEl.addEventListener('click', init);

  miceEl.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG' && e.target.closest('#mice')) {
      removeMice(e);
    }
  });

  init();
});

function init() {
  del_count = 0;
  const raw = inputEl.value.trim();
  const parsed = parseInt(raw, 10);
  img_count = (raw !== '' && !isNaN(parsed))
    ? Math.min(mice_max, Math.max(1, parsed))
    : 10 + getRandomInt(30);

  updateCount();
  winMessageEl.hidden = true;

  while (miceEl.firstChild) {
    miceEl.removeChild(miceEl.firstChild);
  }

  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  for (let i = 1; i <= img_count; i++) {
    const miceW = 40 + getRandomInt(mice_max_width);
    const img = new Image();
    img.src = `./img/${normalize((i % mice_max) + 1)}.png`;
    img.style.position = 'absolute';
    img.style.left = `${getRandomInt(Math.max(0, width * 0.7 - miceW))}px`;
    img.style.top = `${getRandomInt(Math.max(0, height * 0.6 - 80))}px`;
    img.dataset.mice = '1';
    img.alt = 'Mouse';
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');

    img.onload = function () {
      const k = this.naturalHeight / (this.naturalWidth / miceW);
      this.style.width = miceW + 'px';
      this.style.height = k + 'px';
    };

    img.onkeydown = function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        removeMice({ target: this });
      }
    };

    miceEl.appendChild(img);
  }

  mainEl.style.display = 'block';
  loadingEl.style.display = 'none';
}

function updateCount() {
  countEl.textContent = img_count ? `${del_count}/${img_count}` : '0';
}

function removeMice(ev) {
  const target = ev.target;
  if (!target.classList.contains('fade')) {
    del_count++;
    updateCount();
  }
  target.classList.add('fade');
  setTimeout(function () {
    target.remove();
    if (miceEl.querySelectorAll('img').length === 0) {
      winMessageEl.hidden = false;
    }
  }, 500);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function normalize(t) {
  if (t < 10) return '00' + t;
  if (t < 100) return '0' + t;
  return String(t);
}
