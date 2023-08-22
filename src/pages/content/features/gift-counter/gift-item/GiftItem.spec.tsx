import { render, screen } from '@testing-library/react';
import React from 'react';
import { Gift } from '../../../../../models/Gift';
import { GiftItem } from './GiftItem';

describe('GiftItem', () => {
  let gift: Gift;

  beforeEach(() => {
    gift = {
      name: 'Test Gift',
      count: 4,
    };
  });

  it('displays the given name and count', () => {
    render(<GiftItem gift={gift} />);
    expect(screen.getByText(gift.name)).toBeInTheDocument();
    expect(screen.getByText(String(gift.count))).toBeInTheDocument();
  });
});
