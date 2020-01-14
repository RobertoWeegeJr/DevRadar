module.exports = function parseStringAsArray(array) {
    return array.split(',').map(word => word.trim());
}