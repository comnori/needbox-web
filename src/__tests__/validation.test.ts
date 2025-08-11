import { expect, test } from 'vitest';
import { validateWhat } from '../lib/validation';

test('validateWhat rejects vague word', () => {
  const res = validateWhat('개선');
  expect(res.ok).toBe(false);
});
