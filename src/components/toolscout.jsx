import { useState, useRef, useEffect } from "react";

const BLUE = "#3b6cf4";
const BLUE_DARK = "#2952d9";
const BLUE_LIGHT = "#e8eefe";
const BLUE_MID = "#b8c9fc";

const TOOLS = [
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    score: 9.2,
    rank: 1,
    logo: "N",
    color: "#000",
    tagline: "All-in-one workspace for notes, docs & databases",
    pros: ["Extremely flexible", "Great templates library", "Strong free tier", "AI features built in"],
    cons: ["Steep learning curve", "Slow with large databases", "Offline mode limited", "Mobile app lacks features"],
    sources: { g2: 4.7, productHunt: 4.8, reddit: "Very Positive", trustpilot: 4.5 },
    pricing: "Free / $8 per month",
    bestFor: "Solopreneurs who need an all-in-one system",
  },
  {
    id: "canva",
    name: "Canva",
    category: "Design",
    score: 9.0,
    rank: 2,
    logo: "C",
    color: "#7D2AE8",
    tagline: "Design anything in minutes, no experience needed",
    pros: ["Incredibly easy to use", "Massive template library", "Brand kit feature", "Generous free plan"],
    cons: ["Limited for print-ready files", "Pro features locked", "Not for complex design", "Export quality varies"],
    sources: { g2: 4.7, productHunt: 4.9, reddit: "Positive", trustpilot: 4.4 },
    pricing: "Free / $12.99 per month",
    bestFor: "Solopreneurs who need fast professional content",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    score: 9.1,
    rank: 3,
    logo: "S",
    color: "#635BFF",
    tagline: "Payments infrastructure that scales with you",
    pros: ["Developer-friendly", "Excellent documentation", "Global payment support", "Powerful dashboard"],
    cons: ["2.9% + 30c per transaction", "Complex for non-developers", "Payouts can be slow", "Account holds can happen"],
    sources: { g2: 4.5, productHunt: 4.7, reddit: "Very Positive", trustpilot: 3.8 },
    pricing: "2.9% + 30c per transaction",
    bestFor: "Solopreneurs selling products or services online",
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    score: 8.8,
    rank: 4,
    logo: "Z",
    color: "#FF4A00",
    tagline: "Automate your work across 5000+ apps",
    pros: ["Huge app ecosystem", "No code required", "Reliable and battle-tested", "Good documentation"],
    cons: ["Gets expensive at scale", "Slow multi-step zaps", "Free plan very limited", "Debugging can be tricky"],
    sources: { g2: 4.5, productHunt: 4.6, reddit: "Mostly Positive", trustpilot: 4.2 },
    pricing: "Free / from $19.99 per month",
    bestFor: "Solopreneurs automating repetitive workflows",
  },
  {
    id: "convertkit",
    name: "Kit (ConvertKit)",
    category: "Email",
    score: 8.6,
    rank: 5,
    logo: "K",
    color: "#FB6970",
    tagline: "Email marketing built for creators",
    pros: ["Creator-focused features", "Excellent automation", "Clean subscriber management", "Free up to 1000 subs"],
    cons: ["More expensive than competitors", "Basic landing pages", "Limited design templates", "Reporting could be better"],
    sources: { g2: 4.4, productHunt: 4.5, reddit: "Positive", trustpilot: 4.3 },
    pricing: "Free up to 1000 / from $25/mo",
    bestFor: "Solopreneurs building an audience",
  },
  {
    id: "make",
    name: "Make",
    category: "Automation",
    score: 8.5,
    rank: 6,
    logo: "M",
    color: "#6D00CC",
    tagline: "Visual automation — more power than Zapier",
    pros: ["More affordable than Zapier", "Visual scenario builder", "More operations on free plan", "Complex logic support"],
    cons: ["Steeper learning curve", "Smaller app library", "UI can be overwhelming", "Support can be slow"],
    sources: { g2: 4.7, productHunt: 4.6, reddit: "Positive", trustpilot: 4.1 },
    pricing: "Free / from $9 per month",
    bestFor: "Solopreneurs who need advanced automation on a budget",
  },
];

