(function () {
  const state = loadState();
  renderHeaderBadges(state);

  // ---------- colonnade ----------
  const colonnade = document.getElementById('colonnade');
  const template = document.getElementById('columnTemplate');

  GODS.forEach(g => {
    const node = template.content.cloneNode(true);
    const link = node.querySelector('.column-link');
    const xp = getXp(state, g.id);
    const lvl = godLevel(xp);
    const pct = godProgressPct(xp);

    link.href = `workout.html?god=${g.id}`;
    link.style.setProperty('--god', g.color);
    link.style.setProperty('--god-dark', g.dark);
    link.style.setProperty('--god-tint', g.tint);

    node.querySelector('.style-label').textContent = g.style.toUpperCase();
    node.querySelector('.name').textContent = g.name.toUpperCase();
    node.querySelector('.epithet').textContent = g.epithet;
    node.querySelector('.lvl').textContent = `LVL ${lvl}`;
    node.querySelector('.xp').textContent = `${xp} XP`;
    node.querySelector('.fill').style.width = `${pct}%`;

    colonnade.appendChild(node);
  });

  // ---------- god cards ----------
  const godCardsEl = document.getElementById('godCards');
  const cardTemplate = document.getElementById('godCardTemplate');

  GODS.forEach(g => {
    const node = cardTemplate.content.cloneNode(true);
    const card = node.querySelector('.god-card');
    card.href = `workout.html?god=${g.id}`;
    card.style.setProperty('--god', g.color);
    card.style.setProperty('--god-dark', g.dark);
    card.style.setProperty('--god-tint', g.tint);

    node.querySelector('.card-name').textContent = g.name.toUpperCase();
    node.querySelector('.card-style').textContent = g.style.toUpperCase();
    node.querySelector('.card-copy').textContent = g.cardCopy;
    node.querySelector('.card-equip').textContent = g.equipmentLine;

    const samplesEl = node.querySelector('.card-samples');
    const samples = (WORKOUTS[g.id] || []).slice(0, 3);
    samples.forEach(ex => {
      const tag = document.createElement('span');
      tag.className = 'sample-tag';
      tag.textContent = ex.name;
      samplesEl.appendChild(tag);
    });

    godCardsEl.appendChild(node);
  });

  // ---------- archive ----------
  const searchInput = document.getElementById('searchInput');
  const clearGodBtn = document.getElementById('clearGodBtn');
  const godPillsEl = document.getElementById('godPills');
  const equipSelect = document.getElementById('equipSelect');
  const rowsEl = document.getElementById('archiveRows');
  const noResultsEl = document.getElementById('noResults');
  const resultCountEl = document.getElementById('resultCount');

  const byId = Object.fromEntries(GODS.map(g => [g.id, g]));
  const equipOptions = [...new Set(EXERCISES.map(e => e.equip))].sort();
  equipOptions.forEach(eq => {
    const opt = document.createElement('option');
    opt.value = eq;
    opt.textContent = eq;
    equipSelect.appendChild(opt);
  });

  const filterState = { search: '', god: 'all', equip: 'all' };
  const retags = {}; // exercise index -> reassigned god id (session-only)

  function renderGodPills() {
    godPillsEl.innerHTML = '';
    GODS.forEach(g => {
      const btn = document.createElement('button');
      btn.className = 'pill' + (filterState.god === g.id ? ' active' : '');
      btn.textContent = g.name.toUpperCase();
      if (filterState.god === g.id) {
        btn.style.borderColor = g.color;
        btn.style.background = g.tint;
        btn.style.color = g.dark;
      }
      btn.addEventListener('click', () => {
        filterState.god = filterState.god === g.id ? 'all' : g.id;
        renderGodPills();
        renderRows();
      });
      godPillsEl.appendChild(btn);
    });
    clearGodBtn.classList.toggle('active', filterState.god === 'all');
  }

  function renderRows() {
    const q = filterState.search.toLowerCase();
    const withTags = EXERCISES.map((e, i) => ({ ...e, god: retags[i] ?? e.god, _i: i }));
    const filtered = withTags
      .filter(e => filterState.god === 'all' || e.god === filterState.god)
      .filter(e => filterState.equip === 'all' || e.equip === filterState.equip)
      .filter(e => !q || e.name.toLowerCase().includes(q) || e.muscle.toLowerCase().includes(q));

    resultCountEl.textContent = filtered.length;
    rowsEl.innerHTML = '';
    noResultsEl.style.display = filtered.length === 0 ? '' : 'none';

    filtered.forEach(e => {
      const g = byId[e.god];
      const row = document.createElement('div');
      row.className = 'archive-row';
      row.innerHTML = `
        <span class="ex-name">${e.name}</span>
        <span></span>
        <span class="ex-muscle">${e.muscle}</span>
        <span class="ex-equip">${e.equip}</span>
        <a class="ex-view" href="workout.html?god=${e.god}">VIEW RITE →</a>
      `;
      const godCell = row.children[1];
      const select = document.createElement('select');
      select.className = 'god-select';
      select.style.setProperty('--god', g.color);
      select.style.setProperty('--god-tint', g.tint);
      select.style.setProperty('--god-dark', g.dark);
      GODS.forEach(gg => {
        const opt = document.createElement('option');
        opt.value = gg.id;
        opt.textContent = gg.name;
        if (gg.id === e.god) opt.selected = true;
        select.appendChild(opt);
      });
      select.addEventListener('change', ev => {
        retags[e._i] = ev.target.value;
        renderRows();
      });
      godCell.appendChild(select);
      rowsEl.appendChild(row);
    });
  }

  searchInput.addEventListener('input', ev => {
    filterState.search = ev.target.value;
    renderRows();
  });
  clearGodBtn.addEventListener('click', () => {
    filterState.god = 'all';
    renderGodPills();
    renderRows();
  });
  equipSelect.addEventListener('change', ev => {
    filterState.equip = ev.target.value;
    renderRows();
  });

  renderGodPills();
  renderRows();
})();
