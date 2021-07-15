 
const isAnagram = require('./anagram')
beforeAll(() => {

});

afterAll(() => { 
});

test('Same length, different charaters return false', () => {
    expect(isAnagram('Hello','World')).not.toBeTruthy();
});
test('Same length, same charaters,same order return true', () => {
    expect(isAnagram('Hello','Hello')).toBeTruthy();
});
test('Same length, same charaters, different order return true', () => {
    expect(isAnagram('Hello','eHllo')).toBeTruthy();
});
 
test('First string null ,return false', () => {
    expect(isAnagram(null,'eHllo')).not.toBeTruthy();
});
test('Second string null, return false', () => {
    expect(isAnagram('Hello',null)).not.toBeTruthy();
});