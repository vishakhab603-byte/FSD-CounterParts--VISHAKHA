export function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    signDisplay: 'exceptZero'
  }).format(value)
}

export function formatPlainNumber(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function formatSignedDelta(delta) {
  if (delta > 0) return `+${delta}`
  return `${delta}`
}
