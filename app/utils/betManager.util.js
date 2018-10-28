'use strict';

const Bet = require('../models/Bet.model.js');
const poolManager = require('./poolManager.util.js');
const logger = require('./logger.util.js');

const util = {};
const allBets = [];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.addBet = (betLine) => {
    const bet = new Bet(betLine);
    poolManager.addBetToPool(bet.product, bet.stake);
    allBets.push(bet);
    logger(`Bet received: ${betLine}\n\n>`);
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.getAllBets = () => {
    return allBets;
};

module.exports = util;
