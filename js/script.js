/* ============ CẤU HÌNH THÔNG TIN (Thay đổi theo ý bạn tại đây) ============ */
const CONFIG = {
  correctPin: "1710",        // Mã PIN 4 số (Ngày sinh hoặc ngày kỷ niệm DDMM, ví dụ: 2010 là ngày 20/10)
  recipientName: "Kào",   // Tên hoặc biệt danh của bạn gái
  senderName: "MinXu",      // Tên hoặc biệt danh của bạn
  age: 23,                   // Tuổi mới của bạn gái
  autoplayMusic: true        // Tự động bật nhạc khi bắt đầu nhập mã
};

function applyDynamicNames() {
  document.querySelectorAll('.recipient-name-fill').forEach(el => {
    el.textContent = CONFIG.recipientName;
  });
  const nameFill = document.getElementById('name-fill');
  if (nameFill) nameFill.textContent = CONFIG.recipientName;

  document.querySelectorAll('.sender-name-fill').forEach(el => {
    el.textContent = CONFIG.senderName;
  });

  const ageFill = document.getElementById('age-fill');
  if (ageFill && CONFIG.age) {
    ageFill.textContent = CONFIG.age;
  }
}

document.addEventListener('DOMContentLoaded', applyDynamicNames);
applyDynamicNames();

/* ============ SCREEN NAVIGATION ============ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');
  window.scrollTo(0, 0);

  if (id === 'screen-letter' && letterTypewriter) {
    letterTypewriter.startTyping();
  }
}

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.next));
});

/* ============ SCREEN 1: PIN LOCK ============ */
let enteredPin = "";
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');

function updateDots() {
  dots.forEach((d, i) => {
    d.classList.toggle('filled', i < enteredPin.length);
  });
}

function checkPin() {
  if (enteredPin === CONFIG.correctPin) {
    fireConfetti();
    setTimeout(() => showScreen('screen-reveal'), 600);
  } else {
    errorMsg.classList.add('show');
    dots.forEach(d => d.classList.add('shake'));
    setTimeout(() => {
      dots.forEach(d => d.classList.remove('shake'));
      enteredPin = "";
      updateDots();
    }, 450);
  }
}

document.querySelectorAll('#numpad button[data-num]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (enteredPin.length >= 4) return;
    errorMsg.classList.remove('show');
    enteredPin += btn.dataset.num;
    updateDots();
    if (enteredPin.length === 4) {
      setTimeout(checkPin, 200);
    }
  });
});

document.getElementById('backspace').addEventListener('click', () => {
  enteredPin = enteredPin.slice(0, -1);
  updateDots();
});

/* ============ NAME FILL ============ */
document.getElementById('name-fill').textContent = CONFIG.recipientName;

/* ============ SCREEN 4: PHOTO REVEAL ============ */
const cameraBtn = document.getElementById('camera-click');
const polaroids = document.querySelectorAll('#polaroid-row .polaroid');
const photoCounter = document.getElementById('photo-counter');
const photosContinue = document.getElementById('photos-continue');
let revealedCount = 0;

cameraBtn.addEventListener('click', () => {
  if (revealedCount >= polaroids.length) return;
  polaroids[revealedCount].classList.remove('hidden');
  revealedCount++;
  photoCounter.textContent = `${revealedCount} / ${polaroids.length} ảnh kỷ niệm`;
  cameraBtn.style.transform = "scale(0.8) rotate(-8deg)";
  setTimeout(() => cameraBtn.style.transform = "", 200);
  if (revealedCount === polaroids.length) {
    photoCounter.textContent = `✨ Đã mở toàn bộ ${revealedCount}/${polaroids.length} bức ảnh rồi nè!`;
    photosContinue.classList.remove('hidden');
    const hint = document.getElementById('camera-hint');
    if (hint) hint.classList.add('hidden');
  }
});

