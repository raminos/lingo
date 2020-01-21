import stringModule from './strings';
const { getStringByLanguage } = stringModule;

const strings = {
  en: { submit: 'submit' },
  fr: { submit: 'Soumettre'},
}

describe('language string testing', () => {
  
  // use a mockWarn, so console.warn won't fire during the tests
  const mockWarn = jest.fn();
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });
  afterEach(() => {
    console.warn = originalWarn;
  })

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toContain('submit');

  });
  test('returns the correct submit string for french', () => {
    const string = getStringByLanguage('fr', 'submit', strings);
    expect(string).toContain('Soumettre');
  });
  test('returns english submit string when language does not exsits', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toContain('submit');
  });
  test('returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('jp', 'submit', strings);
    expect(string).toContain('submit');
  });
})