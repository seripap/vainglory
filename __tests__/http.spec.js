// jest.mock('../src/Http');

import HTTP from '../src/Http';

describe('Http class', () => {
  
  it('should just pass', () =>{});

  
  // it('should be allowed to modify host and title', () => {

  //   const newOptions = {
  //     host: 'http://daniel.seripap.com',
  //     title: 'dans-game',
  //   };

  //   const Http = new HTTP('aaa.bbb.ccc', newOptions);

  //   expect(Http.options.url).toBe(newOptions.host);
  //   expect(Http.options.headers['X-TITLE-ID']).toBe(newOptions.title);

  // });

  // it('should serialize urls correctly', () => {
  //   const Http = new HTTP('aaa.bbb.ccc');
  //   const query = {
  //     a: 'a',
  //     b: 'b',
  //     c: {
  //       d: 'd',
  //       e: 'e',
  //     },
  //     f: 'f',
  //     g: {
  //       h: 1,
  //       i: 2,
  //     },
  //   };

  //   expect(Http.serialize(query)).toBe('a=a&b=b&d=d&e=e&f=f&h=1&i=2');
  // });

  // it('should execute requests correctly', async () => {
  //   const Http = new HTTP('aaa.bbb.ccc');
  //   const GET = await Http.execute('GET', 'localhost');
  //   const POST = await Http.execute('POST', 'localhost');

  //   expect(GET).toBe(true);
  //   expect(POST).toBe(true);
  // });

});
