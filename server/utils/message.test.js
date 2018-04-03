const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'testuser';
        const text = 'testtext';

        const message = generateMessage(from, text);

        expect(message).toInclude({ from, text });

        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'testuser2';
        const latitude = 20;
        const longitude = 40;

        const message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(message.createdAt).toBeA('number');
    });
});