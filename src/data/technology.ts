export type TechnologyCategory = {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  capabilities: string[];
};

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "smart-lighting",
    title: "Smart Lighting",
    summary: "Layered ambience with intelligent dimming and scenes.",
    description:
      "Configure lighting scenes that adapt to mood, architecture and daily rhythm through compatible dimmers, panels and connected luminaires.",
    image: "/images/solutions/Living-Room.png",
    capabilities: [
      "Scene-based dimming",
      "Accent and ambient layers",
      "Panel, keypad and remote control",
      "Coordination with curtains and climate where configured",
    ],
  },
  {
    id: "smart-climate-control",
    title: "Smart Climate Control",
    summary:
      "Intelligent temperature management that works alongside lighting, curtains and connected devices to create a comfortable, personalised living environment.",
    description:
      "Compatible thermostats and climate controllers help regulate temperature as part of a connected home. Climate settings can be coordinated with lighting, curtains and other devices through configured automation rules, schedules and supported control interfaces.",
    image: "/images/smart-home-villa.png",
    capabilities: [
      "Intelligent temperature regulation through compatible thermostats and climate controllers",
      "Coordination with lighting and curtain systems where configured",
      "Climate-based automation scenarios",
      "Scheduled temperature adjustments",
      "Integration with supported home automation systems",
      "Centralised control through compatible touch panels and mobile interfaces",
    ],
  },
  {
    id: "smart-curtains",
    title: "Smart Curtains",
    summary: "Automated curtains and shades with smooth operation.",
    description:
      "Integrate motorised curtains and blinds into lighting and climate scenes for privacy, daylight management and cohesive living experiences.",
    image: "/images/solutions/Curtain-Controls.png",
    capabilities: [
      "Open and close automation",
      "Scene pairing with lighting and climate",
      "Daylight and privacy routines",
      "Premium window treatment integration",
    ],
  },
  {
    id: "smart-security",
    title: "Smart Security",
    summary: "Connected protection for homes and commercial spaces.",
    description:
      "Explore intrusion protection, video, life safety and entrance communication as part of a broader smart-home security plan.",
    image: "/images/Sunset-Smart.png",
    capabilities: [
      "Intrusion and motion detection",
      "Video surveillance where included",
      "Fire and life safety devices",
      "Video door phone capabilities",
      "Mobile alerts where supported",
    ],
  },
  {
    id: "smart-entertainment",
    title: "Smart Entertainment",
    summary: "Media and music integrated into daily living.",
    description:
      "Control background music and entertainment alongside lighting and ambience from compatible smart-home interfaces.",
    image: "/images/solutions/sunset-TV.png",
    capabilities: [
      "Volume and source control",
      "Scene-based media",
      "Living-room integration",
      "Coordination with lighting and curtains",
    ],
  },
  {
    id: "voice-control",
    title: "Voice Control & Smart Assistants",
    summary:
      "Control compatible smart-home devices naturally through voice commands. Integrate supported voice assistants such as Amazon Alexa to manage lighting, climate, curtains and configured scenes.",
    description:
      "Voice control requires compatible devices, gateways, integrations and configuration. Not every product supports Alexa or other assistants directly — availability depends on the selected system and how it is set up.",
    image: "/images/Glowing-Smart-Display.png",
    capabilities: [
      "Voice-controlled lighting where supported",
      "Climate setting adjustments through supported integrations",
      "Curtain and blind control where supported",
      "Scene activation",
      "Connected device control",
      "Hands-free everyday operation",
    ],
  },
  {
    id: "integrated-home-automation",
    title: "Integrated Home Automation",
    summary: "Unified control across every connected experience.",
    description:
      "Bring lighting, Smart Climate Control, curtains, entertainment, security and voice assistants together through configured scenes and centralised control.",
    image: "/images/solutions/Control-Panel.png",
    capabilities: [
      "Centralised scenes",
      "Multi-device orchestration",
      "Panel and mobile interfaces",
      "Premium residential and commercial scale",
    ],
  },
];

/** @deprecated Prefer technologyCategories — kept for any legacy imports during transition. */
export const technologyPillars = technologyCategories.map((category) => ({
  title: category.title,
  description: category.description,
  image: category.image,
}));

export const climateAutomationExamples = [
  {
    title: "Daylight and Temperature Response",
    description:
      "When sunlight increases indoor heat, compatible automation can coordinate curtain or blind operation with climate settings to help maintain indoor comfort.",
  },
  {
    title: "Comfort-Based Lighting",
    description:
      "Create coordinated lighting and climate scenes, such as warmer lighting and preferred temperature settings during evening hours.",
  },
  {
    title: "Away Mode",
    description:
      "When the home switches to away mode, configured automation can adjust climate settings and other connected devices to avoid unnecessary operation.",
  },
  {
    title: "Time-Based Comfort",
    description:
      "Configure different climate and lighting scenes for morning, daytime, evening and night.",
  },
] as const;

export const climateAutomationNote =
  "These behaviours depend on compatible sensors, thermostats, controllers and configured automation rules. Individual thermostats do not independently detect weather or control lighting unless the wider system is designed and configured to do so.";

export const voiceAssistantSection = {
  eyebrow: "Voice assistants",
  titleLead: "Amazon Alexa",
  titleAccent: "integration example",
  description:
    "Amazon Alexa is one example of a supported voice-assistant integration. Voice control of lighting, climate, curtains and scenes requires compatible devices, gateways, integrations and configuration — it is not a native capability of every product.",
};

export const alexaCommandExamples = [
  '"Alexa, turn on the living room lights."',
  '"Alexa, set the temperature to 24 degrees."',
  '"Alexa, close the curtains."',
  '"Alexa, activate movie mode."',
] as const;

export const connectedEcosystemSection = {
  eyebrow: "Connected ecosystem",
  titleLead: "One Intelligent System.",
  titleAccent: "Connected Experiences.",
  description:
    "Smart home automation brings multiple technologies together, allowing connected devices and configured scenes to work in coordination rather than independently.",
};

export const automationScenes = [
  {
    title: "Morning Scene",
    items: [
      "Lighting gradually activates.",
      "Curtains open through compatible automation.",
      "Climate settings adjust to the configured preference.",
      "A voice assistant can trigger the scene where supported.",
    ],
  },
  {
    title: "Movie Scene",
    items: [
      "Lights dim.",
      "Curtains close.",
      "Entertainment devices activate.",
      "Climate adjusts to the preferred setting.",
    ],
  },
  {
    title: "Away Scene",
    items: [
      "Selected lights switch off.",
      "Climate moves to the configured energy-saving setting.",
      "Security devices activate where integrated.",
    ],
  },
] as const;

export const automationScenesNote =
  "Scenes above describe configured automation. Automatic responses that rely on sensors, presence detection or weather data require the relevant devices and integrations to be present and set up.";
