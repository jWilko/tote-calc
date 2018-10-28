'use strict';

const config = require('../config.json');
const betManager = require('./betManager.util.js');
const resulter = require('./resulter.util.js');
const logger = require('./logger.util.js');

const util = (data) => {
    data = data.trim();

    // Ignore empty lines
    if(!data) {
        return;
    }

    // Don't allow action if Results are being processed
    if(resulter.isInProgress()) {
        logger(`UNAVAILABLE : The application is currently processing results. Unable to process ${data}\n`);
        return;
    }

    const betRegex = new RegExp(config.regex.bet);
    const resultRegex = new RegExp(config.regex.result);

    if(betRegex.test(data)) {
        betManager.addBet(data);

    } else if(resultRegex.test(data)) {
        resulter.init(data);

    } else if(data === 'exit') {
        logger(`\n\nShutting down. Total bets : ${betManager.getAllBets().length} \n\n`);
        return process.exit(0);

    } else {
        logger('ERROR : Illegal command received. Shutting down.\n');
        return process.exit(0);

    }
};

module.exports = util;

