export function isValidAmount(value) {
  if (value === '' || value === null || value === undefined) return false
  const parsed = Number(value)
  return Number.isFinite(parsed) && !Number.isNaN(parsed)
}

export function clampStep(value, min, max) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return min
  return Math.min(Math.max(parsed, min), max)
}

export function parseAmount(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}
