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
    "name": "Smart Lighting",
    "slug": "smart-lighting",
    "description": "Explore smart lighting fixtures, dimming solutions, LED controllers and lighting automation devices designed to create flexible, comfortable and personalised lighting environments.",
    "heroImage": "/images/solutions/Living-Room.png",
    "megaMenuImage": "/images/solutions/Living-Room.png",
    "displayOrder": 50
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
    "image": "/images/catalog/akubela/hypanel-lux-piano.png",
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
    "id": "mdt-jal-shutter-actuator",
    "name": "JAL Shutter Actuator",
    "slug": "jal-shutter-actuator",
    "brandId": "mdt",
    "categoryId": "curtain-controller",
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
    "id": "mdt-visucontrol-plus",
    "name": "VisuControl Plus",
    "slug": "visucontrol-plus",
    "brandId": "mdt",
    "categoryId": "smart-touch-panel",
    "shortDescription": "MDT VisuControl Plus touch display for KNX visualization and room control—include detailed specs only from confirmed MDT catalogue entries.",
    "fullDescription": "VisuControl Plus is listed in MDT_Productlist_EN 2026 as a touch display product for KNX projects requiring on-wall visualization. This website entry is intentionally concise: display size, resolution and processor details must be copied from the exact PDF article before publication. It is included as one of six representative MDT products covering the Smart Touch Panel category alongside actuators, gateways and push buttons. Update specifications when the confirmed catalogue page is transcribed into the project data layer.",
    "features": [
      "MDT touch display product for KNX installations",
      "Used for on-wall visualization and control",
      "Detailed hardware specs to be taken from MDT_Productlist_EN 2026 article"
    ],
    "image": "/images/catalog/mdt/visucontrol-plus.png",
    "displayStatus": "published",
    "displayOrder": 120,
    "contentVerificationStatus": "partial",
    "seriesName": "Touch Displays",
    "relatedSlugs": [
      "ionprime-cp4-knx",
      "hypanel-supreme"
    ],
    "sourceDocument": "MDT_Productlist_EN 2026.pdf"
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
  }
],
  legacyProductSlugRedirects: {
  "m18-smart-dimming-knob": "smart-dimming-knob/moorgen/m18-smart-dimming-knob",
  "m7-smart-touch-panel": "smart-touch-panel/akubela/hypanel-supreme",
  "k1-smart-keypad-switch": "smart-keypad-switch/akubela/aura-series-smart-switch",
  "curtain-controller": "curtain-controller/mdt/jal-shutter-actuator",
  "smart-lighting": "smart-lighting/mdt/akd-230-v-dimming-actuator",
  "smart-control-panel": "smart-touch-panel/akubela/hypanel-supreme"
},
} as const satisfies CatalogMaster;

export type CatalogMasterData = typeof catalogMaster;
