'use strict';

const config = require('../config.json');

const util = {};

const totals = {
    W : 0,
    P : 0,
    E : 0
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.addBetToPool = (type, amount) => {
    totals[type] += amount;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.getPoolTotal = (type) => {
    return totals[type];
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.getFinalPayablePools = () => {
    return {
        W : totals.W * (1-config.commission.win),
        P : totals.P * (1-config.commission.place),
        E : totals.E * (1-config.commission.exacta)
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.reset = () => {
    totals.W = 0;
    totals.P = 0;
    totals.E = 0;
};

module.exports = util;
