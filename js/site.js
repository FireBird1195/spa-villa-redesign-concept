/* Spa Villa concept — progressive enhancement. Nothing on this page sends or stores data. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BRANCHES = {
    dh: { name: 'Spa Villa, Dharampeth', short: 'Dharampeth', phone: '+91 77210 77210', tel: '+917721077210', wa: '917721077210' },
    cs: { name: 'Spa Villa, Chhatrapati Square', short: 'Chhatrapati Square', phone: '+91 93706 60101', tel: '+919370660101', wa: '919370660101' }
  };

  // Header: transparent over the hero, solid once scrolled
  const header = $('.site-header');
  const setHdr = () => document.documentElement.style.setProperty('--hdr', header.getBoundingClientRect().bottom + 'px');
  const onScroll = () => { header.classList.toggle('solid', scrollY > 40); };
  const callbar = $('#callbar');
  const onScroll2 = () => { if (callbar) callbar.classList.toggle('show', scrollY > innerHeight * 0.6); };
  addEventListener('scroll', () => { onScroll(); onScroll2(); }, { passive: true }); onScroll(); onScroll2();

  // Mobile nav
  const btn = $('.menu-btn'), nav = $('#nav');
  if (btn) {
    const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', () => { setHdr(); const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); header.classList.add('solid'); if (o) $('a', nav).focus(); });
    $$('a', nav).forEach(a => a.addEventListener('click', close));
    addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); btn.focus(); } });
    addEventListener('resize', () => { if (innerWidth > 820) close(); });
  }

  // Walk-through carousel
  const track = $('#track');
  if (track) {
    const stops = $$('.stop', track), prev = $('#prev'), next = $('#next'), count = $('#count'), bar = $('#bar');
    const current = () => {
      const x = track.scrollLeft;
      let i = 0; stops.forEach((s, k) => { if (s.offsetLeft - track.offsetLeft - 40 <= x) i = k; });
      if (x + track.clientWidth >= track.scrollWidth - 4) i = stops.length - 1;
      return i;
    };
    const update = () => {
      const i = current(), n = stops.length;
      count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
      bar.style.width = `${((i + 1) / n) * 100}%`;
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    const go = d => {
      const i = Math.max(0, Math.min(stops.length - 1, current() + d));
      track.scrollTo({ left: stops[i].offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduce ? 'auto' : 'smooth' });
    };
    prev.addEventListener('click', () => go(-1)); next.addEventListener('click', () => go(1));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
    let t; track.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(update, 60); }, { passive: true });
    addEventListener('resize', update); update();
  }

  // Menu index: image preview follows hover/focus
  const occ = $('#occ');
  if (occ) {
    const imgs = $$('.preview img');
    $$('a', occ).forEach(a => {
      const show = () => { imgs.forEach((im, k) => im.classList.toggle('on', String(k) === a.dataset.img)); $$('a', occ).forEach(x => x.classList.toggle('active', x === a)); };
      a.addEventListener('mouseenter', show); a.addEventListener('focus', show);
    });
  }

  // Branch tabs + map pins + planner stay in sync
  const tabs = $$('[role="tab"][data-b]');
  const setBranch = (b, fromPlanner) => {
    tabs.forEach(t => { const on = t.dataset.b === b; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; $('#' + t.getAttribute('aria-controls')).hidden = !on; });
    $$('.citymap .pin').forEach(p => p.classList.toggle('on', p.dataset.b === b));
    if (!fromPlanner) { const r = $(`#planner input[name=branch][value=${b}]`); if (r) { r.checked = true; buildMsg(); } }
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => setBranch(t.dataset.b));
    t.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; setBranch(n.dataset.b); n.focus(); }
    });
  });
  $$('.citymap .pin').forEach(p => p.addEventListener('click', () => setBranch(p.dataset.b)));

  // Visit planner: composes a message; the guest sends it themselves
  const form = $('#planner');
  function buildMsg() {
    if (!form) return;
    const d = new FormData(form);
    const b = BRANCHES[d.get('branch')];
    const guests = { '1': 'one person', '2': 'two people', '3+': 'three or more people' }[d.get('guests')];
    let when = 'a day that suits you';
    const dateEl = $('#p-date'), err = $('#e-date');
    if (dateEl.value) {
      const picked = new Date(dateEl.value + 'T12:00'), today = new Date(); today.setHours(0, 0, 0, 0);
      if (picked < today) { dateEl.setAttribute('aria-invalid', 'true'); err.textContent = 'Please choose today or a later date.'; }
      else { dateEl.removeAttribute('aria-invalid'); err.textContent = ''; when = picked.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }); }
    } else { dateEl.removeAttribute('aria-invalid'); err.textContent = ''; }
    const name = (d.get('name') || '').trim().replace(/[<>]/g, '');
    const treat = d.get('treat');
    const text = `Hello Spa Villa ${b.short},${name ? ` this is ${name}.` : ''}\nI'd like to book ${treat.startsWith('Not sure') ? 'a treatment (please suggest one)' : treat.startsWith('A gift') ? 'a treatment as a gift' : 'the ' + treat} for ${guests}, on ${when}, ${d.get('time').toLowerCase()}.\nIs there a slot available?`;
    $('#bubble').textContent = text;
    $('#to-name').textContent = b.name; $('#to-phone').textContent = b.phone;
    $('#wa').href = `https://wa.me/${b.wa}?text=${encodeURIComponent(text)}`;
    $('#call').href = `tel:${b.tel}`; $('#call').textContent = `Call ${b.short}`;
    form.dataset.text = text;
  }
  if (form) {
    const dateEl = $('#p-date');
    const iso = new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    dateEl.min = iso;
    const q = new URLSearchParams(location.search).get('t');
    const pick = name => { const o = [...$('#p-treat').options].find(o => o.text.toLowerCase() === name.toLowerCase()); if (o) $('#p-treat').value = o.value; };
    if (q) pick(q);
    $$('[data-treat]').forEach(a => a.addEventListener('click', () => { pick(a.dataset.treat); buildMsg(); }));
    form.addEventListener('input', buildMsg); form.addEventListener('change', e => { if (e.target.name === 'branch') setBranch(e.target.value, true); buildMsg(); });
    form.addEventListener('submit', e => e.preventDefault());
    $('#wa').addEventListener('click', e => { if ($('#p-date').getAttribute('aria-invalid') === 'true') { e.preventDefault(); $('#p-date').focus(); } });
    $('#copy').addEventListener('click', async () => {
      const s = $('#status');
      try { await navigator.clipboard.writeText(form.dataset.text); s.textContent = 'Message copied. Paste it into WhatsApp or SMS.'; }
      catch { s.textContent = 'Copy isn’t available in this browser. Select the message text and copy it.'; }
    });
    buildMsg();
  }

  // Treatments finder
  const list = $('#tlist');
  if (list) {
    const rows = $$('.tr', list), rc = $('#rc'), none = $('#none');
    const params = new URLSearchParams(location.search);
    ['time', 'who'].forEach(k => { const v = params.get(k); const r = v && $(`.finder input[name=${k}][value="${v}"]`); if (r) r.checked = true; });
    const apply = () => {
      const time = $('.finder input[name=time]:checked').value, who = $('.finder input[name=who]:checked').value;
      let n = 0;
      rows.forEach(r => {
        const ok = (time === 'any' || r.dataset.time === time) && (who === 'any' || r.dataset.who === who);
        r.hidden = !ok; if (ok) n++;
      });
      none.hidden = n > 0;
      rc.textContent = n === rows.length ? `Showing all ${n} treatments` : `${n} of ${rows.length} treatments match`;
      const u = new URL(location); ['time', 'who'].forEach(k => { const v = $(`.finder input[name=${k}]:checked`).value; v === 'any' ? u.searchParams.delete(k) : u.searchParams.set(k, v); });
      history.replaceState(null, '', u);
    };
    $$('.finder input').forEach(i => i.addEventListener('change', apply));
    $('#sort').addEventListener('change', e => {
      const v = e.target.value, p = r => +r.dataset.price;
      [...rows].sort((a, b) => v === 'lo' ? p(a) - p(b) : v === 'hi' ? p(b) - p(a) : a.dataset.o - b.dataset.o).forEach(r => list.appendChild(r));
    });
    apply();

    const boxes = $$('[data-cmp]'), bar = $('#traybar'), dlg = $('#cmp');
    const chosen = () => boxes.filter(b => b.checked).map(b => b.closest('.tr'));
    const sync = () => {
      const n = chosen().length; bar.hidden = n === 0;
      $('#trayn').textContent = n < 2 ? `${n} selected, pick ${2 - n} more` : `${n} of 3 selected`;
      $('#opencmp').disabled = n < 2;
      boxes.forEach(b => { b.disabled = !b.checked && n >= 3; });
    };
    boxes.forEach(b => b.addEventListener('change', sync));
    $('#clearcmp').addEventListener('click', () => { boxes.forEach(b => { b.checked = false; }); sync(); });
    $('#opencmp').addEventListener('click', () => {
      const rs = chosen(), esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
      const txt = (r, s) => esc(r.querySelector(s)?.textContent.trim() || '—');
      const row = (h, f) => `<tr><th scope="row">${h}</th>${rs.map(r => `<td>${f(r)}</td>`).join('')}</tr>`;
      $('#cmpbody').innerHTML = `<table class="ct"><thead><tr><td></td>${rs.map(r => `<th scope="col">${txt(r, 'h2')}</th>`).join('')}</tr></thead><tbody>` +
        row('Price', r => txt(r, '.price')) + row('Time', r => txt(r, '.dur')) + row('Type', r => txt(r, '.kind')) +
        row('Includes', r => $$('.chips li', r).map(li => esc(li.textContent)).join(', ')) + '</tbody></table>';
      dlg.showModal();
    });
    $('#closecmp').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    sync();
  }

  // Reveal on scroll
  const rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));
})();
