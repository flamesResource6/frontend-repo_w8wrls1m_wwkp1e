import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Hero />
      <section className="h-[120vh] bg-[#121212] text-white flex items-center justify-center">
        <div className="max-w-3xl px-8 text-center opacity-70">
          <h2 className="text-3xl font-semibold mb-4">Next sections will showcase psychology in action</h2>
          <p className="text-gray-300">Scroll to experience motion, contrast, and cognitive load principles embodied in layout, timing, and progression.</p>
        </div>
      </section>
    </div>
  )
}

export default App
