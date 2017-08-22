var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate correct message object', () => {

        var from  = "jen";
        var text = "Some message";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message.from).toBeA('string');
        expect(message).toInclude({from,text});
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
    });
});

