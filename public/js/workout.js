(function () {
  const state = loadState();
  renderHeaderBadges(state);

  const params = new URLSearchParams(window.location.search);
  const godId = params.get('god');
  const god = GODS.find(g => g.id === godId);
  const page = document.getElementById('page');

  if (!god) {
    const tpl = document.getElementById('notFoundTemplate');
    page.appendChild(tpl.content.cloneNode(true));
    return;
  }

  document.title = `Pantheon Training — ${god.name}'s Rite`;
  document.body.style.setProperty('--accent', god.theme.accent);
  document.body.style.setProperty('--accent-light', god.theme.light);
  document.body.style.setProperty('--accent-pale', god.theme.pale);
  document.body.style.setProperty('--mid', god.theme.mid);

  const godExercises = EXERCISES.filter(e => e.god === god.id);

  let currentSetting = state.setting || 'all';
  let plan = [];
  let progress = [];

  function rebuildPlan() {
    plan = godExercises.filter(e => currentSetting === 'all' || e.settings.includes(currentSetting));
    progress = plan.map(() => 0);
  }
  rebuildPlan();

  function totalSets() {
    return plan.reduce((sum, item) => sum + item.sets, 0);
  }

  function totalDone() {
    return progress.reduce((a, b) => a + b, 0);
  }

  function mediaPanelHtml() {
    if (god.youtubePlaylistId) {
      return `
        <div class="media-frame">
          <iframe src="https://www.youtube.com/embed/videoseries?list=${god.youtubePlaylistId}"
            title="${god.name} training playlist" allowfullscreen></iframe>
        </div>
      `;
    }
    return `
      <div class="media-frame">
        <div class="media-placeholder">
          <div class="icon">${god.icon}</div>
          <div class="msg">No playlist linked yet.<br>Add a YouTube playlist ID for ${god.name} in data.js.</div>
        </div>
      </div>
    `;
  }

  function settingPillsHtml() {
    const all = `<button class="pill setting-pill${currentSetting === 'all' ? ' active' : ''}" data-setting="all">ALL</button>`;
    const rest = TRAINING_SETTINGS.map(s =>
      `<button class="pill setting-pill${currentSetting === s.id ? ' active' : ''}" data-setting="${s.id}">${s.label.toUpperCase()}</button>`
    ).join('');
    return all + rest;
  }

  function unitToggleHtml() {
    const units = [['kg', 'KG'], ['lb', 'LB']];
    return units.map(([id, label]) =>
      `<button class="unit-pill${state.weightUnit === id ? ' active' : ''}" data-unit="${id}">${label}</button>`
    ).join('');
  }

  function render() {
    const xp = getXp(state, god.id);
    const lvl = godLevel(xp);
    const done = totalDone();
    const sets = totalSets();
    const allDone = done === sets && sets > 0;

    page.innerHTML = `
      <div class="header">
        <div class="eyebrow">The Divine Training Series · ${god.style}</div>
        <div class="god-icon">${god.icon}</div>
        <div class="god-name">${god.name.toUpperCase()}</div>
        <div class="subtitle">${god.epithet} · ${tierForLevel(lvl)} LVL ${lvl}</div>
        <div class="divider">
          <div class="divider-line"></div>
          <div class="divider-ornament">${god.ornament}</div>
          <div class="divider-line"></div>
        </div>
        <div class="subtitle equip-line">${god.equipmentLine}</div>
      </div>

      <div class="stats-bar">
        <div class="stat"><span class="stat-value">${plan.length}</span><span class="stat-label">Exercises</span></div>
        <div class="stat"><span class="stat-value">${sets}</span><span class="stat-label">Total Sets</span></div>
        <div class="stat"><span class="stat-value">${lvl}</span><span class="stat-label">Level</span></div>
        <div class="stat"><span class="stat-value">${god.style}</span><span class="stat-label">Mission</span></div>
      </div>

      <div class="layout-grid">
        <div class="left-col">
          <div class="setting-filter-row">
            <span class="filter-label">WHERE YOU TRAIN</span>
            <span id="settingPills">${settingPillsHtml()}</span>
            <span class="unit-toggle-row">
              <span class="filter-label">WEIGHTS</span>
              ${unitToggleHtml()}
            </span>
          </div>

          <div class="section-title">Today's Rite<span class="rite-progress-label">${done} / ${sets} SETS</span></div>
          <div class="exercise-list">
            ${plan.length === 0 ? `
              <div class="empty-rite">${god.name} has no exercises for this setting yet. Try a different one.</div>
            ` : plan.map((item, i) => {
              const dots = Array.from({ length: item.sets }, (_, s) =>
                `<button class="set-dot${s < progress[i] ? ' done' : ''}" data-ex="${i}" data-set="${s}">${s + 1}</button>`
              ).join('');
              const weight = getWeight(state, item.name);
              return `
                <div class="exercise">
                  <div>
                    <div class="exercise-name">${item.name} <span style="opacity:.5;font-size:13px">— ${item.muscle}</span></div>
                    ${item.note ? `<div class="exercise-note">${item.note}</div>` : ''}
                  </div>
                  <div>
                    <div class="exercise-sets">${item.sets} × ${item.reps}</div>
                    <div class="weight-field">
                      <input type="number" class="weight-input" data-ex="${i}" value="${weight ?? ''}" placeholder="—" step="0.5" min="0" inputmode="decimal" aria-label="Weight for ${item.name}">
                      <span class="weight-unit-label">${state.weightUnit}</span>
                    </div>
                    <div class="set-dots">${dots}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="wisdom-box">
            <div class="wisdom-title">${god.name}'s Command</div>
            <div class="wisdom-text">${god.command}</div>
          </div>
        </div>

        <div class="right-col">
          <div class="media-panel">
            <div class="section-title">Session Playlist</div>
            ${mediaPanelHtml()}
          </div>

          <div class="complete-panel">
            <div class="rite-progress-value">${done} / ${sets} SETS COMPLETE</div>
            <button id="completeBtn" class="complete-btn" ${allDone ? '' : 'disabled'}>COMPLETE THE RITE</button>
            <div id="offeringMsg"></div>
          </div>
        </div>
      </div>
    `;

    page.querySelectorAll('.setting-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        currentSetting = btn.dataset.setting;
        setTrainingSetting(state, currentSetting);
        rebuildPlan();
        render();
      });
    });

    page.querySelectorAll('.unit-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        setWeightUnit(state, btn.dataset.unit);
        render();
      });
    });

    page.querySelectorAll('.weight-input').forEach(inp => {
      inp.addEventListener('change', () => {
        const i = Number(inp.dataset.ex);
        const val = inp.value === '' ? null : Number(inp.value);
        setWeight(state, plan[i].name, val);
      });
    });

    page.querySelectorAll('.set-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const i = Number(dot.dataset.ex);
        const s = Number(dot.dataset.set);
        progress[i] = progress[i] > s ? s : s + 1;
        render();
      });
    });

    const completeBtn = document.getElementById('completeBtn');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        const amount = 40;
        awardXp(state, god.id, amount);
        renderHeaderBadges(state);
        document.getElementById('offeringMsg').innerHTML =
          `<div class="offering-msg">An offering accepted, ${amount} XP earned. The pillar of ${god.name} rises.</div>`;
        completeBtn.disabled = true;
      });
    }
  }

  render();
})();
