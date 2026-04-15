import { useState, useRef, useEffect } from "react";

const BLUE = "#3b6cf4";
const BLUE_DARK = "#1e3a8a";
const BLUE_LIGHT = "#eff6ff";
const BLUE_MID = "#bfdbfe";
const AMBER = "#f59e0b";
const AMBER_LIGHT = "#fffbeb";

const ALL_TOOLS = [
  // PRODUCTIVITY
  { id: "notion", name: "Notion", category: "Productivity", score: 9.2, logo: "N", color: "#000", url: "https://notion.so", tagline: "All-in-one workspace for notes, docs & databases", pros: ["Extremely flexible", "Great templates", "Strong free tier", "AI built in"], cons: ["Steep learning curve", "Slow with large DBs", "Offline limited", "Mobile lacking"], sources: { G2: 4.7, "Product Hunt": 4.8, Reddit: "Very Positive", Trustpilot: 4.5 }, pricing: "Free / $8/mo", bestFor: "All-in-one business system" },
  { id: "clickup", name: "ClickUp", category: "Productivity", score: 8.9, logo: "CU", color: "#7B68EE", url: "https://clickup.com", tagline: "All-in-one project management for teams and solos", pros: ["Incredibly feature-rich", "Great free plan", "Time tracking built in", "Many views"], cons: ["Overwhelming at first", "Can be buggy", "Mobile app slow", "Too many options"], sources: { G2: 4.7, "Product Hunt": 4.7, Reddit: "Positive", Trustpilot: 4.6 }, pricing: "Free / $7/mo", bestFor: "Solopreneurs managing complex projects" },
  { id: "todoist", name: "Todoist", category: "Productivity", score: 8.5, logo: "TD", color: "#DB4035", url: "https://todoist.com", tagline: "Simple, powerful task management", pros: ["Very clean UI", "Natural language input", "Cross-platform", "Karma system"], cons: ["Limited free plan", "No time tracking", "Basic collaboration", "No kanban on free"], sources: { G2: 4.4, "Product Hunt": 4.5, Reddit: "Positive", Trustpilot: 4.3 }, pricing: "Free / $4/mo", bestFor: "Solopreneurs who want simple task management" },

  // DESIGN
  { id: "canva", name: "Canva", category: "Design", score: 9.0, logo: "C", color: "#7D2AE8", url: "https://canva.com", tagline: "Design anything in minutes, no experience needed", pros: ["Incredibly easy", "Massive templates", "Brand kit", "Generous free plan"], cons: ["Limited print files", "Pro features locked", "Not for complex work", "Export quality varies"], sources: { G2: 4.7, "Product Hunt": 4.9, Reddit: "Positive", Trustpilot: 4.4 }, pricing: "Free / $12.99/mo", bestFor: "Fast professional content creation" },
  { id: "figma", name: "Figma", category: "Design", score: 8.8, logo: "Fi", color: "#F24E1E", url: "https://figma.com", tagline: "Collaborative interface design tool", pros: ["Industry standard", "Great for UI/UX", "Real-time collab", "Free for solo use"], cons: ["Steep learning curve", "Requires design knowledge", "Slow on low-end PCs", "Offline limited"], sources: { G2: 4.7, "Product Hunt": 4.8, Reddit: "Very Positive", Trustpilot: 4.2 }, pricing: "Free / $12/mo", bestFor: "Solopreneurs building digital products or apps" },
  { id: "adobe-express", name: "Adobe Express", category: "Design", score: 8.1, logo: "AE", color: "#FF0000", url: "https://adobe.com/express", tagline: "Quick content creation from Adobe", pros: ["Adobe ecosystem", "Good templates", "Video editing", "Brand kit"], cons: ["Less intuitive than Canva", "Smaller template library", "Subscription required for best features", "Limited free plan"], sources: { G2: 4.3, "Product Hunt": 4.1, Reddit: "Mixed", Trustpilot: 3.9 }, pricing: "Free / $9.99/mo", bestFor: "Existing Adobe users who need quick designs" },

  // AUTOMATION
  { id: "zapier", name: "Zapier", category: "Automation", score: 8.8, logo: "Z", color: "#FF4A00", url: "https://zapier.com", tagline: "Automate your work across 5000+ apps", pros: ["Huge app ecosystem", "No code needed", "Reliable", "Good docs"], cons: ["Expensive at scale", "Slow multi-step zaps", "Free plan very limited", "Debugging tricky"], sources: { G2: 4.5, "Product Hunt": 4.6, Reddit: "Mostly Positive", Trustpilot: 4.2 }, pricing: "Free / from $19.99/mo", bestFor: "Automating workflows between popular apps" },
  { id: "make", name: "Make", category: "Automation", score: 8.5, logo: "MK", color: "#6D00CC", url: "https://make.com", tagline: "Visual automation — more powerful than Zapier", pros: ["More affordable", "Visual builder", "More free ops", "Complex logic"], cons: ["Steeper learning curve", "Smaller app library", "UI overwhelming", "Slow support"], sources: { G2: 4.7, "Product Hunt": 4.6, Reddit: "Positive", Trustpilot: 4.1 }, pricing: "Free / from $9/mo", bestFor: "Advanced automation on a budget" },
  { id: "n8n", name: "n8n", category: "Automation", score: 8.3, logo: "N8", color: "#EA4B71", url: "https://n8n.io", tagline: "Open-source workflow automation you can self-host", pros: ["Free self-hosted", "Very powerful", "Open source", "1000+ integrations"], cons: ["Technical setup needed", "Requires server knowledge", "Less polished UI", "Community support only free"], sources: { G2: 4.5, "Product Hunt": 4.7, Reddit: "Very Positive", Trustpilot: 4.0 }, pricing: "Free self-hosted / $20/mo cloud", bestFor: "Technical solopreneurs who want full control" },

  // EMAIL MARKETING
  { id: "convertkit", name: "Kit (ConvertKit)", category: "Email Marketing", score: 8.6, logo: "K", color: "#FB6970", url: "https://kit.com", tagline: "Email marketing built for creators", pros: ["Creator-focused", "Excellent automation", "Clean UI", "Free to 1000 subs"], cons: ["More expensive", "Basic landing pages", "Limited templates", "Weak reporting"], sources: { G2: 4.4, "Product Hunt": 4.5, Reddit: "Positive", Trustpilot: 4.3 }, pricing: "Free to 1k / from $25/mo", bestFor: "Building an audience and selling digital products" },
  { id: "mailerlite", name: "MailerLite", category: "Email Marketing", score: 8.7, logo: "ML", color: "#09B58E", url: "https://mailerlite.com", tagline: "Simple email marketing with powerful features", pros: ["Very affordable", "Great free plan", "Good automation", "Landing pages included"], cons: ["Less known", "Approval process", "Limited CRM", "Design editor limited"], sources: { G2: 4.7, "Product Hunt": 4.5, Reddit: "Positive", Trustpilot: 4.5 }, pricing: "Free to 1k / from $9/mo", bestFor: "Budget-conscious solopreneurs needing email + pages" },
  { id: "beehiiv", name: "Beehiiv", category: "Email Marketing", score: 8.8, logo: "BH", color: "#FF6B35", url: "https://beehiiv.com", tagline: "Newsletter platform built for growth", pros: ["Built-in monetization", "Great analytics", "Referral program", "Clean editor"], cons: ["Newer platform", "Less integrations", "No free automation", "Limited design customization"], sources: { G2: 4.6, "Product Hunt": 4.8, Reddit: "Very Positive", Trustpilot: 4.4 }, pricing: "Free to 2.5k / from $39/mo", bestFor: "Solopreneurs monetizing a newsletter" },

  // PAYMENTS
  { id: "stripe", name: "Stripe", category: "Payments", score: 9.1, logo: "S", color: "#635BFF", url: "https://stripe.com", tagline: "Payments infrastructure that scales with you", pros: ["Developer-friendly", "Excellent docs", "Global payments", "Powerful dashboard"], cons: ["2.9% + 30c fee", "Complex for non-devs", "Slow payouts", "Account holds"], sources: { G2: 4.5, "Product Hunt": 4.7, Reddit: "Very Positive", Trustpilot: 3.8 }, pricing: "2.9% + 30c per transaction", bestFor: "Solopreneurs selling products or services online" },
  { id: "gumroad", name: "Gumroad", category: "Payments", score: 8.4, logo: "G", color: "#FF90E8", url: "https://gumroad.com", tagline: "Sell digital products directly to your audience", pros: ["Zero monthly fee", "Very easy setup", "Built-in audience", "Pay what you want"], cons: ["10% transaction fee", "Limited customization", "Basic analytics", "No subscription tiers on free"], sources: { G2: 4.1, "Product Hunt": 4.5, Reddit: "Positive", Trustpilot: 3.7 }, pricing: "Free + 10% per sale", bestFor: "Beginners selling digital products" },
  { id: "lemon-squeezy", name: "Lemon Squeezy", category: "Payments", score: 8.6, logo: "LS", color: "#FFC233", url: "https://lemonsqueezy.com", tagline: "Sell software and digital products globally", pros: ["Handles tax compliance", "Great for SaaS", "Affiliate system", "Clean checkout"], cons: ["5% + 50c fee", "Newer platform", "Limited integrations", "Fewer payment methods"], sources: { G2: 4.5, "Product Hunt": 4.8, Reddit: "Positive", Trustpilot: 4.3 }, pricing: "5% + 50c per transaction", bestFor: "Solopreneurs selling SaaS or software" },

  // AI TOOLS
  { id: "chatgpt", name: "ChatGPT", category: "AI Tools", score: 9.3, logo: "AI", color: "#10a37f", url: "https://chat.openai.com", tagline: "The world's most used AI assistant", pros: ["Extremely capable", "Great for content", "Huge community", "API available"], cons: ["Expensive Pro plan", "Can hallucinate", "No real-time data free", "Context limits"], sources: { G2: 4.7, "Product Hunt": 4.9, Reddit: "Very Positive", Trustpilot: 4.1 }, pricing: "Free / $20/mo Pro", bestFor: "Content creation, research, and ideation" },
  { id: "claude", name: "Claude", category: "AI Tools", score: 9.1, logo: "CL", color: "#D4785A", url: "https://claude.ai", tagline: "AI assistant that's safe, helpful, and honest", pros: ["Long context window", "Great for writing", "Very accurate", "Strong reasoning"], cons: ["Fewer integrations", "No image generation", "Slower API", "Less known"], sources: { G2: 4.6, "Product Hunt": 4.8, Reddit: "Very Positive", Trustpilot: 4.0 }, pricing: "Free / $20/mo Pro", bestFor: "Long-form writing and complex analysis" },
  { id: "jasper", name: "Jasper", category: "AI Tools", score: 8.2, logo: "J", color: "#6B2EFF", url: "https://jasper.ai", tagline: "AI writing tool built for marketing teams", pros: ["Marketing templates", "Brand voice feature", "Team collaboration", "SEO mode"], cons: ["Very expensive", "Less capable than ChatGPT", "Locked to templates", "Overkill for solos"], sources: { G2: 4.4, "Product Hunt": 4.3, Reddit: "Mixed", Trustpilot: 3.8 }, pricing: "From $39/mo", bestFor: "Solopreneurs doing heavy content marketing" },

  // WEBSITE BUILDERS
  { id: "webflow", name: "Webflow", category: "Website", score: 8.9, logo: "WF", color: "#4353FF", url: "https://webflow.com", tagline: "Build professional websites without code", pros: ["Beautiful designs", "CMS built in", "No code needed", "Great animations"], cons: ["Expensive at scale", "Steep learning curve", "Hosting costs extra", "Complex for beginners"], sources: { G2: 4.4, "Product Hunt": 4.7, Reddit: "Positive", Trustpilot: 4.1 }, pricing: "Free / from $14/mo", bestFor: "Solopreneurs building professional marketing sites" },
  { id: "framer", name: "Framer", category: "Website", score: 8.7, logo: "FR", color: "#0055FF", url: "https://framer.com", tagline: "Design and publish beautiful sites fast", pros: ["Beautiful by default", "AI page generation", "Fast to publish", "Good free plan"], cons: ["Limited CMS", "Fewer integrations", "No e-commerce", "Less flexibility"], sources: { G2: 4.5, "Product Hunt": 4.8, Reddit: "Very Positive", Trustpilot: 4.2 }, pricing: "Free / from $10/mo", bestFor: "Solopreneurs wanting stunning sites fast" },
  { id: "wordpress", name: "WordPress", category: "Website", score: 8.5, logo: "WP", color: "#21759B", url: "https://wordpress.org", tagline: "The world's most popular CMS", pros: ["Unlimited plugins", "Full control", "Large community", "SEO-friendly"], cons: ["Requires hosting", "Maintenance overhead", "Security issues", "Plugin conflicts"], sources: { G2: 4.4, "Product Hunt": 4.2, Reddit: "Mostly Positive", Trustpilot: 3.9 }, pricing: "Free + hosting $3-20/mo", bestFor: "Solopreneurs wanting full control and SEO power" },

  // SOCIAL MEDIA
  { id: "buffer", name: "Buffer", category: "Social Media", score: 8.4, logo: "Bu", color: "#168EEA", url: "https://buffer.com", tagline: "Schedule and analyze your social media content", pros: ["Very simple UI", "Good free plan", "Analytics included", "Multiple platforms"], cons: ["Limited engagement tools", "No social listening", "Basic analytics on free", "Fewer platforms than rivals"], sources: { G2: 4.3, "Product Hunt": 4.4, Reddit: "Positive", Trustpilot: 4.1 }, pricing: "Free / from $5/mo", bestFor: "Solopreneurs scheduling social content" },
  { id: "hypefury", name: "Hypefury", category: "Social Media", score: 8.5, logo: "HF", color: "#7C3AED", url: "https://hypefury.com", tagline: "Grow your Twitter/X audience on autopilot", pros: ["Twitter/X focused", "Auto-retweet", "Thread scheduling", "Inspiration feed"], cons: ["Twitter/X only mainly", "Limited free plan", "Niche platform", "Pricey for what it does"], sources: { G2: 4.5, "Product Hunt": 4.6, Reddit: "Positive", Trustpilot: 4.0 }, pricing: "From $19/mo", bestFor: "Solopreneurs building a Twitter/X audience" },

  // ANALYTICS
  { id: "google-analytics", name: "Google Analytics", category: "Analytics", score: 8.6, logo: "GA", color: "#E37400", url: "https://analytics.google.com", tagline: "Free website analytics from Google", pros: ["Free forever", "Industry standard", "Deep data", "Integrates with Google"], cons: ["Complex setup", "Privacy concerns", "GA4 learning curve", "Data sampling on free"], sources: { G2: 4.5, "Product Hunt": 4.3, Reddit: "Mostly Positive", Trustpilot: 3.8 }, pricing: "Free", bestFor: "All solopreneurs tracking website performance" },
  { id: "plausible", name: "Plausible", category: "Analytics", score: 8.8, logo: "PL", color: "#5850EC", url: "https://plausible.io", tagline: "Simple, privacy-friendly website analytics", pros: ["Privacy-first", "GDPR compliant", "Simple dashboard", "No cookie banner needed"], cons: ["Paid only", "Less data than GA", "No funnels on basic", "Newer platform"], sources: { G2: 4.7, "Product Hunt": 4.8, Reddit: "Very Positive", Trustpilot: 4.5 }, pricing: "From $9/mo", bestFor: "Solopreneurs who want simple privacy-friendly analytics" },
];

