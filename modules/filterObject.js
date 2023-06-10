function filterObject(originalObject, specifiedAttributes) {
    const filteredObject = Object.keys(originalObject)
      .filter(key => specifiedAttributes.includes(key))
      .reduce((obj, key) => {
        obj[key] = originalObject[key];
        return obj;
      }, {});
    return filteredObject;
  }
  
module.exports = filterObject;