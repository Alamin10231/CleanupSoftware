// Chat.tsx

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * ---- Expected backend protocol (Django Channels) ----
 * Client -> Server:
 *  { "action": "join", "name": string }
 *  { "action": "message", "name": string, "text": string }
 *  { "action": "typing", "name": string, "isTyping": boolean }
 *
 * Server -> Client examples:
 *  { "event": "message", "name": string, "text": string, "ts": number }
 *  { "event": "typing", "name": string, "isTyping": boolean }
 *  { "event": "system", "text": string }
 *
 * Adjust the keys to match your Django response if different.
 */

type IncomingEvent =
  | { event: "message"; name: string; text: string; ts?: number }
  | { event: "typing"; name: string; isTyping: boolean }
  | { event: "system"; text: string };

type OutgoingPayload =
  | { action: "join"; name: string }
  | { action: "message"; name: string; text: string }
  | { action: "typing"; name: string; isTyping: boolean };

type ChatMessage = {
  name: string;
  text: string;
  ts: number;
  kind: "user" | "system";
};

type Props = {
  /** WebSocket URL from Django Channels, e.g. ws://localhost:8000/ws/chat/room1/ */
  wsUrl: string;
};

export default function Chat({ wsUrl }: Props) {
  const [stage, setStage] = useState<"name" | "chat">("name");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typers, setTypers] = useState<Record<string, number>>({}); // name -> last_seen ms
  const wsRef = useRef<WebSocket | null>(null);
  const typingRef = useRef<{ timer?: number; lastSent?: number }>({});
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Connect WebSocket once when stage becomes "chat"
  useEffect(() => {
    if (stage !== "chat") return;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      safeSend({ action: "join", name });
      pushSystem(`Connected as ${name}`);
    };

    ws.onmessage = (evt) => {
      try {
        const data: IncomingEvent = JSON.parse(evt.data);
        if (data.event === "message") {
          setMessages((prev) => [
            ...prev,
            {
              name: data.name,
              text: data.text,
              ts: data.ts ?? Date.now(),
              kind: "user",
            },
          ]);
        } else if (data.event === "typing") {
          // Track who is typing (expire after 3s)
          setTypers((prev) => ({
            ...prev,
            [data.name]: data.isTyping ? Date.now() : 0,
          }));
        } else if (data.event === "system") {
          pushSystem(data.text);
        }
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      pushSystem("Disconnected.");
    };

    return () => {
      try {
        ws.close();
      } catch(err) {
        console.log(err)
      }
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, wsUrl, name]);

  // Prune stale typers every 1s (anyone older than 3s disappears)
  useEffect(() => {
    const id = window.setInterval(() => {
      const now = Date.now();
      setTypers((prev) => {
        const next: Record<string, number> = {};
        for (const [k, v] of Object.entries(prev)) {
          if (v && now - v < 3000) next[k] = v;
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const someoneTyping = useMemo(() => {
    const names = Object.keys(typers).filter((n) => typers[n] && n !== name);
    if (names.length === 0) return "";
    if (names.length === 1) return `${names[0]} is typing…`;
    if (names.length === 2) return `${names[0]} and ${names[1]} are typing…`;
    return "Several people are typing…";
  }, [typers, name]);

  function safeSend(payload: OutgoingPayload) {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify(payload));
  }

  function pushSystem(text: string) {
    setMessages((prev) => [
      ...prev,
      { name: "system", text, ts: Date.now(), kind: "system" },
    ]);
  }

  function handleStart() {
    if (!name.trim()) return;
    setStage("chat");
  }

  function handleSend() {
    const t = text.trim();
    if (!t) return;
    safeSend({ action: "message", name, text: t });
    // Optimistic add
    setMessages((prev) => [
      ...prev,
      { name, text: t, ts: Date.now(), kind: "user" },
    ]);
    setText("");
    // Stop typing state
    sendTyping(false);
  }

  function sendTyping(isTyping: boolean) {
    // throttle typing pings to 400ms
    const now = Date.now();
    const last = typingRef.current.lastSent ?? 0;
    if (isTyping && now - last < 400) return;
    typingRef.current.lastSent = now;
    safeSend({ action: "typing", name, isTyping });
  }

  return (
    <div className="flex flex-col h-[720px] bg-white border rounded-2xl overflow-hidden">
      {stage === "name" ? (
        <div className="max-w-md w-full mx-auto mt-6 rounded-2xl border border-slate-200 bg-white shadow p-5">
          <h1 className="text-lg font-semibold text-slate-800">
            Enter your name
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            This name will be visible to everyone in the room.
          </p>

          <label
            htmlFor="displayName"
            className="mt-4 block text-sm font-medium text-slate-700"
          >
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (e.g. John Doe)"
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />

          <div className="mt-4">
            <button
              type="button"
              onClick={handleStart}
              className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              disabled={!name.trim()}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white grid place-items-center text-sm font-semibold">
                {name[0]?.toUpperCase() || "?"}
              </div>
              <div className="font-medium text-slate-800">
                Realtime group chat
              </div>
            </div>
            <div className="text-sm text-slate-500">
              Signed in as{" "}
              <span className="font-medium text-slate-700">{name}</span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 bg-white overflow-y-auto px-3 py-4 space-y-3"
          >
            {messages.length === 0 ? (
              <div className="h-full grid place-items-center">
                <p className="text-slate-400 text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.name === name ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm shadow ${
                      m.kind === "system"
                        ? "bg-slate-50 border border-slate-200 text-slate-500 mx-auto"
                        : m.name === name
                        ? "bg-emerald-600 text-white rounded-tr-sm"
                        : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                    }`}
                  >
                    {m.kind !== "system" && m.name !== name && (
                      <div className="text-[11px] opacity-70 mb-0.5">
                        {m.name}
                      </div>
                    )}
                    <div>{m.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Typing indicator */}
          {someoneTyping && (
            <div className="px-4 py-1 text-xs text-slate-500 border-t border-slate-100">
              {someoneTyping}
            </div>
          )}

          {/* Composer */}
          <div className="sticky bottom-0 mx-3 pb-4 pt-2 bg-white z-10">
            <div className="w-full rounded-2xl border border-slate-200 shadow-sm px-2.5 py-2 flex items-end gap-2">
              <textarea
                className="flex-1 resize-none outline-none text-[15px] placeholder-slate-400"
                rows={1}
                placeholder="Type a message..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  // notify backend we're typing
                  if (e.target.value.trim()) sendTyping(true);
                }}
                onBlur={() => sendTyping(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                className="inline-flex items-center justify-center bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-xl shadow"
                type="button"
                disabled={!text.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