/* ============ SCREEN 6: VIP PRO CAKE (BLOW CANDLES & CUT) ============ */
const cake = document.getElementById('cake');
const cakeResult = document.getElementById('cake-result');
const cakeContinue = document.getElementById('cake-continue');
const cakeHint = document.getElementById('cake-hint');
const cakeEyebrow = document.getElementById('cake-eyebrow');
const cakeTitle = document.getElementById('cake-title');
const blowBtn = document.getElementById('blow-candle-btn');
const cutBtn = document.getElementById('cut-cake-btn');
const knifeGuide = document.getElementById('knife-guide');
const candlesContainer = document.getElementById('candles-container');

let dragStartX = null;
let cakeCut = false;
let candlesBlown = false;

function blowOutCandles() {
  if (candlesBlown) return;
  candlesBlown = true;

  // Extinguish flames with puff animation
  document.querySelectorAll('.flame').forEach(f => f.classList.add('blown-out'));
  document.querySelectorAll('.smoke').forEach(s => s.classList.add('rising'));

  smallConfettiBurst();

  if (cakeEyebrow) cakeEyebrow.textContent = "✦ bước 2: cắt bánh sinh nhật ✦";
  if (cakeTitle) cakeTitle.textContent = "Nến đã tắt, cùng cắt bánh nào! 🎂";
  if (cakeHint) cakeHint.textContent = "Kéo ngang chiếc bánh hoặc bấm nút Cắt Bánh bên dưới nhé 🍰";

  if (blowBtn) blowBtn.classList.add('hidden');
  if (cutBtn) cutBtn.classList.remove('hidden');
  if (knifeGuide) knifeGuide.classList.remove('hidden');
}

function triggerCut() {
  if (cakeCut) return;
  if (!candlesBlown) {
    blowOutCandles();
  }
  cakeCut = true;

  if (cake) cake.classList.add('cut');
  if (knifeGuide) knifeGuide.classList.add('hidden');
  if (cakeHint) cakeHint.classList.add('hidden');
  if (cutBtn) cutBtn.classList.add('hidden');
  if (blowBtn) blowBtn.classList.add('hidden');
  if (cakeResult) cakeResult.classList.remove('hidden');
  if (cakeContinue) cakeContinue.classList.remove('hidden');

  fireConfetti();
}

function handleDragStart(x) {
  if (cakeCut) return;
  dragStartX = x;
}
function handleDragMove(x) {
  if (cakeCut || dragStartX === null) return;
  const dist = Math.abs(x - dragStartX);
  if (dist > 45) {
    triggerCut();
  }
}
function handleDragEnd() {
  dragStartX = null;
}

if (candlesContainer) {
  candlesContainer.addEventListener('click', blowOutCandles);
}
if (blowBtn) {
  blowBtn.addEventListener('click', blowOutCandles);
}
if (cutBtn) {
  cutBtn.addEventListener('click', triggerCut);
}

if (cake) {
  cake.addEventListener('mousedown', e => handleDragStart(e.clientX));
  window.addEventListener('mousemove', e => handleDragMove(e.clientX));
  window.addEventListener('mouseup', handleDragEnd);

  cake.addEventListener('touchstart', e => handleDragStart(e.touches[0].clientX));
  cake.addEventListener('touchmove', e => handleDragMove(e.touches[0].clientX));
  cake.addEventListener('touchend', handleDragEnd);
}

/* ============ CONFETTI ============ */
function fireConfetti() {
  if (typeof confetti !== 'function') return;
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.5 },
    colors: ['#a3001e', '#ffccd5', '#ffd3db']
  });
}
function smallConfettiBurst() {
  if (typeof confetti !== 'function') return;
  confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
}

/* ============ FINALE screen extra confetti + replay ============ */
const finaleScreen = document.getElementById('screen-finale');
if (document.querySelector('[data-next="screen-finale"]')) {
  document.querySelector('[data-next="screen-finale"]').addEventListener('click', () => {
    setTimeout(fireConfetti, 400);
  });
}

