"use strict";
var expect          = require('chai').expect;
var Promise         = require('../index');

describe('bluebird-settle', function() {

    describe('resolved promises', function() {
        var o = {};
        var promises;

        beforeEach(function() {
            promises = [
                Promise.resolve(true),
                Promise.resolve('Yes'),
                Promise.resolve(o)
            ];
        });

        it('resolves to array', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results).to.be.instanceof(Array);
                });
        });

        it('item 1 resolved to true', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[0].isFulfilled()).to.be.true;
                    expect(results[0].value()).to.equal(true);
                });
        });

        it('item 2 resolved to "Yes"', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[1].isFulfilled()).to.be.true;
                    expect(results[1].value()).to.equal('Yes');
                });
        });

        it('item 3 resolved to {}', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[2].isFulfilled()).to.be.true;
                    expect(results[2].value()).to.equal(o);
                });
        });
    });

    describe('rejected promises', function() {
        var o = new Error('Err');
        var promises;

        beforeEach(function() {
            promises = [
                Promise.reject(false),
                Promise.reject('No'),
                Promise.reject(o)
            ];
        });

        it('resolves to array', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results).to.be.instanceof(Array);
                });
        });

        it('item 1 rejected to false', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[0].isRejected()).to.be.true;
                    expect(results[0].reason()).to.equal(false);
                });
        });

        it('item 2 rejected to "No"', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[1].isRejected()).to.be.true;
                    expect(results[1].reason()).to.equal('No');
                });
        });

        it('item 3 rejected to Error', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[2].isRejected()).to.be.true;
                    expect(results[2].reason()).to.equal(o);
                });
        });
    });

    describe('rejected and resolved promises', function() {
        var o = new Error('Err');
        var promises;

        beforeEach(function() {
            promises = [
                Promise.resolve(true),
                Promise.resolve('Yes'),
                Promise.reject(o)
            ];
        });

        it('resolves to array', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results).to.be.instanceof(Array);
                });
        });

        it('item 1 resolved to true', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[0].isFulfilled()).to.be.true;
                    expect(results[0].value()).to.equal(true);
                });
        });

        it('item 2 resolved to "Yes"', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[1].isFulfilled()).to.be.true;
                    expect(results[1].value()).to.equal('Yes');
                });
        });

        it('item 3 rejected to Error', function() {
            return Promise.settle(promises)
                .then(function(results) {
                    expect(results[2].isRejected()).to.be.true;
                    expect(results[2].reason()).to.equal(o);
                });
        });
    });

});