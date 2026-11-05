# Product catalogue images

**Catalogue content:** edit `src/data/catalog/catalog-master.ts` only.

Place one PNG per **parent product** (variants share the same file).

Path pattern:

`public/images/catalog/{brand-slug}/{product-slug}.png`

Brand logos (e.g. Akubela): `public/images/catalog/{brand-slug}/Akubela-Logo.png` — referenced in `catalog-master.ts` as `/images/catalog/akubela/Akubela-Logo.png`.

**Replacing an image:** overwrite the PNG in this folder (same filename). There is no separate upload step. After saving, refresh the page; the site appends a cache key from the file’s modified time so the new image should appear without clearing `.next`.

## Akubela (`akubela/`)

| File | Product |
|------|---------|
| `Akubela-Logo.png` | Brand logo (carousel + brand page) |
| `hypanel-supreme.png` | HyPanel Supreme |
| `hypanel-lux-ring.png` | HyPanel Lux Ring |
| `hypanel-lux-piano.png` | HyPanel Lux Piano |
| `hypanel-lux-vase.png` | HyPanel Lux Vase |
| `hypanel-keyplus.png` | HyPanel KeyPlus |
| `aura-series-smart-switch.png` | Aura Series Smart Switch |

## MDT (`mdt/`)

| File | Product |
|------|---------|
| `jal-shutter-actuator.png` | JAL Shutter Actuator |
| `akd-230-v-dimming-actuator.png` | AKD 230 V Dimming Actuator |
| `dali-control-pro64-gateway.png` | DALI Control PRO64 Gateway |
| `push-button-light-55.png` | Push Button Light 55 |
| `glass-push-button-ii-light.png` | Glass Push Button II Light |
| `visucontrol-plus.png` | VisuControl Plus |

## Theben (`theben/`)

| File | Product |
|------|---------|
| `ionprime-cp4-knx.png` | iONprime CP4 KNX |
| `ionprime-pb-knx.png` | iONprime PB KNX |

## Moorgen (`moorgen/`)

| File | Product |
|------|---------|
| `m18-smart-dimming-knob.png` | M18 Smart Dimming Knob |

## Basalte (`basalte/`)

| File | Product |
|------|---------|
| `sentido.png` | Sentido |
| `fibonacci.png` | Fibonacci |
| `chopin.png` | Chopin |
| `deseo.png` | Deseo |
| `lisa.png` | Lisa |
| `ellie.png` | Ellie |

**Total: 21 PNG files**

Until a file is added, the site uses `/images/solutions/Control-Panel.png` as fallback.
