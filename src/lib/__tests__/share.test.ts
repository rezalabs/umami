import { getSharePath } from '../share';

describe('getSharePath', () => {
  test('returns third segment from share path', () => {
    expect(getSharePath('/share/myslug/overview')).toBe('overview');
  });

  test('returns undefined when no path after slug', () => {
    expect(getSharePath('/share/myslug')).toBeUndefined();
  });

  test('skips domain-like segment in position 3', () => {
    expect(getSharePath('/share/myslug/example.com/overview')).toBe('overview');
  });

  test('returns undefined when domain segment and no further path', () => {
    expect(getSharePath('/share/myslug/example.com')).toBeUndefined();
  });

  test('handles empty segments before share path', () => {
    expect(getSharePath('')).toBeUndefined();
  });

  test('handles single segment pathname', () => {
    expect(getSharePath('/share')).toBeUndefined();
  });
});
