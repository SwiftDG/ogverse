import React, { Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const StoryWorld = lazy(() => import('./GlobeScene.jsx'))
const NAIJA = 'https://www.naijaopportunities.live/'
const PATHSYNC = 'https://pathsync-ai.vercel.app/'

function useReducedMotion() {
  const [value, setValue] = useState(false)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setValue(media.matches)
    sync(); media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
  return value
}

function App() {
  const reducedMotion = useReducedMotion()
  const [webgl, setWebgl] = useState(true)
  const [load3D, setLoad3D] = useState(false)
  const [menu, setMenu] = useState(false)
  const [scene, setScene] = useState(0)
  useEffect(() => { try { const c = document.createElement('canvas'); setWebgl(Boolean(c.getContext('webgl2') || c.getContext('webgl'))) } catch { setWebgl(false) } }, [])
  useEffect(() => {
    const start = () => setLoad3D(true)
    const id = 'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 900 }) : setTimeout(start, 350)
    return () => 'cancelIdleCallback' in window ? cancelIdleCallback(id) : clearTimeout(id)
  }, [])
  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-scene]')]
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setScene(Number(entry.target.dataset.scene)) }), { threshold: .55 })
    sections.forEach(section => observer.observe(section)); return () => observer.disconnect()
  }, [])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const close = event => { if (event.key === 'Escape') setMenu(false) }
    addEventListener('keydown', close)
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', close) }
  }, [menu])

  return <div className={`experience scene-${scene}`}>
    <a className="skip-link" href="#gateway">Skip cinematic introduction</a>
    <header className="topbar">
      <a href="#opening" className="brand-plate" aria-label="OGverse home"><img src="/ogverse-logo.png" alt="OGverse" /></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav">{menu ? 'Close' : 'Explore'}</button>
      <nav id="nav" className={menu ? 'open' : ''} aria-label="Main navigation"><a href="#gateway" onClick={() => setMenu(false)}>NaijaOpportunities</a><a href="#path" onClick={() => setMenu(false)}>PathSync AI</a><a href="#journey" onClick={() => setMenu(false)}>The journey</a></nav>
    </header>

    <div className="world" aria-hidden="true">{webgl && load3D ? <Suspense fallback={<div className="cinematic-fallback"><div className="fallback-earth" /></div>}><StoryWorld reducedMotion={reducedMotion} /></Suspense> : <div className="cinematic-fallback"><div className="fallback-earth" /></div>}</div>
    <div className="grain" aria-hidden="true" /><div className="progress" aria-hidden="true"><i style={{height:`${((scene + 1) / 6) * 100}%`}} /></div>

    <main className="story">
      <section id="opening" data-scene="0" className="chapter opening"><div className="copy hero-copy"><p className="overline">A world of openings</p><h1>Your next<br />opportunity<br /><strong>is out there.</strong></h1><p className="lede">OGverse brings discovery and application guidance into one connected journey.</p><div className="actions"><a className="cta filled" href="#gateway">Enter the journey <span>↓</span></a><a className="inline-link" href={PATHSYNC} target="_blank" rel="noreferrer">Find my match ↗</a></div></div><div className="scene-note"><span className="desktop-note">Drag the planet</span><span className="mobile-note">Swipe the planet sideways</span><span>Scroll to travel</span></div></section>
      <section data-scene="1" className="chapter africa"><div className="copy right-copy"><p className="overline">Closer to home</p><h2>The world is full<br />of openings.<br /><strong>Finding yours is harder.</strong></h2><p>Jobs, scholarships and programmes are scattered across different websites, timelines and application systems. Knowing what matters is work of its own.</p></div><div className="coordinates"><span>06.5244° N</span><b>LAGOS / NIGERIA</b><span>03.3792° E</span></div></section>
      <section id="gateway" data-scene="2" className="chapter gateway"><div className="copy left-copy"><p className="overline">The discovery layer</p><h2>See what<br />is open.</h2><p>NaijaOpportunities gathers jobs and scholarships for Nigerian students and job seekers. Its existing directory remains the place to search and open individual listings.</p><a className="cta outline" href={NAIJA} target="_blank" rel="noreferrer">Explore NaijaOpportunities <span>↗</span></a></div><button className="beacon-label" type="button" onClick={() => window.dispatchEvent(new Event('ogverse:pulse'))} aria-label="Pulse the opportunity beacon over Nigeria"><i /><span>Opportunity signal</span><b>Touch the beacon</b></button></section>
      <section data-scene="3" className="chapter bridge"><div className="bridge-copy"><p>Finding an opening is only the first movement.</p><h2>What does it require?<br />Does it fit where you are?<br />What should you do next?</h2></div><div className="category-track" aria-label="Opportunity types"><span>Jobs</span><span>Scholarships</span><span>Internships</span><span>Fellowships</span><span>Competitions</span></div></section>
      <section id="path" data-scene="4" className="chapter path"><div className="copy right-copy"><p className="overline">The guidance layer</p><h2>Understand<br />your next move.</h2><p>PathSync is designed to help you compare an opportunity with your profile and understand the next steps. Final eligibility should always be checked against the official opportunity source.</p><a className="cta filled warm" href={PATHSYNC} target="_blank" rel="noreferrer">Open PathSync AI <span>↗</span></a></div></section>
      <section id="journey" data-scene="5" className="chapter finale"><div className="final-copy"><p className="overline">One connected route</p><h2>Find it.<br />Understand it.<br /><strong>Go for it.</strong></h2><ol><li><span>Discover through NaijaOpportunities</span></li><li><span>Understand the requirements with PathSync</span></li><li><span>Apply through the official route</span></li></ol><div className="actions"><a className="cta filled warm" href={NAIJA} target="_blank" rel="noreferrer">Start exploring <span>↗</span></a><a className="inline-link" href={PATHSYNC} target="_blank" rel="noreferrer">Find your path ↗</a></div></div></section>
    </main>
    <footer>
      <div className="footer-brand"><a className="footer-logo" href="#opening" aria-label="OGverse home"><img src="/ogverse-logo.png" alt="OGverse" /></a><p>A connected gateway for discovering opportunities and understanding what to do next.</p></div>
      <div className="footer-group"><h3>Explore</h3><a href="#gateway">Discovery</a><a href="#path">Guidance</a><a href="#journey">How it works</a></div>
      <div className="footer-group"><h3>Products</h3><a href={NAIJA} target="_blank" rel="noreferrer">NaijaOpportunities ↗</a><a href={PATHSYNC} target="_blank" rel="noreferrer">PathSync AI ↗</a></div>
      <div className="footer-bottom"><p>OGverse was founded by Goodness. Frontend and product development with David Gilbert.</p><p>© 2026 OGverse</p><a href="#opening">Back to the beginning ↑</a></div>
    </footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
