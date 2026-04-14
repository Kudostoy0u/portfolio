import { useRef, useState } from 'react'
import './App.css'

const moreProjects = [
  { label: 'FinaleToolkit', href: '/finaletoolkit.pdf' },
  { label: 'T.R.I.M', href: '/TRIM.pdf' },
  {
    label: 'EcoSense',
    href: 'https://www.nctv17.org/news/naperville-students-win-congressional-app-challenge-with-ecosense-app/',
  },
]

function App() {
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const moreRef = useRef(null)

  const handleBlur = (event) => {
    if (!moreRef.current?.contains(event.relatedTarget)) {
      setIsMoreOpen(false)
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Portfolio</p>
        <h1>Hi, I&apos;m Kundan.</h1>
        <p className="lede">
          I&apos;m currently building{' '}
          <a href="https://www.haku.cards" target="_blank" rel="noreferrer">
            Haku
          </a>
          , made{' '}
          <a href="https://www.scio.ly" target="_blank" rel="noreferrer">
            Scio.ly
          </a>
          , and{' '}
          <span
            ref={moreRef}
            className="more-projects"
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
            onBlur={handleBlur}
          >
            {!isMoreOpen ? (
              <button
                type="button"
                className="more-trigger"
                onFocus={() => setIsMoreOpen(true)}
                aria-expanded={isMoreOpen}
              >
                more
              </button>
            ) : (
              <span className="more-list" onFocus={() => setIsMoreOpen(true)}>
                {moreProjects.map((project) => (
                  <a
                    key={project.label}
                    href={project.href}
                    target={project.href.startsWith('http') ? '_blank' : undefined}
                    rel={project.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {project.label}
                  </a>
                ))}
              </span>
            )}
          </span>
          .
        </p>
      </section>

      <footer className="footer">
        <a href="https://github.com/Kudostoy0u" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="mailto:kbaliga2@illinois.edu">kbaliga2@illinois.edu</a>
      </footer>
    </main>
  )
}

export default App
