import { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, Plus, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/site-chat`;

const ArcMiniChat = () => {
  const [isOpen, setIsOpen] = useState(() => sessionStorage.getItem('arc-chat-open') === 'true');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem('arc-chat-messages');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    sessionStorage.setItem('arc-chat-messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem('arc-chat-open', String(isOpen));
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 80) + 'px';
    }
  }, [input]);

  useEffect(() => {
    if (isFullscreen && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen, isOpen]);

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
    sessionStorage.removeItem('arc-chat-messages');
  };

  const streamChat = async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let assistantContent = '';

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (resp.status === 429) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m getting a lot of questions right now. Try again in a moment!' }]);
        setIsLoading(false);
        return;
      }

      if (!resp.ok || !resp.body) throw new Error('Failed to start stream');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
                return updated;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    streamChat(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const mdComponents = {
    p: ({ children }: any) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
    strong: ({ children }: any) => <strong className="font-semibold text-neon-blue">{children}</strong>,
    em: ({ children }: any) => <em className="italic opacity-85">{children}</em>,
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
    li: ({ children }: any) => <li className="opacity-90">{children}</li>,
    code: ({ children }: any) => (
      <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-neon-blue/10 text-neon-blue">
        {children}
      </code>
    ),
    a: ({ href, children }: any) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">{children}</a>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="pl-3 italic my-2 opacity-80 border-l-2 border-neon-blue">{children}</blockquote>
    ),
  };

  const panelClasses = isFullscreen
    ? 'fixed inset-0 z-[9999] flex flex-col'
    : 'fixed left-[18px] bottom-[90px] z-[60] w-[340px] sm:w-[380px] max-sm:left-2 max-sm:right-2 max-sm:bottom-[90px] max-sm:w-auto flex flex-col overflow-hidden';

  const panelStyle = isFullscreen
    ? { background: 'hsl(220, 20%, 8%)' }
    : {
        height: 'min(520px, calc(100vh - 110px))' as string,
        borderRadius: '20px' as string,
        background: 'hsl(220, 20%, 8%)',
        border: '1px solid hsla(200, 80%, 50%, 0.15)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 hsla(0, 0%, 100%, 0.06)',
      };

  return (
    <>
      {/* FAB Button */}
      {!isFullscreen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-[18px] bottom-[18px] z-50 group"
          aria-label="Chat with Arc"
        >
          <div className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, hsla(220, 20%, 8%, 0.85), hsla(220, 20%, 12%, 0.9))',
              backdropFilter: 'blur(16px)',
              border: '1px solid hsla(200, 80%, 50%, 0.3)',
              boxShadow: '0 4px 24px hsla(200, 80%, 50%, 0.15), 0 0 0 1px hsla(200, 80%, 50%, 0.1), inset 0 1px 0 hsla(0, 0%, 100%, 0.08)',
            }}
          >
            <img src="/arc-logo-ui.png" alt="Arc" className="w-8 h-8 object-contain" />
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ border: '1px solid hsl(var(--neon-blue))' }} />
          </div>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className={panelClasses} style={panelStyle}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: 'linear-gradient(180deg, hsla(220, 20%, 12%, 1) 0%, hsla(220, 20%, 8%, 1) 100%)',
              borderBottom: '1px solid hsla(200, 80%, 50%, 0.15)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img src="/arc-logo-ui.png" alt="Arc" className="w-7 h-7 object-contain" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: 'hsl(142, 76%, 42%)', borderColor: 'hsl(220, 20%, 12%)' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  <span className="font-light">Arc</span>Ai
                </span>
                <span className="text-[10px] leading-none text-muted-foreground">
                  Ask me anything
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {messages.length > 0 && (
                <button
                  onClick={handleNewChat}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/5 text-muted-foreground"
                  title="New chat"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              )}
              <a
                href="https://askarc.chat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 hover:scale-105 bg-neon-blue/10 border border-neon-blue/25 text-neon-blue"
              >
                Full App <ArrowRight size={9} />
              </a>
              <button
                onClick={() => setIsFullscreen(prev => !prev)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/5 text-muted-foreground"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => { setIsOpen(false); setIsFullscreen(false); }}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-white/5 text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsla(200, 80%, 50%, 0.2) transparent' }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-neon-blue/10 border border-neon-blue/15"
                >
                  <img src="/arc-logo-ui.png" alt="Arc" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-foreground">
                    Hey! I'm <span className="text-neon-blue">Arc</span>.
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    I know all about Win The Night — the show, the mission, and how to get involved. Ask me anything!
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {['What is Win The Night?', 'Latest episodes', 'How can I support?'].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => { setInput(prompt); inputRef.current?.focus(); }}
                      className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: 'hsla(220, 15%, 18%, 0.8)',
                        border: '1px solid hsla(220, 15%, 24%, 0.6)',
                        color: 'hsl(220, 5%, 68%)',
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full shrink-0 mr-2 mt-1 flex items-center justify-center bg-neon-blue/10 border border-neon-blue/20">
                      <img src="/arc-logo-ui.png" alt="" className="w-3.5 h-3.5 object-contain" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === 'user' ? 'rounded-[18px] rounded-br-md' : 'rounded-[18px] rounded-bl-md'
                    }`}
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'hsla(193, 100%, 50%, 0.5)',
                            color: 'hsl(0, 0%, 100%)',
                            boxShadow: '0 2px 8px hsla(200, 80%, 50%, 0.3)',
                          }
                        : {
                            background: 'hsla(220, 15%, 14%, 1)',
                            color: 'hsl(220, 5%, 90%)',
                            border: '1px solid hsla(220, 15%, 22%, 0.6)',
                          }
                    }
                  >
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown components={mdComponents}>
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full shrink-0 mr-2 mt-1 flex items-center justify-center bg-neon-blue/10 border border-neon-blue/20">
                  <img src="/arc-logo-ui.png" alt="" className="w-3.5 h-3.5 object-contain" />
                </div>
                <div
                  className="px-3.5 py-2.5 rounded-[18px] rounded-bl-md text-[13px]"
                  style={{
                    background: 'hsla(220, 15%, 14%, 1)',
                    border: '1px solid hsla(220, 15%, 22%, 0.6)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-neon-blue" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-neon-blue" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-neon-blue" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className={`px-3 pt-2 shrink-0 ${isFullscreen ? 'pb-[20px]' : 'pb-[28px] max-sm:pb-[calc(env(safe-area-inset-bottom,12px)+28px)]'}`}
          >
            <div
              className="flex items-end gap-2 rounded-full px-3 transition-all duration-200"
              style={{
                background: 'hsla(220, 15%, 6%, 0.85)',
                backdropFilter: 'blur(24px)',
                border: '1px solid hsla(220, 15%, 22%, 0.5)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 hsla(0, 0%, 100%, 0.04)',
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Arc..."
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-transparent border-none outline-none resize-none text-[16px] sm:text-[14px] py-2.5 leading-5 placeholder:opacity-40 text-foreground"
                style={{
                  minHeight: '36px',
                  maxHeight: '80px',
                  scrollbarWidth: 'none',
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center my-1 transition-all duration-200"
                style={{
                  background: input.trim() ? 'hsl(var(--neon-blue))' : 'hsla(220, 15%, 20%, 0.6)',
                  color: input.trim() ? 'hsl(220, 10%, 98%)' : 'hsl(220, 5%, 40%)',
                  boxShadow: input.trim() ? '0 2px 8px hsla(200, 80%, 50%, 0.3)' : 'none',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ArcMiniChat;
