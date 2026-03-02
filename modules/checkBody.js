function checkBody(body, keys) {
  let isValid = true;

  for (let fields of keys) {
    if (!body[fields] || !body[fields] === "") {
      isValid = false;
    }
  }
  return isValid;
}

module.exports = { checkBody };
