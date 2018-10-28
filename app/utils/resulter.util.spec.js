'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Resulter utility', () => {
    let util;
    let stubs;

    beforeEach(() => {
        stubs = {
            betManager : {
                getAllBets : sinon.stub().returns([])
            },
            poolManager : {
                getFinalPayablePools : sinon.stub().returns({})
            },
            logger : sinon.stub()
        };
        util = proxyquire('./resulter.util.js', {
            './betManager.util.js' : stubs.betManager,
            './poolManager.util.js' : stubs.poolManager,
            './logger.util.js' : stubs.logger
        });
        sinon.stub(process, 'exit');
    });

    afterEach(() => {
        process.exit.restore();
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('isInProgress()', () => {
        it('returns false when processing is not in progress', () => {
            expect(util.isInProgress()).to.equal(false);
        });
        it('returns true when processing is in progress', () => {
            util.process('Result:1:2:3');
            expect(util.isInProgress()).to.equal(true);
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('process()', () => {

        it('sets inProgress flag to true', () => {
            util.process('Result:1:2:3');
            expect(util.isInProgress()).to.equal(true);
        });

        it('gets the final payable pool amount from the poolManager', () => {
            util.process('Result:1:2:3');
            expect(stubs.poolManager.getFinalPayablePools.callCount).to.equal(1);
        });

        it('gets all bets from the betManager', () => {
            util.process('Result:1:2:3');
            expect(stubs.betManager.getAllBets.callCount).to.equal(1);
        });

        describe('calculates... ', () => {
            beforeEach(() => {
                stubs.poolManager.getFinalPayablePools.returns({
                    W : 85,
                    P : 264,
                    E : 82,
                });
                stubs.betManager.getAllBets.returns([
                    {
                        product:'W',
                        selection : '9',
                        stake: 90
                    },
                    {
                        product:'W',
                        selection : '3',
                        stake: 2
                    },
                    {
                        product:'W',
                        selection : '3',
                        stake: 8
                    },


                    {
                        product:'P',
                        selection : '3',
                        stake: 4
                    },
                    {
                        product:'P',
                        selection : '3',
                        stake: 6
                    },
                    {
                        product:'P',
                        selection : '5',
                        stake: 10
                    },
                    {
                        product:'P',
                        selection : '6',
                        stake: 12
                    },
                    {
                        product:'P',
                        selection : '6',
                        stake: 2
                    },
                    {
                        product:'P',
                        selection : '6',
                        stake: 6
                    },
                    {
                        product:'E',
                        selection : '3,6',
                        stake: 10
                    }

                ]);
                util.process('Result:3:6:5');
            });
            it('calculates the WIN product result accurately', () => {
                expect(stubs.logger.args[2][0]).to.contain('Win:3:$8.50');
            });
            it('calculates the PLACE-First product result accurately', () => {
                expect(stubs.logger.args[3][0]).to.contain('Place:3:$8.80');
            });
            it('calculates the PLACE-Second product result accurately', () => {
                expect(stubs.logger.args[4][0]).to.contain('Place:6:$4.40');
            });
            it('calculates the PLACE-Third product result accurately', () => {
                expect(stubs.logger.args[5][0]).to.contain('Place:5:$8.80');
            });
            it('calculates the EXACTA product result accurately', () => {
                expect(stubs.logger.args[6][0]).to.contain('Exacta:3,6:$8.20');
            });

        });

    });

});
