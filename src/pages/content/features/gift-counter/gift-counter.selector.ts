import {createSelector} from 'reselect';
import {RootState} from '../../rootState.type';

export const giftCounterSelector = (state: RootState) => state.gifts;

/**
 * Selector for gift summery.
 * @param state current state
 * @returns gift summery ordered by count descending
 */
export const giftSummerySelector = createSelector(giftCounterSelector, (gifts) => {
  return Object.entries(gifts)
    .sort(([, giftA], [, giftB]) => giftB.count - giftA.count)
    .map(([_, gift]) => gift);
});