document.getElementById('replay-btn').addEventListener('click', () => {
  enteredPin = "";
  updateDots();
  revealedCount = 0;
  polaroids.forEach(p => p.classList.add('hidden'));
  photoCounter.textContent = `0 / ${polaroids.length} bức ảnh`;
  const hint = document.getElementById('camera-hint');
  if (hint) hint.classList.remove('hidden');
  photosContinue.classList.add('hidden');
  
  // Reset VIP cake state
  candlesBlown = false;
  cakeCut = false;
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('blown-out'));
  document.querySelectorAll('.smoke').forEach(s => s.classList.remove('rising'));
  if (cake) cake.classList.remove('cut');
  if (knifeGuide) knifeGuide.classList.add('hidden');
  if (blowBtn) blowBtn.classList.remove('hidden');
  if (cutBtn) cutBtn.classList.add('hidden');
  if (cakeEyebrow) cakeEyebrow.textContent = "✦ bước 1: ước nguyện & thổi nến ✦";
  if (cakeTitle) cakeTitle.textContent = "Cùng ước nguyện tuổi 23 nhé!";
  if (cakeHint) {
    cakeHint.textContent = "Nhắm mắt ước một điều ước... rồi chạm vào nến để thổi nến nhé 🕯️✨";
    cakeHint.classList.remove('hidden');
  }
  if (cakeResult) cakeResult.classList.add('hidden');
  if (cakeContinue) cakeContinue.classList.add('hidden');

  // Reset interactive gifts
  visitedGifts.clear();
  document.querySelectorAll('.gift-option-box').forEach(box => box.classList.remove('unpacked'));
  const hubBtn = document.getElementById('gift-hub-continue-btn');
  if (hubBtn) hubBtn.classList.remove('unlocked');
  resetGiftGame();
  if (letterTypewriter) {
    letterTypewriter.finishTypewriter();
  }

  pauseTrack();
  if (bgMusic) bgMusic.currentTime = 0;

  showScreen('screen-lock');
});

/* ============ MUSIC & YOUTUBE / LOCAL AUDIO SYNCHRONIZATION ============ */
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const spotifyPlayBtn = document.getElementById('spotify-play-btn');
const vinylRecord = document.getElementById('vinyl-record');
const tonearm = document.getElementById('tonearm');
let musicPlaying = false;
let ytPlayer = null;
let ytReady = false;

// YouTube IFrame API Callback - bài hát: CONGB - chờ chút... (GczyPW3vbrc)
window.onYouTubeIframeAPIReady = function () {
  try {
    ytPlayer = new YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId: 'GczyPW3vbrc',
      playerVars: {
        'autoplay': 0,
        'controls': 0,
        'loop': 1,
        'playlist': 'GczyPW3vbrc',
        'playsinline': 1
      },
      events: {
        'onReady': () => {
          ytReady = true;
          // Set standard volume
          if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(70);
        },
        'onStateChange': (e) => {
          if (e.data === YT.PlayerState.PLAYING) {
            musicPlaying = true;
            updateMusicUI();
          } else if (e.data === YT.PlayerState.PAUSED) {
            musicPlaying = false;
            updateMusicUI();
          } else if (e.data === YT.PlayerState.ENDED) {
            if (ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
          }
        }
      }
    });
  } catch (err) {
    console.log("YouTube API init error:", err);
  }
};

function updateMusicUI() {
  if (musicPlaying) {
    if (musicBtn) {
      musicBtn.classList.remove('hidden');
      musicBtn.textContent = "🔊";
    }
    if (spotifyPlayBtn) spotifyPlayBtn.textContent = "⏸";
    if (vinylRecord) vinylRecord.classList.add('spinning');
    if (tonearm) tonearm.classList.add('active');
  } else {
    if (musicBtn) musicBtn.textContent = "🔈";
    if (spotifyPlayBtn) spotifyPlayBtn.textContent = "▶";
    if (vinylRecord) vinylRecord.classList.remove('spinning');
    if (tonearm) tonearm.classList.remove('active');
  }
}

