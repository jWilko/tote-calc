'use strict';

const readline = require('readline');
const inputHandler = require('./utils/inputHandler.util.js');
const betManager = require('./utils/betManager.util.js');
const logger = require('./utils/logger.util.js');

let intro  = ('\n\n');
    intro += ('---------------------------------------\n');
    intro += ('     T O T E   C A L C U L A T O R\n');
    intro += ('---------------------------------------\n');
    intro += ('\n\n');
    intro += ('Welcome. Please provide bets or results.\n');
    intro += ('\n\n');

logger(intro);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();
rl.on('line', inputHandler);
