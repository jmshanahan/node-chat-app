const expect = require('expect');

const {isRealString} = require('./validation');

describe('test if it is a real string', () => {
    it('should reject non string values',() => {
            var invalidString = 100;
            var result = isRealString(invalidString);
            expect(result).toBe(false);
    });
    it('should reject string with only spaces',() => {
            var invalidString = "   ";
            var result = isRealString(invalidString);
            expect(result).toBe(false);
    });
    it('should allow string with space values',() => {
            var validString = " j s  ";
            var result = isRealString(validString);
            expect(result).toBe(true);
    });
});


