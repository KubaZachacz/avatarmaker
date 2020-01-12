export const groupByGenders = (config, genders) => {
  const parts = Object.keys(config);
  const genderOptions = ["neutral", ...genders];
  const output = {};
  for (let gender of genderOptions) {
    output[gender] = {};
    for (let part of parts) {
      output[gender][part] = [];
    }
  }
  for (let part of parts) {
    if (part !== "hair_back") {
      const elements = Object.keys(config[part]);
      for (let element of elements) {
        output["neutral"][part].push(parseInt(element, 0));
        for (let gender of genders) {
          if (config[part][element][gender]) {
            output[gender][part].push(parseInt(element, 0));
          }
        }
      }
    }
  }
  return output;
};
