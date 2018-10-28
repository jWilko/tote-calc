'use strict';

const expect = require('chai').expect;

describe('Config.json', () => {
    let config;

    beforeEach(() => {
        config = require('./config.json');
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('Regex patterns', () => {

        it('evaluate Bet strings correctly', () => {
            const regex = new RegExp(config.regex.bet);

            const scenarios = [
                { string: 'Bet:w:2:3', expected: 'true'},
                { string: 'Bet:p:2:3', expected: 'true'},
                { string: 'Bet:e:2:3', expected: 'true'},
                { string: 'Bet:w:222222:9999', expected: 'true'},
                { string: 'Bet:p:0:0', expected: 'true'},
                { string: 'Bet:e:2:2', expected: 'true'},
                { string: 'Bet:w:222222,0:9999', expected: 'true'},
                { string: 'Bet:p:0,333:033', expected: 'true'},
                { string: 'Bet:e:23,45:2441122', expected: 'true'},
                { string: 'bet:w:2:9', expected: 'false'},
                { string: 'a:w:2:9', expected: 'false'},
                { string: 'Bet:q:2:9', expected: 'false'},
                { string: 'Bet:w:-2:9', expected: 'false'},
                { string: 'Bet:w:2:-9', expected: 'false'},
                { string: 'Bet:e:2,3,4:9', expected: 'false'},
                { string: 'Bet:w:a:9', expected: 'false'},
                { string: 'Bet:w:2:b', expected: 'false'},
                { string: 'Bet:we:2:2', expected: 'false'},
                { string: 'Bet:we:2', expected: 'false'},
                { string: 'Bet:we', expected: 'false'},
                { string: 'Bet', expected: 'false'},
                { string: '', expected: 'false'}
            ];

            scenarios.forEach((scenario) => {
                const resultWithLabel = `${scenario.string} ${regex.test(scenario.string).toString()}`;
                const expectedWithLabel = `${scenario.string} ${scenario.expected}`;
                expect(resultWithLabel).to.equal(expectedWithLabel);
            });
        });

        it('evaluate Result strings correctly', () => {
            const regex = new RegExp(config.regex.result);

            console.log('REGEX : ', regex);

            const scenarios = [
                { string: 'Result:1:2:3', expected: 'true'},
                { string: 'Result:19:28:37', expected: 'true'},
                { string: 'Result:0:0:0', expected: 'true'},
                { string: 'Result:-1:2:3', expected: 'false'},
                { string: 'Result:1:-2:3', expected: 'false'},
                { string: 'Result:1:2:-3', expected: 'false'},
                { string: 'Result:-1:-2:-3', expected: 'false'},
                { string: 'result:1:2:3', expected: 'false'},
                { string: 'results:1:2:3', expected: 'false'},
                { string: 'a:1:2:3', expected: 'false'},
                { string: 'Result:1:2', expected: 'false'},
                { string: 'Result:1', expected: 'false'},
                { string: 'Result', expected: 'false'},
                { string: '', expected: 'false'}
            ];

            scenarios.forEach((scenario) => {
                const resultWithLabel = `${scenario.string} ${regex.test(scenario.string).toString()}`;
                const expectedWithLabel = `${scenario.string} ${scenario.expected}`;
                expect(resultWithLabel).to.equal(expectedWithLabel);
            });
        });

    });

});