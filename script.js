(() => {
  'use strict';
  const data = window.WEDDING || {};
  // Returning to the cover reloads this document. Disable browser scroll restoration
  // so every new visit starts with the closed doors rather than an old section.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('pageshow', () => window.scrollTo(0, 0));
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const safe = (text) => String(text == null ? '' : text);
  const initials = [data.brideFirst, data.groomFirst].map(n => safe(n).charAt(0).toUpperCase()).join('&');
  const values = { ...data, initials, displayFirst: data.brideFirst, displaySecond: data.groomFirst };
  document.title = `${safe(data.brideFirst)} & ${safe(data.groomFirst)} | Wedding Invitation`;
  $$('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    if (values[key] != null) el.textContent = safe(values[key]);
  });

  // The gallery uses <picture> so each frame loads the right crop for the viewport.
  // Edit only WEDDING.photos in config.js when uploading your six photographs.
  $$('picture[data-gallery-photo]').forEach(picture => {
    const key = picture.dataset.galleryPhoto;
    const variants = data.photos && data.photos[key];
    const desktop = (typeof variants === 'string' ? variants : variants && variants.desktop) || 'assets/couple-placeholder.svg';
    const mobile = (typeof variants === 'string' ? variants : variants && (variants.mobile || variants.desktop)) || desktop;
    const source = picture.querySelector('source');
    const img = picture.querySelector('img');
    if (!img) return;
    if (source) source.srcset = mobile;
    img.src = desktop;
    img.onerror = () => {
      // In case a filename is misspelled, show the existing placeholder on both layouts.
      if (source) source.srcset = 'assets/couple-placeholder.svg';
      img.onerror = null;
      img.src = 'assets/couple-placeholder.svg';
    };
  });

  // The three celebration cards deliberately share one HTML structure.
  const eventsHolder = $('#eventsContainer');
  function textElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = safe(text);
    return el;
  }
  function detailIcon(kind) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.7');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('detail-icon');
    const path = document.createElementNS(ns, 'path');
    if (kind === 'location') {
      path.setAttribute('d', 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z');
      svg.append(path);
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '10');
      circle.setAttribute('r', '2.5');
      svg.append(circle);
    } else {
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', '12'); circle.setAttribute('cy', '12'); circle.setAttribute('r', '9');
      svg.append(circle);
      path.setAttribute('d', 'M12 7v5l3.5 2');
      svg.append(path);
    }
    return svg;
  }
  function eventDetail(kind, value, venueLines) {
    const row = textElement('p', 'event-detail');
    row.append(detailIcon(kind));
    if (kind === 'location' && Array.isArray(venueLines) && venueLines.length === 2) {
      // Preserve the two intentional address lines in every viewport, rather
      // than relying on wrapping that varies between phones and desktop.
      row.classList.add('event-detail--venue');
      const lines = textElement('span', 'event-venue-lines');
      venueLines.forEach(line => lines.append(textElement('span', 'event-venue-line', line)));
      row.append(lines);
    } else {
      row.append(textElement('span', '', value));
    }
    return row;
  }
  function eventWeekday(event) {
    const stamp = (event.googleCalendarStart || '').slice(0, 8);
    if (/^\d{8}$/.test(stamp)) {
      const iso = `${stamp.slice(0,4)}-${stamp.slice(4,6)}-${stamp.slice(6,8)}T00:00:00+05:30`;
      const d = new Date(iso);
      if (!Number.isNaN(d.getTime())) return d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
    }
    return '';
  }
  (data.events || []).forEach(event => {
    const card = textElement('article', 'event-card reveal');
    const inner = textElement('div', 'event-card-inner');
    const top = textElement('div', 'event-card-top');
    const flower = document.createElement('img');
    flower.className = 'event-flower';
    flower.src = 'assets/floral-ornate-event.webp';
    flower.alt = '';
    top.append(flower);
    const date = textElement('div', 'event-date-block');
    const weekday = eventWeekday(event);
    // Minimal date layout: no ornamental rules or diamonds around date/day.
    date.append(
      textElement('p', 'event-date', event.date),
      textElement('p', 'event-day', weekday)
    );
    const facts = textElement('div', 'event-facts');
    facts.append(eventDetail('location', event.venue, event.venueLines), eventDetail('time', event.time));
    const actions = textElement('div', 'event-actions');
    // The provided Maps short URLs open the exact saved venue place, not the directions UI.
    // Mehandi has no map link by design; Haldi and Wedding use the supplied place link.
    if (event.mapsUrl) {
      const mapsLink = textElement('a', 'event-action event-action--directions');
      mapsLink.href = event.mapsUrl;
      mapsLink.target = '_blank';
      mapsLink.rel = 'noopener noreferrer';
      mapsLink.setAttribute('aria-label', 'View ' + event.venue + ' on Google Maps');
      mapsLink.append(textElement('span', 'event-action-label', 'VIEW DIRECTIONS'));
      actions.append(mapsLink);
    }

    // Open a prefilled Google Calendar form for every event; no .ics download links.
    // Every event uses its confirmed start and end times from config.js.
    if (event.googleCalendarStart && event.googleCalendarEnd) {
      const calendarParams = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.googleCalendarTitle || ('Malika & Sourav - ' + event.title),
        dates: event.googleCalendarStart + '/' + event.googleCalendarEnd,
        ctz: 'Asia/Kolkata',
        details: event.googleCalendarDescription || '',
        location: event.googleCalendarLocation || event.directionsQuery || event.venue
      });
      const calendarLink = textElement('a', 'event-action event-action--calendar');
      calendarLink.href = 'https://calendar.google.com/calendar/render?' + calendarParams.toString();
      calendarLink.target = '_blank';
      calendarLink.rel = 'noopener noreferrer';
      calendarLink.setAttribute('aria-label', 'Add ' + event.title + ' to Google Calendar');
      calendarLink.append(textElement('span', 'event-action-label', 'ADD TO CALENDAR'));
      actions.append(calendarLink);
    }
    inner.append(top, textElement('h3', '', event.title), date,
      textElement('p', 'event-quote', event.message), facts, actions);
    card.append(inner);
    eventsHolder.append(card);
  });

  // The former venue tabs and map iframe have been replaced by an invitation
  // message. Event-card venue links above open Google Maps place pages.

  // Faint small hearts fall over the full blue Thank You section. Fixed pseudo-random
  // distribution makes the animation steady across devices and page refreshes.
  const thanksSection = $('#thanks');
  const heartLayer = $('#thanksHeartLayer');
  const heartColors = ['#ff75b4', '#f6d883', '#fff9f2'];
  const heartSizes = [9, 12, 15];
  let heartSeed = 1279;
  function heartRandom() {
    heartSeed = (heartSeed * 1664525 + 1013904223) >>> 0;
    return heartSeed / 4294967296;
  }
  const heartFragment = document.createDocumentFragment();
  for (let i = 0; i < 34; i++) {
    const heart = textElement('span', 'falling-heart', '♥');
    heart.style.setProperty('--heart-left', (2 + heartRandom()*96).toFixed(1) + '%');
    heart.style.setProperty('--heart-color', heartColors[i % heartColors.length]);
    heart.style.setProperty('--heart-size', heartSizes[i % heartSizes.length] + 'px');
    heart.style.setProperty('--heart-opacity', (.13 + heartRandom()*.11).toFixed(2));
    heart.style.setProperty('--heart-duration', (15 + heartRandom()*15).toFixed(1) + 's');
    heart.style.setProperty('--heart-delay', (-(heartRandom()*28)).toFixed(1) + 's');
    heart.style.setProperty('--heart-drift', ((heartRandom()-.5)*65).toFixed(1) + 'px');
    heartFragment.append(heart);
  }
  heartLayer.append(heartFragment);
  function updateHeartTravel() {
    thanksSection.style.setProperty('--heart-distance', (thanksSection.clientHeight + 65) + 'px');
  }
  updateHeartTravel();
  window.addEventListener('resize', updateHeartTravel, {passive:true});
  if ('ResizeObserver' in window) new ResizeObserver(updateHeartTravel).observe(thanksSection);
  if ('IntersectionObserver' in window) {
    const heartsObserver = new IntersectionObserver(entries => {
      thanksSection.classList.toggle('hearts-in-view', entries[0].isIntersecting);
    }, {threshold:0});
    heartsObserver.observe(thanksSection);
  } else thanksSection.classList.add('hearts-in-view');

  // These idle-zoom state variables must exist before the opening handlers
  // or initialization code can reference them.
  let heroIdleReady = false;
  let heroIdleActive = false;
  let heroIdleZoom = 1;
  let heroIdleRaf = null;
  let heroIdleStart = 0;

  // Cover opens like two physical hinged doors sliding apart.
  const gate = $('#invitationGate');
  const returnButton = $('#returnCover');
  const heroStageForIntro = $('#heroStage');
  let heroRevealTimer = null;
  function resetHeroIntroAnimation() {
    if (!heroStageForIntro) return;
    window.clearTimeout(heroRevealTimer);
    heroIdleReady = false;
    stopHeroIdleZoom(true);
    heroStageForIntro.classList.remove('hero-sequence-active');
    void heroStageForIntro.offsetWidth;
  }
  function playHeroIntroAnimation() {
    if (!heroStageForIntro) return;
    window.clearTimeout(heroRevealTimer);
    heroStageForIntro.classList.remove('hero-sequence-active');
    void heroStageForIntro.offsetWidth;
    // As soon as the doors have opened, begin the hero reveal and its very
    // subtle castle breathing/zoom together, without waiting for the names.
    heroRevealTimer = window.setTimeout(() => {
      heroStageForIntro.classList.add('hero-sequence-active');
      heroIdleReady = true;
      maybeStartHeroIdleZoom();
    }, 1380);
  }
  let opened = false;
  function openGate() {
    if (opened) return;
    // Call play synchronously inside the click handler (essential on iOS/Safari).
    if (!musicStarted) {
      musicStarted = true;
      audio.muted = false;
      playWeddingMusic();
    }
    opened = true;
    document.body.classList.remove('gate-closed');
    document.body.classList.add('gate-open');
    heroIdleReady = false;
    playHeroIntroAnimation();
    gate.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => { gate.classList.add('is-hidden'); $('#invitationMain').focus({preventScroll:true}); }, 1400);
  }
  $('#openInvitation').addEventListener('click', openGate);
  returnButton.addEventListener('click', () => {
    // A genuine page reload gives every guest the complete first-time experience:
    // closed doors, cover zoom, Ganesha/names reveal, scroll reveals, fresh date seal,
    // fresh confetti, and the heartfelt invitation message. In-memory resets alone cannot
    // reliably restore all observers, CSS animations and the one-time date reveal.
    audio.pause();
    try { audio.currentTime = 0; } catch (_) {}
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    window.location.reload();
  });

  // Date countdown: reveal the official date with a two-door invitation and
  // screen-wide, lightweight celebratory paper bursts. Dates remain driven by config.js.
  // The live countdown targets the wedding ceremony time in IST.
  const countdownTargetIso = safe(data.countdownTarget) || (safe(data.weddingDay) + 'T20:00:00+05:30');
  const target = new Date(countdownTargetIso).getTime();
  const weddingDate = new Date(target);
  const monthName = Number.isFinite(target)
    ? new Intl.DateTimeFormat('en', {month: 'long', timeZone: 'Asia/Kolkata'}).format(weddingDate)
    : 'December';
  const dateParts = safe(data.weddingDay).split('-');
  const weddingDateDay = dateParts[2] ? String(Number(dateParts[2])) : '13';
  const weddingDateYear = dateParts[0] || '2026';
  $('#weddingMonth').textContent = monthName;
  $('#weddingDate').textContent = weddingDateDay;
  $('#weddingYear').textContent = weddingDateYear;

  function refreshCountdown() {
    const remaining = Number.isFinite(target) ? Math.max(0, target - Date.now()) : 0;
    const secondsRemaining = Math.floor(remaining / 1000);
    const units = {
      days: Math.floor(secondsRemaining / 86400),
      hours: Math.floor(secondsRemaining % 86400 / 3600),
      minutes: Math.floor(secondsRemaining % 3600 / 60),
      seconds: secondsRemaining % 60
    };
    for (const [unit, value] of Object.entries(units)) {
      $('#'+unit).textContent = String(value).padStart(2, '0');
    }
  }
  refreshCountdown();
  window.setInterval(refreshCountdown, 1000);

  const dateReveal = $('#dateReveal');
  const dateSeal = $('#revealWeddingDate');
  const celebration = $('#dateCelebration');
  const confettiCanvas = $('#dateConfettiCanvas');
  let hasRevealedWeddingDate = false;
  let celebrationFrame = null;
  let celebrationTimeout = null;
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function celebrateDate() {
    if (motionReduced.matches) return;
    const ctx = confettiCanvas.getContext('2d');
    if (!ctx) return;
    if (celebrationFrame !== null) window.cancelAnimationFrame(celebrationFrame);
    window.clearTimeout(celebrationTimeout);

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    confettiCanvas.width = Math.round(viewWidth * pixelRatio);
    confettiCanvas.height = Math.round(viewHeight * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    celebration.classList.add('is-celebrating');

    // V57 choreography: preserve the first four simultaneous bursts and the
    // second pair 500ms later. Replace the remaining three bursts with one
    // grand, centered burst another 500ms later. No popper cone graphics.
    const colors = ['#d8ab62', '#f4d7a3', '#f1bdac', '#b88769', '#ffffff', '#9b6d4d', '#dfb6af'];
    const baseParticlesPerPop = Math.max(42, Math.min(60, Math.round(viewWidth / 24)));
    const sequence = [
      { delay: 0, origins: [[.08, .83], [.90, .16], [.16, .31], [.88, .88]], intensity: 1.0 },
      { delay: 500, origins: [[.20, .46], [.73, .44]], intensity: 0.95 },
      { delay: 1000, origins: [[.5, .5]], intensity: 2.5, grand: true }
    ];
    const particles = [];
    sequence.forEach((stage, stageIndex) => {
      stage.origins.forEach(([rx, ry], originIndex) => {
        const particlesPerPop = Math.max(18, Math.round(baseParticlesPerPop * stage.intensity));
        for (let j = 0; j < particlesPerPop; j++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = (3 + Math.random() * 5.1) * (0.88 + stage.intensity * 0.18);
          particles.push({
            delay: stage.delay,
            x: rx * viewWidth, y: ry * viewHeight,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (4.1 + stage.intensity * 1.0),
            spin: Math.random() * Math.PI * 2,
            spinV: (Math.random() - .5) * .17,
            width: (3 + Math.random() * 4) * (stage.grand ? 1.18 : 1),
            height: (6 + Math.random() * 8) * (stage.grand ? 1.18 : 1),
            color: colors[(stageIndex * 3 + originIndex + j) % colors.length],
            stream: j % (stage.grand ? 7 : 10) === 0,
            started: false
          });
        }
      });
    });

    const startAt = performance.now();
    const lastDelay = sequence[sequence.length - 1].delay;
    const particleLifetime = 6000;
    const fadeStart = 4600;
    const duration = lastDelay + particleLifetime + 900;
    let previousFrame = startAt;
    const draw = (now) => {
      const elapsed = now - startAt;
      const step = Math.min(2, Math.max(.5, (now - previousFrame) / 16.67));
      previousFrame = now;
      ctx.clearRect(0, 0, viewWidth, viewHeight);
      for (const p of particles) {
        if (elapsed < p.delay) continue;
        // The particle only starts moving when its individual pop takes place.
        if (!p.started) { p.started = true; p.birth = elapsed; }
        p.x += p.vx * step;
        p.y += p.vy * step;
        p.vy += .105 * step;
        p.vx *= Math.pow(.995, step);
        p.spin += p.spinV * step;
        // Let older bursts drift out naturally without covering the date card.
        const age = elapsed - p.birth;
        if (age > particleLifetime || p.y > viewHeight + 42 || p.x < -42 || p.x > viewWidth + 42) continue;
        ctx.save();
        ctx.globalAlpha = age > fadeStart ? Math.max(0, (particleLifetime - age) / (particleLifetime - fadeStart)) : 1;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.fillStyle = p.color;
        if (p.stream) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(7, 8, 0, 18);
          ctx.quadraticCurveTo(-7, 26, 0, 34);
          ctx.stroke();
        } else {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }
        ctx.restore();
      }
      if (elapsed < duration) {
        celebrationFrame = window.requestAnimationFrame(draw);
      } else {
        celebrationFrame = null;
        celebration.classList.remove('is-celebrating');
        ctx.clearRect(0, 0, viewWidth, viewHeight);
      }
    };
    celebrationFrame = window.requestAnimationFrame(draw);
    celebrationTimeout = window.setTimeout(() => {
      celebration.classList.remove('is-celebrating');
    }, duration + 100);
  }

  dateSeal.addEventListener('click', () => {
    if (hasRevealedWeddingDate) return;
    hasRevealedWeddingDate = true;
    dateReveal.classList.add('is-revealed');
    $('#countdown').classList.add('date-is-revealed');
    dateSeal.setAttribute('aria-expanded', 'true');
    dateSeal.disabled = true;
    $('#dateRevealContent').setAttribute('aria-hidden', 'false');
    $('#captionBefore').setAttribute('aria-hidden', 'true');
    $('#captionAfter').setAttribute('aria-hidden', 'false');
    $('#dateRevealInstruction').textContent = '\u00A0';
    $('#dateRevealAnnouncement').textContent =
      'Save the date. ' + monthName + ' ' + weddingDateDay + ', ' + weddingDateYear + '.';
    window.setTimeout(celebrateDate, motionReduced.matches ? 0 : 60);
  });

  // Reveal animations only once, gracefully degraded if observers are unsupported.
  const panels = $$('.reveal');
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible'); observer.unobserve(entry.target);
    }), {rootMargin:'0px 0px -40px 0px',threshold:.09});
    panels.forEach((p,i) => {p.style.transitionDelay = ((i % 3) * 0.09) + 's'; observer.observe(p);});
  } else panels.forEach(p => p.classList.add('visible'));

  // Music begins only in the actual OPEN INVITATION click gesture,
  // avoiding autoplay restrictions on mobile browsers.
  const audio = $('#weddingMusic');
  const musicButton = $('#musicToggle');
  let musicStarted = false;
  if (data.music) {
    audio.src = data.music;
    audio.loop = true;
    audio.volume = 0.75;
    musicButton.hidden = false;
  }
  function syncMusicButton() {
    const muted = audio.muted;
    musicButton.dataset.muted = String(muted);
    musicButton.setAttribute('aria-label', muted ? 'Unmute background music' : 'Mute background music');
    musicButton.setAttribute('title', muted ? 'Unmute background music' : 'Mute background music');
    musicButton.setAttribute('aria-pressed', String(muted));
    musicButton.dataset.playing = String(!audio.paused);
  }
  audio.addEventListener('play', syncMusicButton);
  audio.addEventListener('pause', syncMusicButton);
  audio.addEventListener('volumechange', syncMusicButton);
  audio.addEventListener('error', () => {
    musicButton.hidden = true;
    showToast('Background music could not be loaded');
  });
  function playWeddingMusic() {
    if (!data.music || !audio.paused) return;
    const playback = audio.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        syncMusicButton();
        showToast('Tap the music button to enable sound');
      });
    }
  }
  // Muting changes only the volume state: the music keeps its position.
  // If a browser blocked first playback, an unmute tap can also retry it.
  musicButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (!audio.muted && opened && audio.paused) playWeddingMusic();
    syncMusicButton();
  });
  syncMusicButton();
  resetHeroIntroAnimation();
  // The page scroll remains native: avoid intercepting wheel/touch events.
  // The storytelling layer is updated once per animation frame, with all
  // geometry read BEFORE modifying any style (no forced layout round-trip).
  const progress = $('#scrollProgress');
  const heroStage = $('#heroStage');
  const heroScene = $('#top');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clamp01 = n => Math.max(0, Math.min(1, n));
  const smoothstep = t => t*t*(3 - 2*t);
  let scrollRaf = 0;
  let lastStoryDistance = -1;
  let lastStoryViewport = -1;

  function stopHeroIdleZoom(resetToDefault = true) {
    heroIdleActive = false;
    if (heroIdleRaf) { cancelAnimationFrame(heroIdleRaf); heroIdleRaf = null; }
    if (resetToDefault) heroIdleZoom = 1;
  }
  function maybeStartHeroIdleZoom(scrollTop = (window.scrollY || window.pageYOffset || 0)) {
    const shouldRun = opened && heroIdleReady && !reducedMotion.matches && scrollTop < 1;
    if (shouldRun) {
      if (!heroIdleActive) {
        heroIdleActive = true;
        heroIdleStart = performance.now();
        const tick = (now) => {
          if (!heroIdleActive) return;
          const elapsed = (now - heroIdleStart) / 1000;
          const onMobile = window.matchMedia('(max-width: 600px)').matches;
          if (onMobile) {
            // A gently perceptible 1.00→1.045→1.00 breathing cycle on phones.
            // Begin at exactly 1 to avoid a visual jump as the doors open.
            const phase = (elapsed / 10) * Math.PI * 2;
            heroIdleZoom = 1 + 0.045 * (1 - Math.cos(phase)) / 2;
          } else {
            // Keep the existing subtle desktop animation exactly as approved.
            heroIdleZoom = 1 + 0.008 * Math.sin((elapsed / 12) * Math.PI * 2);
          }
          // At the top, only the GPU-composited palace scale changes;
          // don't re-measure the page or recalculate the progress bar.
          heroStage.style.setProperty('--palace-scale', heroIdleZoom.toFixed(4));
          heroIdleRaf = requestAnimationFrame(tick);
        };
        heroIdleRaf = requestAnimationFrame(tick);
      }
    } else if (heroIdleActive || heroIdleZoom !== 1) {
      stopHeroIdleZoom(true);
    }
  }
  function updateScrollStory(distance, viewport) {
    if (reducedMotion.matches) {
      heroStage.style.removeProperty('--welcome-shift');
      heroStage.style.removeProperty('--welcome-opacity');
      heroStage.style.removeProperty('--palace-shift');
      heroStage.style.removeProperty('--palace-scale');
      heroStage.style.removeProperty('--scroll-prompt-opacity');
      heroStage.style.removeProperty('--welcome-interaction');
      heroStage.style.removeProperty('--scroll-prompt-interaction');
      return;
    }
    // Skip identical off-screen work while retaining correct reverse scrolling.
    if (distance === lastStoryDistance && viewport === lastStoryViewport) return;
    lastStoryDistance = distance;
    lastStoryViewport = viewport;
    const p = distance / viewport;
    // Fade completes before the cream panel is halfway up, as approved.
    const fade = 1 - smoothstep(clamp01((p - .035) / .425));
    const titleLift = -Math.min(distance * .83, viewport * .68);
    const palaceLift = -Math.min(distance * .13, viewport * .12);
    const palaceZoom = (1 + .018 * clamp01(p / .55)) * heroIdleZoom;
    const promptFade = 1 - smoothstep(clamp01((p - .035) / .24));
    heroStage.style.setProperty('--welcome-shift', titleLift.toFixed(1) + 'px');
    heroStage.style.setProperty('--welcome-opacity', fade.toFixed(3));
    heroStage.style.setProperty('--palace-shift', palaceLift.toFixed(1) + 'px');
    heroStage.style.setProperty('--palace-scale', palaceZoom.toFixed(4));
    heroStage.style.setProperty('--scroll-prompt-opacity', promptFade.toFixed(3));
    heroStage.style.setProperty('--welcome-interaction', fade < .03 ? 'none' : 'auto');
    heroStage.style.setProperty('--scroll-prompt-interaction', promptFade < .03 ? 'none' : 'auto');
  }
  function updateScrollFrame() {
    scrollRaf = 0;
    // READ geometry first, without an earlier write forcing synchronous layout.
    const viewport = window.innerHeight || 800;
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    const total = Math.max(1, document.documentElement.scrollHeight - viewport);
    const distance = Math.max(0, -heroScene.getBoundingClientRect().top);
    maybeStartHeroIdleZoom(scrollTop);
    updateScrollStory(distance, viewport);
    // GPU transform instead of mutating layout-dependent width.
    progress.style.transform = 'scaleX(' + clamp01(scrollTop / total).toFixed(5) + ')';
  }
  function requestScrollFrame() {
    if (!scrollRaf) scrollRaf = requestAnimationFrame(updateScrollFrame);
  }
  window.addEventListener('scroll', requestScrollFrame, {passive:true});
  window.addEventListener('resize', requestScrollFrame, {passive:true});
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', requestScrollFrame);
  else if (reducedMotion.addListener) reducedMotion.addListener(requestScrollFrame);
  requestScrollFrame();
  const toast = $('#toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message; toast.classList.add('is-visible');
    window.clearTimeout(toastTimer); toastTimer=window.setTimeout(()=>toast.classList.remove('is-visible'),2500);
  }
})();
