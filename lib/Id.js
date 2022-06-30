'use strict';

function Id(x) {
    return {
        chain: (f) => f(x),
        concat: (o) => Id(x.concat(o.fold((y) => y))),
        fold: (f) => f(x),
        inspect: `Id (${x})`,
        map: (f) => Id(f(x)),
    };
}
Id.of = (x) => Id(x);

module.exports = Id;