const CATEGORIES = ["All", ...Array.from(new Set(ALL_TOOLS.map(t => t.category)))];

const REVIEWS = [
  { tool: "Notion", author: "u/solofounder22", source: "Reddit", text: "Notion replaced 4 apps for me. My entire business runs out of one workspace — client portals, content calendar, finances.", sentiment: "positive", date: "2 days ago" },
  { tool: "Beehiiv", author: "u/newslettergrind", source: "Reddit", text: "Switched from ConvertKit to Beehiiv and my open rates went up 12%. The built-in referral program is incredible for organic growth.", sentiment: "positive", date: "3 days ago" },
  { tool: "Canva", author: "Trustpilot Verified", source: "Trustpilot", text: "Canva saved me thousands in design costs. I create all my social posts, pitch decks, and lead magnets myself now.", sentiment: "positive", date: "1 week ago" },
  { tool: "Zapier", author: "G2 Review", source: "G2", text: "The ROI on Zapier is incredible. I automated my entire client onboarding — what took 2 hours now runs itself while I sleep.", sentiment: "positive", date: "3 days ago" },
  { tool: "Zapier", author: "u/buildinpublic", source: "Reddit", text: "Zapier is great until you hit the free plan limits. Pricing jumps are steep. Make is better value if you need more than 5 zaps.", sentiment: "mixed", date: "5 days ago" },
  { tool: "Stripe", author: "Product Hunt", source: "Product Hunt", text: "Stripe is the gold standard for online payments. Setup took 30 minutes. The dashboard is clean, payouts are reliable.", sentiment: "positive", date: "1 week ago" },
  { tool: "ChatGPT", author: "u/solobuildersclub", source: "Reddit", text: "ChatGPT has literally replaced my content writer, research assistant, and email copywriter. The ROI is insane for solopreneurs.", sentiment: "positive", date: "2 days ago" },
  { tool: "n8n", author: "Product Hunt", source: "Product Hunt", text: "n8n is a hidden gem. Self-hosted, completely free, and more powerful than Zapier. If you can handle a bit of setup it's unbeatable.", sentiment: "positive", date: "4 days ago" },
  { tool: "Plausible", author: "Trustpilot Verified", source: "Trustpilot", text: "Switched from Google Analytics to Plausible and I actually understand my data now. Simple, clean, and no privacy headaches.", sentiment: "positive", date: "6 days ago" },
  { tool: "Lemon Squeezy", author: "u/indiehacker_mo", source: "Reddit", text: "Lemon Squeezy handles all my EU VAT automatically. As a solo founder this would have been a nightmare to deal with manually.", sentiment: "positive", date: "1 week ago" },
  { tool: "Make", author: "G2 Review", source: "G2", text: "Make does everything Zapier does at a fraction of the price. The visual editor is actually fun to use once you learn it.", sentiment: "positive", date: "5 days ago" },
  { tool: "Jasper", author: "u/contentcreatorlife", source: "Reddit", text: "Jasper is overpriced now that ChatGPT exists. Unless you need the specific marketing templates, just use ChatGPT Plus.", sentiment: "mixed", date: "1 week ago" },
];

