const getColumns = (keys) => {
  let columns = "(";
  for (let i = 0; i < keys.length; i++) {
    i === keys.length - 1 ? (columns += keys[i]) : (columns += keys[i] + ",");
  }
  columns += ")";
  return columns;
};
module.exports = { getColumns };
