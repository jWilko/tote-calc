'use strict';

const expect = require('chai').expect;

describe('Bet model', () => {
    let Model;
    let model;

    beforeEach(() => {
        Model = require('./Bet.model.js');
    });

    it('exists', () => {
        expect(Model).to.not.equal(undefined);
    });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    describe('on construction', () => {
        beforeEach(() => {
            const betLine = "Bet:e:2,3:45";
            model = new Model(betLine);
        });
        it('sets the product property', () => {
            expect(model.product).to.equal('e');
        });
        it('sets the selection property', () => {
            expect(model.selection).to.equal('2,3');
        });
        it('sets the stake property, casting to a number', () => {
            expect(model.stake).to.equal(45);
        });
    });

});
