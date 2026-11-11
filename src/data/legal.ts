import { contactConfig } from "@/config/contact";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: Array<{
    title: string;
    paragraphs: string[];
  }>;
};

export type LegalDocument = {
  slug: "privacy-policy" | "terms-and-conditions" | "cookie-policy";
  title: string;
  description: string;
  path: string;
  introduction: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const legalContact = {
  companyName: contactConfig.companyName,
  phone: contactConfig.phone,
  phoneTel: contactConfig.phoneTel,
  email: contactConfig.email,
  websiteUrl: contactConfig.websiteUrl,
  websiteLabel: contactConfig.websiteLabel,
  addressLines: [
    "No 6, ASB LOTUS City,",
    "Kengeri Tavarekere Main Road,",
    "Bangalore - 562130,",
    "Karnataka, India.",
  ],
} as const;

const LAST_UPDATED = "11 November 2026";

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  description:
    "Learn how Shreem Controls collects, uses and protects personal information when you visit our website or enquire about smart home automation solutions.",
  path: "/privacy-policy",
  lastUpdated: LAST_UPDATED,
  introduction:
    "At Shreem Controls, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store and safeguard information when you visit our website, contact us or enquire about our products and services.",
  sections: [
    {
      id: "information-we-collect",
      title: "1. Information We Collect",
      paragraphs: [
        "We may collect information that you choose to provide, as well as limited technical information that is generated when you browse the website.",
      ],
      bullets: [
        "Name and contact information.",
        "Phone number and email address.",
        "Address and project location, when provided.",
        "Enquiry details and messages.",
        "Product interests and project requirements.",
        "Information submitted through contact or consultation forms.",
        "Basic technical information such as browser type, device information and website usage data.",
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "2. How We Use Your Information",
      paragraphs: [
        "Personal information may be used for the following purposes:",
      ],
      bullets: [
        "Respond to enquiries and customer requests.",
        "Provide product information and consultation.",
        "Understand project requirements.",
        "Communicate about requested products and services.",
        "Improve website performance and user experience.",
        "Maintain website security.",
        "Meet applicable legal obligations.",
      ],
    },
    {
      id: "sharing-of-information",
      title: "3. Sharing of Information",
      paragraphs: [
        "We do not sell personal information for advertising purposes.",
        "Information may be shared with authorised service providers or technology partners only when necessary to operate the website, respond to enquiries or deliver requested services. Any such sharing is limited to the purpose for which the information was provided.",
      ],
    },
    {
      id: "data-security",
      title: "4. Data Security",
      paragraphs: [
        "We take reasonable measures to protect personal information against unauthorised access, misuse, loss or disclosure. While we work to safeguard the information entrusted to us, no method of transmission or storage can be guaranteed to be completely secure.",
      ],
    },
    {
      id: "data-retention",
      title: "5. Data Retention",
      paragraphs: [
        "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, or as required to meet applicable legal obligations. When information is no longer needed, we take reasonable steps to delete or securely dispose of it.",
      ],
    },
    {
      id: "third-party-services-and-links",
      title: "6. Third-Party Services and Links",
      paragraphs: [
        "Our website may include links to external websites or embed third-party services, such as map providers. These external websites and services may have their own privacy policies. Shreem Controls does not control their independent practices, and we encourage you to review their policies before providing personal information.",
      ],
    },
    {
      id: "your-privacy-rights",
      title: "7. Your Privacy Rights",
      paragraphs: [
        "Subject to applicable legal requirements, you may contact Shreem Controls to request access to, correction of, or deletion of personal information that we hold about you. We may need to verify your identity before responding to certain requests.",
      ],
    },
    {
      id: "childrens-privacy",
      title: "8. Children's Privacy",
      paragraphs: [
        "This website is not specifically directed at children. Personal information should not knowingly be submitted by children without appropriate parental or guardian involvement. If you believe a child has provided personal information to us, please contact us so that we can take appropriate action.",
      ],
    },
    {
      id: "policy-updates",
      title: "9. Policy Updates",
      paragraphs: [
        "We may update this Privacy Policy periodically to reflect changes in our practices, website functionality or legal requirements. The latest version will be published on this page with an updated revision date.",
      ],
    },
    {
      id: "contact-us",
      title: "10. Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy or wish to exercise a privacy-related request, please contact Shreem Controls using the details below.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  description:
    "Read the Terms and Conditions that apply when you use the Shreem Controls website or submit an enquiry about smart home automation solutions.",
  path: "/terms-and-conditions",
  lastUpdated: LAST_UPDATED,
  introduction:
    "Welcome to Shreem Controls. By accessing and using https://shreemcontrols.in, you agree to comply with these Terms and Conditions. Please read them carefully before using our website or submitting an enquiry.",
  sections: [
    {
      id: "website-usage",
      title: "1. Website Usage",
      paragraphs: [
        "You may use this website for lawful purposes related to learning about Shreem Controls products and services and submitting genuine enquiries. You must not misuse the website, attempt to disrupt its operation, introduce harmful code, or seek unauthorised access to systems, data or accounts connected with the website.",
      ],
    },
    {
      id: "product-information",
      title: "2. Product Information",
      paragraphs: [
        "The website displays information about smart home automation, lighting control, climate control, security systems, video door phones, digital door locks and other connected solutions.",
        "Product images, descriptions, specifications and availability are provided for general informational purposes. Actual product configurations and specifications may vary by manufacturer, model and variant. Always confirm final details during consultation or quotation.",
      ],
    },
    {
      id: "enquiries-and-consultations",
      title: "3. Enquiries and Consultations",
      paragraphs: [
        "Submitting an enquiry through the website does not automatically create a purchase contract or guarantee product availability. Shreem Controls may contact you using the contact information you provide to discuss your requirements and available solutions.",
      ],
    },
    {
      id: "quotations-and-pricing",
      title: "4. Quotations and Pricing",
      paragraphs: [
        "Quotations, pricing, installation requirements and delivery timelines are subject to confirmation. Any applicable taxes, installation costs, service charges and additional requirements will be communicated as part of the relevant quotation. Website content should not be treated as a binding price list.",
      ],
    },
    {
      id: "orders-and-services",
      title: "5. Orders and Services",
      paragraphs: [
        "Orders, product supply, installation and related services are subject to separate confirmation and applicable agreements between Shreem Controls and the customer. Website browsing alone does not create an obligation to supply products or services.",
      ],
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      paragraphs: [
        "Website content, text, logos, branding, graphics and original design elements are protected by applicable intellectual property laws. You may not reproduce, distribute or commercially reuse website materials without appropriate permission from Shreem Controls or the relevant rights holder.",
      ],
    },
    {
      id: "third-party-brands-and-products",
      title: "7. Third-Party Brands and Products",
      paragraphs: [
        "Shreem Controls may display products from third-party manufacturers and brands. Manufacturer trademarks, product names and logos remain the property of their respective owners. Shreem Controls is not the manufacturer of products belonging to third-party brands unless expressly stated otherwise.",
      ],
    },
    {
      id: "third-party-websites",
      title: "8. Third-Party Websites",
      paragraphs: [
        "Links to external websites are provided for convenience. The content, availability and policies of those websites are managed by their respective operators, and Shreem Controls is not responsible for their independent practices.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "9. Limitation of Liability",
      paragraphs: [
        "Website information is provided in good faith. Shreem Controls does not guarantee that every published detail will always be complete, current or free from error.",
        "To the fullest extent permitted by applicable law, Shreem Controls is not liable for indirect, incidental or consequential losses arising from use of the website. Nothing in these terms excludes or limits liability that cannot legally be excluded or limited under applicable law.",
      ],
    },
    {
      id: "changes-to-terms",
      title: "10. Changes to Terms",
      paragraphs: [
        "Shreem Controls may update these Terms and Conditions periodically. The latest version will be published on this page. Continued use of the website after updates are published constitutes acceptance of the revised terms to the extent permitted by law.",
      ],
    },
    {
      id: "governing-law-and-jurisdiction",
      title: "11. Governing Law and Jurisdiction",
      paragraphs: [
        "These Terms and Conditions are governed by the laws of India, subject to applicable law.",
      ],
    },
    {
      id: "contact-information",
      title: "12. Contact Information",
      paragraphs: [
        "If you have questions about these Terms and Conditions, please contact Shreem Controls using the details below.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  description:
    "Learn how Shreem Controls uses cookies and similar technologies on its website, including essential functionality and optional third-party services.",
  path: "/cookie-policy",
  lastUpdated: LAST_UPDATED,
  introduction:
    "This Cookie Policy explains how Shreem Controls uses cookies and similar technologies on its website. These technologies help maintain website functionality, understand website usage and improve the visitor experience where applicable.",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      paragraphs: [
        "Cookies are small text files stored on your device by websites. They can help a website function correctly, remember certain preferences and support optional services such as maps or analytics when those services are enabled.",
      ],
    },
    {
      id: "types-of-cookies",
      title: "2. Types of Cookies",
      paragraphs: [
        "We describe cookies in the categories below. Not every category is active at all times. This website currently uses essential website functionality and may use third-party cookies when optional services, such as the Google Maps embed on the Contact page, are enabled. Dedicated analytics and advertising tracking tools are not currently installed.",
      ],
      subsections: [
        {
          title: "Essential Cookies",
          paragraphs: [
            "Required for core website functionality, security, navigation and remembering cookie consent preferences. These cookies are necessary for the website to operate as intended.",
          ],
        },
        {
          title: "Preference Cookies",
          paragraphs: [
            "Help remember visitor preferences where such features are implemented. Preference storage may be used to remember cookie choices and similar settings.",
          ],
        },
        {
          title: "Analytics Cookies",
          paragraphs: [
            "Help understand website traffic, page usage and website performance where analytics tools are enabled. Shreem Controls does not currently operate a dedicated analytics cookie suite on this website. If analytics tools are introduced later, this policy will be updated.",
          ],
        },
        {
          title: "Third-Party Cookies",
          paragraphs: [
            "May be set by external services or embedded content used on the website. For example, loading the Google Maps embed on the Contact page may allow Google to set cookies according to its own policies. Third-party embeds are loaded only after relevant consent where required by our cookie preferences.",
          ],
        },
      ],
    },
    {
      id: "why-we-use-cookies",
      title: "3. Why We Use Cookies",
      paragraphs: [
        "Cookies and similar technologies may help:",
      ],
      bullets: [
        "Maintain website functionality.",
        "Improve browsing experience.",
        "Understand website usage where analytics are enabled.",
        "Diagnose technical issues.",
        "Support enabled third-party integrations such as map embeds.",
      ],
    },
    {
      id: "managing-cookies",
      title: "4. Managing Cookies",
      paragraphs: [
        "You can manage cookies through your browser settings, including options to block or delete cookies. Please note that disabling certain cookies may affect website functionality.",
        "Where consent is required for non-essential cookies, you can accept, reject or customise those preferences using the cookie settings available on this website. You may update your preferences at any time.",
      ],
    },
    {
      id: "third-party-cookies",
      title: "5. Third-Party Cookies",
      paragraphs: [
        "External services may use their own cookies when their content is loaded. Their practices are governed by their own policies. Shreem Controls does not control cookies set independently by third-party providers.",
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "6. Changes to This Policy",
      paragraphs: [
        "This Cookie Policy may be updated when website functionality or cookie usage changes. The latest version will be published on this page.",
      ],
    },
    {
      id: "contact-us",
      title: "7. Contact Us",
      paragraphs: [
        "If you have questions about this Cookie Policy or your cookie preferences, please contact Shreem Controls using the details below.",
      ],
    },
  ],
};

export const legalDocuments = [privacyPolicy, termsAndConditions, cookiePolicy] as const;

export function getLegalDocument(slug: LegalDocument["slug"]) {
  return legalDocuments.find((document) => document.slug === slug);
}
