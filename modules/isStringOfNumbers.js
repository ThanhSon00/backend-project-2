const isStringOfNumbers = (str) => {
    if (typeof str !== "string") {
        return false;
    }
    for (let i = 0; i < str.length; i++) {
        if (isNaN(parseInt(str[i]))) {
            return false;
        }
    }
    return true;
}

module.exports = isStringOfNumbers;