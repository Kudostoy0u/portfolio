import { useEffect, useRef, useState } from "react";
import "./App.css";

const headingText = "Hi, I'm Kundan.";
const headingChunks = [
  { text: "Hi", delay: 120 },
  { text: ",", delay: 35 },
  { text: " I", delay: 95 },
  { text: "'m", delay: 55 },
  { text: " Kun", delay: 95 },
  { text: "dan", delay: 55 },
  { text: ".", delay: 40 },
];

const moreProjects = [
  {
    label: "FinaleToolkit",
    href: "https://academic.oup.com/bioinformaticsadvances/article/5/1/vbaf236/8266335?login=false",
  },
  { label: "T.R.I.M", href: "/TRIM.pdf" },
  {
    label: "EcoSense",
    href: "https://www.nctv17.org/news/naperville-students-win-congressional-app-challenge-with-ecosense-app/",
  },
];

function App() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [typedHeading, setTypedHeading] = useState("");
  const moreRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsMoreOpen(false);
      closeTimeoutRef.current = null;
    }, 180);
  };

  useEffect(() => {
    const timeoutIds = [];
    let assembled = "";
    let elapsed = 0;

    headingChunks.forEach((chunk) => {
      elapsed += chunk.delay;
      const timeoutId = window.setTimeout(() => {
        assembled += chunk.text;
        setTypedHeading(assembled);
      }, elapsed);
      timeoutIds.push(timeoutId);
    });

    return () =>
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

  useEffect(() => {
    const handleFocusIn = (event) => {
      if (moreRef.current?.contains(event.target)) {
        cancelClose();
        setIsMoreOpen(true);
      }
    };

    const handleFocusOut = (event) => {
      if (!moreRef.current?.contains(event.relatedTarget)) {
        scheduleClose();
      }
    };

    const node = moreRef.current;
    node?.addEventListener("focusin", handleFocusIn);
    node?.addEventListener("focusout", handleFocusOut);

    return () => {
      cancelClose();
      node?.removeEventListener("focusin", handleFocusIn);
      node?.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">About me</p>
        <h1 className="typewriter" aria-label={headingText}>
          {typedHeading}
        </h1>
        <p className="lede">
          I&apos;m currently building{" "}
          <a href="https://www.haku.cards" target="_blank" rel="noreferrer">
            Haku
          </a>
          , made{" "}
          <a href="https://www.scio.ly" target="_blank" rel="noreferrer">
            Scio.ly
          </a>
          , and{" "}
          <span
            ref={moreRef}
            className="more-projects"
            onMouseEnter={() => {
              cancelClose();
              setIsMoreOpen(true);
            }}
            onMouseLeave={scheduleClose}
          >
            <span
              role="button"
              tabIndex={0}
              className={`more-trigger${isMoreOpen ? " is-open" : ""}`}
              aria-expanded={isMoreOpen}
              aria-controls="more-projects-list"
              onFocus={() => {
                cancelClose();
                setIsMoreOpen(true);
              }}
            >
              more
            </span>
            <span
              className={`more-list${isMoreOpen ? " is-open" : ""}`}
              id="more-projects-list"
              aria-hidden={!isMoreOpen}
            >
              {moreProjects.map((project) => (
                <a
                  key={project.label}
                  href={project.href}
                  target={
                    project.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    project.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  tabIndex={isMoreOpen ? 0 : -1}
                >
                  {project.label}
                </a>
              ))}
            </span>
          </span>
          .
        </p>
      </section>

      <footer className="footer">
        <a
          href="https://github.com/Kudostoy0u"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href="mailto:kbaliga2@illinois.edu">kbaliga2@illinois.edu</a>
      </footer>
    </main>
  );
}

export default App;
