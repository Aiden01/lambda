export const uncurry = <A, B, C>(f: (a: A, b: B) => C, args: [A, B]) => {
  return f(...args)
}
