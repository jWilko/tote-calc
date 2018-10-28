'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Bet Manager utility', () => {
    let util;
    let stubs;

    beforeEach(() => {
        stubs = {
            BetModel : sinon.stub().returns({
                product : 'w',
                stake : 123
            }),
            poolManager : {
                addBetToPool : sinon.stub()
            },
            logger : sinon.stub()
        };
        // Stub the dependencies
        util = proxyquire('./betManager.util.js', {
            '../models/Bet.model.js' : stubs.BetModel,
            './poolManager.util.js' : stubs.poolManager,
            './logger.util.js' : stubs.logger
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('addBet()', () => {
        let testBetLine1;

        beforeEach(() => {
            testBetLine1 = 'a valid bet line';
            util.addBet(testBetLine1);
        });
        it('creates a Bet model instance', () => {
            expect(stubs.BetModel.callCount).to.equal(1);
            expect(stubs.BetModel.args[0][0]).to.equal(testBetLine1);
        });
        it('adds the bet to the array', () => {
            const allBets = util.getAllBets();
            expect(allBets.length).to.equal(1);
            expect(allBets[0].product).to.equal('w');
            expect(allBets[0].stake).to.equal(123);
        });
        it('adds the bet details to the pool', () => {
            expect(stubs.poolManager.addBetToPool.callCount).to.equal(1);
            expect(stubs.poolManager.addBetToPool.args[0][0]).to.equal('w');
            expect(stubs.poolManager.addBetToPool.args[0][1]).to.equal(123);
        });
        it('creates a log message', () => {
            expect(stubs.logger.callCount).to.equal(1);
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('getAllBets()', () => {
        it('returns an empty array when there are no bets', () => {
            const result = util.getAllBets();
            expect(result).to.deep.equal([]);
        });
        it('returns an array of bets when there are bets', () => {
            util.addBet(['Bet','w','2','34']);
            util.addBet(['Bet','p','5','12']);
            const result = util.getAllBets();
            expect(result.length).to.equal(2);
        });
    });

});
