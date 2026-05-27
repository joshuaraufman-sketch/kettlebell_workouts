export type ExerciseCategory =
  | "swings-hinges"
  | "squats-lunges"
  | "presses"
  | "pulls-rows"
  | "cleans-snatches"
  | "get-up-mobility"
  | "carries"
  | "complex-flows"
  | "bodyweight-hybrid";

export interface Exercise {
  name: string;
  category: ExerciseCategory;
  description: string;
}

export const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  "swings-hinges": "Swings / Hinges",
  "squats-lunges": "Squats / Lunges",
  presses: "Pressing Movements",
  "pulls-rows": "Pulling / Rows",
  "cleans-snatches": "Cleans / Snatches",
  "get-up-mobility": "Turkish Get-Up / Mobility",
  carries: "Carries / Loaded Stability",
  "complex-flows": "Complex / Flow Movements",
  "bodyweight-hybrid": "Bodyweight Hybrid Exercises",
};

export const EXERCISES: Exercise[] = [
  // Swings / Hinges
  {
    name: "Two-Hand Swing",
    category: "swings-hinges",
    description:
      "Hinge at the hips, hike the bell back between your legs, then explosively drive the hips forward so the bell floats to chest height. Arms stay relaxed.",
  },
  {
    name: "One-Hand Swing",
    category: "swings-hinges",
    description:
      "Perform a standard swing with one hand while resisting torso rotation and keeping the shoulders square.",
  },
  {
    name: "Alternating Swing",
    category: "swings-hinges",
    description:
      "Switch hands at the top of each swing while maintaining smooth rhythm and hip drive.",
  },
  {
    name: "Slingshot",
    category: "swings-hinges",
    description:
      "Pass the kettlebell around your waist from hand to hand while standing tall and bracing the core.",
  },
  {
    name: "Good Morning",
    category: "swings-hinges",
    description:
      "Hold the bell at the chest or behind the shoulders, then hinge forward at the hips while keeping the spine neutral.",
  },
  {
    name: "Single Arm Deadlift",
    category: "swings-hinges",
    description:
      "Hinge at the hips and stand up by driving through the glutes and hamstrings while holding the bell in one hand.",
  },
  {
    name: "Single Leg Deadlift",
    category: "swings-hinges",
    description:
      "Balance on one leg while hinging forward and extending the other leg behind you to challenge balance and posterior chain stability.",
  },

  // Squats / Lunges
  {
    name: "Goblet Squat",
    category: "squats-lunges",
    description:
      "Hold the bell at chest level, sit between the hips, keep the chest upright, and drive through the heels to stand.",
  },
  {
    name: "Racked Squat",
    category: "squats-lunges",
    description:
      "Hold the kettlebell in the rack position on one side while squatting to challenge the core and posture.",
  },
  {
    name: "Front Squat",
    category: "squats-lunges",
    description:
      "Hold one or two bells in the rack position and squat deeply while keeping the torso vertical.",
  },
  {
    name: "Offset Squat",
    category: "squats-lunges",
    description:
      "Hold the kettlebell on one side only while squatting to increase anti-rotation core demand.",
  },
  {
    name: "Reverse Lunge",
    category: "squats-lunges",
    description:
      "Step backward into a lunge while maintaining balance and an upright torso.",
  },
  {
    name: "Racked Reverse Lunge",
    category: "squats-lunges",
    description: "Perform a reverse lunge with the kettlebell held in the rack position.",
  },
  {
    name: "Side Lunge",
    category: "squats-lunges",
    description:
      "Step laterally into a deep hip-loaded position while keeping the other leg straight.",
  },
  {
    name: "Lunge with Rotation",
    category: "squats-lunges",
    description:
      "Add a torso rotation over the front leg during the lunge to increase mobility and core activation.",
  },
  {
    name: "Double Lunge",
    category: "squats-lunges",
    description:
      "Perform alternating lunges continuously while holding the kettlebell in the goblet or rack position.",
  },
  {
    name: "Overhead Reverse Lunge",
    category: "squats-lunges",
    description:
      "Hold the kettlebell locked overhead while lunging backward to challenge shoulder stability and balance.",
  },
  {
    name: "Static Lunge and Press",
    category: "squats-lunges",
    description: "Remain in a split stance while pressing the kettlebell overhead.",
  },
  {
    name: "Lunge and Press",
    category: "squats-lunges",
    description: "Perform a lunge and overhead press simultaneously.",
  },

  // Pressing Movements
  {
    name: "Overhead Press",
    category: "presses",
    description:
      "Press the kettlebell from the rack position to overhead while keeping the ribs down and body tight.",
  },
  {
    name: "Push Press",
    category: "presses",
    description: "Use a shallow knee dip to help drive the kettlebell overhead.",
  },
  {
    name: "Jerk",
    category: "presses",
    description:
      "Use an explosive leg drive and quick drop underneath the bell to lock it overhead efficiently.",
  },
  {
    name: "Tall Kneeling Press",
    category: "presses",
    description: "Press from both knees to isolate the upper body and core.",
  },
  {
    name: "Half Kneeling Press",
    category: "presses",
    description: "Press from a split kneeling position while resisting rotation.",
  },
  {
    name: "Bottoms-Up Press",
    category: "presses",
    description:
      "Hold the kettlebell upside down and press slowly to challenge grip and shoulder stability.",
  },
  {
    name: "Shotput Press",
    category: "presses",
    description: "Press the bell diagonally outward from the shoulder like a shotput throw.",
  },
  {
    name: "Thruster",
    category: "presses",
    description: "Combine a squat and overhead press into one fluid movement.",
  },
  {
    name: "Offset Thruster",
    category: "presses",
    description: "Perform a thruster while holding the bell on one side only.",
  },
  {
    name: "Two-Hand Squat and Press",
    category: "presses",
    description: "Use both hands on the bell while squatting and pressing overhead.",
  },

  // Pulling / Rows
  {
    name: "Row",
    category: "pulls-rows",
    description:
      "Hinge forward and pull the kettlebell toward the ribs while squeezing the shoulder blade back.",
  },
  {
    name: "Suitcase Row",
    category: "pulls-rows",
    description: "Row the kettlebell from the side of the body to emphasize anti-rotation control.",
  },
  {
    name: "Ballistic Row",
    category: "pulls-rows",
    description: "Explosively row the kettlebell while maintaining a stable hinge position.",
  },
  {
    name: "High Pull",
    category: "pulls-rows",
    description:
      "Drive the kettlebell upward using hip power while pulling the elbow high and outside.",
  },

  // Cleans / Snatches
  {
    name: "Clean",
    category: "cleans-snatches",
    description:
      "Explosively pull the kettlebell into the rack position while keeping it close to the body.",
  },
  {
    name: "Bottoms-Up Clean",
    category: "cleans-snatches",
    description: "Clean the bell upside down to improve grip and rack control.",
  },
  {
    name: "Clean and Press",
    category: "cleans-snatches",
    description: "Clean the bell to the rack, then press overhead.",
  },
  {
    name: "Clean and Push Press",
    category: "cleans-snatches",
    description: "Use a push press after the clean for more power and conditioning.",
  },
  {
    name: "Clean, Squat, and Press",
    category: "cleans-snatches",
    description: "Flow from a clean into a squat and finish with an overhead press.",
  },
  {
    name: "Tactical Clean",
    category: "cleans-snatches",
    description: "A more dynamic clean variation often involving rotational or athletic transitions.",
  },
  {
    name: "Snatch",
    category: "cleans-snatches",
    description: "Drive the kettlebell from the swing directly overhead in one motion.",
  },
  {
    name: "Dead Snatch Thruster",
    category: "cleans-snatches",
    description:
      "Start from the floor, snatch overhead, then descend into a squat and drive upward.",
  },

  // Turkish Get-Up / Mobility
  {
    name: "Turkish Get-Up",
    category: "get-up-mobility",
    description:
      "Move from lying on the floor to standing while keeping the kettlebell locked overhead the entire time.",
  },
  {
    name: "Reverse Turkish Get-Up",
    category: "get-up-mobility",
    description:
      "Start standing with the kettlebell overhead and reverse the get-up back to the floor.",
  },
  {
    name: "Windmill",
    category: "get-up-mobility",
    description:
      "Hold the kettlebell overhead while hinging sideways and reaching toward the floor with the opposite hand.",
  },
  {
    name: "Halo",
    category: "get-up-mobility",
    description:
      "Circle the kettlebell slowly around the head while keeping the ribs down and core braced.",
  },
  {
    name: "Overhead Warm-Up",
    category: "get-up-mobility",
    description:
      "Move dynamically while holding the kettlebell overhead to improve shoulder stability.",
  },
  {
    name: "Hip Bridge",
    category: "get-up-mobility",
    description: "Drive the hips upward from the floor while squeezing the glutes.",
  },
  {
    name: "Yoga Squat",
    category: "get-up-mobility",
    description: "Sit into a deep squat while opening the hips and maintaining posture.",
  },
  {
    name: "Hip Opener",
    category: "get-up-mobility",
    description:
      "Use controlled lunges or rotational positions to mobilize the hips before training.",
  },

  // Carries / Loaded Stability
  {
    name: "Suitcase Carry",
    category: "carries",
    description: "Walk while holding the kettlebell at one side like a suitcase.",
  },
  {
    name: "Rack Carry",
    category: "carries",
    description: "Carry the kettlebell in the rack position while maintaining posture.",
  },
  {
    name: "Overhead Carry",
    category: "carries",
    description: "Walk with the kettlebell locked overhead while bracing the core.",
  },
  {
    name: "Overhead March",
    category: "carries",
    description: "March in place while holding the kettlebell overhead.",
  },
  {
    name: "Rack March",
    category: "carries",
    description: "March in place while holding the kettlebell in the rack position.",
  },

  // Complex / Flow Movements
  {
    name: "Swing + Clean",
    category: "complex-flows",
    description: "Flow directly from a swing into a clean without setting the bell down.",
  },
  {
    name: "Swing + Clean + Snatch",
    category: "complex-flows",
    description: "Move continuously from swing to clean to snatch.",
  },
  {
    name: "Swing + High Pull + Snatch",
    category: "complex-flows",
    description: "Progressively transition the bell higher each rep until locked overhead.",
  },
  {
    name: "Figure 8",
    category: "complex-flows",
    description: "Pass the kettlebell between the legs in a figure-eight pattern.",
  },
  {
    name: "Figure 8 + Shotput Press + Side Lunge",
    category: "complex-flows",
    description:
      "Blend rotational movement, pressing, and lateral lunging into one athletic flow.",
  },
  {
    name: "Primal Thruster",
    category: "complex-flows",
    description:
      "Typically combines sit-thrus, squats, cleans, and thrusters into one continuous sequence.",
  },
  {
    name: "Long Cycle",
    category: "complex-flows",
    description: "Repeated clean-and-jerk movement performed for endurance and conditioning.",
  },
  {
    name: "King-Sized Combo",
    category: "complex-flows",
    description:
      "A continuous flow combining snatches, presses, and squats without putting the bell down.",
  },

  // Bodyweight Hybrid Exercises
  {
    name: "Pull-Through Push-Up",
    category: "bodyweight-hybrid",
    description:
      "Perform a push-up, then drag the kettlebell underneath the body to the opposite side.",
  },
  {
    name: "Push-Up",
    category: "bodyweight-hybrid",
    description: "Lower the chest to the floor while maintaining a rigid plank.",
  },
  {
    name: "Pull-Up / Chin-Up",
    category: "bodyweight-hybrid",
    description: "Pull the body upward until the chin clears the bar.",
  },
  {
    name: "Sit-Thru Get-Up",
    category: "bodyweight-hybrid",
    description:
      "Rotate the body through the shoulders and hips while transitioning between ground positions.",
  },
  {
    name: "Dead Stop Walkout",
    category: "bodyweight-hybrid",
    description: "Walk the hands forward into a plank from standing or squat position.",
  },
  {
    name: "Bear Squat",
    category: "bodyweight-hybrid",
    description: "Squat low while keeping the hands near the floor in a loaded athletic position.",
  },
  {
    name: "Knee Drive",
    category: "bodyweight-hybrid",
    description: "Drive the knee explosively upward after a lunge or step-back movement.",
  },
  {
    name: "Plank Mix",
    category: "bodyweight-hybrid",
    description: "A combination of plank variations performed continuously for core conditioning.",
  },
];

export function exercisesByCategory(): Array<{
  category: ExerciseCategory;
  label: string;
  items: Exercise[];
}> {
  const order: ExerciseCategory[] = [
    "swings-hinges",
    "squats-lunges",
    "presses",
    "pulls-rows",
    "cleans-snatches",
    "get-up-mobility",
    "carries",
    "complex-flows",
    "bodyweight-hybrid",
  ];
  return order.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: EXERCISES.filter((e) => e.category === category),
  }));
}

/**
 * Compact, prompt-friendly rendering of the exercise library, used to give
 * the model a canonical movement vocabulary to choose from.
 */
export function exerciseLibraryForPrompt(): string {
  return exercisesByCategory()
    .map(({ label, items }) => {
      const lines = items.map((e) => `- ${e.name}: ${e.description}`).join("\n");
      return `## ${label}\n${lines}`;
    })
    .join("\n\n");
}
