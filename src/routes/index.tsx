import { useRef, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  SendIcon,
  BotIcon,
  UserIcon,
  Copy,
  Check,
  Square,
  RefreshCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Sparkles,
  Code2,
  Lightbulb,
  Terminal,
} from "lucide-react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import { Stack } from "@/components/selia/stack";
import { Textarea } from "@/components/selia/textarea";

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal copy teks: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-all active:scale-90"
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold text-emerald-500 tracking-tight">
            COPIED!
          </span>
        </>
      ) : (
        <>
          <Copy size={14} className="text-muted-foreground hover:text-white" />
          <span className="text-[10px] font-bold text-muted-foreground tracking-tight">
            COPY
          </span>
        </>
      )}
    </button>
  );
}

export const Route = createFileRoute("/")({ component: App });

const SUGGESTIONS = [
  {
    icon: <Code2 size={18} className="text-blue-400" />,
    title: "Buat kode React",
    desc: "Bantu aku membuat komponen dashboard",
  },
  {
    icon: <Lightbulb size={18} className="text-amber-400" />,
    title: "Jelaskan konsep",
    desc: "Apa itu Server-Sent Events (SSE)?",
  },
  {
    icon: <Terminal size={18} className="text-emerald-400" />,
    title: "Debug error",
    desc: "Tolong perbaiki error Tailwind CSS ini",
  },
  {
    icon: <Sparkles size={18} className="text-purple-400" />,
    title: "Buat cerita",
    desc: "Tulis cerita sci-fi pendek tentang AI",
  },
];

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, isLoading, stop } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isLoading) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 400;
      if (isAtBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "auto",
        });
      }
    } else {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (input.trim() && !isLoading) formRef.current?.requestSubmit();
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentMessage = input;
    setInput("");

    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 10);

    await sendMessage(currentMessage);
  }

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 h-dvh w-screen overflow-y-auto overflow-x-hidden bg-[#050505] text-foreground selection:bg-primary/30 custom-scrollbar"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.1) transparent",
        overflowAnchor: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[#050505]">
        <div className="absolute top-[-20%] left-[-10%] h-[70%] w-[70%] rounded-full bg-primary/5 blur-[120px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[70%] w-[70%] rounded-full bg-purple-500/5 blur-[120px] opacity-30" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* CONTAINER UTAMA */}
      <div className="relative flex flex-col min-h-full w-full max-w-4xl mx-auto border-x border-white/2 bg-transparent shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {/*  HEADER */}
        <header className="sticky top-0 p-3 sm:p-4 flex items-center justify-between border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-50">
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-linear-to-br from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center shadow-lg hover:border-white/20 transition-all group">
              <BotIcon
                className="text-white group-hover:scale-110 transition-transform"
                size={20}
              />
            </button>

            {/* Model Selector Dropdown Palsu */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
              <div className="flex flex-col items-start leading-none">
                <span className="text-sm font-semibold tracking-tight text-white/90 flex items-center gap-1.5">
                  Habib Ultra{" "}
                  <ChevronDown size={14} className="text-white/50" />
                </span>
                <span
                  className={`text-[10px] mt-1 font-medium tracking-wide flex items-center gap-1.5 ${isLoading ? "text-amber-400" : "text-emerald-400"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isLoading ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}
                  />
                  {isLoading ? "Generating..." : "Ready"}
                </span>
              </div>
            </button>
          </div>

          {/* Action Header Kanan */}
          {/* <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <RefreshCcw size={18} />
            </button>
          </div> */}
        </header>

        {/* CHAT CONTENT AREA */}
        <main className="flex-1 px-4 sm:px-6 pb-20">
          <div className="mx-auto w-full">
            <Stack className="gap-8 pt-8 sm:pt-12">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="h-20 w-20 rounded-3xl bg-linear-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center shadow-2xl mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <BotIcon size={40} className="text-white drop-shadow-lg" />
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 text-center">
                    Apa yang ingin Anda kerjakan hari ini?
                  </h2>
                  <p className="text-white/40 max-w-md text-center text-sm mb-12">
                    Tanya kode, minta ide, atau sekadar ngobrol ringan. Model
                    Neural aktif dan siap membantu.
                  </p>

                  {/* Grid Suggestions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          handleSuggestionClick(s.title + ": " + s.desc)
                        }
                        className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all text-left group"
                      >
                        <div className="mt-0.5 p-2 rounded-lg bg-black/50 border border-white/5">
                          {s.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-white/90 group-hover:text-white mb-1">
                            {s.title}
                          </div>
                          <div className="text-xs text-white/40 group-hover:text-white/60">
                            {s.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* DAFTAR PESAN */}
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex w-full gap-4 sm:gap-6 ${message.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl shrink-0 flex items-center justify-center shadow-lg ${message.role === "user" ? "bg-white text-black" : "bg-zinc-800 text-white border border-white/10"}`}
                  >
                    {message.role === "user" ? (
                      <UserIcon size={18} className="sm:w-5 sm:h-5" />
                    ) : (
                      <BotIcon size={18} className="sm:w-5 sm:h-5" />
                    )}
                  </div>

                  <div
                    className={`flex flex-col max-w-[90%] sm:max-w-[85%] min-w-0 ${message.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`w-full  ${
                        message.role === "user"
                          ? "bg-white/5 px-5 py-3 sm:px-6 sm:py-4 rounded-3xl rounded-tr-sm border border-white/5"
                          : "bg-transparent border-none py-1"
                      }`}
                    >
                      {message.parts.map(
                        (part, idx) =>
                          part.type === "text" && (
                            <div
                              key={idx}
                              className={`font-sans text-[15px] sm:text-[16px] leading-relaxed antialiased w-full min-w-0 ${message.role === "user" ? "text-white" : "text-white/90"}`}
                            >
                              <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ children }) => (
                                    <p className="mb-4 last:mb-0 wrap-break-words">
                                      {children}
                                    </p>
                                  ),
                                  ul: ({ children }) => (
                                    <ul className="list-disc ml-5 sm:ml-6 mb-4 space-y-2 marker:text-white/30">
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className="list-decimal ml-5 sm:ml-6 mb-4 space-y-2 marker:text-white/30">
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className="pl-1 wrap-break-words">
                                      {children}
                                    </li>
                                  ),
                                  table: ({ children }) => (
                                    <div className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/2 w-full custom-scrollbar">
                                      <table className="w-full text-left text-sm border-collapse min-w-100">
                                        {children}
                                      </table>
                                    </div>
                                  ),
                                  th: ({ children }) => (
                                    <th className="px-4 py-3 bg-white/5 font-semibold text-white border-b border-white/10 whitespace-nowrap">
                                      {children}
                                    </th>
                                  ),
                                  td: ({ children }) => (
                                    <td className="px-4 py-3 border-b border-white/5 text-white/80">
                                      {children}
                                    </td>
                                  ),
                                  code({
                                    inline,
                                    className,
                                    children,
                                    ...props
                                  }: any) {
                                    const match = /language-(\w+)/.exec(
                                      className || "",
                                    );
                                    const codeString = String(children).replace(
                                      /\n$/,
                                      "",
                                    );
                                    return !inline && match ? (
                                      <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl w-full">
                                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                          <span className="text-[11px] font-bold tracking-wider text-white/50">
                                            {match[1].toUpperCase()}
                                          </span>
                                          <CopyButton content={codeString} />
                                        </div>
                                        <div className="overflow-x-auto w-full custom-scrollbar">
                                          <SyntaxHighlighter
                                            {...props}
                                            style={atomDark}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{
                                              margin: 0,
                                              padding: "1rem",
                                              fontSize: "0.85rem",
                                              backgroundColor: "transparent",
                                              lineHeight: "1.6",
                                            }}
                                          >
                                            {codeString}
                                          </SyntaxHighlighter>
                                        </div>
                                      </div>
                                    ) : (
                                      <code
                                        className="bg-white/10 text-white px-1.5 py-0.5 rounded-md text-[0.9em] font-medium mx-0.5 break-all border border-white/5"
                                        {...props}
                                      >
                                        {children}
                                      </code>
                                    );
                                  },
                                }}
                              >
                                {part.content +
                                  (isLoading &&
                                  index === messages.length - 1 &&
                                  message.role !== "user"
                                    ? " ▮"
                                    : "")}
                              </Markdown>
                            </div>
                          ),
                      )}
                    </div>

                    {/* TOOLBAR BAWAH PESAN AI */}
                    {message.role !== "user" && !isLoading && (
                      <div className="flex items-center gap-1 mt-2 opacity-50 hover:opacity-100 transition-opacity">
                        <CopyButton
                          content={
                            (
                              message.parts.find(
                                (p) => p.type === "text",
                              ) as any
                            )?.content || ""
                          }
                        />

                        <div className="w-px h-3 bg-white/10 mx-1" />

                        <button
                          className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                          title="Regenerate"
                        >
                          <RefreshCcw size={14} />
                        </button>
                        <button
                          className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                          title="Good response"
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                          title="Bad response"
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        </main>

        {/* FOOTER INPUT */}
        <footer className="sticky bottom-0 p-4 sm:p-6 bg-linear-to-t from-[#050505] via-[#050505] to-transparent z-50">
          <div className="max-w-3xl mx-auto relative group">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-[#111] border border-white/10 focus-within:border-white/30 focus-within:ring-4 focus-within:ring-white/5 rounded-3xl p-1.5 sm:p-2 transition-all duration-300 shadow-2xl flex flex-col"
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Habib Ultra..."
                onKeyDown={handleKeyDown}
                rows={1}
                inputMode="text"
                className="min-h-12 max-h-48 w-full bg-transparent border-0 focus-visible:ring-0 resize-none py-3.5 px-3 sm:px-4 text-[15px] sm:text-[16px] placeholder:text-white/20 text-white leading-relaxed"
              />

              <div className="flex items-center justify-end px-2 pb-1.5 pt-1">
                {/* Kiri: Attachment & Voice Icons */}
                {/* <div className="flex items-center gap-1">
                    <button type="button" className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                        <Paperclip size={18} />
                    </button>
                    <button type="button" className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors hidden sm:block">
                        <Mic size={18} />
                    </button>
                 </div> */}

                {/* Kanan: Submit / Stop Button */}
                <div>
                  {isLoading ? (
                    <button
                      type="button"
                      onClick={() => stop()}
                      className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all outline-none"
                    >
                      <Square size={18} fill="currentColor" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all shadow-sm outline-none ${
                        input.trim()
                          ? "bg-white text-black hover:scale-105 active:scale-95 hover:shadow-white/20 hover:shadow-lg"
                          : "bg-white/5 text-white/20 cursor-not-allowed"
                      }`}
                    >
                      <SendIcon
                        size={18}
                        className={
                          input.trim() ? "translate-x-px -translate-y-px" : ""
                        }
                      />
                    </button>
                  )}
                </div>
              </div>
            </form>
            <div className="text-center mt-3">
              <span className="text-[11px] text-white/30 tracking-wide">
                Habib M.Rizki
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
