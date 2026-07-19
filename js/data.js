// Static data for the pantheon: gods, their training styles, and the exercise archive.
// XP is stored as a running total; level and progress-to-next-level are derived from it.
const XP_PER_LEVEL = 100;

const GODS = [
  {
    id: 'zeus', name: 'Zeus', epithet: 'The Sovereign', style: 'Power',
    color: '#6f7ea6', dark: '#3f4b6b', tint: '#eef1f8', xp: 850,
    blurb: 'King of Olympus. Trains for raw, absolute strength — the heaviest iron, the fewest reps.'
  },
  {
    id: 'ares', name: 'Ares', epithet: 'The Relentless', style: 'Combat',
    color: '#b23a34', dark: '#7a2420', tint: '#f8ece9', xp: 540,
    blurb: 'God of war. Trains in short, brutal bursts — conditioning built for the fight.'
  },
  {
    id: 'hermes', name: 'Hermes', epithet: 'The Swift', style: 'Speed',
    color: '#4f9169', dark: '#2f5c41', tint: '#ecf5ee', xp: 1080,
    blurb: 'Messenger of the gods. Trains for speed and agility — quick feet, quicker hands.'
  },
  {
    id: 'apollo', name: 'Apollo', epithet: 'The Radiant', style: 'Physique',
    color: '#d68a2b', dark: '#8a561a', tint: '#fbf1e1', xp: 320,
    blurb: 'God of light and beauty. Trains for balance and form — a body worth sculpting.'
  },
  {
    id: 'poseidon', name: 'Poseidon', epithet: 'The Unyielding', style: 'Endurance',
    color: '#2f7f8a', dark: '#1c4d54', tint: '#e7f3f4', xp: 650,
    blurb: 'God of the sea. Trains for stamina — high volume, tides that never stop moving.'
  },
  {
    id: 'athena', name: 'Athena', epithet: 'The Strategist', style: 'Core & Control',
    color: '#7a6bb0', dark: '#4c4177', tint: '#f0edf8', xp: 430,
    blurb: 'Goddess of wisdom. Trains with precision — stability, mobility, control over chaos.'
  },
  {
    id: 'hercules', name: 'Hercules', epithet: 'The Laborer', style: 'Hypertrophy',
    color: '#8a5a34', dark: '#5a3a20', tint: '#f3ebe0', xp: 770,
    blurb: 'Son of Zeus, tamer of labors. Trains for size — volume enough for twelve trials.'
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
    { name: 'Barbell Back Squat', sets: 5, reps: '5' },
    { name: 'Deadlift', sets: 3, reps: '5' },
    { name: 'Overhead Press', sets: 4, reps: '6' },
    { name: 'Weighted Pull-Up', sets: 4, reps: '6' },
  ],
  ares: [
    { name: 'Kettlebell Swing', sets: 5, reps: '15' },
    { name: 'Burpees', sets: 4, reps: '12' },
    { name: 'Sled Push', sets: 5, reps: '20m' },
    { name: 'Battle Ropes', sets: 4, reps: '30s' },
  ],
  hermes: [
    { name: 'Sprint Intervals', sets: 6, reps: '100m' },
    { name: 'Box Jumps', sets: 4, reps: '8' },
    { name: 'Agility Ladder', sets: 4, reps: '1 pass' },
    { name: 'Jump Rope', sets: 3, reps: '60s' },
  ],
  apollo: [
    { name: 'Incline Dumbbell Press', sets: 4, reps: '10' },
    { name: 'Lateral Raise', sets: 3, reps: '12' },
    { name: 'Cable Fly', sets: 3, reps: '12' },
    { name: 'Bicep Curl', sets: 3, reps: '10' },
  ],
  poseidon: [
    { name: 'Rowing Machine', sets: 4, reps: '500m' },
    { name: 'Assault Bike', sets: 4, reps: '60s' },
    { name: 'Farmer’s Carry', sets: 4, reps: '40m' },
    { name: 'Step-Ups', sets: 3, reps: '12' },
  ],
  athena: [
    { name: 'Turkish Get-Up', sets: 3, reps: '5' },
    { name: 'Pallof Press', sets: 3, reps: '12' },
    { name: 'Single-Leg RDL', sets: 3, reps: '8' },
    { name: 'Plank', sets: 3, reps: '45s' },
  ],
  hercules: [
    { name: 'Dumbbell Row', sets: 4, reps: '10' },
    { name: 'Leg Press', sets: 4, reps: '12' },
    { name: 'Hack Squat', sets: 3, reps: '10' },
    { name: 'Chest Fly Machine', sets: 3, reps: '12' },
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
