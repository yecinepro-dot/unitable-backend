function checkBody(body, keys) {
  let isValid = true;

  for (let fields of keys) {
    if (
      !body[fields] === null ||
      !body[fields] === "" ||
      !body[fields] === undefined
    ) {
      isValid = false;
    }
  }
  return isValid;
}

module.exports = { checkBody };
