'use strict';

const expect = require('chai').expect;

describe('Input Handler utility', () => {
    let util;

    beforeEach(() => {
        util = require('./inputHandler.util.js');
    });

    it('exists as a function', () => {
        expect(typeof util).to.equal('function');
    });

});
