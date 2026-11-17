export const colors = {
  white: "#FFFFFF",
  warmWhite: "#FCFCFA",
  tealPale: "#F4FBFA",
  tealMint: "#EFF9F8",
  tealSoft: "#E8F5F4",
  border: "#DDECEB",
  brand: "#009E98",
  brandDeep: "#087F7B",
  brandMedium: "#45BDB5",
  tealPaleSurface: "#E8F7F5",
  tealMuted: "#73BDB8",
  tealLine: "#C5E5E2",
  textPrimary: "#252A2A",
  textSecondary: "#737B7A",
  /** @deprecated use brand */
  gold: "#009E98",
  /** @deprecated use tealPale */
  cream: "#F4FBFA",
  /** @deprecated use tealSoft */
  champagne: "#E8F5F4",
  /** @deprecated use textPrimary */
  charcoal: "#252A2A",
  /** @deprecated use warmWhite backgrounds */
  charcoalDeep: "#252A2A",
  /** @deprecated use textSecondary */
  warmGrey: "#737B7A",
} as const;

export const gradients = {
  section:
    "linear-gradient(135deg, #FFFFFF 0%, #FCFEFD 55%, #F1F9F8 100%)",
  sectionAlt: "linear-gradient(135deg, #FCFCFA 0%, #FFFFFF 50%, #EFF9F8 100%)",
  card: "linear-gradient(145deg, #FFFFFF 0%, #F8FCFB 100%)",
  button: "linear-gradient(105deg, #087F7B 0%, #009E98 52%, #45BDB5 100%)",
  buttonHover: "linear-gradient(105deg, #066662 0%, #087F7B 52%, #009E98 100%)",
  textHighlight: "linear-gradient(90deg, #087F7B 0%, #009E98 100%)",
  footer: "linear-gradient(180deg, #FFFFFF 0%, #F8FCFB 100%)",
} as const;

export const layout = {
  contentMaxWidth: "90rem",
  gutterMobile: "1.25rem",
  gutterDesktop: "2rem",
  headerHeight: "5.5rem",
} as const;

export const motionTokens = {
  durationFast: 0.2,
  durationNormal: 0.35,
  durationSlow: 0.6,
  easeOut: [0.22, 1, 0.36, 1] as const,
} as const;

export const sectionBackgrounds = {
  cream: "bg-[#F4FBFA]",
  white: "bg-white",
  mint: "bg-[#EFF9F8]",
  dark: "bg-[linear-gradient(135deg,#FFFFFF_0%,#FCFEFD_55%,#F1F9F8_100%)] text-[#252A2A]",
} as const;

/** Shared Tailwind fragments for cards, borders, shadows */
export const ui = {
  cardBorder: "border border-[#DDECEB]",
  cardShadow: "shadow-[0_6px_24px_rgba(37,42,42,0.05)]",
  cardShadowHover: "hover:shadow-[0_14px_32px_rgba(0,158,152,0.08)]",
  cardRadius: "rounded-[20px]",
  surfaceCream: "bg-[#F4FBFA]",
  surfaceWhite: "bg-white",
  premiumCard:
    "rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] shadow-[0_6px_24px_rgba(37,42,42,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#009E98]/20 hover:shadow-[0_14px_32px_rgba(0,158,152,0.08)]",
  productSurface:
    "overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)]",
} as const;
