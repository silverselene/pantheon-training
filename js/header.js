// Renders the streak / level badges shared by both pages.
function renderHeaderBadges(state) {
  const el = document.getElementById('headerBadges');
  if (!el) return;
  const level = overallLevel(state);
  const tier = tierForLevel(level);
  el.innerHTML = `
    <div class="badge">STREAK · ${state.streak} DAY${state.streak === 1 ? '' : 'S'}</div>
    <div class="badge gold">${tier} · LVL ${level}</div>
  `;
}
