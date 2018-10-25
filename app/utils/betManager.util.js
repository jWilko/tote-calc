'use strict';

const Bet = require('../models/Bet.model.js');

const util = {};
const allBets = [];

util.validateBetLine = (betLine) => {
    // TODO : validate w/p/e & num & num
    return true;
};

util.addBet = (betLine) => {
    if( util.validateBetLine(betLine) ) {
        allBets.push(new Bet(betLine));
    }
    return;
};

util.getAllBets = () => {
    return allBets;
};

module.exports = util;
