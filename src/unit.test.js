// tdd-jest-node/src/unit.test.js

const sum = require('./unit');


test('1 plus 2 equals 3', () => {
    expect(sum(1,2)).toBe(3);
})