const SENTIMENT_BG = { positive: "#f0fdf4", mixed: "#fffbeb", negative: "#fef2f2" };
const SENTIMENT_COLOR = { positive: "#166534", mixed: "#92400e", negative: "#991b1b" };
const SENTIMENT_BORDER = { positive: "#bbf7d0", mixed: "#fde68a", negative: "#fecaca" };

function ScoreBar({ score }) {
  const pct = (score / 10) * 100;
  const color = score >= 9 ? "#16a34a" : score >= 8.5 ? BLUE : AMBER;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, minWidth: 30, color: color }}>{score}</span>
    </div>
  );
}

function SourceBadge({ label }) {
  return (
    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: BLUE_LIGHT, color: BLUE_DARK, border: `1px solid ${BLUE_MID}`, fontWeight: 500, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function ToolCard({ tool, rank }) {
  const [expanded, setExpanded] = useState(false);
  const medalColor = rank === 1 ? "#f59e0b" : rank === 2 ? "#94a3b8" : rank === 3 ? "#b45309" : "#e2e8f0";
  const medalText = rank < 4 ? "#fff" : "#64748b";

  return (
    <div style={{ background: "#fff", border: `1px solid ${BLUE_MID}`, borderRadius: 14, overflow: "hidden", boxShadow: expanded ? `0 4px 20px ${BLUE_MID}` : "none", transition: "box-shadow 0.2s" }}>
      <div style={{ padding: "1rem", cursor: "pointer" }} onClick={() => setExpanded(e => !e)}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: medalColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: medalText, flexShrink: 0, marginTop: 2 }}>{rank}</div>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: tool.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{tool.logo}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontWeight: 700, fontSize: 14, color: BLUE_DARK, textDecoration: "none" }}>{tool.name} ↗</a>
              <span style={{ fontSize: 10, padding: "1px 8px", borderRadius: 20, background: BLUE_LIGHT, color: BLUE_DARK, border: `1px solid ${BLUE_MID}` }}>{tool.category}</span>
            </div>
            <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 6px", lineHeight: 1.4 }}>{tool.tagline}</p>
            <ScoreBar score={tool.score} />
          </div>
          <div style={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: `1px solid ${BLUE_MID}`, padding: "1rem", background: BLUE_LIGHT }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: BLUE_DARK, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Pros</div>
              {tool.pros.map((p, i) => <div key={i} style={{ fontSize: 12, color: "#166534", marginBottom: 3, display: "flex", gap: 5 }}><span style={{ color: "#16a34a", fontWeight: 700 }}>+</span>{p}</div>)}
            </div>
            <div>
              <div style={{ fontSize: 10, color: BLUE_DARK, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Cons</div>
              {tool.cons.map((c, i) => <div key={i} style={{ fontSize: 12, color: "#991b1b", marginBottom: 3, display: "flex", gap: 5 }}><span style={{ fontWeight: 700 }}>-</span>{c}</div>)}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: BLUE_DARK, marginBottom: 10, border: `1px solid ${BLUE_MID}` }}>
            <strong>Best for:</strong> {tool.bestFor} &nbsp;|&nbsp; <strong>Pricing:</strong> {tool.pricing}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
            {Object.entries(tool.sources).map(([k, v]) => <SourceBadge key={k} label={`${k}: ${v}`} />)}
          </div>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "7px 18px", background: BLUE, color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
            Visit {tool.name} ↗
          </a>
        </div>
      )}
    </div>
  );
}

