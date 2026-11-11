/**
 * SINGLE SOURCE OF TRUTH — Product catalogue
 *
 * Edit this file only for product content, brands, categories, display order and image paths.
 * Place PNG files at each product's `image` path under `public/`.
 */
import type { CatalogMaster } from "@/types/catalog-master";

export const catalogMaster = {
  brands: [
  {
    "id": "akubela",
    "name": "Akubela",
    "slug": "akubela",
    "displayOrder": 10,
    "logo": "/images/catalog/akubela/Akubela-Logo.png",
    "description": "Akubela develops smart-home control products and connected home automation solutions, including intelligent control panels and modular smart switches.",
    "status": "active"
  },
  {
    "id": "mdt",
    "name": "MDT",
    "slug": "mdt",
    "displayOrder": 20,
    "logo": "/images/catalog/mdt/MDT-logo.png",
    "status": "active"
  },
  {
    "id": "theben",
    "name": "Theben",
    "slug": "theben",
    "displayOrder": 30,
    "logo": "/images/catalog/theben/Theben-Logo.png",
    "status": "active"
  },
  {
    "id": "moorgen",
    "name": "Moorgen",
    "slug": "moorgen",
    "displayOrder": 40,
    "logo": "/images/catalog/moorgen/Moorgen-Logo.png",
    "status": "active"
  },
  {
    "id": "basalte",
    "name": "Basalte",
    "slug": "basalte",
    "displayOrder": 50,
    "logo": "/images/catalog/basalte/basalte-logo.png",
    "status": "active"
  },
  {
    "id": "somfy",
    "name": "Somfy",
    "slug": "somfy",
    "displayOrder": 60,
    "description": "Somfy develops motorised curtain, blind and shading solutions for residential and commercial automation.",
    "status": "active"
  },
  {
    "id": "schneider-electric",
    "name": "Schneider Electric",
    "slug": "schneider-electric",
    "displayOrder": 70,
    "logo": "/images/catalog/schneider/Schneider-Logo.png",
    "description": "Schneider Electric is a global energy management and automation technology company offering smart-home control products and KNX automation solutions.",
    "status": "active"
  },
  {
    "id": "onetouch",
    "name": "OneTouch",
    "slug": "onetouch",
    "displayOrder": 80,
    "logo": "/images/catalog/onetouch/OneTouch-Logo.png",
    "description": "OneTouch offers communication and security solutions for modern residential and commercial environments, including digital door locks, video door phones, visitor communication and connected access-control systems.",
    "status": "active"
  }
],
  categories: [
  {
    "id": "smart-touch-panel",
    "name": "Smart Touch Panel",
    "slug": "smart-touch-panel",
    "description": "Centralised smart home control through elegant touchscreen interfaces. Explore products designed to manage lighting, climate, curtains, scenes and connected home functions from a single interface.",
    "heroImage": "/images/Glowing-Smart-Display.png",
    "megaMenuImage": "/images/solutions/Control-Panel.png",
    "displayOrder": 10
  },
  {
    "id": "curtain-controller",
    "name": "Curtain Controller",
    "slug": "curtain-controller",
    "description": "Intelligent curtain and blind control solutions designed to automate window coverings, improve everyday convenience and integrate with smart home scenes.",
    "heroImage": "/images/solutions/Curtain-Controls.png",
    "megaMenuImage": "/images/solutions/Curtain-Controls.png",
    "displayOrder": 20
  },
  {
    "id": "smart-dimming-knob",
    "name": "Smart Remote Controls",
    "slug": "smart-dimming-knob",
    "description": "Handheld and tabletop remote controls for intuitive lighting, scenes, shading and other connected home functions.",
    "heroImage": "/images/products/m18-smart-dimming-knob.png",
    "megaMenuImage": "/images/Smart-Dimming-Knob.png",
    "displayOrder": 30
  },
  {
    "id": "smart-keypad-switch",
    "name": "Smart Keypad Switch",
    "slug": "smart-keypad-switch",
    "description": "Elegant physical control interfaces designed to operate lighting, scenes, curtains and other connected functions with intuitive button-based interactions.",
    "heroImage": "/images/products/k1-smart-keypad-switch.png",
    "megaMenuImage": "/images/products/k1-smart-keypad-switch.png",
    "displayOrder": 40
  },
  {
    "id": "smart-lighting",
    "name": "Actuator",
    "slug": "smart-lighting",
    "description": "Explore dimming actuators, lighting control modules and related automation devices for flexible, comfortable and personalised lighting environments.",
    "heroImage": "/images/solutions/Living-Room.png",
    "megaMenuImage": "/images/solutions/Living-Room.png",
    "displayOrder": 50
  },
  {
    "id": "video-door-phone-vdp",
    "name": "Video Door Phone (VDP)",
    "slug": "video-door-phone-vdp",
    "description": "Smart video door phone and visitor communication solutions combining camera monitoring, indoor displays, mobile connectivity and intelligent access management.",
    "heroImage": "/images/catalog/onetouch/OneTouch-OT-IP-VDP-C3-W.png",
    "megaMenuImage": "/images/catalog/onetouch/OneTouch-ADP-A4-Video-Door-Phone.png",
    "displayOrder": 60
  },
  {
    "id": "door-lock-system",
    "name": "Door Lock System",
    "slug": "door-lock-system",
    "description": "Advanced digital door locking solutions featuring biometric authentication, password access, connected mobile control and intelligent entry security.",
    "heroImage": "/images/catalog/onetouch/OneTouch-OT-630-Pro-Smart-Door-Lock.png",
    "megaMenuImage": "/images/catalog/onetouch/OneTouch-OT-630-Digital-Door-Lock.png",
    "displayOrder": 70
  }
],
  products: [
  {
    "id": "akubela-hypanel-supreme",
    "name": "HyPanel Supreme",
    "slug": "hypanel-supreme",
    "brandId": "akubela",
    "categoryId": "smart-touch-panel",
    "seriesName": "Premium Central Control Panel",
    "shortDescription": "A premium 12.5-inch smart-home control panel designed for centralised control of connected home automation functions.",
    "fullDescription": "HyPanel Supreme is Akubela’s wall-mounted command centre for whole-home automation. Its 12.5-inch touchscreen at 2560 × 1600 resolution runs Android 12, presenting lighting, climate, shading and scene control in a single interface. A 5 MP camera with privacy shutter supports intercom use cases where required. Six-gang relay outputs, eight digital inputs and built-in sensors let the panel act on loads and room conditions directly. Voice assistant support extends hands-free operation for daily routines in premium residential and hospitality spaces.",
    "features": [
      "12.5-inch touchscreen",
      "2560 × 1600 resolution",
      "Android 12",
      "5 MP camera with privacy shutter",
      "Six-gang relay",
      "Eight digital inputs",
      "Built-in sensors",
      "Voice assistant support"
    ],
    "image": "/images/catalog/akubela/hypanel-supreme.png",
    "displayStatus": "published",
    "displayOrder": 10,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Subcategory", "value": "Premium Central Control Panel" },
      { "label": "Installation", "value": "Wall-mounted" },
      { "label": "Display", "value": "12.5-inch touchscreen, 2560 × 1600" },
      { "label": "Operating system", "value": "Android 12" },
      { "label": "Camera", "value": "5 MP with privacy shutter" },
      { "label": "Relay outputs", "value": "Six-gang" },
      { "label": "Digital inputs", "value": "8 channels" }
    ],
    "relatedSlugs": ["hypanel-keyplus", "hypanel-lux-ring"],
    "sourceDocument": "akubela Smart Home Catalogue260701.pdf"
  },
  {
    "id": "akubela-hypanel-lux-ring",
    "name": "HyPanel Lux Ring",
    "slug": "hypanel-lux-ring",
    "brandId": "akubela",
    "categoryId": "smart-touch-panel",
    "seriesName": "Compact Rotary Control Panel",
    "shortDescription": "A circular smart-home controller combining touchscreen interaction with a metal rotary knob.",
    "fullDescription": "HyPanel Lux Ring is a compact, wall-mounted circular controller for secondary control points. Its 2.1-inch touchscreen at 480 × 480 resolution handles device selection and status, while a metal knob with press control supports intuitive dimming and adjustment. An RGB light ring provides clear feedback, and built-in sensors feed ambient automation. Android 12 powers the interface for consistent behaviour with other HyPanel products in mixed Akubela installations.",
    "features": [
      "2.1-inch touchscreen",
      "480 × 480 resolution",
      "Metal knob with press control",
      "RGB light ring",
      "Built-in sensors",
      "Android 12"
    ],
    "image": "/images/catalog/akubela/hypanel-lux-ring.png",
    "displayStatus": "published",
    "displayOrder": 20,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Subcategory", "value": "Compact Rotary Control Panel" },
      { "label": "Installation", "value": "Wall-mounted" },
      { "label": "Display", "value": "2.1-inch touchscreen, 480 × 480" },
      { "label": "Operating system", "value": "Android 12" },
      { "label": "Physical control", "value": "Metal rotary knob with press control" },
      { "label": "Feedback", "value": "RGB light ring" }
    ],
    "relatedSlugs": ["hypanel-lux-piano", "hypanel-lux-vase"],
    "sourceDocument": "akubela Smart Home Catalogue260701.pdf"
  },
  {
    "id": "akubela-hypanel-lux-piano",
    "name": "HyPanel Lux Piano",
    "slug": "hypanel-lux-piano",
    "brandId": "akubela",
    "categoryId": "smart-touch-panel",
    "seriesName": "Premium Rotary Control Panel",
    "shortDescription": "A premium smart-home controller featuring a circular touchscreen, tactile glass buttons and a metal rotary knob.",
    "fullDescription": "HyPanel Lux Piano combines a 2.1-inch circular touchscreen at 480 × 480 with four AG glass buttons and a metal rotary knob for refined wall-mounted control. The RGB light ring communicates status at a glance, while built-in sensors support room-aware automation. Infrared remote-control support extends command to compatible appliances. Lux Piano suits bedrooms, corridors and lounge areas where tactile, discrete control is preferred over a large display.",
    "features": [
      "2.1-inch touchscreen",
      "480 × 480 resolution",
      "Four AG glass buttons",
      "RGB light ring",
      "Built-in sensors",
      "Infrared remote-control support"
    ],
    "image": "/images/catalog/akubela/HyPanel-Lux-Piano.png",
    "displayStatus": "published",
    "displayOrder": 30,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Subcategory", "value": "Premium Rotary Control Panel" },
      { "label": "Installation", "value": "Wall-mounted" },
      { "label": "Display", "value": "2.1-inch touchscreen, 480 × 480" },
      { "label": "Physical controls", "value": "4 AG glass buttons + metal rotary knob" },
      { "label": "Feedback", "value": "RGB light ring" },
      { "label": "Control", "value": "Infrared remote-control support" }
    ],
    "relatedSlugs": ["hypanel-lux-ring", "aura-series-smart-switch"],
    "sourceDocument": "akubela Smart Home Catalogue260701.pdf"
  },
  {
    "id": "akubela-hypanel-lux-vase",
    "name": "HyPanel Lux Vase",
    "slug": "hypanel-lux-vase",
    "brandId": "akubela",
    "categoryId": "smart-touch-panel",
    "seriesName": "Desktop Smart Control Panel",
    "shortDescription": "A decorative desktop smart-home controller combining a crystal-glass base with an integrated touchscreen.",
    "fullDescription": "HyPanel Lux Vase is designed for desktop placement in living areas and suites where a sculptural control object is desired. A crystal-glass base and RGB ambient lighting give the controller a decorative presence, while the 2.1-inch touchscreen at 480 × 480 handles device and scene interaction. A metal rotary knob supports tactile adjustment, built-in sensors assist automation, and an integrated battery allows flexible positioning without permanent wall mounting.",
    "features": [
      "2.1-inch touchscreen",
      "480 × 480 resolution",
      "Crystal-glass base",
      "RGB ambient lighting",
      "Metal rotary knob",
      "Built-in battery",
      "Built-in sensors"
    ],
    "image": "/images/catalog/akubela/hypanel-lux-vase.png",
    "displayStatus": "published",
    "displayOrder": 40,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Subcategory", "value": "Desktop Smart Control Panel" },
      { "label": "Installation", "value": "Desktop" },
      { "label": "Display", "value": "2.1-inch touchscreen, 480 × 480" },
      { "label": "Base", "value": "Crystal-glass" },
      { "label": "Lighting", "value": "RGB ambient lighting" },
      { "label": "Power", "value": "Built-in battery" }
    ],
    "relatedSlugs": ["hypanel-lux-piano", "hypanel-supreme"],
    "sourceDocument": "akubela Smart Home Catalogue260701.pdf"
  },
  {
    "id": "akubela-hypanel-keyplus",
    "name": "HyPanel KeyPlus",
    "slug": "hypanel-keyplus",
    "brandId": "akubela",
    "categoryId": "smart-touch-panel",
    "seriesName": "Touchscreen Keypad Panel",
    "shortDescription": "A compact smart-home control panel combining a touchscreen interface with dedicated touch buttons.",
    "fullDescription": "HyPanel KeyPlus merges a 4-inch touchscreen at 480 × 480 with six dedicated touch buttons for quick access to frequent scenes and devices. Running Android 13, it offers a compact wall-mounted alternative to full-format panels. Two-gang relay outputs and built-in sensors support direct control and environmental input in corridors, bedrooms and service areas where space is limited but touch UI is still required.",
    "features": [
      "4-inch touchscreen",
      "480 × 480 resolution",
      "Android 13",
      "Six touch buttons",
      "Two-gang relay",
      "Built-in sensors"
    ],
    "image": "/images/catalog/akubela/hypanel-keyplus.png",
    "displayStatus": "published",
    "displayOrder": 50,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Subcategory", "value": "Touchscreen Keypad Panel" },
      { "label": "Installation", "value": "Wall-mounted" },
      { "label": "Display", "value": "4-inch touchscreen, 480 × 480" },
      { "label": "Operating system", "value": "Android 13" },
      { "label": "Touch buttons", "value": "6 dedicated" },
      { "label": "Relay outputs", "value": "Two-gang" }
    ],
    "relatedSlugs": ["hypanel-supreme", "aura-series-smart-switch"],
    "sourceDocument": "akubela Smart Home Catalogue260701.pdf"
  },
  {
    "id": "akubela-aura-series-smart-switch",
    "name": "Aura Series Smart Switch",
    "slug": "aura-series-smart-switch",
    "brandId": "akubela",
    "categoryId": "smart-keypad-switch",
    "seriesName": "Modular KNX Smart Switch",
    "shortDescription": "A premium modular KNX smart-switch solution featuring refined finishes, touch controls and digital labelling.",
    "fullDescription": "Aura Series Smart Switch is Akubela’s modular KNX wall-switch platform for projects that require tactile control with premium materials. Metal and glass finish options and digital labelling adapt the plate to each interior scheme. Model-dependent touchscreen modules extend capability where specified in the catalogue. Aura complements HyPanel controllers by providing consistent, discrete switching at doorways, bedsides and circulation areas.",
    "features": [
      "KNX-based switch system",
      "Modular design",
      "Metal and glass finish options",
      "Digital labelling",
      "Model-dependent touchscreen modules"
    ],
    "image": "/images/catalog/akubela/aura-series-smart-switch.png",
    "displayStatus": "published",
    "displayOrder": 60,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Subcategory", "value": "Modular KNX Smart Switch" },
      { "label": "Installation", "value": "Wall-mounted" },
      { "label": "Protocol", "value": "KNX" },
      { "label": "Design", "value": "Modular" },
      { "label": "Finishes", "value": "Metal and glass options" }
    ],
    "relatedSlugs": ["hypanel-lux-piano", "hypanel-keyplus"],
    "sourceDocument": "akubela Smart Home Catalogue260701.pdf"
  },
  {
    "id": "somfy-glydea-ultra-35e-rts-mic",
    "name": "GLYDEA ULTRA 35e RTS MIC",
    "slug": "glydea-ultra-35e-rts-mic",
    "brandId": "somfy",
    "categoryId": "curtain-controller",
    "seriesName": "GLYDEA",
    "shortDescription": "Premium motorised curtain system designed for smooth, quiet and convenient curtain operation with compatible RTS wireless controls.",
    "fullDescription": "Somfy GLYDEA ULTRA 35e RTS MIC is a premium motorised curtain system for smooth, quiet and convenient curtain operation. It is designed to work with compatible RTS wireless controls, supporting everyday residential and commercial curtain automation where RTS integration is configured.",
    "features": [
      "Premium motorised curtain operation",
      "Smooth and quiet curtain movement",
      "Compatible RTS wireless controls",
      "Suitable for residential and commercial interiors"
    ],
    "image": "/images/catalog/somfy/Somfy-Glydea-Ultra-35e-RTS-MIC.png",
    "displayStatus": "published",
    "displayOrder": 68,
    "contentVerificationStatus": "partial",
    "specifications": [
      { "label": "Brand", "value": "Somfy" },
      { "label": "Model", "value": "GLYDEA ULTRA 35e RTS MIC" },
      { "label": "Technology", "value": "RTS Wireless" }
    ],
    "relatedSlugs": ["designo-35-wt"]
  },
  {
    "id": "somfy-designo-35-wt",
    "name": "DESIGNO 35 WT",
    "slug": "designo-35-wt",
    "brandId": "somfy",
    "categoryId": "curtain-controller",
    "seriesName": "DESIGNO",
    "shortDescription": "A motorised curtain solution designed for smooth and reliable automated curtain operation in residential and commercial interiors.",
    "fullDescription": "Somfy DESIGNO 35 WT is a motorised curtain solution designed for smooth and reliable automated curtain operation. Wired Technology (WT) support suits installations where wired curtain control is preferred for residential and commercial interiors.",
    "features": [
      "Motorised curtain operation",
      "Smooth and reliable automation",
      "Wired Technology (WT)",
      "Suitable for residential and commercial interiors"
    ],
    "image": "/images/catalog/somfy/Somfy-Desingo-35-WT.png",
    "displayStatus": "published",
    "displayOrder": 69,
    "contentVerificationStatus": "partial",
    "specifications": [
      { "label": "Brand", "value": "Somfy" },
      { "label": "Model", "value": "DESIGNO 35 WT" },
      { "label": "Technology", "value": "Wired Technology (WT)" }
    ],
    "relatedSlugs": ["glydea-ultra-35e-rts-mic"]
  },
  {
    "id": "mdt-jal-shutter-actuator",
    "name": "JAL Shutter Actuator",
    "slug": "jal-shutter-actuator",
    "brandId": "mdt",
    "categoryId": "smart-lighting",
    "shortDescription": "KNX shutter actuator for 230 V AC motors with sun-position logic, absolute slat tracking, ventilation positions and scene-linked shading control.",
    "fullDescription": "The MDT JAL Shutter Actuator is installed in the electrical distribution or KNX cabinet to drive shutter and blind motors—not a decorative wall switch. Relevant models support 230 V AC motor configurations documented in the MDT product list. Sun-position calculation enables automatic shading and slat tracking, while absolute height and slat positioning deliver precise daylight management. Dedicated ventilation positions, scene integration, alarm reactions, central overrides and locking functions align with whole-building KNX logic. Secure variants are available where the catalogue specifies enhanced behaviour.",
    "features": [
      "KNX actuator for shutter and blind motor control",
      "230 V AC motor support on applicable models",
      "Sun-position calculation and automatic shading",
      "Absolute height and slat positioning",
      "Ventilation positioning",
      "Scene, alarm, central and locking functions",
      "Secure variants where documented"
    ],
    "image": "/images/catalog/mdt/jal-shutter-actuator.png",
    "displayStatus": "published",
    "displayOrder": 70,
    "contentVerificationStatus": "verified",
    "seriesName": "Shutter Actuators",
    "relatedSlugs": [
      "akd-230-v-dimming-actuator",
      "dali-control-pro64-gateway"
    ],
    "sourceDocument": "MDT_Productlist_EN 2026.pdf"
  },
  {
    "id": "mdt-akd-230-v-dimming-actuator",
    "name": "AKD 230 V Dimming Actuator",
    "slug": "akd-230-v-dimming-actuator",
    "brandId": "mdt",
    "categoryId": "smart-lighting",
    "shortDescription": "KNX actuator for switching and dimming 230 V lighting with leading/trailing-edge selection, load protection, soft start and measured power feedback.",
    "fullDescription": "The AKD 230 V Dimming Actuator manages switching and dimming of compatible 230 V lighting circuits from the KNX bus. Operation is optimised for dimmable LED loads with selectable leading-edge or trailing-edge dimming modes. Effective power measurement supports energy monitoring in automation logic. Overload, short-circuit and temperature protection guard the installation, while soft-start behaviour reduces inrush stress on lamps. Day and night dimming functions extend comfort scenes. Channel count and per-channel power ratings depend on the specific AKD model selected from the MDT catalogue—those values must be taken from the order code, not assumed here.",
    "features": [
      "Switching and dimming of 230 V lighting circuits",
      "Optimised dimming behaviour for dimmable LEDs",
      "Selectable leading-edge and trailing-edge dimming",
      "Effective power measurement",
      "Overload, short-circuit and temperature protection",
      "Soft-start functionality",
      "Day/night dimming functions"
    ],
    "image": "/images/catalog/mdt/akd-230-v-dimming-actuator.png",
    "displayStatus": "published",
    "displayOrder": 80,
    "contentVerificationStatus": "verified",
    "seriesName": "Dimming Actuators",
    "variants": [
      {
        "name": "Channel and power ratings",
        "note": "Select the AKD order code for required channels and wattage per MDT_Productlist_EN 2026"
      }
    ],
    "relatedSlugs": [
      "dali-control-pro64-gateway",
      "jal-shutter-actuator"
    ],
    "sourceDocument": "MDT_Productlist_EN 2026.pdf"
  },
  {
    "id": "mdt-dali-control-pro64-gateway",
    "name": "DALI Control PRO64 Gateway",
    "slug": "dali-control-pro64-gateway",
    "brandId": "mdt",
    "categoryId": "smart-lighting",
    "shortDescription": "KNX DALI-2 gateway controlling up to 64 ECGs and 16 groups with Tunable White, RGB/RGBW/XY, sensors, web commissioning and emergency monitoring.",
    "fullDescription": "DALI Control PRO64 Gateway bridges KNX building logic with DALI-2 luminaires and drivers. It individually controls up to 64 electronic control gear (ECG) addresses and 16 DALI groups, carries DALI-2 Multi-Master certification, and supports DALI-2 motion detectors and light sensors where configured. DT6 and DT8 device classes enable switching and dimming plus Tunable White, RGB, RGBW and XY colour control. Integrated constant-light control serves up to three lighting groups. A web interface assists commissioning, while fault and emergency-light monitoring functions support maintenance workflows documented in the MDT catalogue.",
    "features": [
      "Control of up to 64 ECGs and 16 DALI groups",
      "DALI-2 Multi-Master certification",
      "DALI-2 motion detector and light sensor support",
      "DT6 and DT8 device support",
      "Tunable White and RGB/RGBW/XY colour control",
      "Constant-light control for up to 3 groups",
      "Web interface and commissioning tools",
      "Fault and emergency-light monitoring"
    ],
    "image": "/images/catalog/mdt/dali-control-pro64-gateway.png",
    "displayStatus": "published",
    "displayOrder": 90,
    "contentVerificationStatus": "verified",
    "seriesName": "DALI Gateways",
    "relatedSlugs": [
      "akd-230-v-dimming-actuator",
      "push-button-light-55"
    ],
    "sourceDocument": "MDT_Productlist_EN 2026.pdf"
  },
  {
    "id": "mdt-push-button-light-55",
    "name": "Push Button Light 55",
    "slug": "push-button-light-55",
    "brandId": "mdt",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "MDT Elevio KNX push-button interface in 55 mm design with configurable gangs, LED indications and optional temperature sensor per catalogue model.",
    "fullDescription": "Push Button Light 55 belongs to MDT’s Elevio range of KNX push-button interfaces. Installers choose gang configurations, LED indication layouts and optional integrated temperature sensors according to the exact order code in MDT_Productlist_EN 2026. The 55 mm form factor suits European flush back boxes where a tactile button plate is preferred over touch glass. Each configuration is treated as a variant of this product family rather than a separate marketing record, keeping the website focused on representative hardware while detailed article numbers remain in the PDF.",
    "features": [
      "KNX push-button control in 55 mm Elevio format",
      "Multiple gang configurations per catalogue",
      "LED status indications on supported models",
      "Optional temperature sensor variants"
    ],
    "image": "/images/catalog/mdt/push-button-light-55.png",
    "displayStatus": "published",
    "displayOrder": 100,
    "contentVerificationStatus": "partial",
    "seriesName": "Elevio Push Buttons",
    "variants": [
      {
        "name": "Gang configurations",
        "note": "See MDT Elevio order codes for button count"
      },
      {
        "name": "Temperature sensor option",
        "note": "Available on selected models only"
      }
    ],
    "relatedSlugs": [
      "glass-push-button-ii-light",
      "ionprime-pb-knx"
    ],
    "sourceDocument": "MDT_Productlist_EN 2026.pdf"
  },
  {
    "id": "mdt-glass-push-button-ii-light",
    "name": "Glass Push Button II Light",
    "slug": "glass-push-button-ii-light",
    "brandId": "mdt",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "Lucilio glass-finish KNX push button with configurable gangs and sensor options documented in the MDT glass push-button range.",
    "fullDescription": "Glass Push Button II Light is MDT’s Lucilio glass-finish KNX push-button series for interiors that require a reflective, minimal plate. Gang layouts, engraving options and sensor integrations vary by catalogue article; they are grouped here as variants rather than duplicated product cards. The glass surface differentiates this range from the Elevio Push Button Light 55 while fulfilling the same KNX switching, dimming and scene triggering roles when programmed in ETS.",
    "features": [
      "Glass-finish KNX push-button plate (Lucilio)",
      "Configurable gang layouts per order code",
      "Supports KNX switching, dimming and scene triggers",
      "Sensor options where documented for selected models"
    ],
    "image": "/images/catalog/mdt/glass-push-button-ii-light.png",
    "displayStatus": "published",
    "displayOrder": 110,
    "contentVerificationStatus": "partial",
    "seriesName": "Lucilio Glass Push Buttons",
    "variants": [
      {
        "name": "Gang and sensor options",
        "note": "Refer to Lucilio glass push-button entries in MDT_Productlist_EN 2026"
      }
    ],
    "relatedSlugs": [
      "push-button-light-55",
      "ionprime-pb-knx"
    ],
    "sourceDocument": "MDT_Productlist_EN 2026.pdf"
  },
  {
    "id": "mdt-aurelio-assortment-touch",
    "name": "Aurelio Assortment Touch",
    "slug": "aurelio-assortment-touch",
    "brandId": "mdt",
    "categoryId": "smart-touch-panel",
    "seriesName": "Aurelio",
    "shortDescription": "A premium 6-inch KNX glass touch panel combining an elegant glass and brushed aluminium design with intuitive smart-home control and customisable room functions.",
    "fullDescription": "The MDT Aurelio Assortment Touch features a high-resolution 6-inch capacitive TFT colour display and an intuitive interface for controlling multiple room functions. Its glass and brushed aluminium design, white circumferential orientation light and configurable function levels make it suitable for sophisticated smart-home environments. The product requires a separate 24 V DC auxiliary power supply, for example STV-0024.01.",
    "features": [
      "6-inch capacitive TFT colour display",
      "Resolution: 1440 × 720 pixels",
      "White circumferential orientation light",
      "Up to 64 functions across independent levels",
      "Up to 12 status indications in standby",
      "Switching, dimming, tunable white, HSV, RGB and RGBW control",
      "Sun shading and HVAC control",
      "Integrated room temperature controller with temperature sensor",
      "Logic functions, scene control and group control",
      "Code-lock security function",
      "Customisable logo, background image and design colour",
      "Anti-theft and anti-dismantling protection",
      "KNX Data Secure",
      "Integrated bus coupler",
      "Horizontal or vertical installation"
    ],
    "image": "/images/catalog/mdt/MDT-Aurelio-Assortment-Touch-6-inch.png",
    "displayStatus": "published",
    "displayOrder": 120,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Display", "value": "6-inch TFT" },
      { "label": "Resolution", "value": "1440 × 720 px" },
      { "label": "Dimensions", "value": "92 × 160 × 12.5 mm" },
      { "label": "Installation", "value": "Standard switch box" },
      { "label": "Mounting", "value": "Horizontal or vertical" },
      { "label": "Power", "value": "24 V DC auxiliary supply" },
      { "label": "Protocol", "value": "KNX Data Secure" },
      { "label": "Auxiliary supply example", "value": "STV-0024.01" }
    ],
    "variants": [
      {
        "name": "Black",
        "articleNumber": "BE-GTS06TS.01S"
      },
      {
        "name": "White",
        "articleNumber": "BE-GTS06TW.01S"
      }
    ],
    "articleNumbers": [
      "BE-GTS06TS.01S",
      "BE-GTS06TW.01S"
    ],
    "relatedSlugs": [
      "glass-push-button-plus-8-gang",
      "glass-room-temperature-controller-smart"
    ]
  },
  {
    "id": "mdt-glass-push-button-plus-8-gang",
    "name": "Glass Push Button Plus, 8-Gang, with Temperature Sensor",
    "slug": "glass-push-button-plus-8-gang",
    "brandId": "mdt",
    "categoryId": "smart-touch-panel",
    "seriesName": "Glass Push Button Plus",
    "shortDescription": "An elegant 8-gang glass KNX push button featuring an integrated temperature sensor, configurable touch functions and customisable LED orientation lighting for intelligent room control.",
    "fullDescription": "The MDT Glass Push Button Plus 8-Gang combines configurable touch operation with room temperature measurement and integrated orientation lighting. Individual sensor areas can be configured as single or paired buttons to support a range of room-control functions.",
    "features": [
      "Eight configurable touch areas",
      "Integrated room temperature sensor",
      "Buttons configurable as pairs or individual buttons",
      "Value sending, forced operation and switching commands",
      "Short and long button press functionality with two objects",
      "Surrounding orientation light",
      "White and red LEDs for each sensor area",
      "Five adjustable LED brightness levels using day/night control",
      "Single and double push-button operation for dimming and shutter functions",
      "Labelling foil included in delivery",
      "Integrated KNX bus coupler"
    ],
    "image": "/images/catalog/mdt/MDT-Glass-Push-Button-Plus-8-Gang.png",
    "displayStatus": "published",
    "displayOrder": 121,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Product type", "value": "Glass Push Button Plus" },
      { "label": "Configuration", "value": "8-Gang" },
      { "label": "Temperature sensor", "value": "Integrated" },
      { "label": "LED colours", "value": "White / Red" },
      { "label": "LED brightness", "value": "5 levels" },
      { "label": "Button operation", "value": "Single / Double" },
      { "label": "Installation", "value": "Double installation box" },
      { "label": "Dimensions (H × W)", "value": "163 × 92 mm" },
      { "label": "Bus coupler", "value": "Integrated" },
      { "label": "Labelling foil", "value": "ZFOL-GT, included" }
    ],
    "relatedSlugs": [
      "aurelio-assortment-touch",
      "glass-room-temperature-controller-smart"
    ]
  },
  {
    "id": "mdt-glass-room-temperature-controller-smart",
    "name": "Glass Room Temperature Controller Smart",
    "slug": "glass-room-temperature-controller-smart",
    "brandId": "mdt",
    "categoryId": "smart-touch-panel",
    "seriesName": "Glass Room Temperature Controller",
    "shortDescription": "A KNX glass room temperature controller featuring an active colour display for temperature monitoring, heating and cooling control, ventilation management and convenient room climate adjustment.",
    "fullDescription": "The MDT Glass Room Temperature Controller Smart provides intuitive room climate management through an active colour display and dedicated temperature adjustment controls. It supports configurable heating and cooling control strategies, temperature monitoring and manual or automatic ventilation operation.",
    "features": [
      "Active colour display for function and status indication",
      "Selectable white or black display background",
      "Adjustable display brightness",
      "Displays actual and set temperatures",
      "Integrated room temperature measurement",
      "Temperature measurement range: -10°C to +50°C",
      "Selectable controller types: 2-step, PI and PWM",
      "Can operate as a room temperature extension unit",
      "Dedicated plus and minus setpoint buttons",
      "Supports 1-bit, 1-byte and 2-byte setpoint adjustment objects",
      "Setpoint storage during KNX bus power failure",
      "Minimum and maximum temperature memory",
      "Frost and heat protection alarms",
      "Operating mode changes through Bit/Byte objects",
      "Manual and automatic ventilation control",
      "14-byte plain-text diagnostic object",
      "Installation frame included",
      "Integrated KNX bus coupler"
    ],
    "image": "/images/catalog/mdt/MDT-Glass-Room-Temperature-Controller-Smart.png",
    "displayStatus": "published",
    "displayOrder": 122,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Product type", "value": "Glass Room Temperature Controller" },
      { "label": "Display", "value": "Active colour display" },
      { "label": "Background", "value": "White / Black" },
      { "label": "Measurement range", "value": "-10°C to +50°C" },
      { "label": "Controller types", "value": "2-step / PI / PWM" },
      { "label": "Setpoint adjustment", "value": "1-bit / 1-byte / 2-byte" },
      { "label": "Ventilation", "value": "Manual / Automatic" },
      { "label": "Communication", "value": "KNX" },
      { "label": "Installation", "value": "Installation box" },
      { "label": "Bus coupler", "value": "Integrated" }
    ],
    "relatedSlugs": [
      "aurelio-assortment-touch",
      "glass-push-button-plus-8-gang"
    ]
  },
  {
    "id": "theben-ionprime-cp4-knx",
    "name": "iONprime CP4 KNX",
    "slug": "ionprime-cp4-knx",
    "brandId": "theben",
    "categoryId": "smart-touch-panel",
    "shortDescription": "KNX room controller with 4-inch 480 × 480 touchscreen, up to 48 functions, environmental sensors and integrated HVAC, lighting and blind logic.",
    "fullDescription": "iONprime CP4 KNX is Theben’s touchscreen room controller for KNX installations. The 4-inch display at 480 × 480 resolution presents up to 48 functions across six configurable pages with individual icons and custom backgrounds. Integrated temperature, humidity, brightness and proximity sensors feed room automation without separate sensor plates. Residents can switch and dim lighting, adjust colour temperature and colour, operate heating and cooling thermostats, and manage fan speeds from one flush-mounted 86 × 86 × 12 mm device rated IP20. Article 4969300 identifies the base hardware in Theben’s iONprime launch documentation.",
    "features": [
      "4-inch touchscreen, 480 × 480 px",
      "Up to 48 KNX functions on six pages",
      "Temperature, humidity, brightness and proximity sensors",
      "Lighting switching, dimming and colour control",
      "Heating, cooling and fan-speed thermostat functions",
      "Configurable icons and backgrounds",
      "Flush mount 86 × 86 × 12 mm, IP20"
    ],
    "image": "/images/catalog/theben/ionprime-cp4-knx.png",
    "displayStatus": "published",
    "displayOrder": 130,
    "contentVerificationStatus": "verified",
    "seriesName": "iONprime Series",
    "specifications": [
      {
        "label": "Protocol",
        "value": "KNX room controller"
      },
      {
        "label": "Display",
        "value": "4-inch touchscreen, 480 × 480"
      },
      {
        "label": "Functions",
        "value": "Up to 48 across 6 pages"
      },
      {
        "label": "Sensors",
        "value": "Temperature, humidity, brightness, proximity"
      },
      {
        "label": "Dimensions",
        "value": "86 × 86 × 12 mm"
      },
      {
        "label": "Protection",
        "value": "IP20"
      },
      {
        "label": "Article number",
        "value": "4969300"
      }
    ],
    "articleNumbers": [
      "4969300"
    ],
    "relatedSlugs": [
      "ionprime-pb-knx",
      "hypanel-supreme"
    ],
    "sourceDocument": "iONprime_Market Launch PPT_11-2025.pdf"
  },
  {
    "id": "theben-ionprime-pb-knx",
    "name": "iONprime PB KNX",
    "slug": "ionprime-pb-knx",
    "brandId": "theben",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "KNX push-button sensor with up to eight buttons, RGB status LEDs, multi-sensor suite, four logic channels and 1-, 2- or 4-gang rockers in seven finishes.",
    "fullDescription": "iONprime PB KNX replaces conventional keypads with a KNX push-button sensor that supports up to eight physical buttons and RGB status and operation LEDs for clear feedback. Temperature, humidity, brightness, CO₂ and proximity sensing are integrated, along with a temperature controller and four separate logic channels for switching, dimming, blinds and scenes. Installers select 1-gang, 2-gang or 4-gang rocker configurations and one of seven documented material finishes while keeping a common 86 × 86 × 11 mm flush back box. Article 4969301 refers to the base device without rocker. Rockers and finishes are grouped as variants rather than separate catalogue products.",
    "features": [
      "Up to eight KNX push-button inputs",
      "RGB status and operation LEDs",
      "Temperature, humidity, brightness, CO₂ and proximity sensors",
      "Integrated temperature controller",
      "Four logic channels for scenes and blinds",
      "1-, 2- and 4-gang rocker configurations",
      "Seven material finish options"
    ],
    "image": "/images/catalog/theben/ionprime-pb-knx.png",
    "displayStatus": "published",
    "displayOrder": 140,
    "contentVerificationStatus": "verified",
    "seriesName": "iONprime Series",
    "specifications": [
      {
        "label": "Protocol",
        "value": "KNX push-button sensor"
      },
      {
        "label": "Buttons",
        "value": "Up to 8 physical"
      },
      {
        "label": "Indicators",
        "value": "RGB status and operation LEDs"
      },
      {
        "label": "Sensors",
        "value": "Temperature, humidity, brightness, CO₂, proximity"
      },
      {
        "label": "Logic",
        "value": "4 separate channels"
      },
      {
        "label": "Dimensions",
        "value": "86 × 86 × 11 mm"
      },
      {
        "label": "Protection",
        "value": "IP20"
      },
      {
        "label": "Article number (base)",
        "value": "4969301 (without rocker)"
      }
    ],
    "variants": [
      {
        "name": "1-gang rocker",
        "note": "Single-rocker faceplate configuration"
      },
      {
        "name": "2-gang rocker",
        "note": "Dual-rocker faceplate configuration"
      },
      {
        "name": "4-gang rocker",
        "note": "Four-rocker faceplate configuration"
      },
      {
        "name": "Finish options",
        "note": "Seven documented material finishes"
      }
    ],
    "articleNumbers": [
      "4969301"
    ],
    "relatedSlugs": [
      "ionprime-cp4-knx",
      "push-button-light-55"
    ],
    "sourceDocument": "iONprime_Market Launch PPT_11-2025.pdf"
  },
  {
    "id": "moorgen-m18-smart-dimming-knob",
    "name": "Smart Remote Controls",
    "slug": "m18-smart-dimming-knob",
    "brandId": "moorgen",
    "categoryId": "smart-dimming-knob",
    "shortDescription": "Rotary dimming knob with four configurable keys, stepless 0–100% brightness, colour-temperature control, shading, music volume and double-tap scenes.",
    "fullDescription": "The M18 is Moorgen’s tactile controller for residents who prefer physical interaction over touch glass. A rotary ring delivers stepless 0–100% brightness adjustment on selected luminaires, while four configurable keys can operate individual or synchronised lighting groups, including spotlights, strips and decorative fixtures. Single tap selects a device, rotation adjusts the active function, and double tap recalls a scene. The knob also supports colour-temperature tuning, blind and curtain motion, awning control where integrated, and background music level. Custom icons and engraved text personalise each key. A rechargeable lithium battery is specified for approximately three to six months of use per charge in Moorgen’s M18 Series documentation. Three finish variants share one product record.",
    "features": [
      "Stepless 0–100% rotary dimming",
      "Four configurable physical keys",
      "Single-tap select, rotate to adjust, double-tap scene",
      "Colour-temperature control for compatible lights",
      "Blind, curtain and awning control where integrated",
      "Background music volume adjustment",
      "Customisable icons and engraved key labels",
      "Rechargeable lithium battery (~3–6 months per charge, brochure)"
    ],
    "image": "/images/catalog/moorgen/m18-smart-dimming-knob.png",
    "displayStatus": "published",
    "displayOrder": 150,
    "contentVerificationStatus": "verified",
    "seriesName": "M18 Series",
    "specifications": [
      {
        "label": "Control keys",
        "value": "4 configurable"
      },
      {
        "label": "Dimming range",
        "value": "0–100% stepless"
      },
      {
        "label": "Primary interaction",
        "value": "Rotary knob + tactile keys"
      },
      {
        "label": "Power",
        "value": "Rechargeable lithium battery"
      },
      {
        "label": "Battery use (brochure)",
        "value": "Approx. 3–6 months per full charge"
      }
    ],
    "variants": [
      {
        "name": "D37 Belgium Silver",
        "note": "Finish variant"
      },
      {
        "name": "C25 Jade Black",
        "note": "Finish variant"
      },
      {
        "name": "F18 Monaco Gold",
        "note": "Finish variant"
      }
    ],
    "relatedSlugs": [
      "hypanel-supreme",
      "ionprime-pb-knx"
    ],
    "legacySlug": "m18-smart-dimming-knob",
    "sourceDocument": "2.2 M18 Series.pdf"
  },
  {
    "id": "moorgen-mk-8072-c02",
    "name": "2-Fold Metal Pushbutton Cover",
    "slug": "mk-8072-c02",
    "brandId": "moorgen",
    "categoryId": "smart-keypad-switch",
    "seriesName": "Swiss Series, C Series",
    "shortDescription": "A premium two-fold metal pushbutton cover from Moorgen's Swiss C Series, finished in Ferrari Red and supplied with back power and frame for KNX installations.",
    "fullDescription": "The Moorgen MK 8072 C02 is a two-fold metal pushbutton cover from the Swiss Series C range. Its Ferrari Red finish gives the control interface a distinctive appearance, making it suitable for interiors where coordinated architectural finishes are important. The listed configuration includes back power and frame and is identified as a KNX product in the August 2026 price list.",
    "features": [
      "Two-fold metal pushbutton cover",
      "Swiss Series C Series design",
      "Ferrari Red finish",
      "KNX product",
      "Supplied with back power and frame"
    ],
    "image": "/images/catalog/moorgen/Moorgen-MK-8072-C02.png",
    "displayStatus": "published",
    "displayOrder": 151,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "MK 8072 C02" },
      { "label": "Product type", "value": "Metal Pushbutton Cover" },
      { "label": "Configuration", "value": "2 Fold" },
      { "label": "Series", "value": "Swiss Series, C Series" },
      { "label": "Finish", "value": "Ferrari Red" },
      { "label": "Protocol", "value": "KNX" },
      { "label": "Included components", "value": "Back Power and Frame" }
    ],
    "relatedSlugs": ["mk-8070-c27", "aura-series-smart-switch"],
    "sourceDocument": "MOORGEN - KNX PRICE LIST - AUG -2026.pdf",
    "sourcePage": "1"
  },
  {
    "id": "moorgen-mk-8070-c27",
    "name": "Smart Thermostat",
    "slug": "mk-8070-c27",
    "brandId": "moorgen",
    "categoryId": "smart-keypad-switch",
    "seriesName": "Steve Leung Supercar Series, C Series",
    "shortDescription": "A premium KNX smart thermostat from Moorgen's Steve Leung Series, featuring a Mica Black finish and an 80 mm design.",
    "fullDescription": "The Moorgen MK 8070 C27 is a smart thermostat from the Steve Leung Supercar Series. The listed C Series configuration features a Mica Black finish and an 80 mm format. The product is specified for KNX installations and is supplied with back power and frame. Its refined dark appearance complements contemporary interiors and coordinated smart-home control installations.",
    "features": [
      "Smart thermostat",
      "Steve Leung Supercar Series",
      "C Series configuration",
      "Mica Black finish",
      "KNX product",
      "80 mm format",
      "Supplied with back power and frame"
    ],
    "image": "/images/catalog/moorgen/Moorgen-MK-8070-C27.png",
    "displayStatus": "published",
    "displayOrder": 152,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "MK 8070 C27" },
      { "label": "Product type", "value": "Smart Thermostat" },
      { "label": "Series", "value": "Steve Leung Supercar Series" },
      { "label": "Configuration", "value": "C Series" },
      { "label": "Finish", "value": "Mica Black" },
      { "label": "Protocol", "value": "KNX" },
      { "label": "Format", "value": "80 mm" },
      { "label": "Included components", "value": "Back Power and Frame" }
    ],
    "relatedSlugs": ["mk-8072-c02", "m18-smart-dimming-knob"],
    "sourceDocument": "MOORGEN - KNX PRICE LIST - AUG -2026.pdf",
    "sourcePage": "3"
  },
  {
    "id": "moorgen-mt8123-smart-touch-s10",
    "name": "Moorgen KNX Smart Touch S10",
    "slug": "mt8123-smart-touch-s10",
    "brandId": "moorgen",
    "categoryId": "smart-touch-panel",
    "seriesName": "S10",
    "shortDescription": "A Moorgen KNX Smart Touch S10 control panel featuring a 10-inch screen for smart-home control.",
    "fullDescription": "The Moorgen MT8123 is listed as the KNX Smart Touch S10 in Moorgen's Smart LCD Panel range. Featuring a 10-inch screen, it provides a touchscreen interface for smart-home control installations. Its large-screen format makes it a central visual control option for projects incorporating Moorgen KNX solutions.",
    "features": [
      "Smart Touch S10 panel",
      "10-inch screen",
      "KNX product",
      "Smart LCD panel category"
    ],
    "image": "/images/catalog/moorgen/Moorgen-MT8123.png",
    "displayStatus": "published",
    "displayOrder": 153,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "MT8123" },
      { "label": "Product type", "value": "Smart Touch Panel" },
      { "label": "Product series", "value": "S10" },
      { "label": "Display", "value": "10-inch screen" },
      { "label": "Protocol", "value": "KNX" }
    ],
    "relatedSlugs": ["hypanel-supreme", "m18-smart-dimming-knob"],
    "sourceDocument": "MOORGEN - KNX PRICE LIST - AUG -2026.pdf",
    "sourcePage": "4"
  },
  {
    "id": "moorgen-mqe005f18-m50-remote",
    "name": "8-Key Smart Remote Control",
    "slug": "mqe005f18-m50-remote",
    "brandId": "moorgen",
    "categoryId": "smart-dimming-knob",
    "seriesName": "M50 Series",
    "shortDescription": "An eight-key smart remote control from Moorgen's M50 Series, featuring a premium Monaco Gold finish.",
    "fullDescription": "The Moorgen MQE005F18 is an eight-key smart remote control from the M50 Series. Its Monaco Gold finish gives the remote a refined appearance suited to premium residential interiors. It belongs to Moorgen's wireless remote product range and expands the available physical control options within an integrated smart-home installation.",
    "features": [
      "Eight-key smart remote control",
      "M50 Series",
      "Monaco Gold finish",
      "Wireless remote product range"
    ],
    "image": "/images/catalog/moorgen/Moorgen-MQE005F18.png",
    "displayStatus": "published",
    "displayOrder": 154,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "MQE005F18" },
      { "label": "Product type", "value": "Smart Remote Control" },
      { "label": "Key configuration", "value": "8 keys" },
      { "label": "Series", "value": "M50" },
      { "label": "Finish", "value": "Monaco Gold" },
      { "label": "Product range", "value": "Wireless Remotes" }
    ],
    "relatedSlugs": [
      "mqe610f18-m56-remote",
      "mqe079-d37-m78-crystal-remote",
      "m18-smart-dimming-knob"
    ],
    "sourceDocument": "MOORGEN - KNX PRICE LIST - AUG -2026.pdf",
    "sourcePage": "6"
  },
  {
    "id": "moorgen-mqe610f18-m56-remote",
    "name": "4-Key Rotary Smart Remote Control",
    "slug": "mqe610f18-m56-remote",
    "brandId": "moorgen",
    "categoryId": "smart-dimming-knob",
    "seriesName": "M56 Series",
    "shortDescription": "A four-key rotary smart remote control from Moorgen's M56 Series, featuring an elegant Monaco Gold finish.",
    "fullDescription": "The Moorgen MQE610F18 is a four-key rotary smart remote control from the M56 Series. Its Monaco Gold finish combines a distinctive rotary control design with a premium decorative appearance. The product belongs to Moorgen's wireless remote range and offers a physical control option for smart-home environments.",
    "features": [
      "Four-key rotary smart remote control",
      "M56 Series",
      "Monaco Gold finish",
      "Wireless remote product range",
      "Rotary control design"
    ],
    "image": "/images/catalog/moorgen/Moorgen-MQE610F18.png",
    "displayStatus": "published",
    "displayOrder": 155,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "MQE610F18" },
      { "label": "Product type", "value": "Rotary Smart Remote Control" },
      { "label": "Key configuration", "value": "4 keys" },
      { "label": "Series", "value": "M56" },
      { "label": "Finish", "value": "Monaco Gold" },
      { "label": "Product range", "value": "Wireless Remotes" }
    ],
    "relatedSlugs": [
      "mqe005f18-m50-remote",
      "mqe079-d37-m78-crystal-remote",
      "m18-smart-dimming-knob"
    ],
    "sourceDocument": "MOORGEN - KNX PRICE LIST - AUG -2026.pdf",
    "sourcePage": "7"
  },
  {
    "id": "moorgen-mqe079-d37-m78-crystal-remote",
    "name": "Crystal Rotary Smart Remote Control",
    "slug": "mqe079-d37-m78-crystal-remote",
    "brandId": "moorgen",
    "categoryId": "smart-dimming-knob",
    "seriesName": "M78 Series",
    "shortDescription": "A premium crystal rotary smart remote control from Moorgen's M78 Series, featuring a Belgium Silver finish and matching silver base.",
    "fullDescription": "The Moorgen MQE079 D37 is a crystal rotary smart remote control from the M78 Series. The listed configuration combines a Belgium Silver finish with a silver base. Its faceted crystal-inspired control surface and polished metallic appearance make it a distinctive premium remote option for sophisticated smart-home interiors.",
    "features": [
      "Crystal rotary smart remote control",
      "M78 Series",
      "Belgium Silver finish",
      "Silver base",
      "Wireless remote product range"
    ],
    "image": "/images/catalog/moorgen/Moorgen-MQE079-D37.png",
    "displayStatus": "published",
    "displayOrder": 156,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "MQE079 D37" },
      { "label": "Product type", "value": "Crystal Rotary Smart Remote Control" },
      { "label": "Series", "value": "M78" },
      { "label": "Finish", "value": "Belgium Silver" },
      { "label": "Base", "value": "Silver" },
      { "label": "Product range", "value": "Wireless Remotes" }
    ],
    "relatedSlugs": [
      "mqe005f18-m50-remote",
      "mqe610f18-m56-remote",
      "m18-smart-dimming-knob"
    ],
    "sourceDocument": "MOORGEN - KNX PRICE LIST - AUG -2026.pdf",
    "sourcePage": "8"
  },
  {
    "id": "basalte-sentido",
    "name": "Sentido",
    "slug": "sentido",
    "brandId": "basalte",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "Basalte Sentido multi-touch keypad documented for KNX, Cresnet and RS485 integration; verify functional details beyond backbox orientation separately.",
    "fullDescription": "Sentido is a Basalte keypad product name confirmed in Basalte Keypad Backbox Orientation.pdf. That document specifies supported protocols as KNX, Cresnet and RS485 and provides backbox orientation guidance for installation. Full marketing features and electrical specifications are not reproduced here because they are outside the uploaded reference. Sentido is presented as a tactile control option for projects already specifying Basalte keypads with the listed field buses.",
    "features": [
      "Basalte Sentido keypad product family",
      "Protocols noted in orientation document: KNX, Cresnet, RS485",
      "Backbox orientation guidance included in manufacturer PDF"
    ],
    "image": "/images/catalog/basalte/sentido.png",
    "displayStatus": "published",
    "displayOrder": 160,
    "contentVerificationStatus": "name-only",
    "seriesName": "Sentido",
    "specifications": [
      {
        "label": "Documented protocols",
        "value": "KNX, Cresnet, RS485"
      }
    ],
    "relatedSlugs": [
      "fibonacci",
      "chopin"
    ],
    "sourceDocument": "Basalte Keypad Backbox Orientation.pdf"
  },
  {
    "id": "basalte-fibonacci",
    "name": "Fibonacci",
    "slug": "fibonacci",
    "brandId": "basalte",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "Basalte Fibonacci keypad with KNX, Cresnet and RS485 noted in the orientation document; detailed features require additional verified sources.",
    "fullDescription": "Fibonacci appears in Basalte Keypad Backbox Orientation.pdf alongside installation orientation data. Supported protocols listed for Fibonacci are KNX, Cresnet and RS485. No additional sensing, button count or finish data is published on this site until confirmed from official Basalte product literature beyond the backbox reference.",
    "features": [
      "Basalte Fibonacci keypad product family",
      "Protocols in orientation PDF: KNX, Cresnet, RS485"
    ],
    "image": "/images/catalog/basalte/fibonacci.png",
    "displayStatus": "published",
    "displayOrder": 170,
    "contentVerificationStatus": "name-only",
    "seriesName": "Fibonacci",
    "specifications": [
      {
        "label": "Documented protocols",
        "value": "KNX, Cresnet, RS485"
      }
    ],
    "relatedSlugs": [
      "sentido",
      "chopin"
    ],
    "sourceDocument": "Basalte Keypad Backbox Orientation.pdf"
  },
  {
    "id": "basalte-chopin",
    "name": "Chopin",
    "slug": "chopin",
    "brandId": "basalte",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "Basalte Chopin keypad with KNX, Cresnet and dry-contact protocols per the orientation PDF.",
    "fullDescription": "Chopin is identified in Basalte Keypad Backbox Orientation.pdf with protocol support for KNX, Cresnet and dry-contact interfaces. Installers should use the PDF for mounting orientation and consult Basalte for complete functional specifications before writing project descriptions.",
    "features": [
      "Basalte Chopin keypad product family",
      "Protocols in orientation PDF: KNX, Cresnet, dry-contact"
    ],
    "image": "/images/catalog/basalte/chopin.png",
    "displayStatus": "published",
    "displayOrder": 180,
    "contentVerificationStatus": "name-only",
    "seriesName": "Chopin",
    "specifications": [
      {
        "label": "Documented protocols",
        "value": "KNX, Cresnet, dry-contact"
      }
    ],
    "relatedSlugs": [
      "fibonacci",
      "deseo"
    ],
    "sourceDocument": "Basalte Keypad Backbox Orientation.pdf"
  },
  {
    "id": "basalte-deseo",
    "name": "Deseo",
    "slug": "deseo",
    "brandId": "basalte",
    "categoryId": "smart-keypad-switch",
    "shortDescription": "Basalte Deseo keypad family covering KNX and Crestron variants (Deseo KNX, Deseo RTR) per the orientation document.",
    "fullDescription": "Deseo groups the Basalte Deseo KNX and Deseo RTR product names referenced in Basalte Keypad Backbox Orientation.pdf. Both variants are associated with KNX and Crestron protocol support in that document. They share a common product record here with protocol variants rather than duplicate cards.",
    "features": [
      "Deseo KNX and Deseo RTR variants under one product family",
      "Protocols noted: KNX and Crestron",
      "Backbox orientation covered in manufacturer PDF"
    ],
    "image": "/images/catalog/basalte/deseo.png",
    "displayStatus": "published",
    "displayOrder": 190,
    "contentVerificationStatus": "name-only",
    "seriesName": "Deseo",
    "specifications": [
      {
        "label": "Documented protocols",
        "value": "KNX, Crestron"
      }
    ],
    "variants": [
      {
        "name": "Deseo KNX",
        "note": "KNX variant"
      },
      {
        "name": "Deseo RTR",
        "note": "Crestron-related variant name in PDF"
      }
    ],
    "relatedSlugs": [
      "chopin",
      "sentido"
    ],
    "sourceDocument": "Basalte Keypad Backbox Orientation.pdf"
  },
  {
    "id": "basalte-lisa",
    "name": "Lisa",
    "slug": "lisa",
    "brandId": "basalte",
    "categoryId": "smart-touch-panel",
    "shortDescription": "Basalte Lisa product name confirmed in the keypad backbox orientation document; publish full touch specifications only when verified separately.",
    "fullDescription": "Lisa is listed among Basalte products in Basalte Keypad Backbox Orientation.pdf. The uploaded reference focuses on backbox orientation rather than display or sensor specifications, so this entry remains factual and brief. Assign Lisa to Smart Touch Panel navigation when projects standardise on Basalte touch hardware pending fuller catalogue transcription.",
    "features": [
      "Basalte Lisa product name confirmed in orientation PDF",
      "Installation orientation data available in manufacturer document"
    ],
    "image": "/images/catalog/basalte/lisa.png",
    "displayStatus": "published",
    "displayOrder": 200,
    "contentVerificationStatus": "name-only",
    "seriesName": "Lisa",
    "relatedSlugs": [
      "ellie",
      "ionprime-cp4-knx"
    ],
    "sourceDocument": "Basalte Keypad Backbox Orientation.pdf"
  },
  {
    "id": "basalte-ellie",
    "name": "Ellie",
    "slug": "ellie",
    "brandId": "basalte",
    "categoryId": "smart-touch-panel",
    "shortDescription": "Basalte Ellie product name from the orientation PDF; detailed touch UI specs omitted until verified from official Basalte literature.",
    "fullDescription": "Ellie appears in Basalte Keypad Backbox Orientation.pdf alongside other Basalte control products. No display size, protocol list or sensor data is inferred on this website. Ellie is grouped under Smart Touch Panel as a placeholder record for confirmed product naming until extended Basalte documentation is added to the project sources.",
    "features": [
      "Basalte Ellie product name confirmed in orientation PDF",
      "Further specifications pending verified manufacturer sources"
    ],
    "image": "/images/catalog/basalte/ellie.png",
    "displayStatus": "published",
    "displayOrder": 210,
    "contentVerificationStatus": "name-only",
    "seriesName": "Ellie",
    "relatedSlugs": [
      "lisa",
      "hypanel-lux-piano"
    ],
    "sourceDocument": "Basalte Keypad Backbox Orientation.pdf"
  },
  {
    "id": "schneider-electric-unica-knx-pushbutton-6-key-silver",
    "name": "Unica KNX Pushbutton, 6-Key, Silver",
    "slug": "unica-knx-pushbutton-6-key-silver",
    "brandId": "schneider-electric",
    "categoryId": "smart-keypad-switch",
    "seriesName": "Unica",
    "shortDescription": "A six-key KNX smart pushbutton from Schneider Electric's Unica range, designed for convenient control of connected lighting and other compatible home automation functions.",
    "fullDescription": "The Schneider Electric Unica KNX Pushbutton features six physical control keys in a refined silver finish. Designed for KNX smart-home installations, it provides a convenient physical interface for operating configured lighting and other compatible automation functions.",
    "features": [
      "Six physical keys",
      "Two-column, three-row button arrangement",
      "Silver finish",
      "KNX technology",
      "Compact wall-mounted control design"
    ],
    "image": "/images/catalog/schneider/Schneider-Unica-KNX-Pushbutton-6-Key-Silver.png",
    "displayStatus": "published",
    "displayOrder": 220,
    "contentVerificationStatus": "partial",
    "specifications": [
      { "label": "Product range", "value": "Unica" },
      { "label": "Model", "value": "6-Key" },
      { "label": "Finish", "value": "Silver" },
      { "label": "Technology", "value": "KNX" }
    ],
    "relatedSlugs": [
      "unica-knx-thermostat-8-key-metallic-silver",
      "unica-knx-thermostat-5-key-wine-gold"
    ]
  },
  {
    "id": "schneider-electric-unica-knx-thermostat-8-key-metallic-silver",
    "name": "Unica KNX Thermostat, 8-Key, Metallic Silver",
    "slug": "unica-knx-thermostat-8-key-metallic-silver",
    "brandId": "schneider-electric",
    "categoryId": "smart-keypad-switch",
    "seriesName": "Unica",
    "shortDescription": "A metallic silver 8-key KNX thermostat and control interface from Schneider Electric's Unica range, combining room temperature display with physical buttons for controlling compatible home automation functions.",
    "fullDescription": "The Schneider Electric Unica KNX Thermostat combines a digital temperature display with eight physical control keys in a metallic silver finish. It provides a convenient interface for room temperature monitoring and compatible smart-home control functions through a KNX installation.",
    "features": [
      "Integrated digital temperature display",
      "Eight physical control keys",
      "Metallic silver finish",
      "Temperature and fan-control indicators",
      "Lighting and blind-control symbols",
      "KNX technology"
    ],
    "image": "/images/catalog/schneider/Schneider-Unica-KNX-Thermostat-8-Key-Metallic-Silver.png",
    "displayStatus": "published",
    "displayOrder": 221,
    "contentVerificationStatus": "partial",
    "specifications": [
      { "label": "Product range", "value": "Unica" },
      { "label": "Model", "value": "8-Key" },
      { "label": "Finish", "value": "Metallic Silver" },
      { "label": "Technology", "value": "KNX" }
    ],
    "relatedSlugs": [
      "unica-knx-pushbutton-6-key-silver",
      "unica-knx-thermostat-5-key-wine-gold"
    ]
  },
  {
    "id": "schneider-electric-unica-knx-thermostat-5-key-wine-gold",
    "name": "Unica KNX Thermostat, 5-Key, Wine Gold",
    "slug": "unica-knx-thermostat-5-key-wine-gold",
    "brandId": "schneider-electric",
    "categoryId": "smart-keypad-switch",
    "seriesName": "Unica",
    "shortDescription": "A sophisticated five-key KNX thermostat and control interface from Schneider Electric's Unica range, combining room temperature display with physical controls for compatible smart-home functions.",
    "fullDescription": "The Schneider Electric Unica KNX Thermostat features a digital temperature display and five physical control keys in a distinctive wine gold finish. Designed for KNX smart-home installations, it offers a convenient interface for room temperature monitoring and configured home automation functions.",
    "features": [
      "Integrated digital temperature display",
      "Five physical control keys",
      "Wine gold metallic finish",
      "Temperature adjustment interface",
      "Heating and cooling indicators",
      "Fan and lighting control symbols",
      "KNX technology"
    ],
    "image": "/images/catalog/schneider/Schneider-Unica-KNX-Thermostat-5-Key-Wine-Gold.png",
    "displayStatus": "published",
    "displayOrder": 222,
    "contentVerificationStatus": "partial",
    "specifications": [
      { "label": "Product range", "value": "Unica" },
      { "label": "Model", "value": "5-Key" },
      { "label": "Finish", "value": "Wine Gold" },
      { "label": "Technology", "value": "KNX" }
    ],
    "relatedSlugs": [
      "unica-knx-pushbutton-6-key-silver",
      "unica-knx-thermostat-8-key-metallic-silver"
    ]
  },
  {
    "id": "onetouch-smart-door-lock-ot-630-pro",
    "name": "Smart Door Lock OT 630 PRO",
    "slug": "smart-door-lock-ot-630-pro",
    "brandId": "onetouch",
    "categoryId": "door-lock-system",
    "seriesName": "OT 630",
    "shortDescription": "A premium smart door lock featuring palm vein and face recognition, multiple biometric access options, video calling, Wi-Fi connectivity and intelligent security functions for modern homes.",
    "fullDescription": "The OneTouch OT 630 PRO Smart Door Lock combines advanced biometric authentication with connected video door phone functionality. Designed for convenient and secure home access, it supports multiple unlocking methods, including palm vein recognition, face recognition, fingerprint, password, RFID card, mechanical key, mobile app and OTP. Its integrated 4-inch HD video screen and mobile video-call functionality help users identify and communicate with visitors. Additional features such as temporary passwords, door-force alarms and automatic locking provide enhanced access management.",
    "features": [
      "Palm vein recognition",
      "Face recognition",
      "Biometric authentication",
      "Password access",
      "RFID card access",
      "Mechanical key access",
      "Mobile app access",
      "OTP access",
      "4-inch HD video screen",
      "Video calling through the mobile app",
      "Bell push function",
      "Temporary passwords",
      "Wi-Fi interface",
      "Door-force alarm",
      "Door passage mode",
      "Emergency USB port for power backup",
      "Automatic lockout after three incorrect attempts",
      "SS304 mortise with four bolts",
      "Zinc alloy construction",
      "Electroplated body",
      "Lithium-ion battery"
    ],
    "image": "/images/catalog/onetouch/OneTouch-OT-630-Pro-Smart-Door-Lock.png",
    "displayStatus": "published",
    "displayOrder": 230,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "OT 630 PRO" },
      { "label": "Display", "value": "4-inch HD video screen" },
      { "label": "Width", "value": "62 mm" },
      { "label": "Height", "value": "422 mm" },
      { "label": "Access methods", "value": "Palm vein, face, biometric, password, card, mechanical key, app and OTP" },
      { "label": "Mortise", "value": "SS304, 4 bolts" },
      { "label": "Body material", "value": "Zinc alloy" },
      { "label": "Finish", "value": "Electroplated" },
      { "label": "Battery", "value": "Lithium-ion" },
      { "label": "Connectivity", "value": "Wi-Fi" },
      { "label": "Emergency power", "value": "USB port" },
      { "label": "Incorrect attempts", "value": "Auto-lock after 3 attempts" }
    ],
    "relatedSlugs": [
      "digital-door-lock-ot-630",
      "video-door-phone-ot-ip-vdp-c3-w"
    ]
  },
  {
    "id": "onetouch-digital-door-lock-ot-630",
    "name": "Digital Door Lock OT 630",
    "slug": "digital-door-lock-ot-630",
    "brandId": "onetouch",
    "categoryId": "door-lock-system",
    "seriesName": "OT 630",
    "shortDescription": "A stylish digital door lock featuring face recognition, biometric authentication, mobile app access and video door phone integration for convenient and secure home entry.",
    "fullDescription": "The OneTouch Digital Door Lock OT 630 combines multiple access methods with connected security functionality. Its black and copper-finish design incorporates a digital keypad and biometric access interface. Wi-Fi connectivity, video door phone integration and optional remote control provide additional convenience for modern residential access management.",
    "features": [
      "Face recognition",
      "Biometric authentication",
      "Password access",
      "Card access",
      "Mechanical key",
      "Mobile app access",
      "OTP access",
      "Video Door Phone integration",
      "Wi-Fi interface",
      "Optional remote control",
      "Door-force alarm",
      "Door passage mode",
      "Emergency USB port for power backup",
      "Automatic lockout after three incorrect attempts",
      "SS304 mortise with four bolts",
      "Aluminium alloy construction",
      "Electroplated body",
      "8 × AA battery power"
    ],
    "image": "/images/catalog/onetouch/OneTouch-OT-630-Digital-Door-Lock.png",
    "displayStatus": "published",
    "displayOrder": 231,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "OT 630" },
      { "label": "Width", "value": "69 mm" },
      { "label": "Height", "value": "422 mm" },
      { "label": "Access methods", "value": "Face, biometric, password, card, mechanical key, app and OTP" },
      { "label": "Mortise", "value": "SS304, 4 bolts" },
      { "label": "Body material", "value": "Aluminium alloy" },
      { "label": "Finish", "value": "Electroplated" },
      { "label": "Battery", "value": "8 × AA" },
      { "label": "Connectivity", "value": "Wi-Fi" },
      { "label": "Emergency power", "value": "USB port" },
      { "label": "Remote control", "value": "Optional" }
    ],
    "relatedSlugs": [
      "smart-door-lock-ot-630-pro",
      "video-door-phone-kit-ot-adp-a4"
    ]
  },
  {
    "id": "onetouch-video-door-phone-ot-ip-vdp-c3-w",
    "name": "Video Door Phone OT-IP-VDP-C3 W",
    "slug": "video-door-phone-ot-ip-vdp-c3-w",
    "brandId": "onetouch",
    "categoryId": "video-door-phone-vdp",
    "seriesName": "IP Video Door Phone",
    "shortDescription": "A smart IP video door phone featuring a 2 MP HDR camera, wide-angle viewing, night vision and integrated access-control capabilities for secure visitor management.",
    "fullDescription": "The OneTouch OT-IP-VDP-C3 W is an IP-based video door phone outdoor station designed for visitor identification and connected entry management. Its 2 MP HDR camera provides 1080p video with a 125-degree viewing angle, while white LED night vision supports visibility in low-light environments. The unit also supports MIFARE card, Bluetooth and NFC access, along with IP camera integration and a relay interface for compatible door-lock systems.",
    "features": [
      "2 MP HDR CMOS camera",
      "Full HD 1080p resolution",
      "125° wide viewing angle",
      "White LED night vision",
      "H.265 video compression",
      "MIFARE card access",
      "Bluetooth and NFC access",
      "Built-in advanced motion sensor",
      "Relay port for door-lock integration",
      "Surface-mount installation",
      "ONVIF compliance",
      "Vandal alarm",
      "IP65 protection rating",
      "PoE 802.3af support"
    ],
    "image": "/images/catalog/onetouch/OneTouch-OT-IP-VDP-C3-W.png",
    "displayStatus": "published",
    "displayOrder": 232,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "OT-IP-VDP-C3 W" },
      { "label": "Camera", "value": "2 MP HDR CMOS" },
      { "label": "Resolution", "value": "1080p" },
      { "label": "Viewing angle", "value": "125°" },
      { "label": "Video compression", "value": "H.265" },
      { "label": "Access", "value": "MIFARE / Bluetooth / NFC" },
      { "label": "Installation", "value": "Surface mount" },
      { "label": "Protection rating", "value": "IP65" },
      { "label": "Power", "value": "PoE 802.3af" },
      { "label": "Width", "value": "70 mm" },
      { "label": "Height", "value": "145 mm" }
    ],
    "relatedSlugs": [
      "android-video-door-phone-ot-ip-vdp-v4",
      "video-door-phone-kit-ot-adp-a4"
    ]
  },
  {
    "id": "onetouch-android-video-door-phone-ot-ip-vdp-v4",
    "name": "Android Video Door Phone OT-IP-VDP-V4",
    "slug": "android-video-door-phone-ot-ip-vdp-v4",
    "brandId": "onetouch",
    "categoryId": "video-door-phone-vdp",
    "seriesName": "IP Video Door Phone",
    "shortDescription": "A 10-inch Android-based smart video door phone monitor featuring a capacitive touchscreen, visitor video communication, security monitoring and smart-home application support.",
    "fullDescription": "The OneTouch OT-IP-VDP-V4 is a 10-inch Android-based indoor video door phone monitor designed to bring visitor communication and connected security functions into one convenient interface. It supports Wi-Fi and wired LAN connectivity, visitor snapshots, video recording, voice messaging and third-party home automation applications. Its ONVIF IP camera viewing support and integrated 8-zone alarm panel provide additional monitoring and security functionality.",
    "features": [
      "10-inch capacitive HD touchscreen",
      "1280 × 800 screen resolution",
      "Android operating system",
      "Wi-Fi and wired LAN dual-network connectivity",
      "2 GB RAM",
      "8 GB internal storage",
      "Visitor snapshots and video recording",
      "Voice messaging",
      "Digital photo frame",
      "Video door intercom",
      "H.265 video compression",
      "8-zone alarm panel",
      "Supports third-party home automation applications",
      "ONVIF IP camera viewing",
      "Community contact directory",
      "Smartphone integration"
    ],
    "image": "/images/catalog/onetouch/OneTouch-OT-IP-VDP-V4-Android.png",
    "displayStatus": "published",
    "displayOrder": 233,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "OT-IP-VDP-V4" },
      { "label": "Operating system", "value": "Android" },
      { "label": "Display", "value": "10-inch capacitive" },
      { "label": "Resolution", "value": "1280 × 800" },
      { "label": "RAM", "value": "2 GB" },
      { "label": "Storage", "value": "8 GB" },
      { "label": "Connectivity", "value": "Wi-Fi / Wired LAN" },
      { "label": "Video compression", "value": "H.265" },
      { "label": "Alarm panel", "value": "8 zones" },
      { "label": "Width", "value": "255 mm" },
      { "label": "Height", "value": "186 mm" }
    ],
    "relatedSlugs": [
      "video-door-phone-ot-ip-vdp-c3-w",
      "video-door-phone-kit-ot-adp-a4"
    ]
  },
  {
    "id": "onetouch-video-door-phone-kit-ot-adp-a4",
    "name": "Video Door Phone Kit OT-ADP-A4",
    "slug": "video-door-phone-kit-ot-adp-a4",
    "brandId": "onetouch",
    "categoryId": "video-door-phone-vdp",
    "seriesName": "Video Door Phone Kit",
    "shortDescription": "A smart video door phone system combining a 7-inch indoor touchscreen monitor and an outdoor camera station, with visitor communication, video recording and smartphone integration.",
    "fullDescription": "The OneTouch OT-ADP-A4 is a connected video door phone kit featuring a 7-inch indoor touchscreen monitor and a dedicated outdoor camera and doorbell station. The system supports visitor snapshots, video recording, voice messaging, voice-changing functionality and digital photo frame operation. It can also integrate with additional outdoor units, indoor monitors and CCTV cameras for expanded monitoring.",
    "features": [
      "7-inch capacitive HD touchscreen",
      "1024 × 600 screen resolution",
      "2.4 GHz Wi-Fi",
      "SD card support up to 128 GB",
      "Visitor snapshots and video recording",
      "Voice changer",
      "Voice messaging",
      "Digital photo frame",
      "Sensor integration",
      "Expandable to 2 outdoor units",
      "Supports up to 3 indoor monitors",
      "Supports up to 2 CCTV cameras",
      "2-channel AHD camera viewing and recording",
      "Smartphone integration"
    ],
    "image": "/images/catalog/onetouch/OneTouch-ADP-A4-Video-Door-Phone.png",
    "displayStatus": "published",
    "displayOrder": 234,
    "contentVerificationStatus": "verified",
    "specifications": [
      { "label": "Model", "value": "OT-ADP-A4" },
      { "label": "Indoor display", "value": "7-inch capacitive HD" },
      { "label": "Resolution", "value": "1024 × 600" },
      { "label": "Wi-Fi", "value": "2.4 GHz" },
      { "label": "Storage expansion", "value": "SD card up to 128 GB" },
      { "label": "Indoor monitor dimensions", "value": "180 × 180 mm" },
      { "label": "Outdoor unit dimensions", "value": "135 × 50 mm" },
      { "label": "Outdoor expansion", "value": "Up to 2 units" },
      { "label": "Indoor expansion", "value": "Up to 3 monitors" },
      { "label": "CCTV support", "value": "Up to 2 AHD cameras" }
    ],
    "relatedSlugs": [
      "video-door-phone-ot-ip-vdp-c3-w",
      "android-video-door-phone-ot-ip-vdp-v4"
    ]
  }
],
  legacyProductSlugRedirects: {
  "m18-smart-dimming-knob": "smart-dimming-knob/moorgen/m18-smart-dimming-knob",
  "m7-smart-touch-panel": "smart-touch-panel/akubela/hypanel-supreme",
  "k1-smart-keypad-switch": "smart-keypad-switch/akubela/aura-series-smart-switch",
  "jal-shutter-actuator": "smart-lighting/mdt/jal-shutter-actuator",
  "visucontrol-plus": "smart-touch-panel",
  "smart-lighting": "smart-lighting/mdt/akd-230-v-dimming-actuator",
  "smart-control-panel": "smart-touch-panel/akubela/hypanel-supreme"
},
} as const satisfies CatalogMaster;

export type CatalogMasterData = typeof catalogMaster;
