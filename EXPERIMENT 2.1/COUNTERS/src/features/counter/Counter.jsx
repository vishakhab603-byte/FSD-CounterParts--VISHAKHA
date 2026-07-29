import CounterUnit from './CounterUnit'
import CounterInput from './CounterInput'
import CounterControls from './CounterControls'
import CounterHistory from './CounterHistory'
import CounterStats from './CounterStats'
import GlassPanel from '../../components/GlassPanel'
import Card from '../../components/Card'
import './counter.css'

export default function Counter() {
  return (
    <div className="counter">
      <GlassPanel className="counter__hero" glow>
        <div className="counter__twins">
          <CounterUnit label="Counter One" accent="a" />
          <div className="sync-bridge">
            <span className="sync-bridge__pulse" />
            <span className="sync-bridge__label">in sync</span>
          </div>
          <CounterUnit label="Counter Two" accent="b" />
        </div>
      </GlassPanel>

      <div className="counter__grid">
        <Card eyebrow="dispatch" title="Amount">
          <CounterInput />
        </Card>
        <Card eyebrow="configure" title="Step & History">
          <CounterControls />
        </Card>
      </div>

      <Card eyebrow="derived state" title="Statistics" className="counter__stats-card">
        <CounterStats />
      </Card>

      <CounterHistory />
    </div>
  )
}
