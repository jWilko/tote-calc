'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

describe('Logger utility', () => {
    let util;
    let stubs;

    beforeEach(() => {
        stubs = {
            write : sinon.stub(process.stdout, 'write')
        };
        util = require('./logger.util.js');
    });

    afterEach(() => {
        process.stdout.write.restore();
    });

    it('exists as a function', () => {
        expect(typeof util).to.equal('function');
    });

    it('calls stdout.write with the provided string', () => {
        util('some test string');
        expect(stubs.write.callCount).to.equal(1);
        expect(stubs.write.args[0][0]).to.equal('some test string');
    });

});
