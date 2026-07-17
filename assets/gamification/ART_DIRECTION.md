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

## Task-specific thank-you stickers

These tiles reuse the same three references and Nako identity as the postcards. The primary face reference controls Nako's round face, black button eyes, small black nose, and fluffy white coat; the play reference controls her compact body and recognizable purple toy; the watercolor reference controls the warm paper texture and pastel paint treatment.

### Shared sticker prompt

Use case: `illustration-story`. Create one square mini-watercolor sticker tile for a Nako Home Care thank-you toast. Show the same tiny, compact, fluffy white Bichon-like Nako with a round face, black button eyes, a small black nose, correct dog anatomy, and rounded paws. Keep the subject and one simple prop large and readable when displayed at 72×72 px. Paint on a complete warm pastel tile background using blush pink, mint green, soft coral, warm cream, pale sky blue, and restrained lavender. Keep generous edge clearance.

Do not include text, letters, numbers, people, logos, watermarks, transparency, checkerboards, photorealism, gray or transparent fur, a long muzzle, extra limbs, distorted paws, health values, competitive symbols, or unrelated objects.

### Sticker scene prompts and mappings

| Family ID | Scene-specific prompt | Mapping |
|---|---|---|
| `sparkling-surfaces` | Nako holds one soft pink cleaning cloth beside three small sparkles on a blush-and-cream tile. | High-touch surfaces, general surfaces, windows/glass/mirrors |
| `bubbly-washing` | Nako sits beside one small mint care bucket with a cloth and a few floating soap bubbles. | Sink, rubbish bins, cleaning tools |
| `cozy-laundry` | Nako nestles against one neat stack of soft folded blush, mint, and cream laundry. | Mats, linens, covers, blankets, curtains, washer |
| `nako-nook` | Nako sits happily inside a tidy open play pen with her recognizable small purple toy. | Nako play-pen deep clean |
| `health-heart` | Nako sits beside one closed textless cream notebook marked only with a coral heart. | Appetite and weight check-ins |
| `fresh-air` | Nako's fluffy ears and coat lift gently beside simple mint breeze curls. | Ceiling fan and aircon |
| `kitchen-sparkle` | Nako sits beside one clean cream kitchen counter with a tiny coral cloth and two shine marks. | Fridge, air fryer, hood, coffee machine |
| `cozy-bedroom` | Nako rests peacefully beside one plump blush pillow on a warm cream tile. | Bed frame and mattress cleaning |
| `safe-home` | Nako sits proudly behind one small rounded coral heart shield, with no emergency scene. | Doorbell charging and fire-extinguisher training |
| `gentle-training` | Nako sits and happily offers exactly one front paw; add two tiny friendly stars. | Command-training logs |
| `purple-play` | Nako playfully leans toward her recognizable small purple toy. | Play logs |
| `diary-flower` | Nako sits beside one open diary with completely blank pages and one small coral flower. | Submitted diary entries |

### Sticker production and validation

- Generate one family per image-model call using the shared references.
- Export each final asset as a 256×256 RGB WebP with a complete pastel background, targeting 50 KB or less.
- Confirm Nako's face, white coat, compact proportions, and paw anatomy remain consistent across the full set.
- Confirm the main prop remains recognizable at the in-app 72 px display size.
- Confirm there is no text, watermark, transparency, medical value, competitive imagery, or accidental extra object.
- Validate every tracked routine ID against exactly one family mapping before release.
- Render English, Japanese, and Burmese samples at 320–480 px before release.
