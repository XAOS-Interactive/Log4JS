const xaoslogger = require('../index');

let log = new xaoslogger.Logger({ prefix: 'test' });

log.debug('%s %d %j', 'something', 0.1, {key: 'value'});