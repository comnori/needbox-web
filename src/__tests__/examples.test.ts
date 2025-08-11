import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Ensure example selection populates form
it('loads example into form', () => {
  render(<App />);
  const btn = screen.getAllByText('이 예시로 불러오기')[0];
  fireEvent.click(btn);
  const whatInput = screen.getByLabelText('What*') as HTMLInputElement;
  expect(whatInput.value).not.toBe('');
});
