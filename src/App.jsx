import { useState, useRef } from "react";
import drugs from "./data/drugs";
import "./App.css";

// ── Popular drugs shown on homepage ──────────────────────────────────────
const POPULAR = [
  "Metformin","Lisinopril","Atenolol","Semaglutide",
  "Rosuvastatin","Warfarin","Amlodipine","Adempas",
  "Empagliflozin","Sertraline","Omeprazole","Gabapentin"
].map(n => drugs.find(d => d.name === n)).filter(Boolean);

function fmt(n) {
  return n >= 1000
    ? "$" + (n/1000).toFixed(1).replace(/\.0$/,"") + "k"
    : "$" + n;
}

function savePct(d) {
  return Math.round((1 - d.discountPrice / d.retailPrice) * 100);
}

function DrugCard({ drug, featured }) {
  const pct = savePct(drug);
  return (
    <div className={`drug-card${featured ? " drug-card--featured" : ""}`}>
      <div className="dc-pill">{drug.condition}</div>
      <h3 className="dc-name">{drug.name}</h3>
      <div className="dc-prices">
        <span className="dc-retail">Retail {fmt(drug.retailPrice)}</span>
        <span className="dc-arrow">→</span>
        <span className="dc-discount">{fmt(drug.discountPrice)}</span>
      </div>
      <div className="dc-save">Save {pct}%</div>
      <button className="dc-btn">Get Free Coupon</button>
    </div>
  );
}

