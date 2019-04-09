import { FirstnamePipe } from './firstname.pipe';

describe('FirstnamePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstnamePipe();
    expect(pipe).toBeTruthy();
  });
});
