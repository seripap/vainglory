import Vainglory from '../src/Vainglory';

describe('Vainglory class setup', () => {
  it('should not initialize if an API key is not given', () => {
    function initalizeWithNoKey() {
      return new Vainglory();
    }

    expect(initalizeWithNoKey).toThrowError('Missing API Key');
  });

  it('should initialize with the correct context if an API key is given', () => {
    const apiKey = '1234567890';
    const vainglory = new Vainglory(apiKey);

    expect(vainglory).toBeDefined();
  });

});
