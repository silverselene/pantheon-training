// Renders the streak / level badges shared by both pages.
// Uses the light "badge" classes on the landing page and the dark "w-badge"
// classes on the workout page, based on which container is present.
function renderHeaderBadges(state) {
  const el = document.getElementById('headerBadges');
  if (!el) return;
  const level = overallLevel(state);
  const tier = tierForLevel(level);
  const isDark = el.classList.contains('w-badges');
  const cls = isDark ? 'w-badge' : 'badge';
  const goldCls = isDark ? 'w-badge' : 'badge gold';
  el.innerHTML = `
    <div class="${cls}">STREAK · ${state.streak} DAY${state.streak === 1 ? '' : 'S'}</div>
    <div class="${goldCls}">${tier} · LVL ${level}</div>
  `;
}
