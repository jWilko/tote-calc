'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Input Handler utility', () => {
    let util;
    let stubs;
    let inputData;

    beforeEach(() => {
        stubs = {
            betManager : {
                addBet : sinon.stub(),
                getAllBets : sinon.stub().returns([])
            },
            resulter : {
                isInProgress : sinon.stub().returns(false),
                init : sinon.stub()
            },
            logger : sinon.stub(),
            processExit : sinon.stub(process, 'exit')
        };
        // Stub the dependencies
        util = proxyquire('./inputHandler.util.js', {
            './betManager.util.js' : stubs.betManager,
            './resulter.util.js' : stubs.resulter,
            './logger.util.js' : stubs.logger
        });
    });

    afterEach(() => {
        process.exit.restore();
    });

    it('exists as a function', () => {
        expect(typeof util).to.equal('function');
    });

    describe('when resulting is in progress', () => {
        beforeEach(() => {
            stubs.resulter.isInProgress.returns(true);
            inputData = 'some data';
            util(inputData);
        });
        it('does not create a bet', () => {
            expect(stubs.betManager.addBet.callCount).to.equal(0);
        });
        it('does not initialise another resulter', () => {
            expect(stubs.resulter.init.callCount).to.equal(0);
        });
        it('does log a message', () => {
            expect(stubs.logger.callCount).to.equal(1);
        });
        it('does not kill the process', () => {
            expect(stubs.processExit.callCount).to.equal(0);
        });
    });

    describe('when resulting is not in progress', () => {
        describe('when the provided data is an empty string', () => {
            beforeEach(() => {
                inputData = '  ';
                util(inputData);
            });
            it('does not create a bet', () => {
                expect(stubs.betManager.addBet.callCount).to.equal(0);
            });
            it('does not initialise a resulter', () => {
                expect(stubs.resulter.init.callCount).to.equal(0);
            });
            it('does not log a message', () => {
                expect(stubs.logger.callCount).to.equal(0);
            });
            it('does not kill the process', () => {
                expect(stubs.processExit.callCount).to.equal(0);
            });
        });
        describe('when the data matches the Bet regex', () => {
            beforeEach(() => {
                inputData = 'Bet:W:2:35';
                util(inputData);
            });
            it('does create a bet', () => {
                expect(stubs.betManager.addBet.callCount).to.equal(1);
                expect(stubs.betManager.addBet.args[0][0]).to.equal(inputData);
            });
            it('does not initialise a resulter', () => {
                expect(stubs.resulter.init.callCount).to.equal(0);
            });
            it('does not log a message', () => {
                expect(stubs.logger.callCount).to.equal(0);
            });
            it('does not kill the process', () => {
                expect(stubs.processExit.callCount).to.equal(0);
            });
        });
        describe('when the data matches the Result regex', () => {
            beforeEach(() => {
                inputData = 'Result:9:4:16';
                util(inputData);
            });
            it('does not create a bet', () => {
                expect(stubs.betManager.addBet.callCount).to.equal(0);
            });
            it('does initialise a resulter', () => {
                expect(stubs.resulter.init.callCount).to.equal(1);
                expect(stubs.resulter.init.args[0][0]).to.equal(inputData);
            });
            it('does not log a message', () => {
                expect(stubs.logger.callCount).to.equal(0);
            });
            it('does not kill the process', () => {
                expect(stubs.processExit.callCount).to.equal(0);
            });
        });
        describe('when the provided data indicates exit', () => {
            beforeEach(() => {
                inputData = 'exit';
                util(inputData);
            });
            it('does not create a bet', () => {
                expect(stubs.betManager.addBet.callCount).to.equal(0);
            });
            it('does not initialise a resulter', () => {
                expect(stubs.resulter.init.callCount).to.equal(0);
            });
            it('does log a message', () => {
                expect(stubs.logger.callCount).to.equal(1);
            });
            it('does kill the process', () => {
                expect(stubs.processExit.callCount).to.equal(1);
            });
        });
        describe('when the provided data is not a recognised string', () => {
            beforeEach(() => {
                inputData = 'some data';
                util(inputData);
            });
            it('does not create a bet', () => {
                expect(stubs.betManager.addBet.callCount).to.equal(0);
            });
            it('does not initialise a resulter', () => {
                expect(stubs.resulter.init.callCount).to.equal(0);
            });
            it('does log a message', () => {
                expect(stubs.logger.callCount).to.equal(1);
            });
            it('does kill the process', () => {
                expect(stubs.processExit.callCount).to.equal(1);
            });
        });
    });

});
