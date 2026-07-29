import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setStep, reset, undo } from './counterSlice'
import { selectStep, selectCanUndo } from './selectors'
import { clampStep } from '../../utils/validators'
import { MIN_STEP, MAX_STEP } from './constants'
import Button from '../../components/Button'
import Input from '../../components/Input'

export default function CounterControls() {
  const dispatch = useAppDispatch()
  const step = useAppSelector(selectStep)
  const canUndo = useAppSelector(selectCanUndo)

  const handleStepChange = (e) => {
    const clamped = clampStep(e.target.value, MIN_STEP, MAX_STEP)
    dispatch(setStep(clamped))
  }

  return (
    <div className="counter-controls">
      <Input
        label={`Step (${MIN_STEP}–${MAX_STEP})`}
        type="number"
        value={step}
        onChange={handleStepChange}
        min={MIN_STEP}
        max={MAX_STEP}
      />
      <div className="counter-controls__actions">
        <Button variant="ghost" onClick={() => dispatch(undo())} disabled={!canUndo}>
          Undo
        </Button>
        <Button variant="danger" onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </div>
    </div>
  )
}
