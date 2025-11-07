let car1 = {
  color: "red",
  company: "ferrari",
};

function purchase(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
  );
}

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("not callable");
  }

  context.fn = this;
  context.fn(...args);
};

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error("not callable");
  }

  if (!Array.isArray(args)) {
    throw new TypeError("not an array");
  }

  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error("not callable");
  }

  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

const newfunc = purchase.myBind(car1, "rs");
console.log(newfunc(5000));
