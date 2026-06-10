import type { Equipment, SkillLevel } from "@/lib/workoutPrompt";

export type ComplexSkill = "beginner" | "intermediate" | "advanced";

export interface Complex {
  name: string;
  minBells: 1 | 2;
  minSkill: ComplexSkill;
  requiresBodyweight?: boolean;
}

// minSkill = lower bound of the difficulty band (Intermediate-Advanced → "intermediate").
// minBells = minimum bells for the canonical version (scalable variants ignored here
// to keep the dropdown predictable; Helldiver and Cowboy stay at 2).
export const COMPLEXES: Complex[] = [
  { name: "Half Olympic", minBells: 1, minSkill: "intermediate" },
  { name: "True Olympic", minBells: 2, minSkill: "advanced" },
  { name: "Long Cycle", minBells: 1, minSkill: "advanced" },
  { name: "Real Muscle-Building Fat-Burner", minBells: 2, minSkill: "intermediate" },
  { name: "King-Sized Combo", minBells: 1, minSkill: "advanced" },
  { name: "Going Ballistic", minBells: 1, minSkill: "advanced" },
  { name: "The Giant", minBells: 1, minSkill: "intermediate" },
  { name: "Kneeling Clean to Windmill", minBells: 1, minSkill: "advanced" },
  { name: "Clean + Push Press", minBells: 1, minSkill: "intermediate" },
  { name: "Side Lunge and Clean", minBells: 1, minSkill: "advanced" },
  { name: "Armor Building Complex (ABC)", minBells: 2, minSkill: "intermediate" },
  { name: "Humane Burpee", minBells: 1, minSkill: "intermediate", requiresBodyweight: true },
  { name: "The Deep Six (RKC)", minBells: 1, minSkill: "advanced" },
  { name: "The Kettlebell Psycho Press", minBells: 2, minSkill: "advanced" },
  { name: "The Bruce Complex", minBells: 1, minSkill: "advanced" },
  { name: "The Kettlebell Cyclops Complex", minBells: 1, minSkill: "advanced" },
  { name: "The Firebreather Complex", minBells: 1, minSkill: "intermediate" },
  { name: "The Kettlebell Bodysnatcher Complex", minBells: 1, minSkill: "advanced" },
  { name: "The Cowboy Complex", minBells: 2, minSkill: "advanced" },
  { name: "The Cowgirl Complex", minBells: 2, minSkill: "advanced" },
  { name: "The Kickstarter Complex", minBells: 2, minSkill: "advanced" },
  { name: "The Kettlebell Shoulder Fire Complex", minBells: 1, minSkill: "advanced" },
  { name: "The Glute-cifer", minBells: 2, minSkill: "advanced" },
  { name: "Row + Dead Clean + Squat", minBells: 1, minSkill: "intermediate" },
  { name: "Hang Snatch EMOM Complex", minBells: 1, minSkill: "advanced" },
  { name: "PD Special", minBells: 1, minSkill: "intermediate" },
  { name: "Zeus", minBells: 1, minSkill: "intermediate" },
  { name: "Hercules", minBells: 1, minSkill: "intermediate" },
  { name: "Poseidon", minBells: 1, minSkill: "advanced" },
  { name: "Achilles", minBells: 1, minSkill: "advanced" },
  { name: "Sisyphus", minBells: 1, minSkill: "beginner" },
  { name: "Gimli", minBells: 1, minSkill: "beginner" },
  { name: "Aragorn", minBells: 1, minSkill: "intermediate" },
  { name: "Legolas", minBells: 1, minSkill: "advanced" },
  { name: "Elrond", minBells: 1, minSkill: "intermediate" },
  { name: "Gandalf", minBells: 1, minSkill: "advanced" },
  { name: "Leonidas", minBells: 1, minSkill: "intermediate" },
  { name: "Codi Special", minBells: 1, minSkill: "advanced" },
  { name: "Big Mick", minBells: 1, minSkill: "advanced" },
  { name: "King Kong", minBells: 2, minSkill: "advanced" },
  { name: "Devil's Tricycle", minBells: 1, minSkill: "intermediate" },
  { name: "DeGiuli", minBells: 1, minSkill: "beginner" },
  { name: "Helldiver", minBells: 2, minSkill: "advanced" },
  { name: "Worst Complex Ever", minBells: 2, minSkill: "advanced" },
];

const SKILL_RANK: Record<ComplexSkill, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

export function filterComplexes(
  equipment: Equipment,
  skillLevel: SkillLevel,
): Complex[] {
  const userRank = SKILL_RANK[skillLevel];
  return COMPLEXES.filter((c) => {
    if (SKILL_RANK[c.minSkill] > userRank) return false;
    if (c.requiresBodyweight && equipment !== "kettlebell-plus-bodyweight") return false;
    if (c.minBells === 2 && equipment !== "two-kettlebells") return false;
    return true;
  });
}

export function isValidComplexFor(
  name: string,
  equipment: Equipment,
  skillLevel: SkillLevel,
): boolean {
  return filterComplexes(equipment, skillLevel).some((c) => c.name === name);
}
