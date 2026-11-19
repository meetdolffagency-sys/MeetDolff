import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader, { LOADER_KEY } from "@/components/Loader";
import { IntroContext, prefersReducedMotion } from "@/intro";
import Home from "@/pages/Home";

const Product = lazy(() => import("@/pages/Product"));
const Memory = lazy(() => import("@/pages/Memory"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Developers = lazy(() => import("@/pages/Developers"));
const Download = lazy(() => import("@/pages/Download"));
const Changelog = lazy(() => import("@/pages/Changelog"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const TITLES: Record<string, string> = {
  "/": "MeetDolff — Meetings end. The memory doesn't.",
  "/product": "Product — MeetDolff",
  "/memory": "Persistent meeting memory — MeetDolff",
  "/privacy": "Privacy and control — MeetDolff",
  "/developers": "Providers, API and MCP — MeetDolff",
  "/download": "Download for Chrome — MeetDolff",
  "/changelog": "Changelog — MeetDolff",
};
const DESCRIPTIONS: Record<string, string> = {
  "/": "MeetDolff turns meeting conversations into searchable, persistent knowledge you own, with grounded answers and the AI provider of your choice.",
  "/product": "Recording controls, transcription, structured summaries, decisions, action items and searchable memory — with honest status for each capability.",
  "/memory": "How MeetDolff connects meetings across time, answers with evidence and stores memory as readable Markdown and structured JSON.",
  "/privacy": "Explicit recording control, visible states, retention, deletion, export and third-party AI processing — explained plainly.",
  "/developers": "Bring your own AI provider and model. External agent access through an API/MCP interface is planned, with permissions.",
  "/download": "Install MeetDolff for Chrome: release status, requirements, installation steps, permissions and limitations.",
  "/changelog": "Release notes for MeetDolff. No public release has been published yet.",
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? "Page not found — MeetDolff";
    document.querySelector('meta[name="description"]')?.setAttribute("content", DESCRIPTIONS[pathname] ?? DESCRIPTIONS["/"]);
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  return (
    <>
      <Nav />
      <main id="main" key={pathname} className="page-in" tabIndex={-1}>
        <Suspense fallback={<div className="min-h-[70svh]" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/download" element={<Download />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function shouldPlayIntro(): boolean {
  try {
    const onHome = window.location.hash === "" || window.location.hash === "#/" || window.location.hash === "#";
    return onHome && !prefersReducedMotion() && !sessionStorage.getItem(LOADER_KEY);
  } catch {
    return false;
  }
}

export default function App() {
  const [playIntro] = useState(shouldPlayIntro);
  const [showLoader, setShowLoader] = useState(playIntro);
  const [revealed, setRevealed] = useState(!playIntro);

  const onReveal = useCallback(() => {
    setRevealed(true);
    try {
      sessionStorage.setItem(LOADER_KEY, "1");
    } catch {
      /* storage unavailable: intro simply plays again next time */
    }
  }, []);
  const onDone = useCallback(() => setShowLoader(false), []);

  return (
    <HashRouter>
      <IntroContext.Provider value={revealed}>
        <RouteEffects />
        <Shell />
        {showLoader && <Loader onReveal={onReveal} onDone={onDone} />}
      </IntroContext.Provider>
    </HashRouter>
  );
}
