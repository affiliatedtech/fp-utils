'use strict';

const tap = require('tap');
const { Either } = require('..');

tap.test('Right', async (t) => {
    const { Right } = Either;

    t.test('Chain', async (t2) => {
        const result = Right('a').chain(() => Right('b'));

        t2.equal(result.inspect, 'Right (b)');
    });

    t.test('Concat', async (t2) => {
        const result = Right('a').concat(Right('b'));

        t2.equal(result.inspect, 'Right (ab)');
    });

    t.test('Fold', async (t2) => {
        const result = Right('a').fold(
            () => '',
            (x) => x,
        );

        t2.equal(result, 'a');
    });

    t.test('Map', async (t2) => {
        const result = Right('a').map((x) => `${x}!`);

        t2.equal(result.inspect, 'Right (a!)');
    });
});

tap.test('Left', async (t) => {
    const { Left } = Either;

    t.test('Chain', async (t2) => {
        const result = Left('a').chain(() => Left('b'));

        t2.equal(result.inspect, 'Left (a)');
    });

    t.test('Concat', async (t2) => {
        const result = Left('a').concat(Left('b'));

        t2.equal(result.inspect, 'Left (a)');
    });

    t.test('Fold', async (t2) => {
        const result = Left('a').fold(
            () => 'a',
            () => '',
        );

        t2.equal(result, 'a');
    });

    t.test('Map', async (t2) => {
        const result = Left('a').map((x) => `${x}!`);

        t2.equal(result.inspect, 'Left (a)');
    });
});

tap.test('From nullable', async (t) => {
    const { from_nullable } = Either;

    const r = from_nullable('a');
    const l = from_nullable(null);

    t.equal(r.inspect, 'Right (a)');
    t.equal(l.inspect, 'Left (null)');
});

tap.test('Try/Catch', async (t) => {
    const { try_catch } = Either;

    const r = try_catch(() => 'a');
    const l = try_catch(() => { throw new Error('a'); });

    t.equal(r.inspect, 'Right (a)');
    t.equal(l.inspect, 'Left (Error: a)');
});
