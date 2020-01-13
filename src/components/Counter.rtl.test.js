import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Counter from './Counter';

describe('Counter', () => {
  beforeEach(() => {
    cleanup();
  });
  
  it('renders the component', () => {
    const { container, getByText } = render(<Counter />);
    expect(container.querySelectorAll('button').length).toEqual(3);
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('Remove')).toBeTruthy();
    expect(getByText('Add if odd')).toBeTruthy();
  });

  describe('when the add button is clicked', () => {
    it('updates the clicked counter by 1', () => {
      const { getByText } = render(<Counter />);
      expect(getByText('Clicked: 0 times')).toBeTruthy();
      fireEvent.click(getByText('Add'));
      expect(getByText('Clicked: 1 times')).toBeTruthy();
    });
  });

  describe('when the value in state >= 5', () => {
    it('calls the limitWarnings prop function', () => {
      const limitWarning = jest.fn();
      const { getByText } = render(<Counter limitWarning={limitWarning} />);
      expect(getByText('Clicked: 0 times')).toBeTruthy();

      for (let i = 0; i < 5; i += 1) {
        fireEvent.click(getByText('Add'));
      }

      expect(getByText('Clicked: 5 times')).toBeTruthy();
      expect(limitWarning.mock.calls.length).toEqual(1);
    });
  });

  describe('when the remove button is clicked', () => {
    it('updates the clicked counter by 1', () => {
      const { getByText } = render(<Counter />);
      expect(getByText('Clicked: 0 times')).toBeTruthy();
      fireEvent.click(getByText('Remove'));
      expect(getByText('Clicked: -1 times')).toBeTruthy();
    });
  });

  describe('when the addIfOdd method is called', () => {
    describe('when the value in state is even', () => {
      it('does not update the value', () => {
        const { getByText } = render(<Counter />);
        expect(getByText('Clicked: 0 times')).toBeTruthy();
        fireEvent.click(getByText('Add if odd'));
        expect(() => getByText('Clicked: 1 times')).toThrow();
      });
    });
    
    describe('when the value in state is odd', () => {
      it('does updates the value', async () => {
        const { getByText } = render(<Counter />);
        expect(getByText('Clicked: 0 times')).toBeTruthy();
        fireEvent.click(getByText('Add'));
        expect(getByText('Clicked: 1 times')).toBeTruthy();
        fireEvent.click(getByText('Add if odd'));
        expect(getByText('Clicked: 2 times')).toBeTruthy();
      });
    });
  });
});