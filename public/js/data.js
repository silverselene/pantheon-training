// Static data for the pantheon: gods, their training styles, and every
// exercise (sets/reps/notes/settings all live on the exercise itself — this
// is the single source of truth for both the archive table and each god's
// workout page). Everything here is front-end only, no backend involved.
const XP_PER_LEVEL = 100;

// The three "where are you training" contexts a user can filter to.
const TRAINING_SETTINGS = [
  { id: 'home', label: 'At Home' },
  { id: 'gymMachines', label: 'Gym · Machines' },
  { id: 'gymFreeWeights', label: 'Gym · Free Weights' },
];

// Which settings a given equipment type is usable in. Bodyweight/mat/wall
// work is universal; a few light, no-equipment-needed tools (jump rope, an
// open track) count for home too. Everything else needs a gym.
const EQUIPMENT_SETTINGS = {
  Bodyweight: ['home', 'gymMachines', 'gymFreeWeights'],
  Mat: ['home', 'gymMachines', 'gymFreeWeights'],
  'Foam Roller': ['home', 'gymMachines', 'gymFreeWeights'],
  Wall: ['home', 'gymMachines', 'gymFreeWeights'],
  Track: ['home', 'gymFreeWeights'],
  'Jump Rope': ['home', 'gymFreeWeights'],
  Barbell: ['gymFreeWeights'],
  Dumbbell: ['gymFreeWeights'],
  Kettlebell: ['gymFreeWeights'],
  'Battle Ropes': ['gymFreeWeights'],
  Sled: ['gymFreeWeights'],
  Bag: ['gymFreeWeights'],
  Box: ['gymFreeWeights'],
  Ladder: ['gymFreeWeights'],
  Pool: ['gymFreeWeights'],
  Machine: ['gymMachines'],
  Cable: ['gymMachines'],
  Rower: ['gymMachines'],
  Bike: ['gymMachines'],
};

const GODS = [
  {
    id: 'zeus', name: 'Zeus', epithet: 'The Sovereign', style: 'Power',
    color: '#c9971c', dark: '#7a5b12', tint: '#fbf0d9', xp: 850,
    icon: '⚡', ornament: '⚡',
    blurb: 'King of Olympus. Trains for raw, absolute strength — the heaviest iron, the fewest reps.',
    cardCopy: 'Heavy compound lifts, low reps, long rest. Zeus does not chase a pump — he chases a heavier bar than last week.',
    equipmentLine: 'Barbell · Full Body · 50 Minutes · Heavy Load',
    command: 'Zeus does not ask the bar to be light. Every set is a verdict — the weight either bends to you or it doesn’t. Chase the number, not the burn.',
    theme: { accent: '#C9971C', light: '#F0B429', pale: '#F7E4A8', mid: '#7A5B12' },
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
    id: 'artemis', name: 'Artemis', epithet: 'The Huntress', style: 'Speed',
    color: '#3e8e5b', dark: '#245c3b', tint: '#e7f5ec', xp: 1080,
    icon: '🏹', ornament: '☾',
    blurb: 'Goddess of the hunt and the wild. Trains for speed and precision — quick feet, quicker aim.',
    cardCopy: 'Sprints, jumps, and ladder work built around one rule: every rep is fast and precise, or it doesn’t count.',
    equipmentLine: 'Track & Ladder · Bodyweight · 35 Minutes · Speed & Agility',
    command: 'Artemis never wastes a shot. Rest until you can move fast again, then move fast again — the target does not wait twice.',
    theme: { accent: '#1E8F5F', light: '#3FBE85', pale: '#CBEEDC', mid: '#2E5C43' },
  },
  {
    id: 'aphrodite', name: 'Aphrodite', epithet: 'The Radiant', style: 'Physique',
    color: '#d6538f', dark: '#8c3260', tint: '#fbeaf1', xp: 320,
    icon: '🌹', ornament: '♀',
    blurb: 'Goddess of beauty and love. Trains for balance and form — a body worth admiring.',
    cardCopy: 'Controlled tempo, moderate reps, isolation work for symmetry. Aphrodite trains the mirror, not the ego.',
    equipmentLine: 'Dumbbell & Cable · Upper Focus · 40 Minutes · Aesthetic Balance',
    command: 'Aphrodite rewards patience, not ego lifting. Slow the eccentric, feel the muscle, chase symmetry over sensation. Beauty is built, not born.',
    theme: { accent: '#D6538F', light: '#F080AC', pale: '#FBD6E4', mid: '#8C3260' },
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
    id: 'nyx', name: 'Nyx', epithet: 'The Primordial', style: 'Recovery',
    color: '#2b2b2b', dark: '#111111', tint: '#e9e9e9', xp: 770,
    icon: '🌑', ornament: '✦',
    blurb: 'Primordial goddess of night. Trains the body’s ability to rest — mobility, breath, and the stillness between sessions.',
    cardCopy: 'Long holds, slow breathing, and mobility work built for the quiet hours. Nyx trains recovery like it’s the fourth session of the week, not an afterthought.',
    equipmentLine: 'Mat & Foam Roller · Full Body · 30 Minutes · Mobility & Recovery',
    command: 'Nyx does not chase soreness — she undoes it. Breathe into the stretch, hold until the tension actually leaves. Rest is not the absence of training. It is training.',
    theme: { accent: '#6B6F76', light: '#B9BEC7', pale: '#E9EBEF', mid: '#3B3E44' },
  },
];

