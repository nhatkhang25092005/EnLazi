/**
 * Check Empty Object Function
 * return an empty field object
 * @param {*} object 
 * @returns 
 */
export function checkEmptyObject(object) {
  let emptyKey = {};
  for (const [field, value] of Object.entries(object)) {
    if (value == "") {
      emptyKey[field] = `${field} can not be null`
    }
  }
  return Object.keys(emptyKey).length ? emptyKey : null
}
