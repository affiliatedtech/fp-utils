'use strict';

const tap = require('tap');
const { Id } = require('..');

tap.test('Chain', async (t) => {
    const result = Id('a').chain(() => Id('b'));

    t.equal(result.inspect, 'Id (b)');
});

tap.test('Concat', async (t) => {
    const result = Id('a').concat(Id('b'));

    t.equal(result.inspect, 'Id (ab)');
});

tap.test('Fold', async (t) => {
    const result = Id('a').fold((x) => `${x}!`);

    t.equal(result, 'a!');
});

tap.test('Map', async (t) => {
    const result = Id('a').map((x) => `${x}!`);

    t.equal(result.inspect, 'Id (a!)');
});

tap.test('Of', async (t) => {
    const result = Id.of('a');

    t.equal(result.inspect, 'Id (a)');
});
