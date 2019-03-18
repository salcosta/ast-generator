var SampleProblems = {};

SampleProblems.easy = [{
    inputs: {
        'answer': null,
        'a': true,
        'b': 20,
        'c': 30
    },
    validation: function(sandbox) {
        return sandbox.answer == 20;
    }
}];


SampleProblems.medium = [{
    inputs: {
        'answer': null,
        'a': true,
        'b': 20,
        'c': 30
    },
    validation: function(sandbox) {
        return sandbox.answer == 20;
    }
}, {
    inputs: {
        'answer': null,
        'a': false,
        'b': 20,
        'c': 30
    },
    validation: function(sandbox) {
        return sandbox.answer == 30;
    }
}];

SampleProblems.EVEN_ODD = [{
    inputs: {
        'answer': null,
        'a': 2
    },
    validation: function(sandbox) {
        return typeof sandbox.answer == 'boolean' && sandbox.answer == true;
    }
}, {
    inputs: {
        'answer': null,
        'a': 4
    },
    validation: function(sandbox) {
        return typeof sandbox.answer == 'boolean' && sandbox.answer == true;
    }
}, {
    inputs: {
        'answer': null,
        'a': 1
    },
    validation: function(sandbox) {
        return typeof sandbox.answer == 'boolean' && sandbox.answer == false;
    }
}, {
    inputs: {
        'answer': null,
        'a': 3
    },
    validation: function(sandbox) {
        return typeof sandbox.answer == 'boolean' && sandbox.answer == false;
    }
}, {
    inputs: {
        'answer': null,
        'a': 0
    },
    validation: function(sandbox) {
        return typeof sandbox.answer == 'boolean' && sandbox.answer == true
    }
}, {
    inputs: {
        'answer': null,
        'a': 5
    },
    validation: function(sandbox) {
        return typeof sandbox.answer == 'boolean' && sandbox.answer == false;
    }
}];

module.exports = SampleProblems;