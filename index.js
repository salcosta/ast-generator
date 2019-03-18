const DEBUG = false;
const Chance = require('chance');
const chance = new Chance();
const escodegen = require('escodegen');
const esprima = require('esprima');
const estraverse = require('estraverse');
const _ = require('lodash');
const fs = require('fs');
const vm = require('vm');
const SampleProblems = require('./Samples.js');
const _PartWeights = require('./PartWeights.js');
const _Parts = require('./Parts.js');
const PartWeights = _.cloneDeep(_PartWeights);
const Parts = _.cloneDeep(_Parts);

let LearnedParts = {};
let LearnedWeights = {};

let validPrograms = [];
let interval = null;
let bestResult = 0;


// I know, I know...
global.identifiers = ['answer'];

runCreator();

function resetCreator() {
    bestResult = 0;
    PartWeights = _.cloneDeep(_PartWeights);
    Parts = _.cloneDeep(_Parts);
}

function runCreator() {
    let simulation = simulate(SampleProblems.medium);
    if (simulation) {
        console.log(simulation.code);
        validPrograms.push(simulation);
    }
}

function simulate(contexts, max = Infinity) {
    var result = 0;
    var count = 0;
    var resetCount = 0;
    var code = '';

    var program;

    interval = setInterval(function() {
        count++;

        program = createProgram();
        result = runProgram(program.code, contexts);
        program.fitness = result;

        if (result > bestResult) {
            resetCount = 0;
            learnParts(program.ast, result);
            bestResult = result;
            console.log(`----- ${result} -----`);
            console.log(program.code);
        }

        // if (count % 2000 == 0) {
        //     resetCount++;
        //     bestResult = bestResult / 2;
        // }

        // if (resetCount == 10) {
        //     resetCount = 0;
        //     resetCreator();
        // }

        if (result == 1) {
            clearInterval(interval);
            console.log(count);
            validPrograms.push(program);
            return program
        }

        return false;

    }, 0);
}

function learnParts(ast, fitness) {
    estraverse.traverse(ast, {
        enter: function(node, parent) {
            if (node.type !== 'Program') {

                var partIndex = _.findIndex(PartWeights[node.type], function(e) {
                    return e.id == node.id;
                });

                if (partIndex != -1) {
                    PartWeights[node.type][partIndex].weight += 0.5;
                } else {
                    PartWeights[node.type].push({
                        id: node.id,
                        weight: fitness
                    });
                };

                Parts[node.id] = [];

                for (let prop in node) {
                    Parts[node.id].push({
                        key: prop,
                        value: node[prop],
                        type: 'Static'
                    });
                }

            }
        }
    });
}

function runProgram(code, contexts) {
    var passCount = 0;

    for (var i = 0; i < contexts.length; i++) {
        var context = contexts[i];
        var sandbox;
        try {
            global.identifiers = _.keys(context.inputs);
            sandbox = _.cloneDeep(context.inputs);

            vm.createContext(sandbox);
            vm.runInContext(code, sandbox);

            if (context.validation(sandbox)) {
                passCount++;
            }

        } catch (ex) {
            return 0;
        }

    }

    return passCount / contexts.length;
}

function createProgram() {
    let program = {};
    program.ast = createNode('Program', null);

    if (DEBUG) {
        console.log(JSON.stringify(program, false, 4))
    }

    try {
        program.code = escodegen.generate(program.ast)
    } catch (ex) {
        console.log('Error creating program');
        clearInterval(interval);
        return false;

    }

    return program;
}

function createNode(keyName, parent) {
    var key = chance.weighted(PartWeights[keyName][0], PartWeights[keyName][1]);

    log(`-- ${keyName} --`);

    let nodeParts = {
        parent: parent
    };

    _.forEach(Parts[key], function(syntaxPart) {
        log(`[${syntaxPart.key}] ${syntaxPart.type}`);

        if (syntaxPart.type === 'Static') {
            nodeParts[syntaxPart.key] = syntaxPart.value;
        } else if (syntaxPart.type === 'Dynamic') {
            nodeParts[syntaxPart.key] = generateDynamic(syntaxPart, nodeParts);
        } else if (syntaxPart.type === 'DynamicValue') {
            nodeParts[syntaxPart.key] = chance.weighted(syntaxPart.value[0], syntaxPart.value[1]);
        } else if (syntaxPart.type === 'Function') {
            nodeParts[syntaxPart.key] = syntaxPart.value.call(nodeParts);
        } else if (syntaxPart.type === 'KeyFunction') {
            nodeParts[syntaxPart.key] = createNode(syntaxPart.value.call(nodeParts), nodeParts);
        } else if (syntaxPart.type === 'Body') {
            nodeParts[syntaxPart.key] = generateBody(syntaxPart, nodeParts);
        }
    });

    if (typeof nodeParts.id === 'undefined') {
        nodeParts.id = '_' + chance.guid({
            version: 4
        });
    }

    delete nodeParts.parent;

    return nodeParts;
}

function log(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}

function generateDynamic(syntaxPart, nodeParts) {
    let subPart = chance.weighted(syntaxPart.value[0], syntaxPart.value[1]);
    return createNode(subPart, nodeParts);
}

function generateBody(syntaxPart, nodeParts) {
    var body = [];
    let subPart = chance.weighted(syntaxPart.value[0], syntaxPart.value[1]);

    while (body.length < syntaxPart.min || subPart !== 'Terminate') {
        if (subPart !== 'Terminate') {
            body.push(createNode(subPart, nodeParts));
        }

        subPart = chance.weighted(syntaxPart.value[0], syntaxPart.value[1]);
    }
    return body;
}