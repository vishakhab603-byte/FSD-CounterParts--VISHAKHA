export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  FAILED: 'failed'
}

export const DEFAULT_STEP = 1
export const MIN_STEP = 1
export const MAX_STEP = 100
export const MAX_HISTORY_LENGTH = 50
export const STORAGE_KEY = 'redux-counter-state-v1'

export const ACTION_LABELS = {
  'counter/increment': 'Increment',
  'counter/decrement': 'Decrement',
  'counter/incrementByAmount': 'Increment By Amount',
  'counter/decrementByAmount': 'Decrement By Amount',
  'counter/setStep': 'Set Step',
  'counter/reset': 'Reset',
  'counter/undo': 'Undo',
  'counter/incrementAsync/pending': 'Increment Async (pending)',
  'counter/incrementAsync/fulfilled': 'Increment Async (fulfilled)',
  'counter/incrementAsync/rejected': 'Increment Async (rejected)'
}