function playTrack() {
  let started = false;
  // Ưu tiên phát qua YouTube video GczyPW3vbrc
  if (ytReady && ytPlayer && typeof ytPlayer.playVideo === 'function') {
    try {
      ytPlayer.playVideo();
      started = true;
      musicPlaying = true;
      updateMusicUI();
    } catch (e) {
      console.log("YT play failed, fallback to local:", e);
    }
  }

  // Nếu YouTube chưa sẵn sàng hoặc lỗi, fallback sang file nhạc local
  if (!started && bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
      musicPlaying = true;
      updateMusicUI();
    }).catch(e => {
      console.log("Audio play prevented:", e);
      if (musicBtn) musicBtn.classList.remove('hidden');
      updateMusicUI();
    });
  }
}

function pauseTrack() {
  if (ytReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
    try { ytPlayer.pauseVideo(); } catch (e) { }
  }
  if (bgMusic) {
    try { bgMusic.pause(); } catch (e) { }
  }
  musicPlaying = false;
  updateMusicUI();
}

function toggleTrack() {
  if (musicPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

document.getElementById('numpad').addEventListener('click', () => {
  if (!musicPlaying && CONFIG.autoplayMusic) {
    playTrack();
  }
}, { once: true });

if (musicBtn) {
  musicBtn.addEventListener('click', toggleTrack);
}

if (spotifyPlayBtn) {
  spotifyPlayBtn.addEventListener('click', toggleTrack);
}

/* ============ DYNAMIC SCRAPBOOK FLOATING STICKERS SYSTEM ============ */
function createPetals() {
  const container = document.getElementById('bg-flowers');
  if (!container) return;

  const stickerEmojis = ['⭐', '🌸', '🌼', '💮', '🏵️', '🌺', '✨', '🎈'];
  const stickerCount = 18;

  for (let i = 0; i < stickerCount; i++) {
    spawnSticker(container, stickerEmojis, true);
  }

  setInterval(() => {
    const currentStickers = container.querySelectorAll('.petal');
    if (currentStickers.length < stickerCount) {
      spawnSticker(container, stickerEmojis, false);
    }
  }, 1000);
}

function spawnSticker(container, emojis, initialLoad = false) {
  const sticker = document.createElement('div');
  sticker.className = 'petal';
  sticker.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const leftPos = Math.random() * 100;
  const duration = 9 + Math.random() * 8;
  const delay = initialLoad ? -(Math.random() * duration) : 0;
  const size = 18 + Math.random() * 20;
  const swayDuration = 4 + Math.random() * 3;

  sticker.style.left = `${leftPos}vw`;
  sticker.style.fontSize = `${size}px`;
  sticker.style.animationDuration = `${duration}s, ${swayDuration}s`;
  sticker.style.animationDelay = `${delay}s, 0s`;

  container.appendChild(sticker);

  setTimeout(() => {
    sticker.remove();
  }, (duration + (initialLoad ? 0 : delay)) * 1000);
}

/* ============ INTERACTIVE CHOOSE YOUR GIFTS SYSTEM ============ */
let visitedGifts = new Set();

function registerVisitedGift(giftId) {
  visitedGifts.add(giftId);

  // Mark item option box as visual unpacked
  const boxOption = document.getElementById(`gift-${giftId}-box`);
  if (boxOption) {
    boxOption.classList.add('unpacked');
  }

  // If explored all 3, unlock done continue button
  if (visitedGifts.size === 2) {
    const continueBtn = document.getElementById('gift-hub-continue-btn');
    if (continueBtn) {
      continueBtn.classList.add('unlocked');
    }
  }
}

// Bind gift cards clicks
const envelopeGift = document.getElementById('gift-envelope-box');
if (envelopeGift) {
  envelopeGift.addEventListener('click', () => {
    registerVisitedGift('envelope');
    showScreen('screen-letter');
  });
}

const bouquetGift = document.getElementById('gift-bouquet-box');
if (bouquetGift) {
  bouquetGift.addEventListener('click', () => {
    registerVisitedGift('bouquet');
    showScreen('screen-gift-flowers');
  });
}

const boxGift = document.getElementById('gift-box-box');
if (boxGift) {
  boxGift.addEventListener('click', () => {
    registerVisitedGift('box');
    showScreen('screen-gift-accept');
  });
}

// Back to gifts buttons routing
document.querySelectorAll('.back-to-gifts-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showScreen('screen-choose-gift');
  });
});

