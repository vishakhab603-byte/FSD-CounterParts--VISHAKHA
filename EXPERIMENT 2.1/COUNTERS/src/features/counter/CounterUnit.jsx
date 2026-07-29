import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { increment, decrement } from './counterSlice'
import { selectCount, selectStep, selectIsLoading } from './selectors'
import { formatPlainNumber } from '../../utils/formatter'
import { triggerPulse, getDeltaDirection } from '../../utils/animations'
import Button from '../../components/Button'
import Loader from '../../components/Loader'

export default function CounterUnit({ label, accent = 'a' }) {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectCount)
  const step = useAppSelector(selectStep)
  const isLoading = useAppSelector(selectIsLoading)
  const valueRef = useRef(null)
  const previousValue = useRef(value)
  const direction = getDeltaDirection(previousValue.current, value)

  useEffect(() => {
    triggerPulse(valueRef.current, `is-pulsing-${direction}`)
    previousValue.current = value
  }, [value, direction])

  return (
    <div className={`counter-unit counter-unit--${accent}`}>
      <div className="counter-unit__head">
        <span className="counter-unit__dot" />
        <span className="counter-unit__label">{label}</span>
        {isLoading && <Loader size={14} label="syncing" />}
      </div>
      <div className="counter-unit__value" ref={valueRef}>
        {formatPlainNumber(value)}
      </div>
      <div className="counter-unit__actions">
        <Button variant="ghost" size="md" onClick={() => dispatch(decrement())}>
          − {step}
        </Button>
        <Button variant={accent === 'a' ? 'primary' : 'secondary'} size="md" onClick={() => dispatch(increment())}>
          + {step}
        </Button>
      </div>
    </div>
  )
}
