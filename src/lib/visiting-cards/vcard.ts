import type { VisitingCardDto } from "./types";

function escapeVcf(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function buildVCard(card: VisitingCardDto, publicUrl: string): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVcf(card.fullName)}`,
  ];

  if (card.designation) {
    lines.push(`TITLE:${escapeVcf(card.designation)}`);
  }
  if (card.companyName) {
    lines.push(`ORG:${escapeVcf(card.companyName)}`);
  }
  if (card.email) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeVcf(card.email)}`);
  }
  if (card.phone) {
    lines.push(`TEL;TYPE=CELL:${escapeVcf(card.phone)}`);
  }
  if (card.altPhone) {
    lines.push(`TEL;TYPE=WORK:${escapeVcf(card.altPhone)}`);
  }
  if (card.companyWebsite) {
    lines.push(`URL;TYPE=WORK:${escapeVcf(card.companyWebsite)}`);
  }
  lines.push(`URL;TYPE=Homepage:${escapeVcf(publicUrl)}`);
  if (card.companyAddress) {
    lines.push(`ADR;TYPE=WORK:;;${escapeVcf(card.companyAddress)};;;;`);
  }
  if (card.shortDescription) {
    lines.push(`NOTE:${escapeVcf(card.shortDescription)}`);
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}