/* ============ YES/NO DODGE GAME logic ============ */
const noBtn = document.getElementById('gift-no-btn');
const yesBtn = document.getElementById('gift-yes-btn');
const gameBackBtn = document.getElementById('gift-game-back-btn');
const acceptTitleText = document.getElementById('accept-title-text');

function moveNoButton() {
  if (!noBtn) return;
  const card = noBtn.closest('.scrapbook-page');
  if (!card) return;

  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate relative bounds inside the card
  const maxX = cardRect.width - btnRect.width - 30;
  const maxY = cardRect.height - btnRect.height - 80;

  const randomX = Math.max(15, Math.floor(Math.random() * maxX));
  const randomY = Math.max(15, Math.floor(Math.random() * maxY));

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

if (noBtn) {
  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

if (yesBtn) {
  yesBtn.addEventListener('click', () => {
    fireConfetti();
    if (acceptTitleText) acceptTitleText.textContent = "EM ĐỒNG Ý RỒI NHA! 🎉";

    // Hide creature, show polaroid
    const creature = document.getElementById('accept-game-creature');
    const polaroid = document.getElementById('accept-reveal-polaroid');
    if (creature) creature.classList.add('hidden');
    if (polaroid) polaroid.classList.remove('hidden');

    // Hide buttons, show Back to Gifts continue trigger
    if (yesBtn) yesBtn.classList.add('hidden');
    if (noBtn) noBtn.classList.add('hidden');
    if (gameBackBtn) gameBackBtn.classList.remove('hidden');
  });
}

function resetGiftGame() {
  if (acceptTitleText) acceptTitleText.textContent = "EM CÓ ĐỒNG Ý NHẬN QUÀ CỦA ANH HÔNG? 🥺";

  const creature = document.getElementById('accept-game-creature');
  const polaroid = document.getElementById('accept-reveal-polaroid');
  if (creature) creature.classList.remove('hidden');
  if (polaroid) polaroid.classList.add('hidden');

  if (yesBtn) yesBtn.classList.remove('hidden');
  if (noBtn) {
    noBtn.classList.remove('hidden');
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
  }
  if (gameBackBtn) gameBackBtn.classList.add('hidden');
}

/* ============ EASTER EGG SECRET ENVELOPE ============ */
const secretEnvelopeBtn = document.getElementById('secret-envelope-btn');
const secretMessagePopup = document.getElementById('secret-message-popup');
const closeSecretBtn = document.getElementById('close-secret-btn');

if (secretEnvelopeBtn && secretMessagePopup) {
  secretEnvelopeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    secretMessagePopup.classList.remove('hidden');
    fireConfetti();
  });
}

if (closeSecretBtn && secretMessagePopup) {
  closeSecretBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    secretMessagePopup.classList.add('hidden');
  });
}

// Initialize floating elements on page load
document.addEventListener('DOMContentLoaded', createPetals);
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  createPetals();
}

/* ============ PHOTO LIGHTBOX ZOOM SYSTEM ============ */
const lightbox = document.getElementById('photo-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

function openLightbox(imgSrc, captionText) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = imgSrc;
  if (lightboxCaption) lightboxCaption.textContent = captionText || "";
  lightbox.classList.remove('hidden');
  smallConfettiBurst();
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.add('hidden');
  }
}

