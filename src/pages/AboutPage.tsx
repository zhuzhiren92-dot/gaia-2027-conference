import { PageFrame } from '../components/PageFrame'
import { BorderGlow } from '../components/BorderGlow'
import { DockSurface } from '../components/DockSurface'
import { SpotlightCard } from '../components/SpotlightCard'
import { conference } from '../content/conference'

const principles = [
  {
    index: '01',
    title: 'Exchange openly',
    text: 'Create a candid setting where early-stage ideas receive thoughtful, constructive attention.',
  },
  {
    index: '02',
    title: 'Connect across scales',
    text: 'Bring experimental, computational and theoretical perspectives into the same conversation.',
  },
  {
    index: '03',
    title: 'Build for the long term',
    text: 'Turn a yearly workshop into durable relationships across institutions and countries.',
  },
]

export function AboutPage() {
  return (
    <PageFrame
      pageName="ABOUT"
      pageStatement="An alliance shaped by curiosity, generosity and durable research ties."
    >
      <section className="manifesto page-width" data-reveal>
        <p className="section-kicker">WHAT IS GAIA?</p>
        <div className="manifesto-copy">
          <p className="manifesto-primary">
            GAIA is a rotating pan-Asian platform for exchange, collaboration
            and long-term research ties in geomechanics.
          </p>
          <div className="manifesto-secondary">
            {conference.about.whatIsGaia.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="science-highlights page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">SCIENTIFIC PROGRAM HIGHLIGHTS</p>
            <h2>Methods, materials and exchange.</h2>
          </div>
        </div>
        <DockSurface className="science-highlight-grid">
          {conference.about.scientificHighlights.map((item, index) => (
            <SpotlightCard key={item.title} data-dock-item>
              <p className="principle-index">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </SpotlightCard>
          ))}
        </DockSurface>
      </section>

      <section className="principles page-width">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">OUR PRINCIPLES</p>
            <h2>
              Small enough for dialogue.
              <br />
              Wide enough for discovery.
            </h2>
          </div>
        </div>
        <DockSurface className="principles-grid">
          {principles.map((principle) => (
            <SpotlightCard key={principle.index} data-dock-item>
              <p className="principle-index">{principle.index}</p>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </SpotlightCard>
          ))}
        </DockSurface>
      </section>

      <section className="network-section page-width" data-reveal>
        <div className="network-copy">
          <p className="section-kicker">A REGIONAL NETWORK</p>
          <h2>Asia is the context. Collaboration is the method.</h2>
          <p>
            GAIA welcomes geomechanics perspectives from across the region and
            beyond, with a shared interest in careful research and meaningful
            exchange.
          </p>
        </div>
        <BorderGlow
          className="network-visual"
          aria-label="Abstract network across Asia"
          backgroundColor="rgba(243, 247, 249, 0.88)"
        >
          <span className="network-ring ring-a" />
          <span className="network-ring ring-b" />
          <span className="network-ring ring-c" />
          <span className="network-node node-a" />
          <span className="network-node node-b" />
          <span className="network-node node-c" />
          <span className="network-node node-d" />
          <p>
            GAIA / ASIA
            <br />
            RESEARCH NETWORK
          </p>
        </BorderGlow>
      </section>
    </PageFrame>
  )
}
