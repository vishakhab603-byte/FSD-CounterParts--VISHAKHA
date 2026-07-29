export function triggerPulse(element, className = 'is-pulsing') {
  if (!element) return
  element.classList.remove(className)
  void element.offsetWidth
  element.classList.add(className)
}

export function getDeltaDirection(previous, next) {
  if (next > previous) return 'up'
  if (next < previous) return 'down'
  return 'flat'
}