const REVIEWS = [
  { tool: "Notion", author: "u/solofounder22", source: "Reddit", text: "Notion replaced 4 apps for me. My entire business runs out of one workspace — client portals, content calendar, finances. Worth every penny.", sentiment: "positive", date: "2 days ago" },
  { tool: "Canva", author: "TrustPilot Verified", source: "Trustpilot", text: "As a one-person brand, Canva saved me thousands in design costs. I create all my social posts, pitch decks, and lead magnets myself now.", sentiment: "positive", date: "1 week ago" },
  { tool: "Zapier", author: "G2 Review", source: "G2", text: "The ROI on Zapier is incredible. I automated my entire client onboarding — what took 2 hours now runs itself while I sleep.", sentiment: "positive", date: "3 days ago" },
  { tool: "Zapier", author: "u/buildinpublic", source: "Reddit", text: "Zapier is great until you hit the free plan limits. Pricing jumps are steep. Look at Make if you are on a budget.", sentiment: "mixed", date: "5 days ago" },
  { tool: "Stripe", author: "Product Hunt", source: "Product Hunt", text: "Stripe is the gold standard for online payments. Setup took 30 minutes. The dashboard is clean, payouts are reliable.", sentiment: "positive", date: "1 week ago" },
  { tool: "Kit (ConvertKit)", author: "Quora Answer", source: "Quora", text: "For solopreneurs selling courses or templates, ConvertKit is unmatched. The automation sequences are powerful and easy to set up.", sentiment: "positive", date: "4 days ago" },
];

const SENTIMENT_BG = { positive: "#e8f5e9", mixed: "#fff8e1", negative: "#fdecea" };
const SENTIMENT_COLOR = { positive: "#2e7d32", mixed: "#f57f17", negative: "#c62828" };

