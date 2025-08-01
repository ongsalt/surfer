export function lazy<T>(fn: () => T) {
  let value: T;
  let run = false;

  return () => {
    if (!run) {
      run = true;
      value = fn();
    }
    return value;
  };
}

// keying an object is your problem not mines
export function memo<Args extends any[], Ret>(fn: (...args: Args) => Ret) {
  const returns = new Map<string, Ret>();

  return (args: Args) => {
    const key = args.toString();
    if (returns.has(key)) {
      return returns.get(key);
    }

    const ret = fn(...args);
    returns.set(key, ret);
    return ret;
  };
}

export function isClass(v: any) {
  return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
}
