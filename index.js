'use strict';

const Logger = require('./lib/logger');

function hasFlag(flag) {
    return (process.argv.indexOf('--' + flag) !== -1);
}

module.exports = {
    Logger: Logger
};
