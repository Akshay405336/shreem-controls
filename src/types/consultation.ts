export type ConsultationInterest =
  | "Smart Lighting"
  | "Smart Climate Control"
  | "Smart Curtains"
  | "Smart Entertainment"
  | "Complete Smart Home"
  | "Home Security"
  | "Other";

export type PropertyType =
  | "Apartment"
  | "Villa"
  | "Independent House"
  | "Commercial"
  | "Other";

export type ConsultationContext = {
  interestedIn?: ConsultationInterest;
  productSlug?: string;
  solutionSlug?: string;
  source?: string;
};

export type EnquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  interestedIn: ConsultationInterest;
  propertyType: PropertyType;
  projectLocation: string;
  message: string;
  context?: ConsultationContext;
};
