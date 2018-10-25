'use strict';

const inputHandler = require('./utils/inputHandler.util.js');

let intro  = ('\n\n');
    intro += ('---------------------------------------\n');
    intro += ('     T O T E   C A L C U L A T O R\n');
    intro += ('---------------------------------------\n');
    intro += ('\n\n');
    intro += ('Welcome. Please provide bets or results.\n');
    intro += ('\n\n');

process.stdout.write(intro);

process.stdin.on('data', inputHandler);
