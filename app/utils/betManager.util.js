'use strict';

const Bet = require('../models/Bet.model.js');
const logger = require('./logger.util.js');

const util = {};
const allBets = [];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.addBet = (betLine) => {
    allBets.push(new Bet(betLine));
    logger(`Bet received: ${betLine}`);
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.getAllBets = () => {
    return allBets;
};

module.exports = util;
