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
  page.style.setProperty('--god', god.color);
  page.style.setProperty('--god-dark', god.dark);
  page.style.setProperty('--god-tint', god.tint);

  const plan = WORKOUTS[god.id] || [];
  const exByName = Object.fromEntries(EXERCISES.filter(e => e.god === god.id).map(e => [e.name, e]));

  // progress: { exerciseIndex: completedSetCount }
  const progress = plan.map(() => 0);
  const totalSets = plan.reduce((sum, item) => sum + item.sets, 0);

  function totalDone() {
    return progress.reduce((a, b) => a + b, 0);
  }

  function xpRow() {
    const xp = getXp(state, god.id);
    const lvl = godLevel(xp);
    const pct = godProgressPct(xp);
    return { xp, lvl, pct };
  }

  function render() {
    const { xp, lvl, pct } = xpRow();
    const done = totalDone();
    const allDone = done === totalSets && totalSets > 0;

    const moreExercises = EXERCISES.filter(e => e.god === god.id && !plan.find(p => p.name === e.name));

    page.innerHTML = `
      <div class="god-banner">
        <div class="style-label">${god.style.toUpperCase()}</div>
        <h1>${god.name.toUpperCase()}</h1>
        <div class="epithet">${god.epithet}</div>
        <div class="blurb">${god.blurb}</div>
        <div class="god-level-row"><span class="tier">${tierForLevel(lvl)} · LVL ${lvl}</span></div>
      </div>
      <div class="god-xp-track">
        <div class="row"><span>PROGRESS TO NEXT LEVEL</span><span>${xp} XP</span></div>
        <div class="track"><div class="fill" style="width:${pct}%"></div></div>
      </div>

      <div class="rite">
        <div class="rite-head">
          <h2>Today's Rite</h2>
          <div class="rite-progress">${done} / ${totalSets} SETS</div>
        </div>
        <div class="rite-list">
          ${plan.map((item, i) => {
            const meta = exByName[item.name] || {};
            const dots = Array.from({ length: item.sets }, (_, s) =>
              `<button class="set-dot${s < progress[i] ? ' done' : ''}" data-ex="${i}" data-set="${s}">${s + 1}</button>`
            ).join('');
            return `
              <div class="rite-item">
                <div class="top-row">
                  <span class="ex-name">${item.name}</span>
                  <span class="prescribed">${item.sets} × ${item.reps}${meta.muscle ? ` · ${meta.muscle}` : ''}</span>
                </div>
                <div class="set-dots">${dots}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="complete-cta">
        <button id="completeBtn" class="complete-btn" ${allDone ? '' : 'disabled'}>
          COMPLETE THE RITE
        </button>
        <div id="offeringMsg"></div>
      </div>

      ${moreExercises.length ? `
        <div class="more-rites">
          <h3>More Exercises of ${god.name}</h3>
          <ul>${moreExercises.map(e => `<li>${e.name} — <em>${e.muscle}</em></li>`).join('')}</ul>
        </div>
      ` : ''}

      <p style="text-align:center;margin:-10px 0 40px">
        <a class="back-link" href="index.html">← Return to the Temple</a>
      </p>
    `;

    page.querySelectorAll('.set-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const i = Number(dot.dataset.ex);
        const s = Number(dot.dataset.set);
        // toggling a dot fills/empties up through that set
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
        const { xp, lvl, pct } = xpRow();
        document.querySelector('.god-xp-track .row span:last-child').textContent = `${xp} XP`;
        document.querySelector('.god-xp-track .fill').style.width = `${pct}%`;
        document.querySelector('.god-level-row .tier').textContent = `${tierForLevel(lvl)} · LVL ${lvl}`;
      });
    }
  }

  render();
})();
