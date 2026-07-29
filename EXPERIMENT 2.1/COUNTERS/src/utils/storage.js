const STORAGE_KEY = 'redux-counter-state-v1'

export function loadState() {
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY)
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    return undefined
  }
}

export function saveState(state) {
  try {
    const serialized = JSON.stringify(state)
    window.localStorage.setItem(STORAGE_KEY, serialized)
  } catch {
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
  }
}
