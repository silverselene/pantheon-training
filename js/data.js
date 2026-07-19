// Static data for the pantheon: gods, their training styles, and the exercise archive.
// XP is stored as a running total; level and progress-to-next-level are derived from it.
const XP_PER_LEVEL = 100;

const GODS = [
  {
    id: 'zeus', name: 'Zeus', epithet: 'The Sovereign', style: 'Power',
    color: '#6f7ea6', dark: '#3f4b6b', tint: '#eef1f8', xp: 850,
    icon: '⚡', ornament: '⚡',
    blurb: 'King of Olympus. Trains for raw, absolute strength — the heaviest iron, the fewest reps.',
    cardCopy: 'Heavy compound lifts, low reps, long rest. Zeus does not chase a pump — he chases a heavier bar than last week.',
    equipmentLine: 'Barbell · Full Body · 50 Minutes · Heavy Load',
    command: 'Zeus does not ask the bar to be light. Every set is a verdict — the weight either bends to you or it doesn’t. Chase the number, not the burn.',
    theme: { accent: '#4C6FCF', light: '#7C93E8', pale: '#DCE3F8', mid: '#3E4A73' },
  },
  {
    id: 'ares', name: 'Ares', epithet: 'The Relentless', style: 'Combat',
    color: '#b23a34', dark: '#7a2420', tint: '#f8ece9', xp: 540,
    icon: '⚔️', ornament: '⚔',
    blurb: 'God of war. Trains in short, brutal bursts — conditioning built for the fight.',
    cardCopy: 'Kettlebells, sleds, and bodyweight bursts stacked with almost no rest. Ares trains like the fight is already happening.',
    equipmentLine: 'Full Body · Kettlebell · 45 Minutes · Progressive Overload',
    command: 'Ares does not negotiate with weakness — he conquers it. Every set you finish is territory claimed. Don’t leave any on the field.',
    theme: { accent: '#C0392B', light: '#E74C3C', pale: '#F5C6C1', mid: '#7A3A2E' },
  },
  {
    id: 'hermes', name: 'Hermes', epithet: 'The Swift', style: 'Speed',
    color: '#4f9169', dark: '#2f5c41', tint: '#ecf5ee', xp: 1080,
    icon: '☤', ornament: '☤',
    blurb: 'Messenger of the gods. Trains for speed and agility — quick feet, quicker hands.',
    cardCopy: 'Sprints, jumps, and ladder work built around one rule: every rep is fast, or it doesn’t count.',
    equipmentLine: 'Track & Ladder · Bodyweight · 35 Minutes · Speed & Agility',
    command: 'Hermes never trains slow on purpose. Rest until you can move fast again, then move fast again. The clock is the only opponent.',
    theme: { accent: '#1E8F5F', light: '#3FBE85', pale: '#CBEEDC', mid: '#2E5C43' },
  },
  {
    id: 'apollo', name: 'Apollo', epithet: 'The Radiant', style: 'Physique',
    color: '#d68a2b', dark: '#8a561a', tint: '#fbf1e1', xp: 320,
    icon: '☀️', ornament: '☉',
    blurb: 'God of light and beauty. Trains for balance and form — a body worth sculpting.',
    cardCopy: 'Controlled tempo, moderate reps, isolation work for symmetry. Apollo trains the mirror, not the ego.',
    equipmentLine: 'Dumbbell & Cable · Upper Focus · 40 Minutes · Aesthetic Balance',
    command: 'Apollo rewards patience, not ego lifting. Slow the eccentric, feel the muscle, chase symmetry over sensation. Form is the offering.',
    theme: { accent: '#C98A2C', light: '#F1B44C', pale: '#FBE7C2', mid: '#7A5A2E' },
  },
  {
    id: 'poseidon', name: 'Poseidon', epithet: 'The Unyielding', style: 'Endurance',
    color: '#2f7f8a', dark: '#1c4d54', tint: '#e7f3f4', xp: 650,
    icon: '🔱', ornament: '🔱',
    blurb: 'God of the sea. Trains for stamina — high volume, tides that never stop moving.',
    cardCopy: 'Rowing, carries, and machine intervals that never quite let your heart rate settle. Poseidon trains the tide, not the wave.',
    equipmentLine: 'Rower & Bike · Full Body · 45 Minutes · High Volume',
    command: 'Poseidon does not care about your first rep — he cares about your fortieth. The tide does not stop, and neither do you.',
    theme: { accent: '#1B7A8C', light: '#33ADC4', pale: '#C9ECF2', mid: '#2E5A63' },
  },
  {
    id: 'athena', name: 'Athena', epithet: 'The Strategist', style: 'Core & Control',
    color: '#7a6bb0', dark: '#4c4177', tint: '#f0edf8', xp: 430,
    icon: '🦉', ornament: '❖',
    blurb: 'Goddess of wisdom. Trains with precision — stability, mobility, control over chaos.',
    cardCopy: 'Anti-rotation holds, single-leg work, and slow control. Athena trains the stabilizers everyone else skips.',
    equipmentLine: 'Kettlebell & Cable · Core Focus · 35 Minutes · Stability & Control',
    command: 'Athena does not reward speed here — she rewards control. If it shakes, that is the set working. Own the wobble.',
    theme: { accent: '#6C5B9E', light: '#9683C9', pale: '#E3DCF5', mid: '#4A3F6B' },
  },
  {
    id: 'hercules', name: 'Hercules', epithet: 'The Laborer', style: 'Hypertrophy',
    color: '#8a5a34', dark: '#5a3a20', tint: '#f3ebe0', xp: 770,
    icon: '🦁', ornament: '❦',
    blurb: 'Son of Zeus, tamer of labors. Trains for size — volume enough for twelve trials.',
    cardCopy: 'Machines and dumbbells for high-volume, moderate-load sets. Hercules trains like there’s a thirteenth labor waiting.',
    equipmentLine: 'Machine & Dumbbell · Full Body · 50 Minutes · High Volume',
    command: 'Hercules finished twelve labors by refusing a thirteenth to beat him first. Add a rep. Add a set. The work compounds.',
    theme: { accent: '#8A4E22', light: '#C1732F', pale: '#EBD0B0', mid: '#5A3A20' },
  },
];

