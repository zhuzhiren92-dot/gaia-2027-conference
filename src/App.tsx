import { Navigate, Route, Routes } from 'react-router-dom'
import { Grainient } from './components/Grainient'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { PreviousGaiaPage } from './pages/PreviousGaiaPage'
import { ProgramPage } from './pages/ProgramPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { WorkshopPage } from './pages/WorkshopPage'
import { ViewportReveal } from './components/ViewportReveal'

export default function App() {
  return (
    <>
      <div className="global-grainient-layer" aria-hidden="true">
        <Grainient
          color1="#d9cdd8"
          color2="#3baae0"
          color3="#f278b3"
          timeSpeed={1.5}
          colorBalance={0.17}
          warpStrength={1.8}
          warpFrequency={4.6}
          warpSpeed={1.9}
          warpAmplitude={48}
          blendAngle={-8}
          blendSoftness={0.14}
          rotationAmount={380}
          noiseScale={2.55}
          grainAmount={0.05}
          grainScale={2}
          grainAnimated={false}
          contrast={1.45}
          gamma={1}
          saturation={1.3}
          zoom={0.8}
        />
      </div>
      <ViewportReveal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/previous-gaia" element={<PreviousGaiaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
