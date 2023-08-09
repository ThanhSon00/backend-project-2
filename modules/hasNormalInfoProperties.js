const hasNormalInfoProperties = (obj) => {
    const propertyNames = Object.keys(obj);
    return propertyNames.some((propertyName) => propertyName.startsWith("normalInfo"));
}

module.exports = hasNormalInfoProperties;