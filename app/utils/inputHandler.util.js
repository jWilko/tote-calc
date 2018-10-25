'use strict';

const util = (data) => {
    const dataStr = data.toString().trim();

    process.stdout.write(`Received some data : ${dataStr} \n`);
    process.exit();
};

module.exports = util;

