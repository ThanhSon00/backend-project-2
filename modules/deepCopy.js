function deepCopy(object) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == object || "object" != typeof object) return object;

    // Handle Date
    if (object instanceof Date) {
        copy = new Date();
        copy.setTime(object.getTime());
        return copy;
    }

    // Handle Array
    if (object instanceof Array) {
        copy = [];
        for (let i = 0, len = object.length; i < len; i++) {
            copy[i] = deepCopy(object[i]);
        }
        return copy;
    }

    // Handle Object
    if (object instanceof Object) {
        copy = {};
        for (let attr in object) {
            if (object.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(object[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy object! Type not supported.");
}

module.exports = deepCopy;