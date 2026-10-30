import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import profile from "../data/hire-me.json";
import styles from "./HireAssistant.module.scss";

type Message = { role: "user" | "assistant"; content: string };
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult:
    | ((event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => void)
    | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};

const unavailable =
  "AI chat is not available on this host yet. You can still read the answers below or contact Sajeetharan.";

export default function HireAssistant(): JSX.Element {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [consent, setConsent] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  const [readAvailable, setReadAvailable] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<Recognition | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const speechWindow = window as SpeechWindow;
    setVoiceAvailable(
      Boolean(
        speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition,
      ),
    );
    setReadAvailable("speechSynthesis" in window);
    async function checkAvailability() {
      try {
        const response = await fetch("/api/hire-me", {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        const data: unknown = response.headers
          .get("Content-Type")
          ?.includes("application/json")
          ? await response.json()
          : null;
        setAvailable(
          response.ok &&
            typeof data === "object" &&
            data !== null &&
            "available" in data &&
            data.available === true,
        );
      } catch {
        setAvailable(false);
      } finally {
        clearTimeout(timeout);
      }
    }
    void checkAvailability();
    return () => {
      controller.abort();
      clearTimeout(timeout);
      requestRef.current?.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      }
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, pending]);

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function clearConversation() {
    requestRef.current?.abort();
    recognitionRef.current?.abort();
    if (timerRef.current) clearTimeout(timerRef.current);
    stopSpeech();
    setListening(false);
    setMessages([]);
    setQuestion("");
    setError("");
    setVoiceError("");
    inputRef.current?.focus();
  }

  async function ask(event: React.FormEvent) {
    event.preventDefault();
    if (busyRef.current || !available || !consent || listening) return;
    const content = question.trim();
    if (!content || content.length > 1200) {
      setError("Enter a question of 1-1200 characters.");
      return;
    }
    busyRef.current = true;
    setPending(true);
    setError("");
    stopSpeech();
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 30000);
    const outgoing: Message[] = [
      ...messages.slice(-6),
      { role: "user", content },
    ];
    while (
      new TextEncoder().encode(
        JSON.stringify({ consent: true, messages: outgoing }),
      ).byteLength > 8192 &&
      outgoing.length > 1
    ) {
      outgoing.splice(0, 2);
    }
    try {
      const response = await fetch("/api/hire-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ consent: true, messages: outgoing }),
        signal: controller.signal,
      });
      if (!response.headers.get("Content-Type")?.includes("application/json")) {
        throw new Error(unavailable);
      }
      const data: unknown = await response.json();
      if (!response.ok) {
        const detail =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "The assistant is unavailable. Please try again or contact Sajeetharan.";
        throw new Error(detail);
      }
      if (
        typeof data !== "object" ||
        data === null ||
        !("answer" in data) ||
        typeof data.answer !== "string" ||
        !data.answer.trim() ||
        data.answer.length > 1200
      ) {
        throw new Error(
          "The assistant returned an invalid answer. Please try again.",
        );
      }
      const completed: Message[] = [
        ...outgoing,
        { role: "assistant", content: data.answer },
      ];
      setMessages(completed.slice(-6));
      setQuestion("");
    } catch (failure) {
      setError(
        controller.signal.aborted
          ? "The request was cancelled or timed out. Your question has not been cleared; you can try again."
          : failure instanceof Error
            ? failure.message
            : "The assistant could not be reached. Please try again.",
      );
    } finally {
      clearTimeout(timeout);
      requestRef.current = null;
      busyRef.current = false;
      setPending(false);
    }
  }

  function useMicrophone() {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const speechWindow = window as SpeechWindow;
    const Constructor =
      speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Constructor || !consent || !available || pending) return;
    stopSpeech();
    setVoiceError("");
    const recognition = new Constructor();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || "";
      setQuestion(transcript.slice(0, 1200));
      if (transcript.length > 1200)
        setVoiceError(
          "The transcript was shortened to 1200 characters. Please review it before sending.",
        );
      inputRef.current?.focus();
    };
    recognition.onerror = (event) => {
      setVoiceError(
        event.error === "not-allowed"
          ? "Microphone permission was denied. Allow it in your browser settings or type instead."
          : `Voice input stopped (${event.error}). Please try again or type instead.`,
      );
    };
    recognition.onend = () => {
      setListening(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    try {
      recognition.start();
      setListening(true);
      timerRef.current = setTimeout(() => recognition.stop(), 30000);
    } catch {
      setListening(false);
      setVoiceError(
        "Voice input could not start. Please try again or type instead.",
      );
    }
  }

  function readAnswer() {
    if (speaking) {
      stopSpeech();
      return;
    }
    const latest = messages[messages.length - 1];
    if (!readAvailable || latest?.role !== "assistant") return;
    setVoiceError("");
    const utterance = new SpeechSynthesisUtterance(latest.content);
    utterance.lang = "en-US";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (event.error !== "interrupted" && event.error !== "canceled") {
        setVoiceError(
          "Read-aloud is unavailable. The answer is still shown in the conversation.",
        );
      }
    };
    window.speechSynthesis.cancel();
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className={styles.card} aria-labelledby="assistant-title" id="ask">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            A different kind of introduction
          </span>
          <h2 id="assistant-title">Ask about Sajee</h2>
        </div>
        <span className={styles.badge}>AI assistant</span>
      </header>
      <p>
        Ask about my work, projects, or engineering background. This is AI, not
        me. It can make mistakes; check the linked sources.
      </p>
      <p className={styles.status} role="status">
        {available === null
          ? "Checking AI availability..."
          : available
            ? "Text chat is available. Voice is optional."
            : unavailable}
      </p>
      <div
        className={styles.prompts}
        aria-label="Suggested recruiter questions"
      >
        {profile.sections.slice(0, 3).map(({ question: suggestion }) => (
          <button
            key={suggestion}
            type="button"
            disabled={pending || listening}
            onClick={() => {
              setQuestion(suggestion);
              inputRef.current?.focus();
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <div
        ref={logRef}
        className={styles.log}
        role="log"
        aria-label="Recruiter conversation"
        aria-live="polite"
        aria-relevant="additions"
        tabIndex={0}
      >
        {messages.length === 0 ? (
          <p className={styles.empty}>
            Start with a question. Real work, public facts, no invented
            achievements.
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              className={
                message.role === "user" ? styles.question : styles.answer
              }
              key={index}
            >
              <strong>
                {message.role === "user" ? "You" : "Sajee's AI assistant"}
              </strong>
              <p>{message.content}</p>
            </div>
          ))
        )}
        {pending && <p>Thinking about your question...</p>}
      </div>
      <form onSubmit={ask} className={styles.form}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={consent}
            disabled={pending || listening}
            onChange={(event) => setConsent(event.target.checked)}
          />
          <span>
            I agree to send my question and recent conversation to Cloudflare
            for AI processing. Optional voice features may use my browser
            provider&apos;s services. Don&apos;t include sensitive information.{" "}
            <Link to="/privacy#hire-me-ai-assistant">Privacy details</Link>.
          </span>
        </label>
        <label htmlFor="recruiter-question">Your question</label>
        <textarea
          id="recruiter-question"
          ref={inputRef}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={1200}
          rows={3}
          disabled={pending || listening}
          placeholder="What has Sajee worked on with developer tools?"
          aria-describedby="question-help"
        />
        <small id="question-help">
          Up to 1200 characters. Voice fills this box; review it before sending.
          Only the latest three completed exchanges are kept.
        </small>
        <div className={styles.actions}>
          <button
            className="button button--primary"
            type="submit"
            disabled={
              !available || !consent || pending || listening || !question.trim()
            }
          >
            {pending ? "Asking..." : "Ask a question"}
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={useMicrophone}
            disabled={!available || !consent || pending || !voiceAvailable}
            aria-pressed={listening}
          >
            {listening ? "Stop microphone" : "Use microphone"}
          </button>
          {readAvailable && messages.length > 0 && (
            <button
              type="button"
              className={styles.textButton}
              onClick={readAnswer}
              disabled={pending || listening}
            >
              {speaking ? "Stop reading" : "Read answer"}
            </button>
          )}
          <button
            type="button"
            className={styles.textButton}
            onClick={clearConversation}
            disabled={pending}
          >
            Clear chat
          </button>
        </div>
        <p className={styles.note}>
          {voiceAvailable
            ? "Microphone runs only when you choose it, for up to 30 seconds. Read-aloud uses a browser voice, not a clone of mine."
            : "Voice input isn't supported in this browser. You can type instead."}
        </p>
        {error && (
          <p className={styles.error} role="alert">
            {error} <Link to="/contact">Contact Sajeetharan</Link>.
          </p>
        )}
        {voiceError && (
          <p className={styles.error} role="alert">
            {voiceError}
          </p>
        )}
      </form>
      <footer className={styles.footer}>
        <span>
          No tools, bookings, or promises. No conversation storage added by this
          site.
        </span>
        <span>
          Limited free-tier AI, not unlimited calls.{" "}
          <a href="#questions">Read the FAQs</a> anytime.
        </span>
      </footer>
    </section>
  );
}
