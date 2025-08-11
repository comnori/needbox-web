import { renderDescription } from '../lib/description';

test('renderDescription produces expected string', () => {
  const desc = renderDescription({
    what: '테스트',
    why: '시간 절약',
    who: ['A', 'B'],
    where: 'Menu',
    when: '2025-01-01',
    how: '방법'
  });
  expect(desc).toBe(
    `[What] : 테스트\n` +
    `[Why]  : 시간 절약\n` +
    `[Who]  : A, B\n` +
    `[Where]: Menu\n` +
    `[When] : 2025-01-01\n` +
    `[How]  : 방법`
  );
});
