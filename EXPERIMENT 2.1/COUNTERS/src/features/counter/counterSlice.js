import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'
import { STATUS, DEFAULT_STEP, MAX_HISTORY_LENGTH, ACTION_LABELS } from './constants'
import { loadState, saveState } from '../../utils/storage'

const persisted = loadState()

const initialState = persisted ?? {
  value: 0,
  step: DEFAULT_STEP,
  status: STATUS.IDLE,
  error: null,
  history: [],
  past: []
}

function pushHistory(state, type, delta) {
  const entry = {
    id: nanoid(),
    type,
    label: ACTION_LABELS[type] ?? type,
    delta,
    resultingValue: state.value,
    timestamp: Date.now()
  }
  state.history.unshift(entry)
  if (state.history.length > MAX_HISTORY_LENGTH) {
    state.history.pop()
  }
}

export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount) => {
    const response = await fetchCount(amount)
    return response.data
  }
)

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.past.push(state.value)
      state.value += state.step
      pushHistory(state, 'counter/increment', state.step)
    },
    decrement(state) {
      state.past.push(state.value)
      state.value -= state.step
      pushHistory(state, 'counter/decrement', -state.step)
    },
    incrementByAmount(state, action) {
      state.past.push(state.value)
      state.value += action.payload
      pushHistory(state, 'counter/incrementByAmount', action.payload)
    },
    decrementByAmount(state, action) {
      state.past.push(state.value)
      state.value -= action.payload
      pushHistory(state, 'counter/decrementByAmount', -action.payload)
    },
    setStep(state, action) {
      state.step = action.payload
      pushHistory(state, 'counter/setStep', action.payload)
    },
    reset(state) {
      state.past.push(state.value)
      state.value = 0
      state.history = []
      state.past = []
    },
    undo(state) {
      if (state.past.length === 0) return
      const previous = state.past.pop()
      state.value = previous
      pushHistory(state, 'counter/undo', 0)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = STATUS.LOADING
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.past.push(state.value)
        state.value += action.payload
        pushHistory(state, 'counter/incrementAsync/fulfilled', action.payload)
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = STATUS.FAILED
        state.error = action.error.message
      })
  }
})

export const {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
  setStep,
  reset,
  undo
} = counterSlice.actions

export const persistCounterState = (state) => saveState(state.counter)

export default counterSlice.reducer