function RankingsTab() {
  const [category, setCategory] = useState("All");
  const filtered = (category === "All" ? ALL_TOOLS : ALL_TOOLS.filter(t => t.category === category)).sort((a, b) => b.score - a.score);

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", background: category === c ? BLUE : BLUE_LIGHT, color: category === c ? "#fff" : BLUE_DARK, border: `1px solid ${category === c ? BLUE : BLUE_MID}`, fontWeight: category === c ? 700 : 400, transition: "all 0.15s" }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} rank={i + 1} />)}
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${SENTIMENT_BORDER[review.sentiment]}`, borderRadius: 14, padding: "1rem", borderLeft: `4px solid ${SENTIMENT_COLOR[review.sentiment]}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: 13, color: BLUE_DARK }}>{review.tool}</span>
          <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 6 }}>via {review.source}</span>
        </div>
        <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, background: SENTIMENT_BG[review.sentiment], color: SENTIMENT_COLOR[review.sentiment], fontWeight: 600, border: `1px solid ${SENTIMENT_BORDER[review.sentiment]}`, flexShrink: 0 }}>
          {review.sentiment}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: "0 0 8px", fontStyle: "italic" }}>"{review.text}"</p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8" }}>
        <span>{review.author}</span><span>{review.date}</span>
      </div>
    </div>
  );
}

