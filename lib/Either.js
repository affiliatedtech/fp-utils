'use strict';

function Right(x) {
    return {
        chain: (f) => f(x),
        concat: (o) => o.fold(
            /* istanbul ignore next */
            () => o,
            (y) => Right(x.concat(y)),
        ),
        fold: (f, g) => g(x),
        inspect: `Right (${x})`,
        map: (f) => Right(f(x)),
    };
}

function Left(x) {
    return {
        chain: () => Left(x),
        concat: () => Left(x),
        fold: (f) => f(x),
        inspect: `Left (${x})`,
        map: () => Left(x),
    };
}

function from_nullable(x) {
    return x ? Right(x) : Left(x);
}

function try_catch(f) {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
}

const of = Right;

module.exports = {
    Right,
    Left,
    from_nullable,
    try_catch,
    of,
};
