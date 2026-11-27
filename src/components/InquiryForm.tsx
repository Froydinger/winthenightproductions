import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import {
  contactTopics, emptyInquiry, fieldMax, inquiryEndpoint, inquiryFields, labels,
  postInquiry, sponsorshipTrap, validateInquiryField, type InquiryField, type InquiryKind,
} from "@/lib/inquiry";

type Props = { kind: InquiryKind; onExit?: () => void };
const fieldClass = "w-full rounded border border-white/20 bg-black px-4 py-3 text-base text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d9ff]";
const nextClass = "wtn-inquiry-next inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded bg-[#00d9ff] px-4 text-sm font-bold text-black hover:opacity-90 disabled:opacity-60";
const backClass = "wtn-inquiry-back inline-flex min-h-11 items-center gap-2 rounded border border-white/20 px-3 text-sm text-white hover:bg-white/10";
const topicLabels: Record<(typeof contactTopics)[number], string> = {
  "General Inquiry": "General inquiry", "Be a Guest": "Being a guest", "Feedback": "Feedback or suggestions", "Support": "Support or sponsorship",
};

export default function InquiryForm({ kind, onExit }: Props) {
  const uid = useId();
  const [values, setValues] = useState(emptyInquiry);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"editing" | "sending" | "sent">("editing");
  const [error, setError] = useState("");
  const focusRef = useRef<HTMLHeadingElement>(null);
  const trap = useRef<HTMLInputElement>(null);
  const sending = useRef(false);
  const fields = inquiryFields[kind];
  const review = step === fields.length;
  const field = fields[step] as InquiryField | undefined;
  const sponsorship = kind === "sponsorship";
  const fieldLabel = (key: InquiryField) => key === "message" && sponsorship ? "Why is Win The Night a fit?" : labels[key];
  // Move focus after an explicit step change without opening a mobile keyboard.
  useEffect(() => {
    if (step > 0 || status === "sent") focusRef.current?.focus();
  }, [step, status]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    if (!review && field) {
      const issue = validateInquiryField(kind, field, values[field]);
      setError(issue);
      if (!issue) setStep(step + 1);
      return;
    }
    sending.current = true;
    setStatus("sending");
    setError("");
    try {
      await postInquiry(kind, values, trap.current?.value || "");
      setValues(emptyInquiry);
      setStatus("sent");
    } catch {
      setStatus("editing");
      setError("We couldn’t confirm your message was sent. Your answers are still here.");
    } finally { sending.current = false; }
  };

  if (status === "sent") return <div className="space-y-3">
    <h3 ref={focusRef} tabIndex={-1} className="flex items-center gap-2 text-lg font-semibold text-white"><Check aria-hidden="true" size={18} />{sponsorship ? "Sponsorship inquiry sent" : "Message sent"}</h3>
    <p className="text-sm text-white/75">Thanks for reaching out to Win The Night.</p>
    <button type="button" className={backClass} onClick={() => { if (onExit) onExit(); else { setStep(0); setStatus("editing"); } }}>{onExit ? "Back to chat" : "Send another message"}</button>
  </div>;

  const setField = (value: string) => {
    if (field) setValues(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };
  return <form name={kind} method="POST" action={inquiryEndpoint} onSubmit={submit} className="wtn-inquiry space-y-4" data-netlify-honeypot={sponsorship ? sponsorshipTrap : undefined} aria-busy={status === "sending"}>
    <input type="hidden" name="form-name" value={kind} />
    {sponsorship && <div hidden aria-hidden="true">
      <label>Leave this field blank <input ref={trap} name={sponsorshipTrap} autoComplete="off" tabIndex={-1} /></label>
    </div>}
    <div className="space-y-2">
      <div className="text-xs font-semibold tracking-wide text-[#00d9ff]">{review ? "Review" : `Step ${step + 1} of ${fields.length}`}</div>
      <h3 ref={focusRef} tabIndex={-1} className="text-base font-semibold text-white">
        {review ? "Review before sending" : field ? <label htmlFor={uid + "-answer"}>{fieldLabel(field)}</label> : null}
      </h3>
    </div>
    {review ? <dl className="space-y-2 break-words rounded border border-white/15 p-3 text-sm" aria-label="Your answers">
      {fields.map(key => <div key={key}><dt className="font-semibold text-white">{fieldLabel(key)}</dt><dd className="whitespace-pre-wrap text-white/75">{key === "subject" ? topicLabels[values[key] as keyof typeof topicLabels] : values[key].trim()}</dd></div>)}
    </dl> : field && (() => {
      const props = { id: uid + "-answer", name: field, value: values[field], required: true, "aria-invalid": !!error, "aria-describedby": error ? uid + "-error" : field === "message" && sponsorship ? uid + "-help" : undefined };
      if (field === "subject") return <select key={field} {...props} className={fieldClass} onChange={e => setField(e.target.value)}>
        <option value="">Choose a topic</option>
        {contactTopics.map(topic => <option value={topic} key={topic}>{topicLabels[topic]}</option>)}
      </select>;
      if (field === "message") return <div key={field} className="space-y-2">
        {sponsorship && <p id={uid + "-help"} className="text-sm leading-relaxed text-white/75">Tell us how your organization connects with the show and what kind of partnership you have in mind.</p>}
        <textarea {...props} rows={4} maxLength={fieldMax[field]} className={fieldClass} onChange={e => setField(e.target.value)} />
      </div>;
      return <input key={field} {...props} type={field === "email" ? "email" : "text"} maxLength={fieldMax[field]} autoComplete={field === "organization" ? "organization" : field} className={fieldClass} onChange={e => setField(e.target.value)} />;
    })()}
    {error && <p id={uid + "-error"} role="alert" className="text-sm text-rose-300">{error}</p>}
    <div className="flex flex-wrap items-center gap-3">
      {step > 0 && <button type="button" className={backClass} disabled={status === "sending"} onClick={() => { setError(""); setStep(step - 1); }}><ArrowLeft size={15} aria-hidden="true" />Back</button>}
      <button className={nextClass} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : review ? (sponsorship ? "Send sponsor inquiry" : "Send message") : "Next"}
        {review ? <Send size={15} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
      </button>
      {onExit && <button type="button" className={backClass} disabled={status === "sending"} onClick={onExit}>Back to chat</button>}
    </div>
    {review && <p className="text-xs text-white/65">Your answers go to the Win The Night team so they can reply.</p>}
  </form>;
}
