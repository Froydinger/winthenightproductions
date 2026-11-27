export type InquiryKind = "contact" | "sponsorship";
export type InquiryValues = { name: string; email: string; subject: string; organization: string; message: string };
export type InquiryField = keyof InquiryValues;

export const emptyInquiry: InquiryValues = { name: "", email: "", subject: "", organization: "", message: "" };
export const contactTopics = ["General Inquiry", "Be a Guest", "Feedback", "Support"] as const;
export const sponsorshipTrap = "website-notes";
export const inquiryEndpoint = "/__inquiry-forms.html";
export const inquiryFields: Record<InquiryKind, readonly InquiryField[]> = {
  contact: ["name", "email", "subject", "message"],
  sponsorship: ["name", "email", "organization", "message"],
};
export const fieldMax: Record<InquiryField, number> = { name: 120, email: 254, subject: 100, organization: 160, message: 3000 };
export const labels: Record<InquiryField, string> = {
  name: "Your name", email: "Your email", subject: "What’s this about?", organization: "Organization or brand", message: "Your message",
};

export function validateInquiryField(kind: InquiryKind, field: InquiryField, raw: string): string {
  const value = raw.trim();
  if (!value) return field === "subject" ? "Choose a topic to continue." : "Fill in this answer to continue.";
  if (value.length > fieldMax[field]) return `Keep this answer under ${fieldMax[field] + 1} characters.`;
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
  if (field === "subject" && !contactTopics.some(topic => topic === value)) return "Choose a topic from the list.";
  if (kind === "sponsorship" && field === "message" && value.length < 12) return "Tell us a little about what makes Win The Night a fit.";
  return "";
}

export function encodeInquiry(kind: InquiryKind, values: InquiryValues, trap = ""): URLSearchParams {
  const body = new URLSearchParams({ "form-name": kind });
  if (kind === "sponsorship") body.set(sponsorshipTrap, trap);
  for (const field of inquiryFields[kind]) {
    const error = validateInquiryField(kind, field, values[field]);
    if (error) throw new Error(error);
    body.set(field, values[field].trim());
  }
  return body;
}

export async function postInquiry(kind: InquiryKind, values: InquiryValues, trap: string, send: typeof fetch = fetch) {
  const response = await send(inquiryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeInquiry(kind, values, trap).toString(),
  });
  if (!response.ok || (await response.text()).includes('id="wtn-inquiry-registry"')) {
    throw new Error("We couldn’t confirm your message was sent. Your answers are still here.");
  }
}

// Route only explicit form intent. Questions about sponsors, guests, or episodes stay in ordinary chat.
export function inquiryIntent(raw: string): InquiryKind | null {
  const text = raw.trim().replace(/^(?:hi|hey)[,!]?\s+/i, "").replace(/^please\s+/i, "");
  if (/^(?:i(?:’d|'d| would) like to|i want to|we(?:’d|'d| would) like to|we want to)\s+sponsor\b/i.test(text)
    || /^(?:(?:can|could|would) you\s+)?(?:(?:help me|let me|i(?:’d|'d| would) like to|i want to)\s+)?(?:start|open|fill (?:out|in)|submit|send)\s+(?:(?:the|a|my)\s+)?sponsor(?:ship)?\s+(?:form|inquiry|message)\b/i.test(text)) return "sponsorship";
  if (/^(?:i(?:’d|'d| would) like to|i want to|we(?:’d|'d| would) like to|we want to)\s+(?:contact|message)\s+(?:the team|win the night|wtn|jake)\b/i.test(text)
    || /^(?:(?:can|could|would) you\s+)?(?:(?:help me|let me|i(?:’d|'d| would) like to|i want to)\s+)?(?:start|open|fill (?:out|in)|submit|send)\s+(?:(?:the|a|my)\s+)?contact\s+(?:form|inquiry|message)\b/i.test(text)) return "contact";
  return null;
}
