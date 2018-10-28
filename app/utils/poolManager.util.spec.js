'use strict';

const expect = require('chai').expect;

describe('Pool Manager utility', () => {
    let util;

    beforeEach(() => {
        util = require('./poolManager.util.js');
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('addBetToPool() & getPoolTotal()', () => {
        let winPoolTotal;
        let placePoolTotal;
        let exataPoolTotal;

        describe('when provided values over time', () => {

            beforeEach(() => {
                util.addBetToPool('w', 123);
                util.addBetToPool('w', 56);
                util.addBetToPool('w', 12502);

                util.addBetToPool('p', 91);
                util.addBetToPool('p', 230);
                util.addBetToPool('p', 3);
                util.addBetToPool('p', 15);
                util.addBetToPool('p', 20);

                util.addBetToPool('e', 80);
                util.addBetToPool('e', 145);

                winPoolTotal = util.getPoolTotal('w');
                placePoolTotal = util.getPoolTotal('p');
                exataPoolTotal = util.getPoolTotal('e');
            });

            it('adds values to the correct pool', () => {
                expect(winPoolTotal).to.equal(12681);
                expect(placePoolTotal).to.equal(359);
                expect(exataPoolTotal).to.equal(225);
            });
        });



    });


});
