// map pollyfill

const nums = [1, 2, 3, 4];

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }

  return temp;
};

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }

  return temp;
};

Array.prototype.myReduce = function (cb, initializer) {
  let accum = initializer;
  for (let i = 0; i < this.length; i++) {
    accum = accum ? cb(accum, this[i], i, this) : this[i];
  }

  return accum;
};

const multiplyThree = nums.myMap((num, i, nums) => {
  return num * 3;
});

const numGreaterThanThree = nums.myFilter((num) => {
  return num > 3;
});

const sum = nums.myReduce((acc, cur, i, arr) => {
  return acc + cur;
}, 0);

console.log(sum);
