var PropertyWeights = {};

PropertyWeights.Program = {};
PropertyWeights.Program.body = [
    ['VariableDeclaration', 'ExpressionStatement', 'Conditional', 'Terminate'],
    [1, 1, 2, 2]
]

PropertyWeights.VariableDeclaration = {};

PropertyWeights.VariableDeclaration.declarations = [
    ['VariableDeclarator', 'Terminate'],
    [1, 1]
];

PropertyWeights.VariableDeclarator = {};
PropertyWeights.VariableDeclarator.id = [
    ['NewIdentifier'],
    [1]
];

PropertyWeights.VariableDeclarator.init = [
    ['Literal', 'BinaryExpression'],
    [1, 1]
];

PropertyWeights.NewIdentifier = {};

PropertyWeights.ExistingIdentifier = {};

PropertyWeights.ConsoleIdentifier = {};

PropertyWeights.ConsoleIdentifier.properties = [
    ['LogIdentifier'],
    [1]
];

PropertyWeights.LogIdentifier = {};

PropertyWeights.MemberExpression = {};
PropertyWeights.MemberExpression.object = [
    ['ConsoleIdentifier'],
    [1]
];

PropertyWeights.ExpressionStatement = {};
PropertyWeights.ExpressionStatement.expression = [
    ['BinaryExpression', 'CallExpression', 'MemberExpression', 'AssignmentExpression', 'UpdateExpression'],
    [1, 1, 0, 5, 1]
];
PropertyWeights.AssignmentExpression = {};
PropertyWeights.AssignmentExpression.left = [
    ['ExistingIdentifier'],
    [1]
];

PropertyWeights.AssignmentExpression.right = [
    [
        'Literal',
        'BinaryExpression',
        'ExistingIdentifier'
    ],
    [1, 1, 1]
];

PropertyWeights.CallExpression = {};

PropertyWeights.CallExpression.callee = [
    ['LogIdentifier', 'MemberExpression'],
    [1, 1]
];

PropertyWeights.CallExpression.arguments = [
    ['Literal', 'Terminate'],
    [1, 2]
];

PropertyWeights.BinaryExpression = {};
PropertyWeights.BinaryExpression.left = [
    ['Literal', 'ExistingIdentifier', 'BinaryExpression'],
    [1, 2, 4]
]

PropertyWeights.BinaryExpression.right = [
    ['Literal', 'ExistingIdentifier'],
    [4, 1]
];

PropertyWeights.BinaryComparisonExpression = {};
PropertyWeights.BinaryComparisonExpression.left = [
    ['Literal', 'ExistingIdentifier', 'BinaryExpression'],
    [1, 2, 4]
];

PropertyWeights.BinaryComparisonExpression.right = [
    ['Literal', 'ExistingIdentifier'],
    [4, 1]
];

PropertyWeights.LiteralString = {};

PropertyWeights.LiteralNumber = {};

PropertyWeights.LiteralBoolean = {};

PropertyWeights.IfStatement = {};
PropertyWeights.IfStatement.test = [
    ['ExistingIdentifier', 'BinaryExpression'],
    [1, 1]
];

PropertyWeights.IfStatement.consequent = [
    ['BlockStatement'],
    [1]
];

PropertyWeights.IfElseStatement = {};
PropertyWeights.IfElseStatement.test = [
    ['ExistingIdentifier', 'BinaryExpression'],
    [1, 4]
];

PropertyWeights.IfElseStatement.consequent = [
    ['BlockStatement'],
    [1]
];

PropertyWeights.IfElseStatement.alternate = [
    ['BlockStatement'],
    [1]
];

PropertyWeights.BlockStatement = {};
PropertyWeights.BlockStatement.body = [
    ['VariableDeclaration', 'ExpressionStatement', 'Conditional', 'Terminate'],
    [1, 10, 2, 10]
];

PropertyWeights.ForStatement = {};
PropertyWeights.ForStatement.init = [
    ['VariableDeclaration'],
    [1]
];

PropertyWeights.ForStatement.test = [
    ['BinaryExpression'],
    [1]
];

PropertyWeights.ForStatement.update = [
    ['UpdateExpression'],
    [1]
];

PropertyWeights.ForStatement.body = [
    ['VariableDeclaration', 'ExpressionStatement', 'Conditional', 'Terminate'],
    [1, 10, 1, 50]
];

PropertyWeights.UpdateExpression = {};
PropertyWeights.UpdateExpression.argument = [
    ['ExistingIdentifier'],
    [1]
];

module.exports = PropertyWeights;