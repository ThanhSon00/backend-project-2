function filterObjectProperties(obj, propNames) {
  const filteredObj = {};

  // Helper function to recursively create nested objects
  function createNestedObject(obj, levels, value) {
    const currentLevel = levels.shift();

    if (levels.length === 0) {
      obj[currentLevel] = value;
    } else {
      if (!obj.hasOwnProperty(currentLevel)) {
        obj[currentLevel] = {};
      }

      createNestedObject(obj[currentLevel], levels, value);
    }
  }

  // Iterate through each property name
  propNames.forEach(propName => {
    // Split the property name into nested levels
    const levels = propName.split('.');

    // Get the last level to check if it's a nested property
    const lastLevel = levels.pop();

    // Traverse the nested levels
    let nestedObj = obj;
    levels.forEach(level => {
      if (nestedObj.hasOwnProperty(level)) {
        nestedObj = nestedObj[level];
      } else {
        nestedObj = undefined;
        return; // Exit loop if any level doesn't exist
      }
    });

    // Add the property to the filtered object if it exists
    if (nestedObj && nestedObj.hasOwnProperty(lastLevel)) {
      const value = nestedObj[lastLevel];
      createNestedObject(filteredObj, propName.split('.'), value);
    }
  });
  return filteredObj;
}

module.exports = filterObjectProperties;