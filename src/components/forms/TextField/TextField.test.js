import React from 'react';
import { render, screen } from '../../../infra/test/testUtils';
import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Jun"
        value="Jun"
        onChange={() => {}}
        name="nome"
      />
    );
    // screen.debug();

    const textField = screen.getByPlaceholderText(/jun/i);
    expect(textField).toMatchSnapshot();
  });
});
