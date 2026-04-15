import { useEffect, useRef, useState } from "react";
import "./App.css";

const isMinimalism = __MINIMALISM__;
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
    detail: "cfDNA fragmentation toolkit for cancer detection workflows",
    tech: "Python, R, Perl, Bioconda, HPC",
  },
  {
    label: "T.R.I.M",
    href: "/TRIM.pdf",
    detail: "automated municipal auditing workflow and product concept",
    tech: "Next.js, TypeScript, Zod, Gemini, Dexie",
  },
  {
    label: "EcoSense",
    href: "https://www.nctv17.org/news/naperville-students-win-congressional-app-challenge-with-ecosense-app/",
    detail: "environmental app, won the Congressional App Challenge",
    tech: "React Native, Expo, Supabase, Express",
  },
];

const inlineProjects = {
  Haku: {
    detail: "debate search engine indexing OpenCaseList debate cards",
    tech: "MeiliSearch, Rust, Next.js, TypeScript, SQLite, Stripe",
  },
  "Scio.ly": {
    detail:
      "science olympiad platform with practice and team analytics",
    tech: "Next.js, Postgres, Drizzle, tRPC, Pydantic, Ably",
  },
};

function App() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeInlineProject, setActiveInlineProject] = useState(null);
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
        <div className="intro-copy">
          {!isMinimalism && (
            <p className="intro-line">
              I enjoy turning complex data into usable tools.
            </p>
          )}
          <p className="lede">
            I&apos;m currently building{" "}
            <a
              href="https://www.haku.cards"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => !isMinimalism && setActiveInlineProject("Haku")}
              onMouseLeave={() => !isMinimalism && setActiveInlineProject(null)}
              onFocus={() => !isMinimalism && setActiveInlineProject("Haku")}
              onBlur={() => !isMinimalism && setActiveInlineProject(null)}
            >
              Haku
            </a>
            , made{" "}
            <a
              href="https://www.scio.ly"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() =>
                !isMinimalism && setActiveInlineProject("Scio.ly")
              }
              onMouseLeave={() => !isMinimalism && setActiveInlineProject(null)}
              onFocus={() => !isMinimalism && setActiveInlineProject("Scio.ly")}
              onBlur={() => !isMinimalism && setActiveInlineProject(null)}
            >
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
              onMouseLeave={() => {
                setActiveProject(null);
                scheduleClose();
              }}
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
                    onMouseEnter={() => !isMinimalism && setActiveProject(project)}
                    onFocus={() => !isMinimalism && setActiveProject(project)}
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
                {!isMinimalism && activeProject && (
                  <div
                    key={activeProject.label}
                    className="more-detail"
                    aria-live="polite"
                  >
                    <p>{activeProject.detail}</p>
                    <p className="more-tech">{activeProject.tech}</p>
                  </div>
                )}
              </span>
            </span>
            .
          </p>
          {!isMinimalism && activeInlineProject && (
            <div
              key={activeInlineProject}
              className="inline-project-detail"
              aria-live="polite"
            >
              <p>{inlineProjects[activeInlineProject].detail}</p>
              <p className="more-tech">
                {inlineProjects[activeInlineProject].tech}
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <a
          href="https://github.com/Kudostoy0u"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href="mailto:hello@kundanbaliga.com">hello@kundanbaliga.com</a>
      </footer>
    </main>
  );
}

export default App;
