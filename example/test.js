const log4js = require('../index');

let log = new log4js.Logger();

log.debug('%s %d %j', 'something', 0.1, {key: 'value'});