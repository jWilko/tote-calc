'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('Resulter utility', () => {
    let util;

    beforeEach(() => {
        const dependencyStubs = {
            './logger.util.js' : sinon.stub()
        };
        util = proxyquire('./resulter.util.js', dependencyStubs);
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
            util.init();
            expect(util.isInProgress()).to.equal(true);
        });
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('init()', () => {
        it('sets inProgress flag to true', () => {
            util.init();
            expect(util.isInProgress()).to.equal(true);
        });

    });

});