const EXERCISES = [
  { name: 'Barbell Back Squat', god: 'zeus', muscle: 'Quads / Glutes', equip: 'Barbell' },
  { name: 'Deadlift', god: 'zeus', muscle: 'Posterior Chain', equip: 'Barbell' },
  { name: 'Overhead Press', god: 'zeus', muscle: 'Shoulders', equip: 'Barbell' },
  { name: 'Barbell Bench Press', god: 'zeus', muscle: 'Chest', equip: 'Barbell' },
  { name: 'Weighted Pull-Up', god: 'zeus', muscle: 'Back', equip: 'Bodyweight' },

  { name: 'Kettlebell Swing', god: 'ares', muscle: 'Posterior Chain', equip: 'Kettlebell' },
  { name: 'Battle Ropes', god: 'ares', muscle: 'Full Body', equip: 'Rope' },
  { name: 'Burpees', god: 'ares', muscle: 'Full Body', equip: 'Bodyweight' },
  { name: 'Sled Push', god: 'ares', muscle: 'Legs', equip: 'Sled' },
  { name: 'Boxing Combo Drill', god: 'ares', muscle: 'Full Body', equip: 'Bag' },

  { name: 'Sprint Intervals', god: 'hermes', muscle: 'Legs', equip: 'Track' },
  { name: 'Box Jumps', god: 'hermes', muscle: 'Legs', equip: 'Box' },
  { name: 'Agility Ladder', god: 'hermes', muscle: 'Legs', equip: 'Ladder' },
  { name: 'Jump Rope', god: 'hermes', muscle: 'Calves', equip: 'Rope' },
  { name: 'Broad Jumps', god: 'hermes', muscle: 'Legs', equip: 'Bodyweight' },

  { name: 'Incline Dumbbell Press', god: 'apollo', muscle: 'Chest', equip: 'Dumbbell' },
  { name: 'Lateral Raise', god: 'apollo', muscle: 'Shoulders', equip: 'Dumbbell' },
  { name: 'Cable Fly', god: 'apollo', muscle: 'Chest', equip: 'Cable' },
  { name: 'Face Pull', god: 'apollo', muscle: 'Rear Delts', equip: 'Cable' },
  { name: 'Bicep Curl', god: 'apollo', muscle: 'Arms', equip: 'Dumbbell' },

  { name: 'Rowing Machine', god: 'poseidon', muscle: 'Full Body', equip: 'Rower' },
  { name: 'Swimming Intervals', god: 'poseidon', muscle: 'Full Body', equip: 'Pool' },
  { name: 'Assault Bike', god: 'poseidon', muscle: 'Full Body', equip: 'Bike' },
  { name: 'Farmer’s Carry', god: 'poseidon', muscle: 'Grip / Core', equip: 'Dumbbell' },
  { name: 'Step-Ups', god: 'poseidon', muscle: 'Legs', equip: 'Box' },

  { name: 'Plank', god: 'athena', muscle: 'Core', equip: 'Bodyweight' },
  { name: 'Turkish Get-Up', god: 'athena', muscle: 'Full Body', equip: 'Kettlebell' },
  { name: 'Pallof Press', god: 'athena', muscle: 'Core', equip: 'Cable' },
  { name: 'Single-Leg RDL', god: 'athena', muscle: 'Hamstrings / Balance', equip: 'Dumbbell' },
  { name: 'Hollow Body Hold', god: 'athena', muscle: 'Core', equip: 'Bodyweight' },

  { name: 'Dumbbell Row', god: 'hercules', muscle: 'Back', equip: 'Dumbbell' },
  { name: 'Leg Press', god: 'hercules', muscle: 'Quads', equip: 'Machine' },
  { name: 'Hack Squat', god: 'hercules', muscle: 'Quads', equip: 'Machine' },
  { name: 'Chest Fly Machine', god: 'hercules', muscle: 'Chest', equip: 'Machine' },
  { name: 'Triceps Pushdown', god: 'hercules', muscle: 'Arms', equip: 'Cable' },
];