function ScoreBar({ score }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: BLUE_MID, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${(score / 10) * 100}%`, height: "100%", background: BLUE, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, minWidth: 28, color: BLUE_DARK }}>{score}</span>
    </div>
  );
}

function Badge({ label }) {
  return (
    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: BLUE_LIGHT, color: BLUE_DARK, border: `1px solid ${BLUE_MID}`, fontWeight: 500 }}>
      {label}
    </span>
  );
}

function ToolCard({ tool, onClick, selected, rank }) {
  const medalColor = rank === 1 ? "#f59e0b" : rank === 2 ? "#6b7280" : rank === 3 ? "#b45309" : BLUE_LIGHT;
  const medalText = rank < 4 ? "#fff" : BLUE_DARK;
  return (
    <div
      onClick={() => onClick(tool)}
      style={{
        background: "#fff",
        border: selected ? `2px solid ${BLUE}` : `1px solid ${BLUE_MID}`,
        borderRadius: 14,
        padding: "1rem",
        cursor: "pointer",
        position: "relative",
        transition: "box-shadow 0.15s, border 0.15s",
        boxShadow: selected ? `0 0 0 3px ${BLUE_LIGHT}` : "none",
      }}
    >
      <div style={{ position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: "50%", background: medalColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: medalText }}>
        {rank}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: tool.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
          {tool.logo}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{tool.name}</span>
            <span style={{ fontSize: 10, padding: "1px 8px", borderRadius: 20, background: BLUE_LIGHT, color: BLUE_DARK, border: `1px solid ${BLUE_MID}` }}>{tool.category}</span>
          </div>
          <p style={{ fontSize: 11, color: "#6b7280", margin: "2px 0 0", lineHeight: 1.4 }}>{tool.tagline}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: BLUE, lineHeight: 1 }}>{tool.score}</div>
          <div style={{ fontSize: 10, color: "#9ca3af" }}>/ 10</div>
        </div>
      </div>
      <ScoreBar score={tool.score} />
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Pros</div>
          {tool.pros.slice(0, 2).map((p, i) => (
            <div key={i} style={{ fontSize: 11, color: "#2e7d32", marginBottom: 3, display: "flex", gap: 4 }}>
              <span style={{ color: "#4caf50", fontWeight: 700 }}>+</span>{p}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Cons</div>
          {tool.cons.slice(0, 2).map((c, i) => (
            <div key={i} style={{ fontSize: 11, color: "#c62828", marginBottom: 3, display: "flex", gap: 4 }}>
              <span style={{ fontWeight: 700 }}>-</span>{c}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 5, flexWrap: "wrap" }}>
        <Badge label={`G2 ${tool.sources.g2}`} />
        <Badge label={`PH ${tool.sources.productHunt}`} />
        <Badge label={tool.sources.reddit} />
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${BLUE_MID}`, borderRadius: 14, padding: "1rem", borderLeft: `4px solid ${BLUE}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: 13, color: BLUE_DARK }}>{review.tool}</span>
          <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 6 }}>via {review.source}</span>
        </div>
        <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, background: SENTIMENT_BG[review.sentiment], color: SENTIMENT_COLOR[review.sentiment], fontWeight: 600, border: `1px solid ${SENTIMENT_COLOR[review.sentiment]}33` }}>
          {review.sentiment}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: "0 0 8px", fontStyle: "italic" }}>"{review.text}"</p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9ca3af" }}>
        <span>{review.author}</span>
        <span>{review.date}</span>
      </div>
    </div>
  );
}

function CompareView() {
  const [sel, setSel] = useState([]);
  const toggle = t => setSel(prev =>
    prev.find(x => x.id === t.id) ? prev.filter(x => x.id !== t.id) : prev.length < 3 ? [...prev, t] : prev
  );

  return (
    <div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>Select up to 3 tools to compare side by side.</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {TOOLS.map(t => {
          const active = !!sel.find(s => s.id === t.id);
          return (
            <button key={t.id} onClick={() => toggle(t)} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, cursor: "pointer", background: active ? BLUE : BLUE_LIGHT, color: active ? "#fff" : BLUE_DARK, border: `1px solid ${active ? BLUE : BLUE_MID}`, fontWeight: active ? 600 : 400, transition: "all 0.15s" }}>
              {t.name}
            </button>
          );
        })}
      </div>
      {sel.length >= 2 ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: BLUE_LIGHT }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: BLUE_DARK, fontWeight: 700, borderBottom: `2px solid ${BLUE_MID}` }}>Feature</th>
                {sel.map(t => (
                  <th key={t.id} style={{ textAlign: "left", padding: "10px 12px", borderBottom: `2px solid ${BLUE_MID}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>{t.logo}</div>
                      <span style={{ fontWeight: 700, color: BLUE_DARK }}>{t.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Overall score", get: t => `${t.score} / 10` },
                { label: "Category", get: t => t.category },
                { label: "Pricing", get: t => t.pricing },
                { label: "G2 rating", get: t => `${t.sources.g2} / 5` },
                { label: "Product Hunt", get: t => `${t.sources.productHunt} / 5` },
                { label: "Reddit sentiment", get: t => t.sources.reddit },
                { label: "Best for", get: t => t.bestFor },
                { label: "Top pro", get: t => `+ ${t.pros[0]}` },
                { label: "Top con", get: t => `- ${t.cons[0]}` },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? BLUE_LIGHT : "#fff" }}>
                  <td style={{ padding: "9px 12px", color: BLUE_DARK, fontWeight: 600, borderBottom: `1px solid ${BLUE_MID}` }}>{row.label}</td>
                  {sel.map(t => (
                    <td key={t.id} style={{ padding: "9px 12px", color: "#374151", borderBottom: `1px solid ${BLUE_MID}` }}>{row.get(t)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2.5rem", color: "#9ca3af", fontSize: 13, background: BLUE_LIGHT, borderRadius: 12, border: `1px dashed ${BLUE_MID}` }}>
          Select at least 2 tools above to see the comparison table.
        </div>
      )}
    </div>
  );
}

