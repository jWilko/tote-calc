'use strict';

const betManager = require('./betManager.util.js');
const poolManager = require('./poolManager.util.js');
const logger = require('./logger.util.js');

const util = {};

let inProgress;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.isInProgress = () => {
    return !!inProgress;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
util.process = (resultLine) => {
    logger(`\n\nResult instruction received : ${resultLine} \n`);
    inProgress = true;

    const resultParts = resultLine.split(':');
    const result = {
        first : resultParts[1],
        second : resultParts[2],
        third : resultParts[3],
        exacta : `${resultParts[1]},${resultParts[2]}`
    };

    const payablePools = poolManager.getFinalPayablePools();
    const allBets = betManager.getAllBets();

    // find the winning bets > aggregate stakes per product/position.
    const winningStake = {
        W : 0,
        P1 : 0,
        P2 : 0,
        P3 : 0,
        E : 0
    };
    allBets.forEach((bet) => {
        if(bet.product === 'W' && bet.selection === result.first) {
            winningStake.W += bet.stake;
        } else if(bet.product === 'P') {
            if(bet.selection === result.first) {
                winningStake.P1 +=bet.stake;
            } else if(bet.selection === result.second) {
                winningStake.P2 += bet.stake;
            } else if(bet.selection === result.third) {
                winningStake.P3 += bet.stake;
            }
        } else if(bet.product === 'E' && bet.selection === result.exacta) {
            winningStake.E += bet.stake;
        }
    });

    const dividend = {
        W : 0,
        P1 : 0,
        P2 : 0,
        P3 : 0,
        E : 0,
    };

    // Calculate dividends by dividing total stake into payable pool; 'Place' pool divided evenly amongst P1-P2-P3
    if(winningStake.W) {
        dividend.W = (payablePools.W / winningStake.W);
    }
    // TODO : Likely bug in P1-P2-P3 calcs - if there are no winning bets in one or more, probably shouldn't divive by 3
    if(winningStake.P1) {
        dividend.P1 = (payablePools.P / 3 / winningStake.P1);
    }
    if(winningStake.P2) {
        dividend.P2 = (payablePools.P / 3 / winningStake.P2);
    }
    if(winningStake.P3) {
        dividend.P3 = (payablePools.P / 3 / winningStake.P3);
    }
    if(winningStake.E) {
        dividend.E = (payablePools.E / winningStake.E);
    }

    logger('Results:\n\n');
    logger(`Win:${result.first}:$${dividend.W.toFixed(2)}\n`);
    logger(`Place:${result.first}:$${dividend.P1.toFixed(2)}\n`);
    logger(`Place:${result.second}:$${dividend.P2.toFixed(2)}\n`);
    logger(`Place:${result.third}:$${dividend.P3.toFixed(2)}\n`);
    logger(`Exacta:${result.exacta}:$${dividend.E.toFixed(2)}\n\n`);

    process.exit(0);
};

module.exports = util;
