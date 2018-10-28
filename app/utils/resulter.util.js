'use strict';

const logger = require('./logger.util.js');

const util = {};

let inProgress;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.isInProgress = () => {
    return !!inProgress;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.init = (resultLine) => {
    inProgress = true;
    logger(`Result instruction received : ${resultLine} \n`);
    // TODO : Add resulting logic
    process.exit(0);
};

module.exports = util;