export default function App() {
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState(null);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  const doSearch = (q) => {
    const t = (q ?? query).trim();
    setSearched(true);
    if (!t) { setResults([]); return; }
    setResults(drugs.filter(d => d.name.toLowerCase().includes(t.toLowerCase())));
  };

  const clear = () => {
    setQuery(""); setResults(null); setSearched(false);
    inputRef.current?.focus();
  };

  const quickSearch = (name) => {
    setQuery(name);
    setResults(drugs.filter(d => d.name.toLowerCase().includes(name.toLowerCase())));
    setSearched(true);
    document.getElementById("results-anchor")?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <div className="app">

      {/* ── Topbar ──────────────────────────────────────────────── */}
      <div className="topbar">
        <span>💊 Free prescription coupons — save up to 80% at any pharmacy</span>
      </div>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-mark">Df</div>
            <span>DrugFinder</span>
          </div>
          <nav className="nav">
            <a href="#how">How it works</a>
            <a href="#popular">Medications</a>
            <a href="#about">About</a>
          </nav>
          <button className="header-cta">Search Coupons</button>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-tag">Free • No insurance needed • Works at 70,000+ pharmacies</p>
          <h1 className="hero-h1">
            Stop overpaying<br />for prescriptions
          </h1>
          <p className="hero-body">
            Compare prices and find free discount coupons for over 100 medications.
            Just search, present at checkout — and save.
          </p>

          <div className="search-row">
            <div className="search-wrap">
              <svg className="si" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.4-4.4"/>
              </svg>
              <input
                ref={inputRef}
                className="search-input"
                placeholder="Search a medication — e.g. Metformin"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && doSearch()}
                aria-label="Search medication"
              />
              {query && <button className="search-clear" onClick={clear}>✕</button>}
            </div>
            <button className="search-btn" onClick={() => doSearch()}>
              Find Savings
            </button>
          </div>

          <div className="popular-searches">
            <span className="ps-label">Popular:</span>
            {["Metformin","Lisinopril","Semaglutide","Warfarin","Atenolol"].map(n => (
              <button key={n} className="ps-chip" onClick={() => quickSearch(n)}>{n}</button>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hc-label">Most searched today</div>
            <div className="hc-drug">Semaglutide</div>
            <div className="hc-condition">Type 2 Diabetes / Obesity</div>
            <div className="hc-price-row">
              <div>
                <div className="hc-price-label">Retail price</div>
                <div className="hc-retail">$950</div>
              </div>
              <div className="hc-arrow-big">→</div>
              <div>
                <div className="hc-price-label">With DrugFinder</div>
                <div className="hc-discount">$220</div>
              </div>
            </div>
            <div className="hc-save">Save $730 — that's 77% off</div>
            <button className="hc-btn" onClick={() => quickSearch("Semaglutide")}>
              Get This Coupon Free
            </button>
            <p className="hc-fine">No sign-up. No insurance required.</p>
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────── */}
      <div id="results-anchor" />
      {searched && (
        <section className="results-section">
          <div className="results-inner">
            {!query.trim() ? (
              <div className="empty-state">
                <span className="es-icon">⚠</span>
                <p>Please enter a medication name to search.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="empty-state empty-state--red">
                <span className="es-icon es-x">✕</span>
                <div>
                  <strong>No results for "{query}"</strong>
                  <p>Try a different spelling or search for a partial name.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="results-meta">
                  <span>{results.length} medication{results.length>1?"s":""} found for <strong>"{query}"</strong></span>
                  <button className="clear-results" onClick={clear}>Clear</button>
                </div>
                <div className="results-grid">
                  {results.map(d => <DrugCard key={d.name} drug={d} />)}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ── Trust bar ───────────────────────────────────────────── */}
      <section className="trust-bar">
        <div className="trust-inner">
          <div className="trust-stat"><span className="ts-num">$1.8B+</span><span className="ts-label">Saved by patients</span></div>
          <div className="trust-div"/>
          <div className="trust-stat"><span className="ts-num">70,000+</span><span className="ts-label">Pharmacies accept coupons</span></div>
          <div className="trust-div"/>
          <div className="trust-stat"><span className="ts-num">100</span><span className="ts-label">Medications indexed</span></div>
          <div className="trust-div"/>
          <div className="trust-stat"><span className="ts-num">Free</span><span className="ts-label">Always, no catch</span></div>
        </div>
      </section>

      {/* ── Popular medications ──────────────────────────────────── */}
      <section className="popular-section" id="popular">
        <div className="section-inner">
          <h2 className="section-h2">Popular medications</h2>
          <p className="section-sub">Tap any card to check savings at a pharmacy near you</p>
          <div className="popular-scroll">
            {POPULAR.map(d => (
              <div key={d.name} className="pop-card" onClick={() => quickSearch(d.name)}>
                <div className="poc-icon">{d.name.charAt(0)}</div>
                <div className="poc-name">{d.name}</div>
                <div className="poc-cond">{d.condition}</div>
                <div className="poc-prices">
                  <span className="poc-retail">{fmt(d.retailPrice)}</span>
                  <span className="poc-discount">{fmt(d.discountPrice)}</span>
                </div>
                <div className="poc-save">Save {savePct(d)}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="how-section" id="how">
        <div className="section-inner">
          <h2 className="section-h2">How DrugFinder works</h2>
          <p className="section-sub">Three steps. No forms. No fees.</p>
          <div className="how-steps">
            <div className="how-step">
              <div className="hs-num">1</div>
              <h3 className="hs-title">Search your medication</h3>
              <p className="hs-desc">Type your medication name in the search bar. We check our database of 100+ drugs instantly.</p>
            </div>
            <div className="how-connector"/>
            <div className="how-step">
              <div className="hs-num">2</div>
              <h3 className="hs-title">Get a free coupon</h3>
              <p className="hs-desc">We show you the best available price. Grab a free coupon — no insurance or account needed.</p>
            </div>
            <div className="how-connector"/>
            <div className="how-step">
              <div className="hs-num">3</div>
              <h3 className="hs-title">Save at the pharmacy</h3>
              <p className="hs-desc">Show the coupon to your pharmacist at checkout. Works at over 70,000 pharmacies nationwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── All drugs browse ─────────────────────────────────────── */}
      <section className="browse-section" id="about">
        <div className="section-inner">
          <h2 className="section-h2">Browse all medications</h2>
          <p className="section-sub">{drugs.length} medications in our database — click any to check savings</p>
          <div className="browse-grid">
            {drugs.map(d => (
              <button key={d.name} className="browse-pill" onClick={() => quickSearch(d.name)}>
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo"><div className="logo-mark">Df</div><span>DrugFinder</span></div>
            <p>Helping patients find affordable medications since 2025.</p>
          </div>
          <div className="footer-links">
            <strong>Product</strong>
            <a href="#popular">Medications</a>
            <a href="#how">How it works</a>
          </div>
          <div className="footer-links">
            <strong>Legal</strong>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>DrugFinder is a standalone testing application. Prices shown are estimates for reference only. Not for clinical use. Always consult a licensed healthcare provider.</p>
        </div>
      </footer>
    </div>
  );
}
