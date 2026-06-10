import { ArrowLeft } from "lucide-react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { BackToTop } from "./components/ui/BackToTop";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Footer } from "./components/layout/Footer";
import { GrainOverlay } from "./components/layout/GrainOverlay";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Testimonials } from "./components/sections/Testimonials";
import { Work } from "./components/sections/Work";
import { content } from "./data/content";
import { useLenis } from "./hooks/useLenis";

function HomePage() {
  useLenis();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__orb" aria-hidden="true" />
      <div className="not-found__content">
        <span className="eyebrow">Error · 404</span>
        <strong>404</strong>
        <h1>This page wandered off the artboard.</h1>
        <p>
          The link may be old, but the rest of {content.name}&apos;s work is
          right where it should be.
        </p>
        <Link className="button button--primary" to="/">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Return home</span>
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <GrainOverlay />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
