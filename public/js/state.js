// Player progress, persisted to localStorage. Seeded from the static GODS data on first visit.
const STATE_KEY = 'pantheon_state_v1';

// Local calendar date as YYYY-MM-DD. Deliberately not toISOString() (which is
// UTC) — a streak should track the user's actual day, not UTC's.
function dateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayStr() {
  return dateStr(new Date());
}

function loadState() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(STATE_KEY));
  } catch {
    saved = null;
  }
  if (saved && saved.godXp) return saved;

  const godXp = {};
  GODS.forEach(g => { godXp[g.id] = g.xp; });
  return { streak: 12, lastCompletedDate: null, godXp };
}

function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function getXp(state, godId) {
  return state.godXp[godId] ?? 0;
}

function awardXp(state, godId, amount) {
  state.godXp[godId] = (state.godXp[godId] ?? 0) + amount;

  const today = todayStr();
  if (state.lastCompletedDate === today) {
    // already logged a session today, streak unchanged
  } else {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yesterday = dateStr(y);
    state.streak = state.lastCompletedDate === yesterday ? state.streak + 1 : 1;
    state.lastCompletedDate = today;
  }

  saveState(state);
  return state;
}

function overallLevel(state) {
  const levels = GODS.map(g => godLevel(getXp(state, g.id)));
  return Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
}
