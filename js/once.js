function once(func, context) {
  let ran;

  return function () {
    if (func) {
      ran = func.apply(context || this, arguments);
      func = null;
    }

    return null;
  };
}

const hello = once(() => console.log("hello"));
hello();
hello();
hello();