// Bắt sự kiện click vào các thẻ ảnh polaroid để phóng to
document.querySelectorAll('.polaroid').forEach(card => {
  card.addEventListener('click', () => {
    // Không mở khi thẻ đang bị ẩn chưa được chụp
    if (card.classList.contains('hidden')) return;

    // Lấy link ảnh từ data-img hoặc CSS background
    let imgSrc = card.dataset.img;
    if (!imgSrc) {
      const imgDiv = card.querySelector('.polaroid-img');
      if (imgDiv) {
        const bg = window.getComputedStyle(imgDiv).backgroundImage;
        const match = bg.match(/url\(["']?([^"']+)["']?\)/);
        if (match) imgSrc = match[1];
      }
    }

    const captionEl = card.querySelector('p');
    const caption = card.dataset.caption || (captionEl ? captionEl.textContent : "");
    if (imgSrc) {
      openLightbox(imgSrc, caption);
    }
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ============ TYPEWRITER EFFECT FOR LOVE LETTER (BỨC THƯ TAY) ============ */
let letterTypewriter = null;

function setupLoveLetterTypewriter() {
  const letterBody = document.getElementById('letter-body-text');
  const letterSign = document.getElementById('letter-sign');
  const skipBtn = document.getElementById('skip-typewriter-btn');
  const cursor = document.getElementById('letter-cursor');
  const letterCard = document.getElementById('stationery-letter-card');

  if (!letterBody) return null;

  let originalLetterContent = letterBody.innerHTML.trim();
  let typewriterRunning = false;
  let typewriterTimeout = null;

  // Tách nội dung thành các token: ký tự, emoji, và thẻ HTML (<br>, <span>...)
  function parseTokens(str) {
    const tokens = [];
    let i = 0;
    while (i < str.length) {
      if (str[i] === '<') {
        const closeIdx = str.indexOf('>', i);
        if (closeIdx !== -1) {
          tokens.push(str.substring(i, closeIdx + 1));
          i = closeIdx + 1;
          continue;
        }
      }
      if (str[i] === '&') {
        const semiIdx = str.indexOf(';', i);
        if (semiIdx !== -1 && semiIdx - i < 8) {
          tokens.push(str.substring(i, semiIdx + 1));
          i = semiIdx + 1;
          continue;
        }
      }
      const codePoint = str.codePointAt(i);
      const char = String.fromCodePoint(codePoint);
      tokens.push(char);
      i += char.length;
    }
    return tokens;
  }

  const tokens = parseTokens(originalLetterContent);

  function finishTypewriter() {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
    typewriterRunning = false;
    letterBody.innerHTML = originalLetterContent;
    if (cursor) cursor.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'none';
    if (letterSign) letterSign.classList.remove('hidden-sign');
  }

  function startTyping() {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
    typewriterRunning = true;
    letterBody.innerHTML = "";
    if (cursor) cursor.style.display = 'inline-block';
    if (skipBtn) skipBtn.style.display = 'inline-block';
    if (letterSign) letterSign.classList.add('hidden-sign');

    let idx = 0;

    function step() {
      if (!typewriterRunning) return;
      if (idx >= tokens.length) {
        finishTypewriter();
        return;
      }

      const tok = tokens[idx];
      letterBody.innerHTML += tok;
      idx++;

      // Tốc độ gõ tự nhiên, có nhịp thở cảm xúc
      let delay = 22; // ms mặc định mỗi ký tự
      if (tok === '.' || tok === '!' || tok === '?') {
        delay = 320; // Dừng lại sau dấu chấm / dấu cảm
      } else if (tok === ',' || tok === ';') {
        delay = 170; // Dừng ngắn sau dấu phẩy
      } else if (tok.toLowerCase().startsWith('<br')) {
        delay = 200; // Dừng khi xuống đoạn mới
      } else if (tok === ' ') {
        delay = 14;
      }

      typewriterTimeout = setTimeout(step, delay);
    }

    step();
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      finishTypewriter();
    });
  }

  if (letterCard) {
    letterCard.addEventListener('click', (e) => {
      if (e.target.closest('#skip-typewriter-btn') || e.target.closest('.back-to-gifts-btn')) return;
      if (typewriterRunning) {
        finishTypewriter();
      }
    });
  }

  return { startTyping, finishTypewriter };
}

// Khởi tạo Typewriter sau khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  letterTypewriter = setupLoveLetterTypewriter();
});
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  letterTypewriter = setupLoveLetterTypewriter();
}