function ReviewsTab() {
  const [filterTool, setFilterTool] = useState("All");
  const toolNames = ["All", ...Array.from(new Set(REVIEWS.map(r => r.tool)))];
  const filtered = filterTool === "All" ? REVIEWS : REVIEWS.filter(r => r.tool === filterTool);

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {toolNames.map(n => (
          <button key={n} onClick={() => setFilterTool(n)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", background: filterTool === n ? BLUE : BLUE_LIGHT, color: filterTool === n ? "#fff" : BLUE_DARK, border: `1px solid ${filterTool === n ? BLUE : BLUE_MID}`, fontWeight: filterTool === n ? 700 : 400, transition: "all 0.15s" }}>
            {n}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {filtered.map((r, i) => <ReviewCard key={i} review={r} />)}
      </div>
    </div>
  );
}

function CompareTab() {
  const [sel, setSel] = useState([]);
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? ALL_TOOLS : ALL_TOOLS.filter(t => t.category === category);

  const toggle = t => setSel(prev =>
    prev.find(x => x.id === t.id) ? prev.filter(x => x.id !== t.id) : [...prev, t]
  );
  const clear = () => setSel([]);

  const rows = [
    { label: "Score", get: t => `${t.score} / 10` },
    { label: "Category", get: t => t.category },
    { label: "Pricing", get: t => t.pricing },
    { label: "G2", get: t => `${t.sources.G2} / 5` },
    { label: "Product Hunt", get: t => `${t.sources["Product Hunt"]} / 5` },
    { label: "Reddit", get: t => t.sources.Reddit },
    { label: "Best for", get: t => t.bestFor },
    { label: "Top pro", get: t => `+ ${t.pros[0]}` },
    { label: "Top con", get: t => `- ${t.cons[0]}` },
    { label: "Visit", get: t => t.url },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Select any number of tools to compare.</p>
        {sel.length > 0 && <button onClick={clear} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", cursor: "pointer", fontWeight: 600 }}>Clear all</button>}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", background: category === c ? BLUE : BLUE_LIGHT, color: category === c ? "#fff" : BLUE_DARK, border: `1px solid ${category === c ? BLUE : BLUE_MID}`, fontWeight: category === c ? 700 : 400 }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {filtered.map(t => {
          const active = !!sel.find(s => s.id === t.id);
          return (
            <button key={t.id} onClick={() => toggle(t)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", background: active ? t.color : BLUE_LIGHT, color: active ? "#fff" : BLUE_DARK, border: `1px solid ${active ? t.color : BLUE_MID}`, fontWeight: active ? 700 : 400, display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s" }}>
              {active && <span>✓</span>}{t.name}
            </button>
          );
        })}
      </div>

      {sel.length >= 2 ? (
        <div style={{ overflowX: "auto", borderRadius: 12, border: `1px solid ${BLUE_MID}` }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: sel.length * 140 + 120 }}>
            <thead>
              <tr style={{ background: BLUE }}>
                <th style={{ textAlign: "left", padding: "10px 14px", color: "#fff", fontWeight: 700, position: "sticky", left: 0, background: BLUE, zIndex: 1 }}>Feature</th>
                {sel.map(t => (
                  <th key={t.id} style={{ textAlign: "left", padding: "10px 14px", color: "#fff" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>{t.logo}</div>
                      {t.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? BLUE_LIGHT : "#fff" }}>
                  <td style={{ padding: "9px 14px", color: BLUE_DARK, fontWeight: 700, borderBottom: `1px solid ${BLUE_MID}`, position: "sticky", left: 0, background: i % 2 === 0 ? BLUE_LIGHT : "#fff", zIndex: 1 }}>{row.label}</td>
                  {sel.map(t => (
                    <td key={t.id} style={{ padding: "9px 14px", color: "#374151", borderBottom: `1px solid ${BLUE_MID}` }}>
                      {row.label === "Visit"
                        ? <a href={t.url} target="_blank" rel="noopener noreferrer" style={{ color: BLUE, fontWeight: 600, textDecoration: "none" }}>Visit ↗</a>
                        : row.get(t)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2.5rem", color: "#94a3b8", fontSize: 13, background: BLUE_LIGHT, borderRadius: 12, border: `1px dashed ${BLUE_MID}` }}>
          {sel.length === 0 ? "Select 2 or more tools above to compare." : "Select one more tool to start comparing."}
        </div>
      )}
    </div>
  );
}

function AskAITab() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your solopreneur tools advisor. Ask me to rank tools for your use case, review any tool, compare multiple tools, or recommend the best options for your budget and goals." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const ctx = ALL_TOOLS.map(t =>
    `${t.name} (${t.category}, score ${t.score}/10, url: ${t.url}): Pros: ${t.pros.join(", ")}. Cons: ${t.cons.join(", ")}. G2: ${t.sources.G2}, ProductHunt: ${t.sources["Product Hunt"]}, Reddit: ${t.sources.Reddit}. Pricing: ${t.pricing}. Best for: ${t.bestFor}.`
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
          system: `You are an expert solopreneur tools advisor for 5kmvp.com. You help solopreneurs find the best tools, rank options, write reviews, and compare tools. You have data on 20+ tools across all categories. Be specific, practical, and always mention pros, cons, and pricing. When asked to rank or compare, give a clear numbered list. When asked to review, give a structured verdict. Always link to tools when relevant. Keep responses under 220 words.\n\nTool database:\n${ctx}`,
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

  const suggestions = [
    "Rank the best free tools for solopreneurs",
    "Review Notion vs ClickUp for a solo founder",
    "Best email marketing tool under $15/mo?",
    "Compare Zapier vs Make vs n8n",
    "What AI tools give the best ROI?",
    "Review Beehiiv for a newsletter creator",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: 520 }}>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "82%", padding: "10px 14px", borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px", background: m.role === "user" ? BLUE : BLUE_LIGHT, color: m.role === "user" ? "#fff" : "#1e293b", fontSize: 13, lineHeight: 1.6, border: m.role === "user" ? "none" : `1px solid ${BLUE_MID}` }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 2px", background: BLUE_LIGHT, fontSize: 13, color: BLUE_DARK, border: `1px solid ${BLUE_MID}` }}>Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => setInput(s)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, background: BLUE_LIGHT, color: BLUE_DARK, border: `1px solid ${BLUE_MID}`, cursor: "pointer", fontWeight: 500 }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask me to rank, review, or compare any tools..."
          style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${BLUE_MID}`, background: "#fff", color: "#111", fontSize: 13, outline: "none" }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{ padding: "10px 20px", borderRadius: 10, background: loading || !input.trim() ? "#e2e8f0" : BLUE, color: loading || !input.trim() ? "#94a3b8" : "#fff", border: "none", cursor: loading || !input.trim() ? "default" : "pointer", fontSize: 13, fontWeight: 700, transition: "background 0.15s", whiteSpace: "nowrap" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const TABS = [
  { id: "rankings", label: "🏆 Rankings" },
  { id: "reviews", label: "⭐ Reviews" },
  { id: "compare", label: "⚖️ Compare" },
  { id: "ask", label: "🤖 Ask AI" },
];

export default function ToolScout() {
  const [tab, setTab] = useState("rankings");

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: "100%", margin: "0 auto" }}>
      <h2 className="sr-only">Solopreneur tool rankings, reviews, comparisons and AI advisor</h2>

      <div style={{ display: "flex", gap: 2, borderBottom: `2px solid ${BLUE_MID}`, marginBottom: 24, overflowX: "auto" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ padding: "10px 18px", fontSize: 13, fontWeight: tab === t.id ? 700 : 500, background: tab === t.id ? BLUE : "transparent", color: tab === t.id ? "#fff" : BLUE_DARK, border: "none", cursor: "pointer", borderRadius: "8px 8px 0 0", transition: "all 0.15s", whiteSpace: "nowrap" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "rankings" && <RankingsTab />}
      {tab === "reviews" && <ReviewsTab />}
      {tab === "compare" && <CompareTab />}
      {tab === "ask" && <AskAITab />}
    </div>
  );
}