function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your solopreneur tools advisor. Ask me anything — best tools for your use case, pros and cons, pricing, or what Reddit and G2 say about any tool." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const ctx = TOOLS.map(t =>
    `${t.name} (${t.category}): score ${t.score}/10. Pros: ${t.pros.join(", ")}. Cons: ${t.cons.join(", ")}. G2: ${t.sources.g2}, ProductHunt: ${t.sources.productHunt}, Reddit: ${t.sources.reddit}. Pricing: ${t.pricing}. Best for: ${t.bestFor}.`
  ).join("\n");

  const send = async () => {
    if (!input.trim() || loading) return;
    const um = { role: "user", content: input };
    setMessages(prev => [...prev, um]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a solopreneur tools advisor for 5kmvp.com. Be concise and practical. Tool database:\n${ctx}\nFor tools not in the database, use general knowledge. Always mention pros and cons. Keep responses under 180 words.`,
          messages: [...messages, um].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Sorry, something went wrong.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const suggestions = ["Best tool for email marketing?", "Compare Notion vs Canva", "Cheapest automation tool?", "What does Reddit say about Zapier?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 480 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px",
              borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
              background: m.role === "user" ? BLUE : BLUE_LIGHT,
              color: m.role === "user" ? "#fff" : "#1e293b",
              fontSize: 13, lineHeight: 1.6,
              border: m.role === "user" ? "none" : `1px solid ${BLUE_MID}`,
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 2px", background: BLUE_LIGHT, fontSize: 13, color: BLUE_DARK, border: `1px solid ${BLUE_MID}` }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {messages.length === 1 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => setInput(s)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, background: BLUE_LIGHT, color: BLUE_DARK, border: `1px solid ${BLUE_MID}`, cursor: "pointer", fontWeight: 500 }}>
              {s}
            </button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about any solopreneur tool..."
          style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${BLUE_MID}`, background: "#fff", color: "#111", fontSize: 13, outline: "none" }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{ padding: "10px 20px", borderRadius: 10, background: loading || !input.trim() ? BLUE_MID : BLUE, color: "#fff", border: "none", cursor: loading || !input.trim() ? "default" : "pointer", fontSize: 13, fontWeight: 700, transition: "background 0.15s" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const TABS = ["Rankings", "Reviews", "Compare", "Ask AI"];

export default function ToolScout() {
  const [tab, setTab] = useState("Rankings");
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto" }}>
      <h2 className="sr-only">Solopreneur tool rankings, reviews, comparisons and AI advisor</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, borderBottom: `2px solid ${BLUE_MID}`, marginBottom: 24 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 20px", fontSize: 13, fontWeight: tab === t ? 700 : 400,
              background: tab === t ? BLUE : "transparent",
              color: tab === t ? "#fff" : BLUE_DARK,
              border: "none", cursor: "pointer", borderRadius: "8px 8px 0 0",
              transition: "all 0.15s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rankings */}
      {tab === "Rankings" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16 }}>
            {[...TOOLS].sort((a, b) => b.score - a.score).map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} onClick={setSelected} selected={selected?.id === tool.id} rank={i + 1} />
            ))}
          </div>

          {selected && (
            <div style={{ marginTop: 20, background: "#fff", border: `2px solid ${BLUE}`, borderRadius: 14, padding: "1.25rem", boxShadow: `0 0 0 4px ${BLUE_LIGHT}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: BLUE_DARK }}>{selected.name} — full breakdown</h3>
                <button onClick={() => setSelected(null)} style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE_MID}`, borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16, color: BLUE_DARK, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: BLUE_DARK, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>All pros</div>
                  {selected.pros.map((p, i) => <div key={i} style={{ fontSize: 12, color: "#2e7d32", marginBottom: 4 }}>+ {p}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: BLUE_DARK, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>All cons</div>
                  {selected.cons.map((c, i) => <div key={i} style={{ fontSize: 12, color: "#c62828", marginBottom: 4 }}>- {c}</div>)}
                </div>
              </div>
              <div style={{ padding: "10px 14px", background: BLUE_LIGHT, borderRadius: 10, fontSize: 13, color: BLUE_DARK, marginBottom: 10, border: `1px solid ${BLUE_MID}` }}>
                <strong>Best for:</strong> {selected.bestFor}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.entries(selected.sources).map(([k, v]) => (
                  <Badge key={k} label={`${k}: ${v}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reviews */}
      {tab === "Reviews" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16 }}>
          {REVIEWS.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      )}

      {/* Compare */}
      {tab === "Compare" && <CompareView />}

      {/* Ask AI */}
      {tab === "Ask AI" && <ChatBot />}
    </div>
  );
}
