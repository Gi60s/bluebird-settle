"use strict";
var Promise         = require('bluebird');

module.exports = Promise;

Promise.settle = function (promises) {
    return Promise.all(promises.map(function(promise) {
        return promise.reflect();
    }));
};