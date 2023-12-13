const unique = require('../../support/array').unique;

const sortArrayInteger = {
        description: 'Array\'s sort() method on Integers',
        keywords: ['array', 'sort', 'method'].sort(),
        codeSample: 'a.sort()',
        f: (d) => { return d[0].sort((a, b) => a - b); }
};

const sortArrayFloat = {
        description: 'Array\'s sort() method on Floats',
        keywords: ['array', 'sort', 'method'].sort(),
        codeSample: 'a.sort()',
        f: (d) => { return d[0].sort((a, b) => a - b); }
};

const sortArrayString = {
        description: 'Array\'s sort() method on Strings',
        keywords: ['array', 'sort', 'method'].sort(),
        codeSample: 'a.sort()',
        f: (d) => { return d[0].sort(); }
};

const functions = [sortArrayInteger, sortArrayFloat, sortArrayString];

module.exports = {
        name: 'array sort',
        description: {
                long: 'Array sort on different data types.',
                short: 'Array sort variations.',
        },
        keywords: unique(
                functions
                        .map((fn) => fn.keywords)
                        .reduce((keywords, fnKeywords) => [...keywords, ...fnKeywords])
        ).sort(),
        functions,
        testDataType: 'arrays',
};
