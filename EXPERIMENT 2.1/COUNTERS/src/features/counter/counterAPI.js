export function fetchCount(amount = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Number.isFinite(amount)) {
        resolve({ data: amount })
      } else {
        reject(new Error('Invalid amount supplied to fetchCount'))
      }
    }, 600)
  })
}
