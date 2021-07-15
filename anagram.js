
const cache = {}; 

module.exports = function isAnagram(first, second) {
    if (!first || !second || first.length !== second.length) {
        return false;
    }
    let firstCharMap = GetHistogram(first);
    let secondCharMap = GetHistogram(second);
    for (let char in firstCharMap) {
        if (firstCharMap[char] !== secondCharMap[char]) {
            return false
        }
    }
    return true;
}

function GetHistogram(inputStr) {
    if (cache[inputStr]) {
        return cache[inputStr];
    }
    let charMap = {}
    for (let char of inputStr) {
        if (charMap.hasOwnProperty(char)) {
            charMap[char]++
        } else {
            charMap[char] = 1
        }
    }
    cache[inputStr] = charMap;
    return charMap;
}

 