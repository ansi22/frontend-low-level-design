const myDebounce = (cb, delay) => {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const myThrottle = (cb, d) => {
  let last = 0;

  return (...args) => {
    let now = new Date.getTime();
    if (now - last < d) {
      return;
    }
    return cb(...args);
  };
};

function myMemoize(fn, context) {
  const res = {};
  return function (...args) {
    let argCache = JSON.stringify(args);
    if (!res[argCache]) {
      res[argCache] = fn.call(context || this, ...args);
    } else {
      return res[argCache];
    }
  };
}
