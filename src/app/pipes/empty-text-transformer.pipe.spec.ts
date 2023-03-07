import { EmptyTextTransformerPipe } from './empty-text-transformer.pipe';

describe('EmptyTextTransformerPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyTextTransformerPipe();
    expect(pipe).toBeTruthy();
  });
});
