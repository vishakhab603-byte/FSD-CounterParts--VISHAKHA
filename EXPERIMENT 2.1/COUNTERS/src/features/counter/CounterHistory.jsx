import { useAppSelector } from '../../app/hooks'
import { selectHistory } from './selectors'
import { formatTime, formatSignedDelta } from '../../utils/formatter'

export default function CounterHistory() {
  const history = useAppSelector(selectHistory)

  return (
    <div className="action-log">
      <div className="action-log__head">
        <span className="action-log__dot" />
        <span className="action-log__dot" />
        <span className="action-log__dot" />
        <span className="action-log__title">action log</span>
      </div>
      <div className="action-log__body">
        {history.length === 0 && (
          <div className="action-log__empty">No actions dispatched yet. Try incrementing the counter.</div>
        )}
        {history.map((entry, index) => (
          <div className="action-log__row" key={entry.id} style={{ '--row-index': index }}>
            <span className="action-log__time">{formatTime(entry.timestamp)}</span>
            <span className="action-log__type">{entry.label}</span>
            <span className="action-log__delta">{formatSignedDelta(entry.delta)}</span>
            <span className="action-log__value">→ {entry.resultingValue}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