// The prescribed session ("rite") for each god: sets x reps for a handful of their exercises.
const WORKOUTS = {
  zeus: [
    { name: 'Barbell Back Squat', sets: 5, reps: '5', note: 'Brace hard, own the descent. This is the heaviest lift of the day — take the rest you need.' },
    { name: 'Deadlift', sets: 3, reps: '5', note: 'Pull the slack out of the bar before you pull it off the floor.' },
    { name: 'Overhead Press', sets: 4, reps: '6', note: 'Ribs down, squeeze the glutes at lockout — no lean-back.' },
    { name: 'Weighted Pull-Up', sets: 4, reps: '6', note: 'Full hang to chin over the bar. Add weight before you add reps.' },
  ],
  ares: [
    { name: 'Kettlebell Swing', sets: 5, reps: '15', note: 'Hips snap, arms are just along for the ride.' },
    { name: 'Burpees', sets: 4, reps: '12', note: 'Chest to floor, full jump at the top. No half reps.' },
    { name: 'Sled Push', sets: 5, reps: '20m', note: 'Low shin angle, drive through the whole foot.' },
    { name: 'Battle Ropes', sets: 4, reps: '30s', note: 'Big waves from the shoulders, not the wrists.' },
  ],
  hermes: [
    { name: 'Sprint Intervals', sets: 6, reps: '100m', note: 'Full recovery between reps — speed drops if you rush the rest.' },
    { name: 'Box Jumps', sets: 4, reps: '8', note: 'Land soft, reset fully before the next jump.' },
    { name: 'Agility Ladder', sets: 4, reps: '1 pass', note: 'Quiet feet, quick feet. Precision before speed.' },
    { name: 'Jump Rope', sets: 3, reps: '60s', note: 'Stay light on the balls of your feet.' },
  ],
  apollo: [
    { name: 'Incline Dumbbell Press', sets: 4, reps: '10', note: '3-second lowering phase. Feel the stretch at the bottom.' },
    { name: 'Lateral Raise', sets: 3, reps: '12', note: 'Lead with the elbows, stop at shoulder height.' },
    { name: 'Cable Fly', sets: 3, reps: '12', note: 'Squeeze and hold for one count at the center.' },
    { name: 'Bicep Curl', sets: 3, reps: '10', note: 'Elbows pinned to your sides for the whole set.' },
  ],
  poseidon: [
    { name: 'Rowing Machine', sets: 4, reps: '500m', note: 'Legs, then back, then arms — reverse the order coming back.' },
    { name: 'Assault Bike', sets: 4, reps: '60s', note: 'Hold a pace you could argue is too easy for the first 20 seconds.' },
    { name: 'Farmer’s Carry', sets: 4, reps: '40m', note: 'Ribs stacked over hips, don’t let the weight pull your shoulders down.' },
    { name: 'Step-Ups', sets: 3, reps: '12', note: 'Drive through the lead heel, don’t push off the back foot.' },
  ],
  athena: [
    { name: 'Turkish Get-Up', sets: 3, reps: '5', note: 'Slow enough to narrate each position out loud.' },
    { name: 'Pallof Press', sets: 3, reps: '12', note: 'Resist the rotation — that resistance is the whole exercise.' },
    { name: 'Single-Leg RDL', sets: 3, reps: '8', note: 'Hips square, reach long through the rear heel.' },
    { name: 'Plank', sets: 3, reps: '45s', note: 'Ribs down, glutes on — if your low back arches, the set is over.' },
  ],
  hercules: [
    { name: 'Dumbbell Row', sets: 4, reps: '10', note: 'Elbow drives to the hip, pause and squeeze at the top.' },
    { name: 'Leg Press', sets: 4, reps: '12', note: 'Full range, knees track over the toes.' },
    { name: 'Hack Squat', sets: 3, reps: '10', note: 'Control the negative — that’s where the size comes from.' },
    { name: 'Chest Fly Machine', sets: 3, reps: '12', note: 'Lead with the forearms, squeeze at full contraction.' },
  ],
};

function godLevel(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function godProgressPct(xp) {
  return (xp % XP_PER_LEVEL);
}

function tierForLevel(level) {
  if (level >= 10) return 'OLYMPIAN';
  if (level >= 7) return 'DEMIGOD';
  if (level >= 4) return 'HERO';
  return 'MORTAL';
}
