// jest.mock('../src/Http');

import HTTP from '../src/Http';

describe('Http class', () => {
  
  it('should be allowed to modify host and title', () => {

    const newOptions = {
      host: 'http://daniel.seripap.com/',
      region: 'sg',
      title: 'dans-game',
    };

    const Http = new HTTP('aaa.bbb.ccc', newOptions);
    expect(Http.options.url).toBe(`${newOptions.host}`);
    expect(Http.options.headers['X-TITLE-ID']).toBe(newOptions.title);
  });

  // TODO: Region tests

  it('should serialize urls correctly', () => {
    const Http = new HTTP('aaa.bbb.ccc');
    const query = {
      a: 'a',
      b: 'b',
      c: {
        d: 'd',
        e: 'e',
      },
      f: 'f',
      g: {
        h: 1,
        i: 2,
        j: ['a','b','c','d'],
        k: [1,2,3,4,5]
      },
    };

    expect(Http.serialize(query)).toBe('a=a&b=b&c[d]=d&c[e]=e&f=f&g[h]=1&g[i]=2&g[j]=a,b,c,d&g[k]=1,2,3,4,5');
  });

});
