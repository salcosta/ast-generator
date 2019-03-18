const rwc = require('random-weighted-choice');
const Chance = require('chance');
const chance = new Chance();
const PropertyWeights = require('./PropertyWeights.js');
const ValueWeights = require('./ValueWeights.js');
const Parts = {};

Parts.Program = [{
    key: 'type',
    value: 'Program',
    type: 'Static'
}, {
    key: 'body',
    value: PropertyWeights.Program.body,
    type: 'Body',
    min: 0
}, {
    key: "sourceType",
    value: "script",
    type: "Static"
}];

Parts.VariableDeclaration = [{
    key: 'type',
    value: 'VariableDeclaration',
    type: 'Static'
}, {
    key: 'declarations',
    value: PropertyWeights.VariableDeclaration.declarations,
    type: 'Body',
    min: 1
}, {
    key: 'kind',
    value: 'var',
    type: 'Static'
}];

Parts.VariableDeclarator = [{
    key: 'type',
    value: 'VariableDeclarator',
    type: 'Static'
}, {
    key: 'id',
    value: PropertyWeights.VariableDeclarator.id,
    type: 'Dynamic',
    min: 1
}, {
    key: 'init',
    value: PropertyWeights.VariableDeclarator.init,
    type: 'Dynamic'
}];

Parts.NewIdentifier = [{
    key: 'type',
    value: 'Identifier',
    type: 'Static'
}, {
    key: 'name',
    value: function() {
        var newIdentifier = chance.word();
        global.identifiers.push(newIdentifier);
        return newIdentifier;

    },
    type: 'Function'
}];

Parts.ExistingIdentifier = [{
    key: 'type',
    value: 'Identifier',
    type: 'Static'
}, {
    key: 'name',
    value: function() {
        if (global.identifiers.length > 0) {
            var id = chance.pickone(global.identifiers);
            return id;

        } else {
            var newIdentifier = chance.word();
            global.identifiers.push(newIdentifier);
            return newIdentifier;
        }
    },
    type: 'Function'
}];


Parts.ConsoleIdentifier = [{
    key: 'type',
    value: 'Identifier',
    type: 'Static'
}, {
    key: 'name',
    value: 'console',
    type: 'Static'
}, {
    key: 'properties',
    value: PropertyWeights.ConsoleIdentifier.properties,
    type: 'Static'
}];

Parts.LogIdentifier = [{
    key: 'type',
    value: 'Identifier',
    type: 'Static'
}, {
    key: 'name',
    value: 'log',
    type: 'Static'
}];

Parts.MemberExpression = [{
    key: 'type',
    value: 'MemberExpression',
    type: 'Static'
}, {
    key: 'computed',
    value: false,
    type: 'Static'
}, {
    key: 'object',
    value: PropertyWeights.MemberExpression.object,
    type: 'Dynamic'
}, {
    key: 'property',
    value: function() {
        return chance.weighted(this.object.properties[0], this.object.properties[1]);
    },
    type: 'KeyFunction'
}];

Parts.ExpressionStatement = [{
    key: 'type',
    value: 'ExpressionStatement',
    type: 'Static'
}, {
    key: 'expression',
    value: PropertyWeights.ExpressionStatement.expression,
    type: 'Dynamic'
}];

Parts.AssignmentExpression = [{
    key: 'type',
    value: 'AssignmentExpression',
    type: 'Static'
}, {
    key: 'operator',
    value: '=',
    type: 'Static'
}, {
    key: 'left',
    value: PropertyWeights.AssignmentExpression.left,
    type: 'Dynamic'
}, {
    key: 'right',
    value: PropertyWeights.AssignmentExpression.right,
    type: 'Dynamic'
}];

Parts.CallExpression = [{
    key: 'type',
    value: 'CallExpression',
    type: 'Static'
}, {
    key: 'callee',
    value: PropertyWeights.CallExpression.callee,
    type: 'Dynamic'
}, {
    key: 'arguments',
    value: PropertyWeights.CallExpression.arguments,
    min: 0,
    type: 'Body'
}];

