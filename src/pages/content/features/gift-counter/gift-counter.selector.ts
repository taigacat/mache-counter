import { createSelector } from 'reselect';
import { RootState } from '../../rootState.type';

const giftSelector = (state: RootState) => state.gift;

export const giftCounterSelector = (state: RootState) =>
  giftSelector(state).gifts;

/**
 * Selector for gift summery.
 * @param state current state
 * @returns gift summery ordered by count descending
 */
export const giftSummerySelector = createSelector(
  giftCounterSelector,
  (gifts) => {
    return Object.entries(gifts)
      .sort(([, giftACount], [, giftBCount]) => giftBCount - giftACount)
      .map(([name, count]) => ({
        name,
        count,
      }));
  },
);
