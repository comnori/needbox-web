import { it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Ensure example selection populates form
it.skip('loads example into form', async () => {
  const { default: App } = await import('../App');
  render(<App />);
  const btn = screen.getAllByText('이 예시로 불러오기')[0];
  fireEvent.click(btn);
  const whatInput = screen.getByLabelText('What*') as HTMLInputElement;
  expect(whatInput.value).not.toBe('');
});
