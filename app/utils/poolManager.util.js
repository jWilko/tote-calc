'use strict';

const util = {};

const totals = {
    w : 0,
    p : 0,
    e : 0
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.addBetToPool = (type, amount) => {
    totals[type] += amount;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.getPoolTotal = (type) => {
    return totals[type];
};

module.exports = util;
