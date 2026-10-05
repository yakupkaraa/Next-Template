export function mockRequest<T>(work: () => T, ms = 600): Promise<T> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(work())
      } catch (error) {
        reject(error)
      }
    }, ms)
  })
}
