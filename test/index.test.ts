import { argv } from 'yargs';
describe('Dummy Test Module', () => {
  test('Just some random test', () => {
    console.log(argv);
    expect(1).toBe(1);
  });
});
