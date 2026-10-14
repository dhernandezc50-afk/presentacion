/* =====================================================================
   MOTOR DE LA PRESENTACIÓN
   ===================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const deck = $('#deck'), dots = $('#dots'), ovGrid = $('#ovGrid');
  let cur = -1, charts = {}, busy = false;

  /* ---------- Construcción de diapositivas ---------- */
  SLIDES.forEach((s, i) => {
    const el = document.createElement('section');
    el.className = 'slide';
    el.innerHTML = s.html;
    el.querySelectorAll('.rv').forEach((n, k) => n.style.setProperty('--i', k));
    deck.appendChild(el);
    s.el = el;

    const d = document.createElement('i');
    d.title = s.nav;
    d.onclick = () => go(i);
    dots.appendChild(d);

    const b = document.createElement('button');
    b.className = 'ov-item';
    b.innerHTML = `<small>${String(i + 1).padStart(2, '0')}</small><span>${s.nav}</span><em>Expone: ${s.who.split(' ')[0]}</em>`;
    b.onclick = () => { closeMenu(); go(i); };
    ovGrid.appendChild(b);
  });

  /* ---------- Gráficas ---------- */
  function drawChart(i) {
    const c = CHARTS[i];
    if (charts[i]) charts[i].destroy();
    charts[i] = new Chart(document.getElementById('cv' + i), {
      type: 'doughnut',
      data: {
        labels: c.data.map(d => d[0]),
        datasets: [{ data: c.data.map(d => d[1]), backgroundColor: c.data.map(d => d[2]),
                     borderColor: '#0a0a0c', borderWidth: 4, hoverOffset: 10, borderRadius: 6 }]
      },
      options: {
        cutout: '74%', rotation: -90, animation: { duration: 1600, easing: 'easeOutQuart', animateRotate: true },
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: t => ` ${t.parsed}%` } } }
      }
    });
    const bars = document.getElementById('bars' + i);
    bars.innerHTML = c.data.map(d =>
      `<div class="row"><div class="lbl"><span>${d[0]}</span><b>${d[1]}%</b></div>
       <div class="track"><div class="fill" style="background:${d[2] === REST ? '#5a5a6c' : d[2]}"></div></div></div>`).join('');
    setTimeout(() => bars.querySelectorAll('.fill').forEach((f, k) => f.style.width = c.data[k][1] + '%'), 350);
  }

  /* ---------- Conteo animado de cifras ---------- */
  function countUp(root) {
    root.querySelectorAll('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || 0);
      const suf = el.dataset.suf || (el.classList.contains('big') ? '%' : '');
      const t0 = performance.now(), dur = 1500;
      const tick = t => {
        const p = Math.min(1, (t - t0 - 300) / dur);
        const v = p <= 0 ? 0 : end * (1 - Math.pow(1 - p, 3));
        el.textContent = v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Navegación ---------- */
  function go(n) {
    n = Math.max(0, Math.min(SLIDES.length - 1, n));
    if (n === cur) return;
    const back = n < cur, prev = SLIDES[cur];
    if (prev) {
      prev.el.classList.remove('active');
      prev.el.classList.toggle('back', back);
      prev.el.classList.add('leaving');
      const old = prev.el;
      setTimeout(() => old.classList.remove('leaving', 'back'), 560);
    }
    cur = n;
    const s = SLIDES[n];
    s.el.scrollTop = 0;
    s.el.classList.add('active');
    if (s.chart !== undefined) drawChart(s.chart);
    countUp(s.el);
    if (n === 0) renderQR();

    $('#counter').innerHTML = `<b>${n + 1}</b> / ${SLIDES.length}`;
    $('#progress i').style.width = ((n + 1) / SLIDES.length * 100) + '%';
    $('#prev').disabled = n === 0;
    $('#next').disabled = n === SLIDES.length - 1;
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === n));
    [...ovGrid.children].forEach((d, i) => d.classList.toggle('on', i === n));
    const sp = $('#speaker');
    sp.innerHTML = `Expone: <b>${s.who}</b>`;
    sp.classList.remove('swap'); void sp.offsetWidth; sp.classList.add('swap');
    history.replaceState(null, '', '#' + (n + 1));
  }
  $('#prev').onclick = () => go(cur - 1);
  $('#next').onclick = () => go(cur + 1);

  /* ---------- Índice y pantalla completa ---------- */
  const ov = $('#overview');
  const openMenu = () => ov.classList.add('open');
  const closeMenu = () => ov.classList.remove('open');
  $('#btnMenu').onclick = () => ov.classList.toggle('open');
  $('#btnClose').onclick = closeMenu;
  const toggleFull = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  $('#btnFull').onclick = toggleFull;

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' '].includes(k)) { e.preventDefault(); go(cur + 1); }
    else if (['ArrowLeft', 'PageUp'].includes(k)) { e.preventDefault(); go(cur - 1); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(SLIDES.length - 1);
    else if (k === 'f' || k === 'F') toggleFull();
    else if (k === 'm' || k === 'M') ov.classList.toggle('open');
    else if (k === 'q' || k === 'Q') openQR();
    else if (k === 'Escape') { closeMenu(); closeQR(); }
  });

  let tx = null;
  document.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  document.addEventListener('touchend', e => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 60) go(cur + (dx < 0 ? 1 : -1));
    tx = null;
  });

  /* ---------- Efectos: foco de luz y tarjetas 3D ---------- */
  const spot = $('#spot');
  document.addEventListener('mousemove', e => {
    spot.style.left = e.clientX + 'px';
    spot.style.top = e.clientY + 'px';
    const card = e.target.closest && e.target.closest('.card');
    if (card) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', x * 100 + '%');
      card.style.setProperty('--my', y * 100 + '%');
      card.style.setProperty('--ry', ((x - .5) * 7) + 'deg');
      card.style.setProperty('--rx', ((.5 - y) * 7) + 'deg');
    }
  });
  document.addEventListener('mouseout', e => {
    const card = e.target.closest && e.target.closest('.card');
    if (card) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
  });

  /* ---------- Partículas ---------- */
  const cv = $('#particles'), ctx = cv.getContext('2d');
  let W, H, P = [];
  function size() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    P = Array.from({ length: Math.round(W * H / 22000) }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + .4,
      vx: (Math.random() - .5) * .25, vy: -Math.random() * .35 - .08, a: Math.random() * .5 + .15
    }));
  }
  addEventListener('resize', size); size();
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of P) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = `rgba(240,207,148,${p.a})`; ctx.fill();
    }
    requestAnimationFrame(loop);
  })();

  /* ---------- Código QR (automático, sin campos) ---------- */
  const isWeb = location.protocol.startsWith('http');
  const qrText = () => (typeof ENLACE_PUBLICO === 'string' && ENLACE_PUBLICO.trim())
    || (isWeb ? location.href.split('#')[0] : '');

  function drawQR(box, px) {
    if (!box) return;
    box.innerHTML = '';
    const text = qrText();
    if (!text) { box.innerHTML = '<div class="qrph">El QR se activa<br>al publicar la página</div>'; return; }
    try {
      new QRCode(box, { text, width: px, height: px, correctLevel: (QRCode.CorrectLevel || {}).M });
    } catch (err) {
      box.innerHTML = '<div class="qrph">No se pudo generar<br>el QR (sin conexión)</div>';
    }
  }
  const renderQR = () => { drawQR(document.getElementById('qrcode'), 120); drawQR(document.getElementById('qrBig'), 230); };

  const qm = $('#qrModal');
  const openQR = () => { renderQR(); qm.classList.add('open'); };
  const closeQR = () => qm.classList.remove('open');
  $('#btnQR').onclick = openQR;
  $('#qrClose').onclick = closeQR;
  $('#qrOpen').onclick = openQR;
  qm.addEventListener('click', e => { if (e.target === qm) closeQR(); });

  /* ---------- Cronómetro ---------- */
  let t0 = Date.now();
  const tm = $('#timer');
  tm.onclick = () => t0 = Date.now();
  setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000);
    tm.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }, 1000);

  /* ---------- Inicio ---------- */
  go((parseInt(location.hash.slice(1)) || 1) - 1);
})();
