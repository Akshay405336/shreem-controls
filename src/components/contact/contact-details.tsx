import { ContactInfoList } from "@/components/contact/contact-info-list";
import { contactConfig } from "@/config/contact";

export function ContactDetails() {
  return (
    <div className="rounded-[20px] border border-[#DDECEB] bg-white p-6 shadow-[0_6px_20px_rgba(37,42,42,0.06)] sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-[2px] w-9 bg-[#009E98]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
          Contact Information
        </span>
      </div>

      <p className="text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
        Phone, email, address and showroom details are listed below.
      </p>

      <div className="mt-8">
        <ContactInfoList tone="light" />
      </div>
    </div>
  );
}
