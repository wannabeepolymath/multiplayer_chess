import { Chess } from 'chess.js';

// Mock WebSocket for testing
class MockWebSocket {
  public messages: string[] = [];
  
  send(message: string) {
    this.messages.push(message);
  }
  
  emit(message: string) {
    this.messages.push(message);
  }
  
  on(_event: string, _callback: () => void) {
    // Mock event handler
  }
}

describe('Chess.js Integration', () => {
  let chess: Chess;

  beforeEach(() => {
    chess = new Chess();
  });

  it('should initialize with starting position', () => {
    expect(chess.fen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });

  it('should allow valid moves', () => {
    const move = chess.move({ from: 'e2', to: 'e4' });
    expect(move).not.toBeNull();
    expect(chess.get('e4')).toBeTruthy();
  });

  it('should reject invalid moves', () => {
    expect(() => chess.move({ from: 'e2', to: 'e5' })).toThrow();
  });

  it('should detect check', () => {
    // Scholar's mate setup
    chess.move('e4');
    chess.move('e5');
    chess.move('Qh5');
    chess.move('Nc6');
    chess.move('Bc4');
    chess.move('Nf6');
    chess.move('Qxf7');
    
    expect(chess.isCheckmate()).toBe(true);
    expect(chess.isGameOver()).toBe(true);
  });

  it('should track turn correctly', () => {
    expect(chess.turn()).toBe('w');
    chess.move('e4');
    expect(chess.turn()).toBe('b');
    chess.move('e5');
    expect(chess.turn()).toBe('w');
  });
});

describe('MockWebSocket', () => {
  it('should store sent messages', () => {
    const ws = new MockWebSocket();
    ws.send(JSON.stringify({ type: 'test', payload: {} }));
    expect(ws.messages.length).toBe(1);
    expect(JSON.parse(ws.messages[0]).type).toBe('test');
  });
});

