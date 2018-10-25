'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Bet Manager utility', () => {
    let util;
    let stubs;

    beforeEach(() => {
        stubs = {
            BetModel : sinon.stub().returns({iam: 'Bet model instance'}),
            logger : sinon.stub()
        };
        // Stub the dependencies
        util = proxyquire('./betManager.util.js', {
            './logger.util.js' : stubs.logger,
            '../models/Bet.model.js' : stubs.BetModel
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('validateBetLine()', () => {
        it('exists as a function', () => {
            expect(typeof util.validateBetLine).to.equal('function');
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('addBet()', () => {
        let testBetLine1;

        beforeEach(() => {
            testBetLine1 = ['Bet','w','2','90'];
            sinon.stub(util, 'validateBetLine').returns(true);
        });

        afterEach(() => {
            util.validateBetLine.restore();
        });

        it('validates the bet', () => {
            util.addBet(testBetLine1);
            expect(util.validateBetLine.callCount).to.equal(1);
            expect(util.validateBetLine.args[0][0]).to.deep.equal(testBetLine1);
        });

        describe('when the bet is valid', () => {
            beforeEach(() => {
                util.addBet(testBetLine1);
            });
            it('creates a Bet model instance', () => {
                expect(stubs.BetModel.callCount).to.equal(1);
                expect(stubs.BetModel.args[0][0]).to.deep.equal(testBetLine1);
            });
            it('adds the bet to the array', () => {
                const allBets = util.getAllBets();
                expect(allBets.length).to.equal(1);
                expect(allBets[0].iam).to.equal('Bet model instance');
            });
        });
        describe('when the bet is not valid', () => {
            beforeEach(() => {
                util.validateBetLine.returns(false);
                util.addBet(testBetLine1);
            });
            it('does not create a Bet model instance', () => {
                expect(stubs.BetModel.callCount).to.equal(0);
            });
            it('does not add the bet to the array', () => {
                const allBets = util.getAllBets();
                expect(allBets.length).to.equal(0);
            });
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