// Every exercise: god it belongs to, the muscle it targets, its equipment,
// and its prescribed sets/reps/note for that god's rite. `settings` is
// derived below from `equip` via EQUIPMENT_SETTINGS.
const EXERCISES = [
  { name: 'Barbell Back Squat', god: 'zeus', muscle: 'Quads / Glutes', equip: 'Barbell', sets: 5, reps: '5', note: 'Brace hard, own the descent. This is the heaviest lift of the day — take the rest you need.' },
  { name: 'Deadlift', god: 'zeus', muscle: 'Posterior Chain', equip: 'Barbell', sets: 3, reps: '5', note: 'Pull the slack out of the bar before you pull it off the floor.' },
  { name: 'Overhead Press', god: 'zeus', muscle: 'Shoulders', equip: 'Barbell', sets: 4, reps: '6', note: 'Ribs down, squeeze the glutes at lockout — no lean-back.' },
  { name: 'Barbell Bench Press', god: 'zeus', muscle: 'Chest', equip: 'Barbell', sets: 4, reps: '6', note: 'Shoulder blades pinned together, bar to the chest with control.' },
  { name: 'Weighted Pull-Up', god: 'zeus', muscle: 'Back', equip: 'Bodyweight', sets: 4, reps: '6', note: 'Full hang to chin over the bar. Add weight before you add reps.' },

  { name: 'Kettlebell Swing', god: 'ares', muscle: 'Posterior Chain', equip: 'Kettlebell', sets: 5, reps: '15', note: 'Hips snap, arms are just along for the ride.' },
  { name: 'Battle Ropes', god: 'ares', muscle: 'Full Body', equip: 'Battle Ropes', sets: 4, reps: '30s', note: 'Big waves from the shoulders, not the wrists.' },
  { name: 'Burpees', god: 'ares', muscle: 'Full Body', equip: 'Bodyweight', sets: 4, reps: '12', note: 'Chest to floor, full jump at the top. No half reps.' },
  { name: 'Sled Push', god: 'ares', muscle: 'Legs', equip: 'Sled', sets: 5, reps: '20m', note: 'Low shin angle, drive through the whole foot.' },
  { name: 'Boxing Combo Drill', god: 'ares', muscle: 'Full Body', equip: 'Bag', sets: 5, reps: '2 min', note: 'Combos on the bag, footwork resets between rounds — no standing still.' },

  { name: 'Sprint Intervals', god: 'artemis', muscle: 'Legs', equip: 'Track', sets: 6, reps: '100m', note: 'Full recovery between reps — speed drops if you rush the rest.' },
  { name: 'Box Jumps', god: 'artemis', muscle: 'Legs', equip: 'Box', sets: 4, reps: '8', note: 'Land soft, reset fully before the next jump.' },
  { name: 'Agility Ladder', god: 'artemis', muscle: 'Legs', equip: 'Ladder', sets: 4, reps: '1 pass', note: 'Quiet feet, quick feet. Precision before speed.' },
  { name: 'Jump Rope', god: 'artemis', muscle: 'Calves', equip: 'Jump Rope', sets: 3, reps: '60s', note: 'Stay light on the balls of your feet.' },
  { name: 'Broad Jumps', god: 'artemis', muscle: 'Legs', equip: 'Bodyweight', sets: 4, reps: '5', note: 'Full reset between reps — measure the jump, don’t just repeat it.' },

  { name: 'Incline Dumbbell Press', god: 'aphrodite', muscle: 'Chest', equip: 'Dumbbell', sets: 4, reps: '10', note: '3-second lowering phase. Feel the stretch at the bottom.' },
  { name: 'Lateral Raise', god: 'aphrodite', muscle: 'Shoulders', equip: 'Dumbbell', sets: 3, reps: '12', note: 'Lead with the elbows, stop at shoulder height.' },
  { name: 'Cable Fly', god: 'aphrodite', muscle: 'Chest', equip: 'Cable', sets: 3, reps: '12', note: 'Squeeze and hold for one count at the center.' },
  { name: 'Face Pull', god: 'aphrodite', muscle: 'Rear Delts', equip: 'Cable', sets: 3, reps: '15', note: 'Pull to the forehead, squeeze the rear delts — light weight, strict form.' },
  { name: 'Bicep Curl', god: 'aphrodite', muscle: 'Arms', equip: 'Dumbbell', sets: 3, reps: '10', note: 'Elbows pinned to your sides for the whole set.' },

  { name: 'Rowing Machine', god: 'poseidon', muscle: 'Full Body', equip: 'Rower', sets: 4, reps: '500m', note: 'Legs, then back, then arms — reverse the order coming back.' },
  { name: 'Swimming Intervals', god: 'poseidon', muscle: 'Full Body', equip: 'Pool', sets: 6, reps: '50m', note: 'Even pace out, even pace back — negative splits if you have more left.' },
  { name: 'Assault Bike', god: 'poseidon', muscle: 'Full Body', equip: 'Bike', sets: 4, reps: '60s', note: 'Hold a pace you could argue is too easy for the first 20 seconds.' },
  { name: 'Farmer’s Carry', god: 'poseidon', muscle: 'Grip / Core', equip: 'Dumbbell', sets: 4, reps: '40m', note: 'Ribs stacked over hips, don’t let the weight pull your shoulders down.' },
  { name: 'Step-Ups', god: 'poseidon', muscle: 'Legs', equip: 'Box', sets: 3, reps: '12', note: 'Drive through the lead heel, don’t push off the back foot.' },

  { name: 'Plank', god: 'athena', muscle: 'Core', equip: 'Bodyweight', sets: 3, reps: '45s', note: 'Ribs down, glutes on — if your low back arches, the set is over.' },
  { name: 'Turkish Get-Up', god: 'athena', muscle: 'Full Body', equip: 'Kettlebell', sets: 3, reps: '5', note: 'Slow enough to narrate each position out loud.' },
  { name: 'Pallof Press', god: 'athena', muscle: 'Core', equip: 'Cable', sets: 3, reps: '12', note: 'Resist the rotation — that resistance is the whole exercise.' },
  { name: 'Single-Leg RDL', god: 'athena', muscle: 'Hamstrings / Balance', equip: 'Dumbbell', sets: 3, reps: '8', note: 'Hips square, reach long through the rear heel.' },
  { name: 'Hollow Body Hold', god: 'athena', muscle: 'Core', equip: 'Bodyweight', sets: 3, reps: '30s', note: 'Lower back pressed flat. Arms and legs extended only as far as you can hold the position.' },

  { name: 'Legs-Up-The-Wall', god: 'nyx', muscle: 'Full Body / Nervous System', equip: 'Wall', sets: 1, reps: '5 min', note: 'Hips close to the wall, let gravity do the draining. Breathe slow — this is the whole session’s reset button.' },
  { name: 'Child’s Pose', god: 'nyx', muscle: 'Hips / Lower Back', equip: 'Mat', sets: 3, reps: '45s hold', note: 'Big toes together, knees wide. Sink your hips back toward your heels.' },
  { name: 'Thread the Needle', god: 'nyx', muscle: 'Thoracic Spine', equip: 'Mat', sets: 3, reps: '30s each side', note: 'Reach the working arm through and let the shoulder melt toward the floor.' },
  { name: '90/90 Hip Switch', god: 'nyx', muscle: 'Hips', equip: 'Mat', sets: 3, reps: '8 each side', note: 'Chest tall, rotate through the hips — not the lower back.' },
  { name: 'Foam Roll: Quads & IT Band', god: 'nyx', muscle: 'Quads / IT Band', equip: 'Foam Roller', sets: 2, reps: '60s each side', note: 'Slow rolls, pause on tender spots for a few breaths instead of rushing past them.' },
];

EXERCISES.forEach(e => { e.settings = EQUIPMENT_SETTINGS[e.equip] || []; });

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
