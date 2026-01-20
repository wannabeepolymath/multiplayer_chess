import { INIT_GAME, MOVE, GAME_OVER } from '../messages';

describe('Message Constants', () => {
  it('should have correct INIT_GAME value', () => {
    expect(INIT_GAME).toBe('init_game');
  });

  it('should have correct MOVE value', () => {
    expect(MOVE).toBe('move');
  });

  it('should have correct GAME_OVER value', () => {
    expect(GAME_OVER).toBe('game_over');
  });

  it('should have unique message types', () => {
    const messages = [INIT_GAME, MOVE, GAME_OVER];
    const uniqueMessages = new Set(messages);
    expect(uniqueMessages.size).toBe(messages.length);
  });
});

