// Player progress, persisted to localStorage. Seeded from the static GODS data on first visit.
const STATE_KEY = 'pantheon_state_v1';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadState() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STATE_KEY));
  } catch (e) {
    saved = null;
  }
  if (saved && saved.godXp) {
    saved.setting = saved.setting || 'all';
    return saved;
  }

  const godXp = {};
  GODS.forEach(g => { godXp[g.id] = g.xp; });
  return { streak: 12, lastCompletedDate: null, godXp, setting: 'all' };
}

function setTrainingSetting(state, settingId) {
  state.setting = settingId;
  saveState(state);
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
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
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
