import Counter from './features/counter/Counter'

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <span className="app__logo">C²</span>
        <div>
          <h1 className="app__title">CounterParts</h1>
          <p className="app__subtitle">two counters, one source of truth</p>
        </div>
      </header>
      <main className="app__main">
        <Counter />
      </main>
      <footer className="app__footer">
        <span>Redux Toolkit · React Redux · Vite</span>
      </footer>
    </div>
  )
}
