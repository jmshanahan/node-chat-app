var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object',() => {
        var from = 'Deb';
        var longitude = 15;
        var latitude = 19;

        var url = 'https://www.google.com/maps?q=15,19';
        var locationMessage = generateLocationMessage(from,longitude,latitude);
        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage).toInclude({from,url});
    });
});


