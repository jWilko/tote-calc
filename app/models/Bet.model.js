'use strict';

class Bet {
    constructor(betDataStr) {
        const betDataArray = betDataStr.split(':');
        this.product = betDataArray[1];
        this.selection = betDataArray[2];
        this.stake = betDataArray[3];
        // TODO : increment pools
    }
}

module.exports = Bet;