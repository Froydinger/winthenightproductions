import { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation } from 'react-router-dom';
import '../styles/arc-chat.css';

type Message = { role: 'user' | 'assistant'; content: string };
function readSession(key: string) {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function saveSession(key: string, value: string) {
  try { sessionStorage.setItem(key, value); } catch { /* Chat also works without storage. */ }
}
function savedMessages(): Message[] {
  try {
    const value = JSON.parse(readSession('arc-chat-messages') || '[]');
    return Array.isArray(value) ? value.filter((m): m is Message => m && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string').slice(-40) : [];
  } catch { return []; }
}

function internalPath(href?: string) {
  if (!href) return null;
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin ? url.pathname + url.search + url.hash : null;
  } catch { return null; }
}

const ArcMiniChat = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(() => readSession('arc-chat-open') === 'true');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(savedMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => { saveSession('arc-chat-messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { saveSession('arc-chat-open', String(isOpen)); }, [isOpen]);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, isLoading, error, isOpen]);
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + 'px';
  }, [input]);
  useEffect(() => {
    if (!isOpen || !isFullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isFullscreen, isOpen]);
  useEffect(() => () => requestRef.current?.abort(), []);

  const close = () => {
    setIsOpen(false);
    setIsFullscreen(false);
    launchRef.current?.focus();
  };
  const newChat = () => {
    requestRef.current?.abort();
    requestRef.current = null;
    setMessages([]);
    setInput('');
    setError('');
    setIsLoading(false);
    inputRef.current?.focus();
  };
  const send = async (nextMessages: Message[]) => {
    if (requestRef.current) return;
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 45000);
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/.netlify/functions/site-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, pagePath: location.pathname }), signal: controller.signal,
      });
      if (requestRef.current !== controller) return;
      if (!response.ok) throw new Error(response.status === 429 ? 'Arc is busy. Please try again in a moment.' : 'Arc could not reply. Please try again.');
      const data = await response.json();
      if (requestRef.current !== controller) return;
      if (typeof data.message !== 'string' || !data.message.trim()) throw new Error('Arc returned an empty reply. Please try again.');
      setMessages([...nextMessages, { role: 'assistant', content: data.message }]);
    } catch (failure) {
      if (requestRef.current === controller) setError(controller.signal.aborted ? 'The reply timed out. Please try again.' : failure instanceof Error ? failure.message : 'Arc could not reply. Please try again.');
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsLoading(false);
      }
    }
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    const nextMessages: Message[] = [...messages, { role: 'user', content: input.trim() }];
    setMessages(nextMessages);
    setInput('');
    void send(nextMessages);
  };

  return <div id="jake-arc">
    <button ref={launchRef} className="arc-launch" aria-label="Chat with Arc" aria-expanded={isOpen} aria-controls="arc-panel" onClick={() => isOpen ? close() : setIsOpen(true)}>
      <img src="/arc-logo-current.png" alt="" width="30" height="30" />
    </button>
    {isOpen && <section id="arc-panel" className={`arc-panel${isFullscreen ? ' full' : ''}`} role="region" aria-label="Arc, Win The Night site assistant" onKeyDown={(event) => {
      if (event.key === 'Escape') { event.stopPropagation(); close(); }
      if (event.key === 'Tab') {
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea'));
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }}>
      <header className="arc-head">
        <img src="/arc-logo-current.png" alt="Arc" width="34" height="34" />
        <div><strong>ArcAI</strong><small>Ask about Win The Night</small></div>
        <a href="https://askarc.chat" target="_blank" rel="noopener noreferrer">Full App</a>
        <button aria-label={isFullscreen ? 'Shrink chat' : 'Expand chat'} onClick={() => setIsFullscreen(!isFullscreen)}>{isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}</button>
        <button aria-label="Close chat" onClick={close}><X size={18} /></button>
      </header>
      <div ref={logRef} className="arc-log" role="log" aria-live="polite" aria-relevant="additions text" aria-busy={isLoading}>
        {messages.length === 0 && <div className="arc-welcome">
          <img src="/arc-logo-current.png" alt="" width="40" height="40" />
          <h2>Hey! I’m Arc.</h2>
          <p>Find a conversation, learn about the show, or explore ways to get involved with Win The Night.</p>
          <div className="arc-prompts">{['What is Win The Night?', 'Where can I find episodes?', 'How can I be a guest?'].map(prompt => <button key={prompt} onClick={() => { setInput(prompt); inputRef.current?.focus(); }}>{prompt}</button>)}</div>
        </div>}
        {messages.map((message, index) => <div key={index} className={`arc-msg ${message.role}`}>
          <span className="arc-role">{message.role === 'user' ? 'YOU' : 'ARC'}</span>
          {message.role === 'user' ? message.content : <ReactMarkdown components={{ a: ({ href, children }) => { const path = internalPath(href); return path ? <Link to={path}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>; } }}>{message.content}</ReactMarkdown>}
        </div>)}
        {isLoading && <div className="arc-thinking" role="status">Arc is thinking…</div>}
        {error && <div className="arc-status" role="alert">{error}<button onClick={() => void send(messages)}>Retry</button></div>}
      </div>
      <form className="arc-form" onSubmit={submit}>
        <label className="arc-sr" htmlFor="arc-input">Message Arc</label>
        <textarea id="arc-input" ref={inputRef} value={input} onChange={event => setInput(event.target.value)} maxLength={4000} rows={1} placeholder="Message Arc…" onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(event); } }} />
        <button className="arc-send" type="submit" aria-label="Send message" disabled={isLoading || !input.trim()}><ArrowUp size={23} /></button>
      </form>
      <footer className="arc-foot"><button className="arc-new" onClick={newChat}>＋ New chat</button><span>AI can make mistakes. Messages go to OpenAI. Not a crisis service.</span></footer>
    </section>}
  </div>;
};
export default ArcMiniChat;
