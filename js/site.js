/* Spa Villa concept — progressive enhancement only. No data leaves the page. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Mobile navigation
  const toggle = $('.nav-toggle'), nav = $('#nav');
  if (toggle && nav) {
    const close = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    $$('a', nav).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); } });
  }

  // Treatment prefill links carry the treatment name to the enquiry form
  $$('a[data-prefill]').forEach(a => {
    const base = a.getAttribute('href').split('#')[0] || location.pathname.split('/').pop() || './';
    a.href = `${base}?treatment=${encodeURIComponent(a.dataset.prefill)}#enquire`;
  });

  // Branch tabs (WAI-ARIA tabs pattern)
  const tabs = $$('[role="tab"]');
  const select = t => {
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      $('#' + x.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); const n = tabs[(i + k + tabs.length) % tabs.length]; select(n); n.focus(); }
    });
  });

  // Callback form: validate, then show a local confirmation. Nothing is sent or stored.
  const form = $('form.callback');
  if (form) {
    const q = new URLSearchParams(location.search).get('treatment');
    if (q) {
      const sel = $('#f-treat');
      const match = [...sel.options].find(o => o.text.toLowerCase().replace(/synchroni[sz]ed/, 's') === q.toLowerCase().replace(/synchroni[sz]ed/, 's'));
      if (match) sel.value = match.value;
    }
    const rules = {
      name: v => v.trim().length >= 2 || 'Please enter your name.',
      phone: v => /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/.test(v.trim()) || 'Please enter a valid 10-digit Indian mobile number.'
    };
    const check = input => {
      const res = rules[input.name](input.value);
      const err = $('#e-' + input.name);
      if (res === true) { input.removeAttribute('aria-invalid'); err.textContent = ''; return true; }
      input.setAttribute('aria-invalid', 'true'); err.textContent = res; return false;
    };
    Object.keys(rules).forEach(n => {
      const el = form.elements[n];
      el.addEventListener('blur', e => { if (e.target.value) check(e.target); });
      // Clear an error as soon as the entry becomes valid, so the layout settles before the user reaches the button
      el.addEventListener('input', e => { if (e.target.getAttribute('aria-invalid') === 'true') check(e.target); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = Object.keys(rules).map(n => form.elements[n]).filter(i => !check(i));
      if (bad.length) { bad[0].focus(); return; }
      const d = new FormData(form);
      const box = document.createElement('div');
      box.className = 'confirm'; box.tabIndex = -1; box.setAttribute('role', 'status');
      const h = document.createElement('h3'); h.textContent = `Thank you, ${d.get('name').trim().split(' ')[0]}.`;
      const p1 = document.createElement('p');
      p1.textContent = `In the live site, the ${d.get('branch') === 'Either' ? 'nearest' : d.get('branch')} team would call you in the ${d.get('when').toLowerCase()} about: ${d.get('treatment')}.`;
      const p2 = document.createElement('p');
      p2.innerHTML = '<strong>This is a concept prototype.</strong> Your details were not sent or saved. To reach Spa Villa now, call <a href="tel:+919370660101">+91 93706 60101</a>.';
      const again = document.createElement('button'); again.type = 'button'; again.className = 'btn ghost'; again.textContent = 'Start again';
      again.addEventListener('click', () => { form.reset(); box.replaceWith(form); form.elements.name.focus(); });
      box.append(h, p1, p2, again);
      form.replaceWith(box); box.focus();
    });
  }

  // Treatments: filter, sort, compare
  const menu = $('#menu');
  if (menu) {
    const items = $$('.treat', menu);
    const count = $('#count'), empty = $('#empty');
    let filter = 'all';
    const apply = () => {
      let shown = 0;
      items.forEach(li => { const on = filter === 'all' || li.dataset.cat === filter; li.hidden = !on; if (on) shown++; });
      empty.hidden = shown > 0;
      count.textContent = `${shown} treatment${shown === 1 ? '' : 's'} shown`;
    };
    $$('[data-filter]').forEach(b => b.addEventListener('click', () => {
      filter = b.dataset.filter;
      $$('[data-filter]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      apply();
    }));
    const hashMap = { signature: 1, 'for-two': 1, 'full-body': 1, express: 1 };
    $('#sort').addEventListener('change', e => {
      const v = e.target.value;
      const num = (li, k) => Number(li.dataset[k]) || 999;
      const sorted = [...items].sort((a, b) =>
        v === 'price-asc' ? num(a, 'price') - num(b, 'price') :
        v === 'price-desc' ? num(b, 'price') - num(a, 'price') :
        v === 'dur-asc' ? num(a, 'dur') - num(b, 'dur') || num(a, 'price') - num(b, 'price') :
        num(a, 'order') - num(b, 'order'));
      sorted.forEach(li => menu.appendChild(li));
    });

    const tray = $('#tray'), dlg = $('#compare');
    const boxes = $$('[data-compare]');
    const picked = () => boxes.filter(b => b.checked).map(b => b.closest('.treat'));
    const sync = () => {
      const n = picked().length;
      tray.hidden = n === 0;
      $('#tray-count').textContent = `${n} of 3 selected`;
      $('#open-compare').disabled = n < 2;
      boxes.forEach(b => { b.disabled = !b.checked && n >= 3; });
    };
    boxes.forEach(b => b.addEventListener('change', sync));
    $('#clear-compare').addEventListener('click', () => { boxes.forEach(b => { b.checked = false; }); sync(); });
    $('#open-compare').addEventListener('click', () => {
      const rows = picked();
      const cell = (li, sel) => li.querySelector(sel)?.textContent.trim() || '—';
      const t = document.createElement('table'); t.className = 'cmp';
      const head = '<thead><tr><th scope="col"><span class="visually-hidden">Attribute</span></th>' + rows.map(li => `<th scope="col">${li.querySelector('h2').innerHTML}</th>`).join('') + '</tr></thead>';
      const line = (label, fn) => `<tr><th scope="row">${label}</th>${rows.map(li => `<td>${fn(li)}</td>`).join('')}</tr>`;
      t.innerHTML = head + '<tbody>' +
        line('Price', li => cell(li, '.price')) +
        line('Duration', li => cell(li, '.dur')) +
        line('Type', li => cell(li, '.cat')) +
        line('Includes', li => $$('.facts li', li).map(x => x.innerHTML).join(', ')) +
        '</tbody>';
      const body = $('#cmp-body'); body.replaceChildren(t);
      dlg.showModal();
    });
    $('#close-compare').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    apply(); sync();

    // Category anchors from the homepage pre-select the matching filter
    const fromHash = location.hash.slice(1);
    if (hashMap[fromHash]) $(`[data-filter="${fromHash}"]`)?.click();
  }

  // Gentle reveal
  const rv = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));
})();
