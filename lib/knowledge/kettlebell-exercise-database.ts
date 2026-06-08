/**
 * Canonical kettlebell exercise database.
 *
 * Mirrors `Kettlebell_Exercise_Database_V2_4.md` from the Claude project.
 * When updating exercises, update both this file and the markdown file
 * in the Claude project to keep them in sync.
 *
 * This is the authoritative reference for exercise names, categories,
 * difficulty tiers, prerequisites, and typical rep ranges used by the
 * workout generator.
 */
export const KETTLEBELL_EXERCISE_DATABASE = `# Kettlebell Exercise Database

**Version:** 2.4
**Purpose:** Canonical reference for kettlebell and accessory exercises used in workout generation.

---

## How to Use This Database

When generating a workout, draw exercises from this list. Each entry includes:

* **Aliases** — other common names for the same movement
* **Category** — Ballistic (explosive, hip-driven) | Grind (slow, strength) | Carry | Hybrid (combo movement) | Bodyweight
* **Equipment** — 1 KB | 2 KB | KB + BW | BW
* **Difficulty** — Beginner | Intermediate | Advanced (based on skill demand, not load)
* **Prerequisites** — Movements or capacities required before attempting this exercise
* **Typical reps** — Rep ranges and common programming patterns drawn from the source materials
* **How-to** — Concise form summary

Categories follow Geoff Neupert's framework: ballistics for fat loss and conditioning, grinds for strength and muscle, both for general health and sport.

**Programming notes:**

* Ballistics typically tolerate higher reps and shorter rest (5-20 reps, EMOM or short rest).
* Grinds typically use lower reps and longer rest (1-10 reps, full recovery for heavy work).
* Ladders (1-2-3-4-5 or 2-3-5) are the default Neupert progression for most lifts.
* Carries are programmed by distance or time, not reps.

---

## SINGLE KETTLEBELL — BALLISTICS

### Two-Hand Swing

* **Aliases:** 2H Swing, Russian Swing
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** Hip hinge / deadlift pattern
* **Typical reps:** 10-30 per set; commonly 7-10 EMOM for 20 min, or ladders 10-20-30
* **How-to:** Stand a foot behind the bell, hinge at the hips with weight on heels, and hike-pass the bell back between your legs. Snap the hips forward explosively to send the bell up to chest height — the arms are passive guides. Let the bell fall and re-load the hinge for the next rep.

### One-Hand Swing

* **Aliases:** 1H Swing, Single-Arm Swing
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Two-Hand Swing
* **Typical reps:** 5-15 per side per set
* **How-to:** Same mechanics as the two-hand swing but with one hand on the bell. Consciously keep the bell tracking up your centerline; the off-side core has to fight rotation. Switch hands at the top during the brief weightless moment, or set the bell down between sides.

### Hand-to-Hand Swing

* **Aliases:** Alternating Swing
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** One-Hand Swing
* **Typical reps:** 10-20 total per set (alternating)
* **How-to:** A one-hand swing where you switch hands at the top of every rep. Easier on the grip than a continuous one-hand swing because no hand holds the bell for long.

### Clean

* **Aliases:** 1H Clean, Single Clean
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** One-Hand Swing
* **Typical reps:** 5-10 per side; ladders 1-5
* **How-to:** From the deadlift position, hike-pass the bell and drive the hips like a vertical jump, transferring energy into the bell to bring it to the rack position (forearm vertical, elbow tucked, bell against shoulder). Spear your hand through the handle so the bell rolls around the forearm rather than flipping over the fist. The arm is passive — hips do the work.

### High Pull

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** One-Hand Swing
* **Typical reps:** 5-10 per side
* **How-to:** Hike-pass the bell between your legs like a swing, drive the hips through, then yank your elbow back above shoulder height using your upper back — like an elbow strike, not a curl. At the top, the bell forms an extension of your forearm, parallel to the ground.

### Snatch

* **Aliases:** 1H Snatch
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** One-Hand Swing, Clean, High Pull, overhead shoulder mobility
* **Typical reps:** 5-10 per side; ladders 1-5; 10-min snatch test for capacity (24kg men / 16kg women standard)
* **How-to:** Take the bell from between your legs to overhead lockout in one motion. Hips drive to chest level, upper back yanks the shoulder back, then the arm punches up to steer the bell into orbit — by the time the arm engages, the bell should be weightless. Catch softly with arm locked, bicep by the ear.

### Push Press

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, Military Press
* **Typical reps:** 5-10 per side; ladders 2-3-5 or 2-4-6-8
* **How-to:** From the rack, dip the knees a couple of inches, then explosively extend the legs to drive the bell overhead. The arm finishes the lockout once the bell is already moving up. Lets you handle more weight than a strict press.

### Jerk

* **Aliases:** Split Jerk, Push Jerk
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Push Press, overhead shoulder mobility
* **Typical reps:** 5-10 per side
* **How-to:** Like a push press, but after the leg drive you drop your body under the bell (small squat or split lunge) before locking the arm out, then stand up to finish. Allows even heavier weight overhead than the push press.

### Clean + Press (combo)

* **Aliases:** C\\&P
* **Category:** Hybrid (Ballistic + Grind)
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, Military Press
* **Typical reps:** Ladders 1-5 per side (e.g., "The Giant" protocol)
* **How-to:** A clean immediately followed by a strict military press. Re-cleaning before each press loads spring into the pressing muscles and lets you handle more weight than pressing repeatedly from the rack.

### Clean + Jerk (Long Cycle)

* **Aliases:** Long Cycle, LC
* **Category:** Hybrid (Ballistic)
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Jerk
* **Typical reps:** 5-10 per side; ladders 1-5
* **How-to:** A clean immediately followed by a jerk, with the bell returning between the legs (or to the rack and dropped) before each rep. Brutal conditioning lift from kettlebell sport.



### American Swing

* **Aliases:** Overhead Swing, CrossFit Swing
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Two-Hand Swing, overhead shoulder mobility
* **Typical reps:** 10-20 per set
* **How-to:** Same hip-driven mechanics as the Russian swing, but the bell finishes directly overhead with arms locked out instead of at chest height. Bigger range, more shoulder demand, more lumbar risk if the overhead position is forced. Use a lighter bell than your Russian swing and only program this if overhead lockout is clean.



### Sumo High Pull

* **Aliases:** Two-Hand High Pull
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** KB Deadlift, hip hinge
* **Typical reps:** 8-15 per set
* **How-to:** Wide stance, bell between the feet. Drop into a squat-hinge to grip the handle with both hands, drive up through the legs and hips, and pull the bell to chin height with elbows high and wide — like rowing a barbell upright. Two-handed and more squat-dominant than the single-arm High Pull, which is hip-snap dominant.



### Bottoms Up Clean



* **Aliases:** BUP Clean
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, grip strength, wrist stability
* **Typical reps:** 3-6 per side
* **How-to:** Same hip-driven clean mechanics, but instead of rolling the bell into the rack you catch it with the bottom pointing at the ceiling — handle gripped hard, forearm vertical, bell balanced. Demands precise timing and a strong vertical pull; if the bell drifts off vertical, it tips. Lighter weight than your regular clean. Useful as a skill drill, a wrist/grip builder, and a prereq for the BUP Press.



### One-Legged Clean



* **Aliases:** Single-Leg Clean, Pistol Clean
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Single Leg Deadlift, single-leg balance
* **Typical reps:** 3-5 per side
* **How-to:** Stand on one leg, bell in the same-side hand. Hinge into a one-legged deadlift position, then clean the bell to the rack while still balanced on the single leg. Hips do the work but with no second leg to brace against — balance and core do most of the stabilizing. Treat as a skill/balance drill, not a strength lift.



### Lateral Swings



* **Aliases:** Rotational Swing
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** One-Hand Swing, hip mobility, healthy knees
* **Typical reps:** 5-10 per side
* **How-to:** Standing in a split or staggered stance, swing the bell across the body from one side to the other in a rotational arc — the bell crosses the front leg as you rotate through the hips. The knee on the bell side is the loaded one and is the main injury risk; rotate from the hips, not the knee. Advanced and niche — use sparingly and never with a bell heavier than you can fully control.
### Forward Flip (Horn-Catch)

* **Aliases:** Flip, Horn-Catch, Forward Flip Swing
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Two-Hand Swing, One-Hand Swing, strong grip, wrist control
* **Typical reps:** 3-8 per set as a skill drill; also programmed inside flows (e.g., the Bruce Complex)
* **How-to:** A kettlebell-juggling move performed at the top of a swing. At the float point (bell about chest height, momentarily weightless), put the thumb in the center of the handle and push the bell forward and up with simultaneous wrist extension and external rotation — like revving a motorcycle — so it makes one full forward rotation in the air. Don't chase it; let gravity drop it back into the swing arc and catch the horns (the vertical sidebars of the handle) to continue swinging. Builds explosive power and grip. Use a controllable bell — a missed catch is the obvious risk.

---

## SINGLE KETTLEBELL — GRINDS

### Turkish Get-Up

* **Aliases:** TGU, Get-Up
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Shoulder mobility, basic core engagement. Neupert/StrongFirst recommend 50 reps with a shoe before adding weight.
* **Typical reps:** 1-5 per side; usually programmed as 1+1 sets, sometimes ladders 5-4-3-2-1
* **How-to:** Lying on your back, press the bell to lockout with one arm. Stand all the way up while keeping the bell locked overhead — roll to elbow, to hand, sweep the straight leg through, stand from the lunge — then reverse the sequence back to the floor. Eyes on the bell at all times.

### Quarter Get-Up

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Shoulder mobility
* **Typical reps:** 3-5 per side; sometimes held at the top position for time
* **How-to:** Regression of the full TGU. From the floor with the bell pressed to lockout, prop up onto the elbow, then the hand — that's the quarter-up position. Hold or reverse back to lying. Builds the upper portion of the TGU without the full lower-body sequence, and extra useful for emphasizing core engagement under load.

### Goblet Squat

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None (foundational squat pattern)
* **Typical reps:** 5-15 per set
* **How-to:** Hold the bell at chest height by the horns (sides of the handle), elbows pointing down. Sit back into a full squat with elbows tracking between the knees at the bottom, then drive up by tensing the glutes. Keep breathing.

### Single KB Front Squat

* **Aliases:** Rack Squat, 1KB FSQ
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, Goblet Squat
* **Typical reps:** 3-8 per side; ladders 1-5
* **How-to:** Clean the bell to the rack position and squat with the bell sitting on the working-side shoulder, forearm vertical. The asymmetric load forces the core to fight rotation. Complete all reps on one side before switching.

### Single KB Back Squat

* **Aliases:** Trap Squat, 1KB Back Squat
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Goblet Squat, Clean, upper-back strength
* **Typical reps:** 5-10 per side; alternate the loaded side
* **How-to:** Hold the bell by the horns, then press it up and rest it on the meat of one upper trap — not the cervical spine. Feet slightly wider than hip-width, toes slightly out. Chest up, core braced hard to stop the asymmetric load twisting the spine, and squat straight down with a vertical shin. The offset weight is the point: anti-rotation under a squat.

### Military Press

* **Aliases:** Press, Strict Press, MP
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, overhead shoulder mobility
* **Typical reps:** 3-10 per side; ladders 1-5 standard
* **How-to:** From the rack with the body fully braced (shoulders down, lats flared, abs braced, glutes tight, knees locked), press the bell overhead in a banana-shaped arc — out, then up. Lock the elbow at the top, then lower under control by pulling the elbow down with the lat.

### Bottom's-Up Press

* **Aliases:** BUP
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Military Press, strong grip, wrist stability
* **Typical reps:** 1-3 per side; ladders 1-2-3
* **How-to:** A press with the bell flipped upside down — bottom pointing at the ceiling, handle gripped hard to keep the bell balanced. Brutal on grip, wrist stability, and shoulder position. Use much lighter weight than your regular press.

### Floor Press

* **Aliases:** KB Floor Press
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** None
* **Typical reps:** 5-10 per side
* **How-to:** Lie on your back with knees bent, press the bell straight up from the shoulder. The floor limits range of motion at the bottom, taking some shoulder strain off compared to a bench press.

### Windmill

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Overhead shoulder mobility, hip mobility, Turkish Get-Up
* **Typical reps:** 3-5 per side
* **How-to:** Bell locked out overhead, same-side foot turned out. Bend at the hips toward the opposite leg, eyes on the bell, free hand sliding down the inside of the leg until it reaches the floor (or as far as mobility allows). Reverse to stand. Develops obliques, hips, and shoulder stability.

### Overhead Squat

* **Aliases:** OHS
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Snatch, full squat mobility, strong overhead lockout
* **Typical reps:** 3-5 per side
* **How-to:** Bell locked out overhead with one arm. Squat to depth while keeping the bell locked out and the arm vertical. Demands serious shoulder mobility and core control.

### Kettlebell Deadlift

* **Aliases:** Sumo Deadlift (with KB between feet)
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** Hip hinge
* **Typical reps:** 5-10
* **How-to:** Bell between the feet. Hinge at the hips, soft bend in the knees, grip the handle, and stand up by driving the hips forward. The foundation of the swing — get this right first.

### Single Leg Deadlift

* **Aliases:** SLDL
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** KB Deadlift, single-leg balance
* **Typical reps:** 5-8 per side
* **How-to:** Hold the bell in one hand. Hinge forward on one leg, letting the opposite leg extend straight behind you for balance, until the torso is roughly parallel to the floor. Stand back up. Brutal balance and posterior chain work.

### Suitcase Deadlift

* **Aliases:** Single Arm Deadlift
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** KB Deadlift
* **Typical reps:** 5-10 per side
* **How-to:** Bell at one side of the body. Hinge and pick it up like a suitcase, standing tall without leaning sideways. The off-side core has to brace hard against the lateral load.

### Pistol Squat

* **Aliases:** Single Leg Squat
* **Category:** Grind
* **Equipment:** 1 KB (counterweight) or BW
* **Difficulty:** Advanced
* **Prerequisites:** Bodyweight squat strength, ankle and hip mobility, single-leg balance
* **Typical reps:** 3-5 per side
* **How-to:** Stand on one leg with the bell held at the chest as a counterweight. Squat down on that one leg while the other extends straight in front, then stand back up. Demands serious leg strength, mobility, and balance.

### Halo

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 5-10 each direction
* **How-to:** Hold the bell by the horns at chest height and circle it slowly around your head, keeping the movement tight and controlled. Great shoulder mobility and warm-up drill.

### Armbar

* **Aliases:** KB Armbar
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Shoulder mobility, Turkish Get-Up
* **Typical reps:** 1-3 per side (held positions, 10-30 seconds)
* **How-to:** Lying on your back, bell pressed up with one arm. Roll onto the opposite side while keeping the bell locked overhead, ending in a side-lying position with the bell still vertical. Shoulder mobility and stability drill.

### Around the World

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 5-10 each direction
* **How-to:** Hold the bell with both hands in front of the body and pass it around your waist in a circle, hand to hand. Light warm-up and grip drill.

### Bob and Weave

* **Aliases:** Lateral Goblet Squat Series
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Goblet Squat
* **Typical reps:** 5-10 each side
* **How-to:** Goblet position. Squat to one side (one knee bends, one leg extends), shift across to the other side at depth, then stand. Develops lateral hip mobility and strength.

### Goblet Clean

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** Hip hinge
* **Typical reps:** 5-10
* **How-to:** Lighter, two-hand variant of the clean used as a warm-up or in complexes. Hike-pass and drive the hips to bring the bell up to the goblet position (held at chest by the horns).

### Reverse Lunge (Racked)

* **Aliases:** Rack Lunge
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, bodyweight lunge
* **Typical reps:** 5-10 per side
* **How-to:** Bell racked on one side. Step backward into a lunge until the back knee taps the floor, then drive back up. Loaded asymmetrically — the rack-side obliques and quads work hard.

### Walking Lunge

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB (goblet, rack, or suitcase)
* **Difficulty:** Beginner
* **Prerequisites:** Bodyweight lunge
* **Typical reps:** 8-15 per side
* **How-to:** Step forward into a lunge, drive up, step through with the other leg. Loaded version of a fundamental lower-body pattern.

### Lunge with Rotation

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Walking Lunge
* **Typical reps:** 5-8 per side
* **How-to:** Hold the bell at chest height. Lunge forward, then rotate the torso (and bell) toward the front-leg side at the bottom. Builds lower body + rotational core control.

### Lateral Squat

* **Aliases:** Side Lunge, Cossack Squat (close variant)
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Goblet Squat, hip mobility
* **Typical reps:** 5-10 per side
* **How-to:** Wide stance, bell held at chest. Shift weight to one side and squat down on that leg while the other stays straight, then return to center and switch sides.

### Step Up

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 5-10 per side
* **How-to:** Hold the bell goblet or rack. Step onto a box or bench with one foot, drive up through the heel, then step down under control.

### Glute Bridge

* **Aliases:** KB Hip Thrust (variant)
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 10-20
* **How-to:** Lying on your back with knees bent, bell resting on the hips. Drive the hips up by squeezing the glutes, pause at the top, lower under control.

### Single-Arm Row

* **Aliases:** Bent-Over Row, One-Arm Row
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** Hip hinge
* **Typical reps:** 5-10 per side
* **How-to:** Hinge forward with one hand braced on a knee or bench. Row the bell from the floor to the hip with the other hand, keeping the elbow close to the body.

### Suitcase Row

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Hip hinge
* **Typical reps:** 5-10 per side
* **How-to:** Hinge forward in a balanced stance, bell hanging at the side of the body. Row it up to the hip without rotating the torso.

### Gorilla Row

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Hip hinge, Single-Arm Row
* **Typical reps:** 5-10 per side
* **How-to:** Wide stance in a hinge position, one bell in each hand on the floor. Row one bell to the hip while the other stays planted, alternating sides.

### Renegade Row

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 2 KB + BW
* **Difficulty:** Advanced
* **Prerequisites:** Plank, Push-up, Single-Arm Row
* **Typical reps:** 3-5 per side
* **How-to:** Push-up position with hands on the handles of two bells. Row one bell to the hip while balancing on the other, keeping hips square. Alternate sides. Anti-rotation core plus row.

### Kettlebell Curl

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 8-12 per side
* **How-to:** Standing, bell held by the handle at thigh height. Curl up to the shoulder, keeping elbows pinned. Direct bicep work.

### French Press

* **Aliases:** Standing Triceps Extension
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Overhead shoulder mobility
* **Typical reps:** 8-12
* **How-to:** Hold the bell with both hands behind your head, elbows pointing up. Extend the elbows to press the bell overhead, then lower under control.

### Pullover

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Shoulder mobility
* **Typical reps:** 8-12
* **How-to:** Lying on your back, bell held overhead with both hands. Lower the bell back over your head with straight or slightly bent arms, then bring it back up. Stretches and works lats and chest.

### Slingshot

* **Aliases:** Around the Body Pass
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 10-20 each direction
* **How-to:** Bell held at hip height with one hand. Pass it around the body to the opposite hand behind your back, then around to the front, continuing in a circle. Light warm-up drill.

### Side Bend

* **Aliases:** Standing Oblique Crunch
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 8-12 per side
* **How-to:** Bell held at one side. Bend laterally toward the bell side, then return to upright. Oblique work — keep it controlled. Cue: "I'm a little teapot, short and stout."

### Russian Twist

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** None
* **Typical reps:** 10-20 total (5-10 per side)
* **How-to:** Seated with knees bent and feet off the floor (or planted), bell held at chest. Rotate the torso side to side, touching the bell to the floor on each side. Rotational core work.

### Wood Chop

* **Aliases:** Half-Kneeling Chop, KB Chop
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** None
* **Typical reps:** 8-12 per side
* **How-to:** From a standing or half-kneeling position, hold the bell with both hands. Sweep it diagonally from high on one side to low on the other in a controlled chopping motion.

### Sit-up

* **Aliases:** KB Sit-up, Weighted Sit-up
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 10-20
* **How-to:** Bell held at chest or overhead. Standard sit-up — feet anchored, sit all the way up, lower under control.

### Frankenstein Sit-Up

* **Aliases:** Straight Arm Sit
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Sit-up, overhead shoulder stability
* **Typical reps:** 5-10 per set
* **How-to:** Lying on your back with knees bent, press the bell to a vertical lockout overhead. Keeping the arm fully extended and the bell stacked above the shoulder the entire time, perform a sit-up — at the top, the arm should be straight up over the head. Lower under control. Distinct from Sit and Press: the bell stays locked out throughout, not just at the top.

### V Sit

* **Aliases:** V Up
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Sit-up, hip flexor flexibility
* **Typical reps:** 5-10 per set; commonly 30-45 seconds in core circuits
* **How-to:** Lying on your back with the bell held overhead and legs raised slightly off the floor. Sit up while lifting the legs to meet the bell — body forms a V at the top, legs and arms nearly meeting. Lower under control. Works upper and lower abs together; reduce range if flexibility limits depth.

### Side Plank

* **Aliases:** KB Side Plank
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Plank
* **Typical reps:** 20-60 seconds per side
* **How-to:** Side plank position, bell held at the hip or pressed overhead with the top arm. Hold for time. Brutal oblique and shoulder isometric.

### Plank Drag

* **Aliases:** Plank Pull-Through
* **Category:** Grind
* **Equipment:** 1 KB + BW
* **Difficulty:** Intermediate
* **Prerequisites:** Plank, Push-up
* **Typical reps:** 5-10 per side (alternating)
* **How-to:** High plank position, feet slightly wider than shoulder-width. Place the bell on the floor next to one wrist. Reach across with the opposite hand, grab the bell, and drag it underneath your chest to the other side. Hips stay parallel to the floor — fight the urge to rotate. Alternate sides. Anti-rotation core work.

### Sit and Press

* **Aliases:** None common
* **Category:** Hybrid
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Military Press, sit-up
* **Typical reps:** 5-10 per side
* **How-to:** Sit-up while pressing the bell overhead at the top of the rep. Lower the bell back to the chest as you lie down. Combo abs + shoulder work.

### Thruster

* **Aliases:** Squat to Press
* **Category:** Hybrid
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Front Squat, Push Press
* **Typical reps:** 5-10 per side (single) or total (double)
* **How-to:** Bell racked (single) or two bells racked (double). Squat to depth, then on the way up use the leg drive to press the bell(s) overhead in one motion.

### Man Maker

* **Aliases:** None common
* **Category:** Hybrid
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Renegade Row, Double Clean, Thruster
* **Typical reps:** 3-5
* **How-to:** Push-up on the handles, renegade row each side, jump or step the feet up, clean the bells to the rack, thruster overhead. One full rep is a complete sequence. Brutal.

### Deck Squat

* **Aliases:** Rolling Squat
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Goblet Squat, hip and thoracic mobility
* **Typical reps:** 5-10
* **How-to:** Stand holding the bell at chest. Sit back and roll onto your back, then roll forward using momentum back to the squat position and stand up. Mobility-heavy movement.

### Good Morning

* **Aliases:** KB Good Morning
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** Hip hinge
* **Typical reps:** 8-12
* **How-to:** Bell held at the chest or behind the neck. Hinge at the hips with a flat back, lowering the torso toward parallel, then return to standing. Hamstring and lower back work.



### Half-Kneeling Press



* **Aliases:** Half Kneeling Military Press
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Military Press
* **Typical reps:** 5-10 per side; ladders 1-5
* **How-to:** Half-kneeling stance — bell on the side opposite the up-knee (down-knee under the bell). Press strictly overhead. The kneeling base removes leg drive and exposes any compensation in the press, and the offset load forces the core to fight lateral lean. Excellent press regression and core builder. Switch which knee is down between sets.



### Single Arm Z Press



* **Aliases:** Z Press, Seated Press
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate-Advanced
* **Prerequisites:** Military Press, hamstring and hip mobility
* **Typical reps:** 3-8 per side
* **How-to:** Seated on the floor, legs straight out wide, bell racked on one side. Brace hard and press strictly overhead — no leg drive available, hamstrings and groin must be loose enough to sit tall. Mobility-limited for most, so the working weight drops significantly compared to standing.



### Chainsaw Row



* **Aliases:** Split Stance Row, Dead-Stop Row
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Hip hinge, Single-Arm Row
* **Typical reps:** 5-10 per side
* **How-to:** Split stance — opposite leg forward from the working hand. Hinge the torso low, bell on the floor between the legs. Row the bell explosively to the hip leading with the elbow, then set it back to the floor and let it dead-stop for a beat before the next rep. The pause kills momentum and forces a strong concentric pull from the lats.



### Single KB Floor Fly



* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Floor Press, shoulder control
* **Typical reps:** 8-12 per side
* **How-to:** Lying on your back with knees bent, bell pressed up over the shoulder with a soft bend in the elbow. Lower the bell out to the side in an arc — elbow stays slightly bent — until the upper arm touches the floor. Reverse the arc back over the shoulder. Chest isolation, distinct from the floor press (no elbow extension). Use a much lighter bell than your floor press weight.



### KB Reverse Crunch



* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** None
* **Typical reps:** 8-15
* **How-to:** Lying on your back, bell anchored on the floor above your head, both hands gripping the handle. Knees bent and lifted. Drive the knees toward the chest and curl the hips off the floor — lower abs do the work, not hip flexors. Lower under control. Anchoring the bell overhead adds an anti-extension demand through the lats and core.



### Reverse Turkish Get-Up



* **Aliases:** Reverse TGU, Top-Down Get-Up
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate-Advanced
* **Prerequisites:** Turkish Get-Up
* **Typical reps:** 1-3 per side
* **How-to:** Start standing with the bell pressed to lockout overhead. Step back into a reverse lunge, lower to the half-kneeling position, sweep the back leg through to seated, lower onto the elbow, then onto the back — then reverse the sequence back to standing. The eccentric-first version of the TGU. Harder than the standard version because each lowering step requires control without the rhythm of having just done the concentric. Eyes on the bell throughout.



### Tall Kneeling Press



* **Aliases:** Double Kneeling Press
* **Category:** Grind
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Military Press
* **Typical reps:** 5-10 per side
* **How-to:** Both knees on the floor, hips tall and glutes squeezed (don't sit back on the heels). Press strictly overhead from the rack. The kneeling base kills all leg drive and the symmetric stance removes the lateral-lean compensation that half-kneeling demands — leaves the shoulder and core to do everything. Common press regression and a way to clean up sloppy standing presses.



### Tactical Lunge



* **Aliases:** Around-the-Leg Lunge
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Reverse Lunge, Suitcase Deadlift
* **Typical reps:** 5-10 per side
* **How-to:** Bell held in one hand at the side. Step back into a reverse lunge; at the bottom position, pass the bell under the front leg from the outside hand to the inside hand. Stand up, step the other leg back, and pass the bell back under that leg. Adds coordination, hip mobility, and anti-rotation demand to the lunge pattern. Keep the torso upright and the back flat during the pass — the most common fault is rounding to reach.



### Overhead Reverse Lunge



* **Aliases:** OH Reverse Lunge
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Intermediate-Advanced
* **Prerequisites:** Reverse Lunge (Racked), Military Press, overhead shoulder mobility
* **Typical reps:** 5-8 per side
* **How-to:** Bell locked out overhead, bicep by the ear. Step back into a reverse lunge until the back knee taps the floor, drive back up — bell stays locked out the entire time. The combination of overhead load and unilateral lower-body work demands hard core bracing to keep the bell stacked over the shoulder.



### Overhead Walking Lunge



* **Aliases:** OH Walking Lunge
* **Category:** Grind
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Overhead Reverse Lunge, Walking Lunge
* **Typical reps:** 8-15 steps per side
* **How-to:** Bell locked out overhead. Step forward into a lunge, drive up, step through with the other leg — continuous walking pattern, bell stays locked out the entire time. Step-through is harder than the static reverse version because each stride introduces a new wobble for the overhead bell. Easy way to expose a weak overhead lockout.

---

## SINGLE KETTLEBELL — CARRIES

### Suitcase Carry

* **Aliases:** None common
* **Category:** Carry
* **Equipment:** 1 KB
* **Difficulty:** Beginner
* **Prerequisites:** Suitcase Deadlift
* **Typical reps:** 20-50 yards per side; commonly 40 yards per side for 20 min
* **How-to:** Bell held at the side like a suitcase. Walk for distance, staying tall and not leaning toward the bell — the off-side core does the work. Switch hands and walk back.

### Rack Carry

* **Aliases:** None common
* **Category:** Carry
* **Equipment:** 1 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Clean
* **Typical reps:** 20-50 yards per side
* **How-to:** Clean the bell to the rack and walk with it there. Keep the forearm vertical and ribs down (don't let the lower back arch). Switch sides and walk back.

### Overhead Carry

* **Aliases:** None common
* **Category:** Carry
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Military Press, overhead shoulder mobility
* **Typical reps:** 20-40 yards per side
* **How-to:** Bell locked out overhead with one arm. Walk with the bicep near the ear and full elbow lockout. The most demanding of the three single-bell carries — exposes any overhead weakness fast.

### Bottoms Up Carry

* **Aliases:** BUP Carry
* **Category:** Carry
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Bottom's-Up Press, strong grip
* **Typical reps:** 10-30 yards per side
* **How-to:** Bell flipped upside down at chest height (like the BUP), gripped hard to keep it balanced. Walk for distance. Grip and shoulder stability drill.

---

## DOUBLE KETTLEBELL — BALLISTICS

### Double Swing

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** One-Hand Swing
* **Typical reps:** 5-10 per set; commonly 5-7 EMOM for 20 min
* **How-to:** Same mechanics as the two-hand swing but with a bell in each hand. Slightly wider stance so the bells can pass between the legs. Symmetric loading allows much heavier total weight than a one-hand swing.

### Double Clean

* **Aliases:** DCL
* **Category:** Ballistic
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Single Clean
* **Typical reps:** 5-10 per set
* **How-to:** Two bells cleaned simultaneously to the double rack. Tame the arc — bells will want to bang the forearms together at the top if you don't keep them tracking close to the body.

### Double High Pull

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Single High Pull, Double Swing
* **Typical reps:** 5-10
* **How-to:** Two bells hike-passed between the legs, hip drive into a high pull with both elbows yanked back above the shoulders simultaneously.

### Double Snatch

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Single Snatch, Double Clean
* **Typical reps:** 3-5
* **How-to:** Two bells from between the legs to overhead lockout in one motion. Technically demanding — don't attempt before single snatch is solid.

### Double Push Press

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Double Clean, Single Push Press
* **Typical reps:** 5-10
* **How-to:** From the double rack, dip the knees and drive both bells overhead with leg drive. Arms finish the lockout.

### Double Jerk

* **Aliases:** None common
* **Category:** Ballistic
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Push Press, Single Jerk
* **Typical reps:** 5-10
* **How-to:** Push press with a second dip — drive the bells up, drop the body under them, lock arms out overhead, then stand to finish.

---

## DOUBLE KETTLEBELL — GRINDS

### Double Front Squat

* **Aliases:** DFSQ, Double FSQ
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Double Clean, Single Front Squat
* **Typical reps:** 3-8; commonly sets of 3, 4, or 5
* **How-to:** Both bells in the double rack. Squat to depth, drive up. The rack position taxes the thoracic spine and bracing — this is where serious leg strength gets built.

### Double Back Squat

* **Aliases:** Double Trap Squat, 2KB Back Squat
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Clean, Double Front Squat, upper-back strength
* **Typical reps:** 5-8
* **How-to:** Clean both bells to the rack, then pop the elbows up and seat the bells vertically on the upper traps behind the neck, hands clasped to the bells (or fixed to the head) to stop them slipping. Feet slightly wider than hip-width, toes slightly out. Brace and drop the hips straight down with a vertical shin and upright torso. Demands real upper-back strength to hold the bells seated; a favorite progression in systems like Wolf Brigade.

### Double Overhead Squat

* **Aliases:** Double OHS, 2KB OHS
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Snatch or Double Jerk to overhead, Overhead Squat, thoracic / ankle / hip mobility, strong overhead lockout
* **Typical reps:** 3-5
* **How-to:** Press or clean-and-jerk both bells to a full overhead lockout — arms extended, biceps by the ears, hands facing forward or slightly in, core rigid. Feet shoulder-width or slightly wider, toes slightly out. Push the hips back and squat as deep as mobility allows (ideally hips below knees) while keeping the bells locked out and stacked over the heels — no spinal rounding, no arms drifting forward. Drive up evenly through the whole foot. One of the most mobility-demanding kettlebell movements there is.

### Double Military Press

* **Aliases:** DMP, Double Press
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Double Clean, Single Military Press
* **Typical reps:** 3-10; ladders with 33%/50%/66% of rep max common
* **How-to:** From the double rack, press both bells overhead simultaneously with strict form. Same banana arc as the single — out then up. Lock out elbows at the top.

### Double Floor Press

* **Aliases:** None common
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Floor Press
* **Typical reps:** 5-10
* **How-to:** Lying on your back with knees bent, press two bells straight up from the shoulders simultaneously. Floor limits bottom range of motion.



### Standing Seesaw Press



* **Aliases:** Alternating Press, Seesaw Press
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Military Press, Double Clean
* **Typical reps:** 5-10 per side (alternating)
* **How-to:** Double rack. Press one bell overhead while the other stays racked, then lower as you press the other side — the bells trade positions on each rep. The constant offset load taxes the core harder than the symmetric Double Press, and the descending bell provides a brief "rest" that lets you accumulate more total reps.



### Floor Seesaw Press



* **Aliases:** Alternating Floor Press
* **Category:** Grind
* **Equipment:** 2 KB
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Floor Press
* **Typical reps:** 5-10 per side (alternating)
* **How-to:** Lying on your back with knees bent, two bells held at the shoulders. Press one bell to lockout while the other stays at the shoulder, then trade as you lower one and press the other. Safer entry to alternating pressing than the standing version — no balance demand, just the alternating load itself.

---

## DOUBLE KETTLEBELL — CARRIES

### Farmer's Carry

* **Aliases:** Farmer's Walk
* **Category:** Carry
* **Equipment:** 2 KB
* **Difficulty:** Beginner
* **Prerequisites:** KB Deadlift
* **Typical reps:** 50-100 yards per set
* **How-to:** A bell in each hand at the sides. Walk for distance, staying tall and breathing. Loads the grip, traps, and core. Symmetric so heavy total weight is manageable.

### Double Rack Carry

* **Aliases:** None common
* **Category:** Carry
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Double Clean
* **Typical reps:** 50-100 yards per set
* **How-to:** Double clean the bells to the rack, then walk for distance. Forearms vertical, ribs down, breathing controlled.

---

## BODYWEIGHT ACCESSORIES

### Push-up

* **Aliases:** None
* **Category:** Bodyweight
* **Equipment:** BW
* **Difficulty:** Beginner
* **Prerequisites:** Plank
* **Typical reps:** 5-20; ladders 10-15-20
* **How-to:** Plank position, hands under shoulders. Lower the chest to the floor with elbows tracking \\~45 degrees from the torso, then press back up. Full body tension throughout.

### Pull-up

* **Aliases:** None
* **Category:** Bodyweight
* **Equipment:** BW (bar)
* **Difficulty:** Intermediate-Advanced
* **Prerequisites:** Hanging strength, scapular control
* **Typical reps:** 1-10; ladders 1-2-3 or 2-3-5
* **How-to:** Hang from a bar with overhand grip, hands slightly wider than shoulders. Pull the chest toward the bar by driving the elbows down, then lower under control to a full hang.

### Chin-up

* **Aliases:** None
* **Category:** Bodyweight
* **Equipment:** BW (bar)
* **Difficulty:** Intermediate
* **Prerequisites:** Hanging strength
* **Typical reps:** 1-10; ladders 1-2-3 or 2-3-5
* **How-to:** Same as pull-up but with underhand grip, hands shoulder-width. More bicep involvement than the pull-up.

### Parallel Dip

* **Aliases:** Dip
* **Category:** Bodyweight
* **Equipment:** BW (parallel bars)
* **Difficulty:** Intermediate
* **Prerequisites:** Push-up, shoulder mobility
* **Typical reps:** 3-15; ladders 3-5-7 or 5-10-15
* **How-to:** Support yourself on parallel bars with arms locked out. Lower until shoulders are at or slightly below the elbows, then press back up. Tricep and chest dominant.

### Crawling

* **Aliases:** Bear Crawl, Quadrupedal Movement
* **Category:** Bodyweight
* **Equipment:** BW
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 20-60 seconds per set
* **How-to:** From all fours with knees hovering just off the floor, crawl forward by moving opposite hand and opposite foot together. Stays low and slow. Core, shoulder, and reflexive stability work.

### Burpee

* **Aliases:** None
* **Category:** Bodyweight
* **Equipment:** BW
* **Difficulty:** Intermediate
* **Prerequisites:** Push-up, jump
* **Typical reps:** 5-15
* **How-to:** From standing, drop to a push-up position, do a push-up, jump or step the feet back in, and jump up with arms overhead. High-intensity conditioning movement.

### Plank

* **Aliases:** Front Plank
* **Category:** Bodyweight
* **Equipment:** BW
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 20-60 seconds
* **How-to:** Forearm or push-up position. Hold a straight line from head to heels with the abs braced. Full-body isometric.

### Inchworm

* **Aliases:** Walkout, KB Inchworm (loaded variant)
* **Category:** Bodyweight (KB + BW for the loaded variant)
* **Equipment:** BW (or 1 KB + BW)
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Plank, hamstring mobility
* **Typical reps:** 5-10, or as prescribed inside a complex (e.g., the Humane Burpee)
* **How-to:** From standing, hinge and place the hands on the floor with legs as straight as mobility allows (a dynamic hamstring stretch). Walk the hands forward one at a time into a plank, brace, then walk them back and stand. The bodyweight version is the one used in the Humane Burpee. **Loaded variant (KB Inchworm):** set a bell upright at the start; in the plank, reach one hand across to drag the bell to the opposite side (a Plank Drag), then walk back — adds an anti-rotation core demand.

### Walking Lunge (BW)

* **Aliases:** None
* **Category:** Bodyweight
* **Equipment:** BW
* **Difficulty:** Beginner
* **Prerequisites:** None
* **Typical reps:** 10-20 per side
* **How-to:** Step forward into a lunge, knee tracking over the foot, back knee tapping the floor. Drive up and step through with the other leg. Unloaded version of the loaded lunge.



### Crush Grip Push-up



* **Aliases:** KB Push-up
* **Category:** Bodyweight (KB + BW)
* **Equipment:** 1 KB + BW
* **Difficulty:** Beginner-Intermediate
* **Prerequisites:** Push-up
* **Typical reps:** 5-15
* **How-to:** Standard push-up position with one hand on each side of a kettlebell at chest level, squeezing the bell hard between the palms throughout the set. The crush grip drives huge pec and tricep activation through isometric tension while the bell stays put. Functions as a chest-focused push-up variant without needing extra equipment.



### Burpee Over Kettlebell



* **Aliases:** None common
* **Category:** Bodyweight
* **Equipment:** 1 KB + BW
* **Difficulty:** Intermediate
* **Prerequisites:** Burpee
* **Typical reps:** 5-15
* **How-to:** Bell on the floor next to you. Drop to a push-up beside the bell, then explode up and jump laterally over the bell to land on the other side. Drop into another burpee and repeat back across. Same conditioning demand as a regular burpee plus a hop that breaks up the rhythm and adds a small power element.

---

## COMPLEXES

A complex is a fixed sequence of movements performed back-to-back with the same bell(s), without setting the weight down between movements (the "no drop" rule). The defining feature is the rep structure, not just the movement list. These are programmed as single units within a workout and draw from the individual movements in the sections above.

Two ways to run a sequence — note which a given complex uses:

* **Complex (block style):** Complete all reps of movement 1, then all reps of movement 2, and so on. One round = the full sequence; the bell stays in hand the whole round.
* **Chain (cluster style):** One rep of each movement in order, then repeat the whole chain for the prescribed reps.

Difficulty is gated by the hardest movement in the sequence plus the added fatigue, grip, and coordination cost of chaining. A complex is never easier than its toughest component.

Schema (newer entries): **Sequence** (A -> B -> C) | **Run style** (Complex / Chain / Either) | **Equipment** | **Difficulty** | **Prerequisites** (every component) | **Typical reps** | **Note**. Older entries below predate the Run-style field; their Notes describe how they're run.

### Half Olympic

* **Sequence:** Clean → Front Squat → Press
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, Front Squat, Military Press
* **Typical reps:** Sets of 5; ladders 2-3-5 or 2-4-6-8
* **Note:** Performed as a complex (all reps of one before the next) or a chain (one rep of each, repeat). Variants substitute Push Press or Jerk for the Press.

### True Olympic

* **Sequence:** Clean → Front Squat → Jerk
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Clean, Double Front Squat, Double Jerk
* **Typical reps:** Sets of 5
* **Note:** The full Olympic-style sequence with both bells.

### Long Cycle

* **Sequence:** Clean → Jerk (with drop between reps)
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Jerk
* **Typical reps:** 5-10 per side (single); 5-10 (double); ladders 1-5
* **Note:** Competition kettlebell sport lift. Brutal conditioning.

### Real Muscle-Building Fat-Burner

* **Sequence:** Clean → Jerk (or Clean → Push Press for the "Light" version)
* **Equipment:** 2 KB
* **Difficulty:** Intermediate-Advanced
* **Prerequisites:** Double Clean, Double Jerk (or Push Press)
* **Typical reps:** Sets of 10
* **Note:** Neupert's preferred mass-building combo.

### King-Sized Combo

* **Sequence:** Snatch → Press → Front Squat (or variants reordering these three)
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Snatch, Military Press, Front Squat
* **Typical reps:** Sets of 5 (single); sets of 3 (double)
* **Note:** Variants change exercise order or substitute Push Press/Jerk for Press.

### Going Ballistic

* **Sequence:** Swing → Clean → Snatch (and variants adding High Pull or Push Press)
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Swing, Clean, Snatch (and High Pull / Push Press if used)
* **Typical reps:** Sets of 5
* **Note:** All-ballistic complex — high cardio, no grinds.

### The Giant

* **Sequence:** Clean → Press (1 KB)
* **Equipment:** 1 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, Military Press
* **Typical reps:** Ladders 1-5 per side
* **Note:** Single-bell muscle-building protocol from Neupert's program of the same name.



### Kneeling Clean to Windmill



* **Sequence:** Half-Kneeling Clean → Press → Windmill (from kneeling)
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Military Press, Windmill, hip and shoulder mobility
* **Typical reps:** 3-5 per side
* **Note:** Kneel on the leg same-side as the bell. Clean to the rack using hip extension from the kneeling position (no leg drive), press overhead, then hinge into a windmill — free hand reaches between the knees, eyes on the bell. Reverse back to the rack and ground. Combo of three skills with no leg drive available — challenges mobility, stability, and pressing strength under load.



### Clean + Push Press



* **Sequence:** Clean → Push Press
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Clean, Push Press
* **Typical reps:** Ladders 1-5 per side, or sets of 5-10
* **Note:** Drop-in replacement for Clean + Press when you want to cycle for reps or work past a strict press plateau. The leg drive on the push press lets you handle more weight and keep moving once the shoulder fatigues. Common as a conditioning combo or as the "ballistic press" option in a complex.



### Side Lunge and Clean



* **Sequence:** Side Lunge → Clean (from low position)
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Lateral Squat, hip mobility
* **Typical reps:** 3-5 per side
* **Note:** Bell on the floor outside one foot. Wide stance — shift weight onto the bell-side leg, drop into a deep lateral squat to grip the bell, then drive up and laterally while cleaning the bell to the rack. Combines lateral hip strength with the clean pattern. Distinct enough from a standard clean to program separately when you want frontal-plane work.

---

### Armor Building Complex (ABC)

* **Aliases:** ABC
* **Sequence:** Double Clean → Military Press → Front Squat
* **Run style:** Chain — one round = 2 cleans, 1 press, 3 squats
* **Equipment:** 2 KB
* **Difficulty:** Intermediate
* **Prerequisites:** Double Clean, Double Military Press, Double Front Squat
* **Typical reps:** 2 cleans + 1 press + 3 squats per round. EMOM (one round on the minute) for 15-30 min, or accumulate quality rounds in 15-20 min. Climb 5→10→15 rounds; work up to 10→15→20.
* **Note:** Dan John's complex. The single strict press is the governor — self-limiting by design: when the press dies, drop it and keep alternating cleans and squats. Standard load 2×24 kg men / 2×16 kg women; 32-36 kg advanced. Single-bell version: clean+press left, swing-switch to clean+press right, then two offset front squats. Often paired with the Humane Burpee on a weekly rotation (Wk1: ABC, HB1, ABC / Wk2: HB1, ABC, HB2).

### Humane Burpee

* **Aliases:** HB, HB1 / HB2
* **Sequence:** Swing → Goblet Squat → Inchworm out → Push-up → Inchworm back (descending ladder)
* **Run style:** Complex (block) with a descending rep ladder
* **Equipment:** 1 KB + BW
* **Difficulty:** Intermediate
* **Prerequisites:** Two-Hand Swing, Goblet Squat, Push-up
* **Typical reps:** HB1 — 15 swings, 5 goblet squats, inchworm out, 5 push-ups, inchworm back; repeat dropping squats/push-ups 5→4→3→2→1 (swings stay 15). HB2 — same shape starting at 10 goblet squats / 10 push-ups, descending 10→1.
* **Note:** Dan John conditioning piece, pairs with the ABC. Set the bell down under control between the goblet squat and the inchworm. *Inchworm* is now its own DB entry (bodyweight, plus a loaded KB variant).

### The Deep Six (RKC)

* **Aliases:** RKC Deep Six, Big Six complex
* **Sequence:** Snatch → One-Hand Swing → Clean → Military Press → Front Squat
* **Run style:** Complex (block) — all 5 reps of each on one side, then switch
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Snatch (plus its chain: Swing, Clean, High Pull, overhead mobility), Military Press, Single KB Front Squat
* **Typical reps:** 5 reps each movement, full sequence one side without dropping the bell, then switch.
* **Note:** Built on the RKC "Big Six" under hardstyle rules — no drop, no rest between movements, ballistic power plus grind tension throughout. The snatch lead-off gates it to Advanced.

### The Kettlebell Psycho Press

* **Aliases:** Psycho Press
* **Sequence:** Double Clean → Deep Front Squat → Thruster (strict press driven out of the squat)
* **Run style:** Chain — each rep is clean, squat, press from the bottom
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Clean, Double Front Squat, Double Military Press / Thruster, overhead mobility
* **Typical reps:** Low reps, heavy. Programmed in circuits chasing mechanical failure, not volume.
* **Note:** Joe Daniels / KBOMG. A deliberately ultra-strict thruster — minimal leg drive into the press, bells driven up in a slight corkscrew to lockout. The point is structural integrity under load: elbows tucked, no lateral power leak. Systemically brutal.

### The Bruce Complex

* **Aliases:** None
* **Sequence:** Two-Hand Swing → Forward Flip (catch the horns) → Goblet Squat → reset
* **Run style:** Chain — one rep = the full flow, climbed as a ladder
* **Equipment:** 1 KB
* **Difficulty:** Advanced (Intermediate-Advanced with the High Pull substitution)
* **Prerequisites:** Two-Hand Swing, Goblet Squat, strong grip/tension control; flip catch demands timing
* **Typical reps:** Ladder 1→10 reps. Often run as inverse ladders against another lift (e.g., dead-stop snatches) — Bruce reps climb as the other's fall. Heavy bell (elite: 48 kg+).
* **Note:** Joe Daniels / KBOMG. At the top of the swing, release and flip the bell to catch the horns into the rack, then goblet squat. The *forward flip / horn-catch* is now its own DB entry; **High Pull** remains the accessible substitution at the top. Super Bruce variant isolates each arm: 1-arm swing → 1-arm flip → snatch → overhead squat.

### The Kettlebell Cyclops Complex

* **Aliases:** Cyclops
* **Sequence:** Clean → Back Squat → Clean (regrip) → Front Squat → Overhead Squat
* **Run style:** Chain — 1 rep of each, set the bell down, repeat
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Clean, Single KB Front Squat, Overhead Squat, single-arm overhead stability and mobility
* **Typical reps:** 1 rep each through the sequence; 3-5 rounds, 90-120 s rest, alternating the starting arm each round. Heavy bell.
* **Note:** Joe Daniels / KBOMG. Squat-focused hypertrophy. Single KB Back Squat is now a DB entry (bell on the trap, not the cervical spine).

### The Firebreather Complex

* **Aliases:** None
* **Sequence:** Dead-Stop Swing → Two-Hand Swing → Two-Hand Clean → One-Hand Swing → One-Arm Deadlift → High Pull → Pendulum High Pull
* **Run style:** Complex (block) — descending-rep single set, 50 reps unbroken
* **Equipment:** 1 KB
* **Difficulty:** Intermediate-Advanced
* **Prerequisites:** Two-Hand Swing, One-Hand Swing, Clean, Suitcase Deadlift, High Pull; pain-free heavy hinge
* **Typical reps:** One unbroken set — 7 dead-stop swings, 7 two-hand swings, 6 two-hand cleans (3L/3R), 5 one-hand swings (R then L), 4 one-arm deadlifts (R/L), 3 high pulls, 3 pendulum high pulls.
* **Note:** Continuous heavy hinge-to-pull conditioning. Dead-stop swing = park the bell on the floor between reps (Two-Hand Swing variant); one-arm deadlift = Suitcase Deadlift; pendulum high pull = High Pull taken straight from the swing arc. Pick a weight you can control one-handed.

### The Kettlebell Bodysnatcher Complex

* **Aliases:** Bodysnatcher
* **Sequence:** Dead-Stop Swing → Dead Clean → Goblet Squat → Thruster → descent
* **Run style:** Chain — one rep = the full flow, unbroken
* **Equipment:** 1 KB
* **Difficulty:** Advanced
* **Prerequisites:** Two-Hand Swing, Clean, Goblet Squat, Thruster, overhead mobility
* **Typical reps:** Unilateral — 3-5 continuous reps one arm, switch, 3-5 the other. 3-5 sets, 60-90 s rest after both sides. Load light enough for a clean overhead lockout.
* **Note:** Hinge + squat + push + pull in one flow. Dead clean = clean from a dead stop on the floor. Spikes HR fast; form on the overhead thruster is the limiter.

### The Cowboy Complex

* **Aliases:** None
* **Sequence:** Dead-Stop Swing → Dead-Stop Clean → Push Press → Front Squat
* **Run style:** Complex (block) — all reps of one, then the next, no drop
* **Equipment:** 2 KB (single-bell scalable)
* **Difficulty:** Advanced
* **Prerequisites:** (Double) Swing, Clean, Push Press, Front Squat
* **Typical reps:** Fixed reps per movement (e.g., 5 each), 3-5 rounds, cumulative volume.
* **Note:** Heavy posterior-chain + overhead block complex. Dead-stop = park between reps. Strong grip and lung demand.

### The Cowgirl Complex

* **Aliases:** None
* **Sequence:** Dead-Stop Swing → Dead-Stop Clean → Strict Press → Clean & Push Press → Clean & Jerk
* **Run style:** Complex (block) — escalating power output through the sequence
* **Equipment:** 2 KB (scalable)
* **Difficulty:** Advanced
* **Prerequisites:** Swing, Clean, Military Press, Push Press, Jerk (Long Cycle)
* **Typical reps:** Block reps per movement, 3-5 rounds.
* **Note:** Hip-dominant; builds from strict strength to ballistic overhead. The jerk finish gates it Advanced. Sister to the Cowboy — swaps front squats for an overhead-press progression.

### The Kickstarter Complex

* **Aliases:** None
* **Sequence:** Double Overhead Squat → Double Rack (Front) Squat → Double Back Squat → Suitcase Deadlift
* **Run style:** Complex (block) — all reps of one before the next; bells ideally never touch the floor until done
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Front Squat, Overhead Squat, Suitcase Deadlift, overhead mobility
* **Typical reps:** 5 OH squats, 2-5 rack squats, 5 back squats, 5 suitcase deadlifts. Scale 2-5 reps per movement. Heavy.
* **Note:** KBMUSCLE leg-endurance complex. Double Rack Squat = Double Front Squat. *Double Overhead Squat* and *Double Back Squat* are now DB entries.

### The Kettlebell Shoulder Fire Complex

* **Aliases:** Shoulder Fire
* **Sequence:** Military Press → Push Press → Jerk
* **Run style:** Complex (block) — 12 reps per round
* **Equipment:** 1 KB or 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Military Press, Push Press, Jerk
* **Typical reps:** 3 strict presses → 4 push presses → 5 jerks per round, no drop. Heavy enough that 3 strict presses is already hard.
* **Note:** Overhead-strength ladder that adds leg assistance as the shoulder fatigues — strict, then dip-and-drive, then double-dip jerk. Keep full-body tension; no sloppy momentum.

### The Glute-cifer

* **Aliases:** None
* **Sequence:** Double Outside-the-Leg Swing → Double Clean → Double Front Squat → cast back to Swing
* **Run style:** Either — continuous, no drop
* **Equipment:** 2 KB
* **Difficulty:** Advanced
* **Prerequisites:** Double Swing, Double Clean, Double Front Squat
* **Typical reps:** Block or chain reps, cycling back to swings to finish before rest.
* **Note:** Posterior-chain hypertrophy + conditioning. Outside-the-leg swing = wide-stance Double Swing with the bells passing outside the knees. Constant tension on glutes and core because the bells never go down.

---

## QUICK REFERENCE TABLES

### By Goal

|Goal|Primary Categories|Example Exercises|
|-|-|-|
|Fat loss / conditioning|Ballistics|Swing, Snatch, Clean, Push Press, Jerk, Long Cycle|
|Strength / hypertrophy|Grinds|Press, TGU, Front Squat, Goblet Squat, Deadlift|
|General health|Both|Swing + Press + TGU minimum|
|Sport conditioning|Both, biased to weaknesses|Mix per athlete need|
|Core / anti-rotation|Grinds + Carries|Suitcase Carry, Renegade Row, TGU, Windmill|
|Grip|Ballistics + Carries|Snatch, Farmer's Carry, BUP Press|

### By Difficulty (selected key lifts)

|Difficulty|Ballistics|Grinds|Carries|
|-|-|-|-|
|Beginner|2H Swing, Goblet Clean|Goblet Squat, Deadlift, Floor Press, Halo|Suitcase Carry, Farmer's Carry|
|Intermediate|1H Swing, Clean, High Pull, Push Press, Double Swing, Double Clean|Press, TGU, Front Squat, Windmill, Renegade Row prep|Rack Carry, Overhead Carry, Double Rack Carry|
|Advanced|Snatch, Jerk, Long Cycle, Double Snatch, Double Jerk|BUP Press, Overhead Squat, Pistol Squat, Renegade Row, Man Maker|Bottoms Up Carry|

---

**End of database.** Add new exercises in the appropriate section using the same format. When generating workouts, default to exercises that appear in the project's source files (Neupert, Pavel, the basics guide) unless explicitly asked otherwise. Respect prerequisites — don't program advanced exercises for users without the foundational movements in place.

`;
