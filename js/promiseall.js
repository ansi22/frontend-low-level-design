function dispalyName(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

function dispalyRole(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

function dispalyCity(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}

Promise.allPollyfill = (promises) => {
  return new Promise((resolve, reject) => {
    const results = [];

    if (!promises.length) {
      resolve(results);
      return;
    }

    let pending = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(
        promise.then((res) => {
          results[index] = res;
          pending--;

          if (pending === 0) {
            resolve(results);
          }
        }, reject)
      );
    });
  });
};

Promise.allPollyfill([
  dispalyName("Ritka"),
  dispalyRole("Frontend Developer"),
  dispalyCity("Bengaluru"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
