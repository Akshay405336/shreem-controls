import type { EnquiryPayload } from "@/types/consultation";

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s-]{7,20}$/;

export function validateEnquiry(payload: EnquiryPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!payload.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(payload.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!payload.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(payload.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!payload.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!payload.interestedIn) {
    errors.interestedIn = "Please select an area of interest.";
  }

  if (!payload.propertyType) {
    errors.propertyType = "Please select a property type.";
  }

  if (!payload.projectLocation.trim()) {
    errors.projectLocation = "Project location is required.";
  }

  if (!payload.message.trim()) {
    errors.message = "Please share a brief message.";
  }

  return errors;
}
