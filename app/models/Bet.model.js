'use strict';

class Bet {

    constructor(betDataStr) {
        const betDataArray = betDataStr.split(':');
        this.product = betDataArray[1];
        this.selection = betDataArray[2];
        this.stake = Number(betDataArray[3]);
    }
}

module.exports = Bet;