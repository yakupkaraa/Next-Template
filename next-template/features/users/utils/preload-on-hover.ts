export function preloadOnHover(load: () => Promise<unknown>) {
  return () => {
    void load()
  }
}
