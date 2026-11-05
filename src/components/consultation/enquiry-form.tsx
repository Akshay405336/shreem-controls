"use client";

import { useState } from "react";

import { useConsultation } from "@/components/providers/consultation-provider";
import { validateEnquiry } from "@/lib/enquiry-validation";
import { cn } from "@/lib/cn";
import type {
  ConsultationInterest,
  EnquiryPayload,
  PropertyType,
} from "@/types/consultation";

const interestOptions: ConsultationInterest[] = [
  "Smart Lighting",
  "Smart Climate",
  "Smart Curtains",
  "Smart Entertainment",
  "Complete Smart Home",
  "Home Security",
  "Other",
];

const propertyOptions: PropertyType[] = [
  "Apartment",
  "Villa",
  "Independent House",
  "Commercial",
  "Other",
];

type EnquiryFormProps = {
  className?: string;
  showIntro?: boolean;
  intro?: string;
  submitLabel?: string;
  loadingLabel?: string;
  locationFieldLabel?: string;
  locationPlaceholder?: string;
  messagePlaceholder?: string;
  successEyebrow?: string;
};

export function EnquiryForm({
  className,
  showIntro = true,
  intro,
  submitLabel = "Submit Enquiry",
  loadingLabel = "Submitting…",
  locationFieldLabel = "Project Location",
  locationPlaceholder,
  messagePlaceholder,
  successEyebrow = "Enquiry received",
}: EnquiryFormProps) {
  const { context } = useConsultation();
  const [form, setForm] = useState<EnquiryPayload>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    interestedIn:
      context?.interestedIn ??
      (context?.solutionSlug ? "Complete Smart Home" : "Smart Lighting"),
    propertyType: "Apartment",
    projectLocation: "",
    message: "",
    context: context ?? undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "unconfigured"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const updateField = <K extends keyof EnquiryPayload>(
    key: K,
    value: EnquiryPayload[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload: EnquiryPayload = { ...form, context: context ?? undefined };
    const nextErrors = validateEnquiry(payload);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors as Record<string, string>);
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (response.status === 503) {
        setStatus("unconfigured");
        setServerMessage(
          data.error ??
            "Enquiry delivery is not configured. Set ENQUIRY_WEBHOOK_URL in your environment.",
        );
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setServerMessage(data.error ?? "Unable to submit your enquiry. Please try again.");
        return;
      }

      setStatus("success");
      setServerMessage(data.message ?? "Thank you. Our team will contact you shortly.");
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border border-[#DDECEB] bg-[#EFF9F8] p-8", className)}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#009E98]">
          {successEyebrow}
        </p>
        <p className="mt-3 text-lg text-[#252A2A]">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)} noValidate>
      {showIntro && (
        <p className="text-sm leading-7 text-[#737B7A]">
          {intro ??
            "Share a few details and our smart living specialists will follow up with personalised guidance."}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.fullName}>
          <input
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            className={inputClass(errors.fullName)}
            autoComplete="name"
          />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass(errors.email)}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass(errors.phone)}
            autoComplete="tel"
          />
        </Field>
        <Field label="Country" required error={errors.country}>
          <input
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            className={inputClass(errors.country)}
            autoComplete="country-name"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Interested In" required error={errors.interestedIn}>
          <select
            value={form.interestedIn}
            onChange={(e) =>
              updateField("interestedIn", e.target.value as ConsultationInterest)
            }
            className={inputClass(errors.interestedIn)}
          >
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Property Type" required error={errors.propertyType}>
          <select
            value={form.propertyType}
            onChange={(e) =>
              updateField("propertyType", e.target.value as PropertyType)
            }
            className={inputClass(errors.propertyType)}
          >
            {propertyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={locationFieldLabel} required error={errors.projectLocation}>
        <input
          value={form.projectLocation}
          onChange={(e) => updateField("projectLocation", e.target.value)}
          className={inputClass(errors.projectLocation)}
          placeholder={locationPlaceholder}
        />
      </Field>

      <Field label="Message" required error={errors.message}>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={cn(inputClass(errors.message), "resize-y min-h-[120px]")}
          placeholder={messagePlaceholder}
        />
      </Field>

      {(status === "error" || status === "unconfigured") && (
        <p className="text-sm text-red-700" role="alert">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-[linear-gradient(120deg,#087F7B_0%,#009E98_100%)] px-6 text-sm font-medium text-white shadow-[0_8px_24px_rgba(0,158,152,0.2)] transition-all hover:bg-[linear-gradient(120deg,#066662_0%,#087F7B_100%)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? loadingLabel : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#737B7A]">
        {label}
        {required && <span className="text-[#009E98]"> *</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-red-700" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-md border bg-white px-4 py-3 text-sm text-[#252A2A]",
    "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009E98] focus-visible:border-[#009E98]",
    error ? "border-red-400" : "border-[#DDECEB]",
  );
}
