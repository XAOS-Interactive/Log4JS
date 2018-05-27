const timestamp = require('time-stamp');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const util = require('util');
const levels = require('./levels');
const _ = require('underscore');

const Logger = function (options) {
    this.options = typeof(options) !== "object" ? {} : options;

    _.defaults(this.options, {
        prefix: '',
        logDir: path.join(__dirname, '..', '..', 'logs'),
        logToFile: true,
        color: true
    });

};

Logger.prototype.getTimestamp = function() {
    return '['+timestamp('HH:mm:ss')+']';
};

Logger.prototype.formatLogDate = function() {
    let date = new Date();
    if (this.options.prefix !== undefined && !_.isEmpty(this.options.prefix)) {
        return this.options.prefix + "-" + date.getMonth() + "-" + date.getDay() + "-" + date.getFullYear() + ".log";
    } else {
        return date.getMonth() + "-" + date.getDay() + "-" + date.getFullYear() + ".log";
    }
};

Logger.prototype.getLogFile = function () {
    return path.join(this.options.logDir, this.formatLogDate());
};

Logger.prototype.getPrefix = function () {
  return this.options.prefix === undefined || _.isEmpty(this.options.prefix) ? '' : '[' + this.options.prefix + ']'
};

Logger.prototype.getLogOutput = function () {
    if (!fs.existsSync(this.options.logDir)) {
        fs.mkdirSync(this.options.logDir);
    }

    return fs.createWriteStream(this.getLogFile(), { flags: 'a' });
};

Logger.prototype.writeLog = function (level, output) {
  this.getLogOutput().write(level + output + "\n")
};

Logger.prototype.getLogTime = function (color) {
  return color ? chalk.gray(this.getTimestamp()) : this.getTimestamp();
};

Logger.prototype.debug = function() {
    let time = this.getLogTime(this.options.color);
    process.stdout.write(time + this.getPrefix() + chalk.cyan('[Debug] '));
    console.info.apply(console, arguments);

    if (this.options.logToFile) {
        this.writeLog(this.getLogTime(false) + this.getPrefix() + "[Debug] ", util.format.apply(console, arguments));
    }

    return this;
};

Logger.prototype.info = function () {
    let time = this.getLogTime(this.options.color);
    process.stdout.write(time + this.getPrefix() + chalk.blue('[Info] '));
    console.info.apply(console, arguments);

    if (this.options.logToFile) {
        this.writeLog(this.getLogTime(false) + this.getPrefix() + "[Info] ", util.format.apply(console, arguments));
    }

    return this;
};

Logger.prototype.warning = function () {
    let time = this.getLogTime(this.options.color);
    process.stdout.write(time + this.getPrefix() + chalk.yellow('[Warning] '));
    console.warn.apply(console, arguments);

    if (this.options.logToFile) {
        this.writeLog(this.getLogTime(false) + this.getPrefix() + "[Warning] ", util.format.apply(console, arguments));
    }

    return this;
};

Logger.prototype.error = function () {
    let time = this.getLogTime(this.options.color);
    process.stdout.write(time + this.getPrefix() + chalk.red('[Error] '));
    console.error.apply(console, arguments);

    if (this.options.logToFile) {
        this.writeLog(this.getLogTime(false) + this.getPrefix() + "[Error] ", util.format.apply(console, arguments));
    }

    return this;
};

Logger.prototype.fatal = function () {
    let time = this.getLogTime(this.options.color);
    process.stdout.write(time + this.getPrefix() + chalk.red('[Fatal] '));
    console.error.apply(console, arguments);

    if (this.options.logToFile) {
        this.writeLog(this.getLogTime(false) + this.getPrefix() + "[Fatal] ", util.format.apply(console, arguments));
    }

    return this;
};

module.exports = Logger;