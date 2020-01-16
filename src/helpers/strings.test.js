import stringsModule from './strings';
import { findByTestAttribute } from '../../test/testUtilities';
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {},
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
    expect(string).toBe('submit');

  });
  test('returns the correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
  });
  test('returns english submit string when language does not exsits', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
  });
  test('returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
  });
})