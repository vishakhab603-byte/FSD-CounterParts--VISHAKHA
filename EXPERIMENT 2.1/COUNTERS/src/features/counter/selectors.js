import { createSelector } from '@reduxjs/toolkit'

export const selectCounterState = (state) => state.counter
export const selectCount = (state) => state.counter.value
export const selectStep = (state) => state.counter.step
export const selectStatus = (state) => state.counter.status
export const selectError = (state) => state.counter.error
export const selectHistory = (state) => state.counter.history
export const selectCanUndo = (state) => state.counter.past.length > 0

export const selectStats = createSelector([selectHistory, selectCount], (history, currentValue) => {
  if (history.length === 0) {
    return {
      totalActions: 0,
      sumOfDeltas: 0,
      average: currentValue,
      max: currentValue,
      min: currentValue
    }
  }
  const values = history.map((entry) => entry.resultingValue)
  const sumOfDeltas = history.reduce((acc, entry) => acc + entry.delta, 0)
  return {
    totalActions: history.length,
    sumOfDeltas,
    average: Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)),
    max: Math.max(...values, currentValue),
    min: Math.min(...values, currentValue)
  }
})

export const selectIsLoading = (state) => state.counter.status === 'loading'
