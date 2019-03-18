var ValueWeights = {};

ValueWeights.BinaryExpression = {};
ValueWeights.BinaryExpression.operator = [
    ['%', '+', '-', '*', '/', '==', '!=', '===', '!=='],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];


ValueWeights.BinaryComparisonExpression = {};
ValueWeights.BinaryComparisonExpression.operator = [
    ['==', '!=', '===', '!=='],
    [1, 1, 1, 1]
];

ValueWeights.UpdateExpression = {};
ValueWeights.UpdateExpression.operator = [
    ['++', '--'],
    [1, 1]
];

ValueWeights.UpdateExpression.prefix = [
    [true, false],
    [1, 1]
];

module.exports = ValueWeights;