Parts.BinaryExpression = [{
    key: 'type',
    value: 'BinaryExpression',
    type: 'Static'
}, {
    key: 'operator',
    value: ValueWeights.BinaryExpression.operator,
    type: 'DynamicValue'
}, {
    key: 'left',
    value: PropertyWeights.BinaryExpression.left,
    type: 'Dynamic'
}, {
    key: 'right',
    value: PropertyWeights.BinaryExpression.right,
    type: 'Dynamic'
}];

Parts.BinaryComparisonExpression = [{
    key: 'type',
    value: 'BinaryExpression',
    type: 'Static'
}, {
    key: 'operator',
    value: ValueWeights.BinaryComparisonExpression.operator,
    type: 'DynamicValue'
}, {
    key: 'left',
    value: PropertyWeights.BinaryComparisonExpression.left,
    type: 'Dynamic'
}, {
    key: 'right',
    value: PropertyWeights.BinaryComparisonExpression.right,
    type: 'Dynamic'
}];

Parts.LiteralString = [{
    key: 'type',
    value: 'Literal',
    type: 'Static'
}, {
    key: 'value',
    value: function() {
        return chance.word()
    },
    type: 'Function'
}, {
    key: 'raw',
    value: function() {
        return `"${this.value}"`;
    },
    type: 'Function'
}];

Parts.LiteralNumber = [{
    key: 'type',
    value: 'Literal',
    type: 'Static'
}, {
    key: 'value',
    value: function() {
        return chance.integer({
            min: 0,
            max: 3
        });
    },
    type: 'Function'
}, {
    key: 'raw',
    value: function() {
        return `"${this.value}"`;
    },
    type: 'Function'
}];

Parts.LiteralBoolean = [{
    key: 'type',
    value: 'Literal',
    type: 'Static'
}, {
    key: 'value',
    value: function() {
        return chance.pickone([true, false]);
    },
    type: 'Function'
}, {
    key: 'raw',
    value: function() {
        return `"${this.value}"`;
    },
    type: 'Function'
}];

Parts.IfStatement = [{
    key: 'type',
    value: 'IfStatement',
    type: 'Static'
}, {
    key: 'test',
    value: PropertyWeights.IfStatement.test,
    type: 'Dynamic'
}, {
    key: 'consequent',
    value: PropertyWeights.IfStatement.consequent,
    type: 'Dynamic'
}, {
    key: 'alternate',
    value: null,
    type: 'Static'
}];

Parts.IfElseStatement = [{
    key: 'type',
    value: 'IfStatement',
    type: 'Static'
}, {
    key: 'test',
    value: PropertyWeights.IfElseStatement.test,
    type: 'Dynamic'
}, {
    key: 'consequent',
    value: PropertyWeights.IfElseStatement.consequent,
    type: 'Dynamic'
}, {
    key: 'alternate',
    value: PropertyWeights.IfElseStatement.alternate,
    type: 'Dynamic'
}];

Parts.BlockStatement = [{
    key: 'type',
    value: 'BlockStatement',
    type: 'Static'
}, {
    key: 'body',
    value: PropertyWeights.BlockStatement.body,
    type: 'Body',
    min: 0
}];

Parts.ForStatement = [{
    key: 'type',
    value: 'ForStatement',
    type: 'Static'
}, {
    key: 'init',
    value: PropertyWeights.ForStatement.init,
    type: 'Dynamic'
}, {
    key: 'test',
    value: PropertyWeights.ForStatement.test,
    type: 'Dynamic'
}, {
    key: 'update',
    value: PropertyWeights.ForStatement.update,
    type: 'Dynamic'
}, {
    key: 'body',
    value: PropertyWeights.ForStatement.body,
    type: 'Dynamic'
}];

Parts.UpdateExpression = [{
    key: 'type',
    value: 'UpdateExpression',
    type: 'Static'
}, {
    key: 'argument',
    value: PropertyWeights.UpdateExpression.argument,
    type: 'Dynamic'
}, {
    key: 'operator',
    value: ValueWeights.UpdateExpression.operator,
    type: 'DynamicValue'
}, {
    key: 'prefix',
    value: ValueWeights.UpdateExpression.prefix,
    type: 'DynamicValue'
}];

module.exports = Parts;