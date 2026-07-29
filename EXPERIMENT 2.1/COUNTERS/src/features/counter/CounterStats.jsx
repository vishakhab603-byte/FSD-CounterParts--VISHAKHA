import { useAppSelector } from '../../app/hooks'
import { selectStats } from './selectors'

export default function CounterStats() {
  const stats = useAppSelector(selectStats)

  const items = [
    { label: 'Total Actions', value: stats.totalActions },
    { label: 'Net Delta', value: stats.sumOfDeltas },
    { label: 'Average', value: stats.average },
    { label: 'Max', value: stats.max },
    { label: 'Min', value: stats.min }
  ]

  return (
    <div className="counter-stats">
      {items.map((item) => (
        <div className="counter-stats__item" key={item.label}>
          <span className="counter-stats__value">{item.value}</span>
          <span className="counter-stats__label">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
