const flattenObj = (obj) => {
  let result = {};

  for (const i in obj) {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const temp = flattenObj(obj[i]);
      for (const j in temp) {
        result[i + "." + j] = temp[j];
      }
    } else {
      result[i] = obj[i];
    }
  }

  return result;
};

const response = {
  name: "ritika",
  age: 24,
  characteristics: {
    height: `'5'4`,
    complexion: "wheetish",
    hair: "black",
    skills: {
      tech: {
        frontend: "js, react, next",
        backend: "java, springboot",
      },
      others: {
        hobbies: "painiting, sketching, singinig",
      },
    },
  },
};

console.log(flattenObj(response));
