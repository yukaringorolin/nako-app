# Nako postcard art direction

## Reference roles

- `assets/routines/nako-kind-handling-reminder.jpg`: primary Nako identity and face reference.
- `assets/routines/nako-playing-toys.jpg`: Nako body size, coat, and purple-toy reference.
- `assets/sections/weekly-reset.jpg`: watercolor medium, warmth, line quality, and palette reference.

The references are guidance, not edit targets. Do not add people from the source photos.

## Shared generation prompt

Use case: `illustration-story`. Create a square collectible postcard for the Nako Home Care mobile app. Show Nako as a tiny, compact, fluffy white Bichon-like dog with a round face, black button eyes, a small black nose, correct dog anatomy, and exactly four legs. Use soft hand-painted watercolor on warm ivory paper, rounded childlike forms, delicate warm outlines, and generous breathing room. Use fluffy white, blush pink, mint green, soft coral, warm cream, pale sky blue, warm gold, and small dark-brown facial details.

Do not include text, letters, numbers, people, logos, watermarks, frames, checkerboards, transparent backgrounds, hard cast shadows, photorealism, gray fur, a long muzzle, extra limbs, distorted paws, competitive imagery, or unnecessary clutter.

## Scene prompts

| ID | Scene-specific prompt |
|---|---|
| `nako-hello` | Nako sits facing the viewer and lifts one front paw in a friendly wave beside one sealed heart envelope. Add pale blush and mint washes. |
| `routine-sparkle` | Nako sits beside one tidy blush-pink care basket containing folded cream and mint cloths and one coral spray bottle. Add two or three subtle sparkles. |
| `training-paw` | Nako sits and happily offers one front paw during gentle training. Put one tiny closed blush-pink treat pouch to the side. |
| `purple-playtime` | Nako playfully holds the small purple plush from the body reference, with one mint ball nearby. Keep the movement safe and controlled. |
| `health-heart` | Nako sits calmly beside one closed cream care notebook with a coral heart. Add a tiny mint stethoscope-shaped curve, but no health values, food portions, medicine, or scales. |
| `diary-flower` | Nako sits beside one open diary with completely blank cream pages and one small coral flower. Keep the mood private, reflective, and warm. |
| `four-care-paws` | Center Nako among exactly four separate pawprints: blush pink, mint green, pale sky blue, and warm golden yellow. Avoid ranking or winner imagery. |
| `cozy-three` | Nako sleeps curled in one cream oval dog bed under one soft blush-pink blanket, with her face and nose visible. |
| `sunny-seven` | Nako sits safely on a bright Singapore-style apartment balcony among exactly three simple tropical potted plants. Add a coral sun and pale sky wash. |
| `rain-or-shine` | Nako sits dry and content indoors beside a closed rainy window. Put one folded blush-pink umbrella on a mint rug beside her. |
| `thank-you-stars` | Nako sits gently beneath one garland containing exactly seven watercolor stars in the shared palette. Do not add crowns, medals, trophies, or podiums. |
| `happy-home` | Nako celebrates calmly in a cozy home corner on a mint rug, with one pink cushion, one cream dog bed, one heart decoration, and restrained paper confetti. |

## Production and validation

- Generate one scene per image-model call.
- Export final assets as 768×768 RGB WebP at visually lossless mobile quality, targeting less than 200 KB each.
- Confirm Nako's face, coat, compact proportions, and paw anatomy remain consistent.
- Confirm object counts in prompts, blank diary pages, and the absence of generated text or watermarks.
- Confirm health scenes contain no outcome values and celebration scenes contain no competitive symbols.
- Render final files in the 320–480 px mobile layout before release.
