import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { incrementByAmount, decrementByAmount, incrementAsync } from './counterSlice'
import { selectIsLoading } from './selectors'
import { isValidAmount, parseAmount } from '../../utils/validators'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function CounterInput() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectIsLoading)
  const [amount, setAmount] = useState('2')
  const valid = isValidAmount(amount)

  const handleAdd = () => {
    if (!valid) return
    dispatch(incrementByAmount(parseAmount(amount)))
  }

  const handleSubtract = () => {
    if (!valid) return
    dispatch(decrementByAmount(parseAmount(amount)))
  }

  const handleAsync = () => {
    if (!valid) return
    dispatch(incrementAsync(parseAmount(amount)))
  }

  return (
    <div className="counter-input">
      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={!valid ? 'Enter a valid number' : null}
      />
      <div className="counter-input__actions">
        <Button variant="ghost" onClick={handleSubtract} disabled={!valid}>
          Subtract
        </Button>
        <Button variant="secondary" onClick={handleAdd} disabled={!valid}>
          Add Amount
        </Button>
        <Button variant="primary" onClick={handleAsync} disabled={!valid || isLoading}>
          {isLoading ? 'Adding…' : 'Add Async'}
        </Button>
      </div>
    </div>
  )
}
