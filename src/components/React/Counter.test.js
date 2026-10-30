import {fireEvent, render, screen} from '@testing-library/react';
import Counter from './Counter';

describe('Counter component', () => {
  test('renders the counter with initial value of 0', () => {
    render(<Counter />);
    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('0');
  });

  test('increments the counter when the increment button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('1');
  });

  test('decrements the counter when the decrement button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByText('Decrement');
    fireEvent.click(decrementButton);
    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('-1');
  });

  test('resets the counter to 0 when the reset button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('0');
  });
});