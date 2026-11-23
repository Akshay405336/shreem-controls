"use client";

import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  Check,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { slugify, isValidSlug } from "@/lib/blogs/slug";
import type {
  VisitingCardDto,
  VisitingCardSocialLink,
  VisitingCardStatus,
} from "@/lib/visiting-cards/types";

const SOCIAL_PLATFORMS = [
  "LinkedIn",
  "Facebook",
  "Instagram",
  "X (Twitter)",
  "YouTube",
  "GitHub",
  "Website",
  "Other",
] as const;

interface VisitingCardFormModalProps {
  isOpen: boolean;
  cardToEdit?: VisitingCardDto | null;
  onClose: () => void;
  onSuccess: (saved: VisitingCardDto) => void;
}

export function VisitingCardFormModal({
  isOpen,
  cardToEdit,
  onClose,
  onSuccess,
}: VisitingCardFormModalProps) {
  if (!isOpen) return null;

  return (
    <VisitingCardFormInner
      key={cardToEdit ? cardToEdit.id : "create-visiting-card"}
      cardToEdit={cardToEdit}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}

interface VisitingCardFormInnerProps {
  cardToEdit?: VisitingCardDto | null;
  onClose: () => void;
  onSuccess: (saved: VisitingCardDto) => void;
}

function sectionTitle(label: string) {
  return (
    <h3 className="text-[13px] font-bold text-[#252A2A] border-b border-[#DDECEB] pb-2 mb-4">
      {label}
    </h3>
  );
}

function VisitingCardFormInner({
  cardToEdit,
  onClose,
  onSuccess,
}: VisitingCardFormInnerProps) {
  const isEditing = Boolean(cardToEdit);

  const [fullName, setFullName] = useState(cardToEdit?.fullName || "");
  const [designation, setDesignation] = useState(cardToEdit?.designation || "");
  const [department, setDepartment] = useState(cardToEdit?.department || "");
  const [shortDescription, setShortDescription] = useState(
    cardToEdit?.shortDescription || "",
  );
  const [companyName, setCompanyName] = useState(cardToEdit?.companyName || "");
  const [companyWebsite, setCompanyWebsite] = useState(cardToEdit?.companyWebsite || "");
  const [companyAddress, setCompanyAddress] = useState(cardToEdit?.companyAddress || "");
  const [phone, setPhone] = useState(cardToEdit?.phone || "");
  const [whatsapp, setWhatsapp] = useState(cardToEdit?.whatsapp || "");
  const [email, setEmail] = useState(cardToEdit?.email || "");
  const [altPhone, setAltPhone] = useState(cardToEdit?.altPhone || "");
  const [socialLinks, setSocialLinks] = useState<VisitingCardSocialLink[]>(
    cardToEdit?.socialLinks?.length ? [...cardToEdit.socialLinks] : [],
  );

  const [slug, setSlug] = useState(cardToEdit?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEditing);
  const [sortOrder, setSortOrder] = useState(
    cardToEdit?.sortOrder !== undefined ? String(cardToEdit.sortOrder) : "0",
  );
  const [status, setStatus] = useState<VisitingCardStatus>(
    cardToEdit?.status || "INACTIVE",
  );

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(
    cardToEdit?.profilePhotoUrl || null,
  );
  const existingProfileUrl = cardToEdit?.profilePhotoUrl || null;
  const [profileRemoved, setProfileRemoved] = useState(false);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    cardToEdit?.companyLogoUrl || null,
  );
  const existingLogoUrl = cardToEdit?.companyLogoUrl || null;
  const [logoRemoved, setLogoRemoved] = useState(false);

  const [isProfileDragging, setIsProfileDragging] = useState(false);
  const [isLogoDragging, setIsLogoDragging] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [slugCheckStatus, setSlugCheckStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >(isEditing ? "available" : "idle");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (profilePreview && profilePreview !== existingProfileUrl) {
        URL.revokeObjectURL(profilePreview);
      }
      if (logoPreview && logoPreview !== existingLogoUrl) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [profilePreview, existingProfileUrl, logoPreview, existingLogoUrl]);

  useEffect(() => {
    const trimmed = fullName.trim();
    if (!trimmed || isSlugManuallyEdited) return;

    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ suggest: "1", fullName: trimmed });
        const res = await fetch(`/api/admin/visiting-cards/check-slug?${params}`);
        const json = await res.json().catch(() => ({}));
        if (!cancelled && json.success && json.data?.suggested) {
          setSlug(json.data.suggested);
          if (isValidSlug(json.data.suggested)) {
            setSlugError(null);
          }
        }
      } catch {
        const generated = slugify(trimmed);
        if (!cancelled && generated) setSlug(generated);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [fullName, isSlugManuallyEdited]);

  useEffect(() => {
    const trimmed = slug.trim().toLowerCase();
    if (!trimmed || !isValidSlug(trimmed)) return;
    if (cardToEdit && cardToEdit.slug === trimmed) {
      setSlugCheckStatus("available");
      return;
    }

    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        setSlugCheckStatus("checking");
        const params = new URLSearchParams({ slug: trimmed });
        if (cardToEdit) params.append("excludeId", cardToEdit.id);
        const res = await fetch(`/api/admin/visiting-cards/check-slug?${params}`);
        const json = await res.json().catch(() => ({}));
        if (!cancelled && json.success && json.data) {
          if (json.data.available) {
            setSlugCheckStatus("available");
            setSlugError(null);
          } else {
            setSlugCheckStatus("taken");
            const reason =
              json.data.message ||
              (json.data.reason === "reserved"
                ? "This slug is reserved."
                : "This slug is already taken.");
            setSlugError(reason);
          }
        }
      } catch {
        if (!cancelled) setSlugCheckStatus("idle");
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [slug, cardToEdit]);

  const validateImage = (file: File, maxMb = 5) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      return "Please select JPEG, PNG, WebP, or AVIF.";
    }
    if (file.size > maxMb * 1024 * 1024) {
      return `Image must be under ${maxMb} MB.`;
    }
    return null;
  };

  const handleProfileSelect = (file: File) => {
    const err = validateImage(file);
    if (err) {
      setProfileError(err);
      return;
    }
    setProfileError(null);
    setProfileFile(file);
    setProfileRemoved(false);
    if (profilePreview && profilePreview !== existingProfileUrl) {
      URL.revokeObjectURL(profilePreview);
    }
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleLogoSelect = (file: File) => {
    const err = validateImage(file);
    if (err) {
      setGlobalError(err);
      return;
    }
    setLogoFile(file);
    setLogoRemoved(false);
    if (logoPreview && logoPreview !== existingLogoUrl) {
      URL.revokeObjectURL(logoPreview);
    }
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlug(clean);
    if (!clean.trim()) {
      setSlugError("URL slug is required.");
    } else if (!isValidSlug(clean.trim())) {
      setSlugError("Use lowercase letters, numbers, and hyphens only.");
    } else {
      setSlugError(null);
    }
  };

  const handleRegenerateSlug = async () => {
    const trimmed = fullName.trim();
    if (!trimmed) {
      setSlugError("Enter full name first.");
      return;
    }
    setIsSlugManuallyEdited(false);
    try {
      const params = new URLSearchParams({ suggest: "1", fullName: trimmed });
      const res = await fetch(`/api/admin/visiting-cards/check-slug?${params}`);
      const json = await res.json().catch(() => ({}));
      if (json.success && json.data?.suggested) {
        setSlug(json.data.suggested);
        setSlugError(null);
        return;
      }
    } catch {
      /* fall through */
    }
    const generated = slugify(trimmed);
    setSlug(generated);
    if (!isValidSlug(generated)) {
      setSlugError("Generated slug is invalid.");
    } else {
      setSlugError(null);
    }
  };

  const addSocialRow = () => {
    setSocialLinks((prev) => [...prev, { platform: "LinkedIn", url: "" }]);
  };

  const updateSocialRow = (
    index: number,
    field: keyof VisitingCardSocialLink,
    value: string,
  ) => {
    setSocialLinks((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const removeSocialRow = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    let hasError = false;
    if (!fullName.trim()) {
      setFullNameError("Full name is required.");
      hasError = true;
    } else {
      setFullNameError(null);
    }

    if (!slug.trim() || !isValidSlug(slug.trim())) {
      setSlugError("A valid URL slug is required.");
      hasError = true;
    } else if (slugCheckStatus === "taken") {
      hasError = true;
    }

    const needsProfile =
      !isEditing || profileRemoved;
    if (needsProfile && !profileFile) {
      setProfileError("Profile photo is required.");
      hasError = true;
    } else {
      setProfileError(null);
    }

    if (hasError) return;

    const linksPayload = socialLinks
      .map((l) => ({ platform: l.platform.trim(), url: l.url.trim() }))
      .filter((l) => l.platform && l.url);

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const formData = new FormData();
      formData.append("slug", slug.trim().toLowerCase());
      formData.append("fullName", fullName.trim());
      formData.append("designation", designation.trim());
      formData.append("department", department.trim());
      formData.append("shortDescription", shortDescription.trim());
      formData.append("companyName", companyName.trim());
      formData.append("companyWebsite", companyWebsite.trim());
      formData.append("companyAddress", companyAddress.trim());
      formData.append("phone", phone.trim());
      formData.append("whatsapp", whatsapp.trim());
      formData.append("email", email.trim());
      formData.append("altPhone", altPhone.trim());
      formData.append("socialLinks", JSON.stringify(linksPayload));
      formData.append("sortOrder", sortOrder || "0");
      formData.append("status", status);

      if (profileFile) {
        formData.append("profilePhoto", profileFile);
      }
      if (logoFile) {
        formData.append("companyLogo", logoFile);
      }

      const url = isEditing
        ? `/api/admin/visiting-cards/${cardToEdit!.id}`
        : "/api/admin/visiting-cards";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: formData });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        setGlobalError(json.error || "Failed to save visiting card.");
        setIsSubmitting(false);
        return;
      }

      onSuccess(json.data as VisitingCardDto);
      onClose();
    } catch {
      setGlobalError("A network error occurred.");
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-10 w-full rounded-lg border border-[#DDECEB] bg-[#F7FAFF] px-3.5 text-[14px] text-[#252A2A] placeholder:text-[#737B7A]/50 focus:border-[#009E98] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#009E98] disabled:bg-slate-50";

  const renderImageUpload = (
    label: string,
    required: boolean,
    preview: string | null,
    isDragging: boolean,
    setDragging: (v: boolean) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
    onSelect: (f: File) => void,
    onRemove: () => void,
    error: string | null,
    round?: boolean,
  ) => (
    <div>
      <span className="mb-2 block text-[13px] font-bold text-[#252A2A]">
        {label}{" "}
        {required && !isEditing && <span className="text-red-500">*</span>}
      </span>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onSelect(f);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center transition-colors ${
          isDragging
            ? "border-[#009E98] bg-[#EFF9F8]"
            : error
              ? "border-red-400 bg-red-50/20"
              : "border-[#DDECEB] bg-[#F4FBFA] hover:border-[#009E98]"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Preview"
            className={`max-h-24 max-w-full object-contain ${round ? "rounded-full h-24 w-24 object-cover" : ""}`}
          />
        ) : (
          <>
            <UploadCloud className="h-7 w-7 text-[#737B7A] mb-1" />
            <p className="text-[13px] text-[#252A2A]">
              Drag & drop or{" "}
              <span className="text-[#009E98] font-semibold underline">browse</span>
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (f) onSelect(f);
          }}
        />
      </div>
      {preview && (
        <button
          type="button"
          onClick={(ev) => {
            ev.stopPropagation();
            onRemove();
          }}
          className="mt-2 inline-flex items-center gap-1 text-[12px] text-red-600 hover:underline"
        >
          <Trash2 className="h-3 w-3" />
          Remove image
        </button>
      )}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[12px] text-red-600">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );

  const isSlugValid =
    slug.trim().length > 0 &&
    !slugError &&
    slugCheckStatus === "available";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
      >
        <div className="shrink-0 flex items-start justify-between border-b border-[#DDECEB] px-5 sm:px-6 py-4">
          <div>
            <h2 className="font-display text-[20px] font-bold text-[#252A2A]">
              {isEditing ? "Edit Visiting Card" : "Create Visiting Card"}
            </h2>
            <p className="mt-1 text-[12px] text-[#737B7A]">
              Profile, company, contact, social links, and public URL slug.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] hover:border-[#009E98] hover:bg-[#EFF9F8]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col min-h-0 overflow-hidden">
          <div
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-6"
          >
            {globalError && (
              <div
                role="alert"
                className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[12px] text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {globalError}
              </div>
            )}

            <section>
              {sectionTitle("Personal")}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {renderImageUpload(
                  "Profile photo",
                  true,
                  profilePreview,
                  isProfileDragging,
                  setIsProfileDragging,
                  profileInputRef,
                  handleProfileSelect,
                  () => {
                    if (profilePreview && profilePreview !== existingProfileUrl) {
                      URL.revokeObjectURL(profilePreview);
                    }
                    setProfileFile(null);
                    setProfilePreview(null);
                    setProfileRemoved(true);
                  },
                  profileError,
                  true,
                )}
                <div className="space-y-3 sm:col-span-1">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={fullName}
                      maxLength={255}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setFullNameError(null);
                      }}
                      placeholder="Jane Doe"
                    />
                    {fullNameError && (
                      <p className="mt-1 text-[12px] text-red-600">{fullNameError}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                      Designation
                    </label>
                    <input
                      className={inputClass}
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Sales Manager"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                      Department
                    </label>
                    <input
                      className={inputClass}
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                  Short description
                </label>
                <textarea
                  rows={3}
                  maxLength={2000}
                  className="w-full rounded-lg border border-[#DDECEB] bg-[#F7FAFF] p-3 text-[14px] focus:border-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98]"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
            </section>

            <section>
              {sectionTitle("Company")}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {renderImageUpload(
                  "Company logo (optional)",
                  false,
                  logoPreview,
                  isLogoDragging,
                  setIsLogoDragging,
                  logoInputRef,
                  handleLogoSelect,
                  () => {
                    if (logoPreview && logoPreview !== existingLogoUrl) {
                      URL.revokeObjectURL(logoPreview);
                    }
                    setLogoFile(null);
                    setLogoPreview(null);
                    setLogoRemoved(true);
                  },
                  null,
                )}
                <div className="space-y-3">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                      Company name
                    </label>
                    <input
                      className={inputClass}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                      Website
                    </label>
                    <input
                      className={inputClass}
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                      placeholder="https://"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                  Address
                </label>
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-[#DDECEB] bg-[#F7FAFF] p-3 text-[14px] focus:border-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98]"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>
            </section>

            <section>
              {sectionTitle("Contact")}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  className={inputClass}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                />
                <input
                  className={inputClass}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp"
                />
                <input
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                />
                <input
                  className={inputClass}
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  placeholder="Alternate phone"
                />
              </div>
            </section>

            <section>
              {sectionTitle("Social links")}
              <div className="space-y-2">
                {socialLinks.map((row, index) => (
                  <div key={index} className="flex flex-wrap gap-2 items-center">
                    <select
                      value={row.platform}
                      onChange={(e) => updateSocialRow(index, "platform", e.target.value)}
                      className="h-10 rounded-lg border border-[#DDECEB] bg-white px-2 text-[13px] min-w-[130px]"
                    >
                      {SOCIAL_PLATFORMS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <input
                      className={`${inputClass} flex-1 min-w-[160px]`}
                      value={row.url}
                      onChange={(e) => updateSocialRow(index, "url", e.target.value)}
                      placeholder="https://"
                    />
                    <button
                      type="button"
                      onClick={() => removeSocialRow(index)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDECEB] text-red-500 hover:bg-red-50"
                      aria-label="Remove social link"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSocialRow}
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#009E98] hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add social link
              </button>
            </section>

            <section>
              {sectionTitle("Additional")}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-[13px] font-bold text-[#252A2A]">
                      URL slug <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRegenerateSlug}
                      className="inline-flex items-center gap-1 text-[12px] font-medium text-[#009E98] hover:underline"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Auto-suggest
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      className={`${inputClass} font-mono text-[13px] pr-9`}
                      value={slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="jane-doe"
                    />
                    {slugCheckStatus === "checking" && (
                      <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#737B7A]" />
                    )}
                    {isSlugValid && (
                      <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#009E98]" />
                    )}
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-[#737B7A]">
                    Public: /{slug || "…"}
                  </p>
                  {slugError && (
                    <p className="mt-1 text-[12px] text-red-600">{slugError}</p>
                  )}
                  {!slugError && isSlugValid && (
                    <p className="mt-1 text-[12px] text-[#087F7B]">Slug is available.</p>
                  )}
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                    Sort order
                  </label>
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <span className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                  Status
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {(["INACTIVE", "ACTIVE"] as const).map((st) => (
                    <label
                      key={st}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-[12px] ${
                        status === st
                          ? st === "ACTIVE"
                            ? "border-green-500 bg-green-50 ring-1 ring-green-300"
                            : "border-gray-400 bg-gray-50 ring-1 ring-gray-300"
                          : "border-[#DDECEB] bg-white"
                      }`}
                    >
                      <span className="font-semibold">
                        {st === "ACTIVE" ? "Active" : "Inactive"}
                      </span>
                      <input
                        type="radio"
                        name="vc-status"
                        checked={status === st}
                        onChange={() => setStatus(st)}
                        className="h-3.5 w-3.5"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="shrink-0 flex justify-end gap-2 border-t border-[#DDECEB] px-5 py-3 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-[#DDECEB] px-4 py-2 text-[13px] font-medium text-[#252A2A] hover:bg-[#F4FBFA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-5 py-2 text-[13px] font-medium text-white disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : isEditing ? (
                "Save changes"
              ) : (
                "Create card"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}