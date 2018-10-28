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
                util.reset();
                util.addBetToPool('W', 123);
                util.addBetToPool('W', 56);
                util.addBetToPool('W', 12502);

                util.addBetToPool('P', 91);
                util.addBetToPool('P', 230);
                util.addBetToPool('P', 3);
                util.addBetToPool('P', 15);
                util.addBetToPool('P', 20);

                util.addBetToPool('E', 80);
                util.addBetToPool('E', 145);

                winPoolTotal = util.getPoolTotal('W');
                placePoolTotal = util.getPoolTotal('P');
                exataPoolTotal = util.getPoolTotal('E');
            });

            it('adds values to the correct pool', () => {
                expect(winPoolTotal).to.equal(12681);
                expect(placePoolTotal).to.equal(359);
                expect(exataPoolTotal).to.equal(225);
            });
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('getFinalPayablePools()', () => {
        beforeEach(() => {
            util.reset();
            util.addBetToPool('W', 20);
            util.addBetToPool('W', 80);

            util.addBetToPool('P', 30);
            util.addBetToPool('P', 70);

            util.addBetToPool('E', 40);
            util.addBetToPool('E', 60);
        });

        it('returns an object containing the total pool less commission for each product', () => {
            const result = util.getFinalPayablePools();
            expect(result.W).to.equal(85);
            expect(result.P).to.equal(88);
            expect(result.E).to.equal(82);
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('resetPools()', () => {
        let winPoolTotal;
        let placePoolTotal;
        let exataPoolTotal;

        beforeEach(() => {
            util.reset();
            util.addBetToPool('W', 123);
            util.addBetToPool('P', 20);
            util.addBetToPool('E', 145);
            util.reset();

            winPoolTotal = util.getPoolTotal('W');
            placePoolTotal = util.getPoolTotal('P');
            exataPoolTotal = util.getPoolTotal('E');
        });

        it('adds values to the correct pool', () => {
            expect(winPoolTotal).to.equal(0);
            expect(placePoolTotal).to.equal(0);
            expect(exataPoolTotal).to.equal(0);
        });
    });


});
