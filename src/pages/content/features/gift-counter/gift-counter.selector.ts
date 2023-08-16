import {RootState} from '../../rootState.type';
import {createSelector} from 'reselect';

export const giftCounterSelector = (state: RootState) => state.gifts;

export const giftSummerySelector = createSelector(giftCounterSelector, (gifts) => {
  const giftMap = gifts.reduce((acc, gift) => {
    if (acc[gift.name]) {
      acc[gift.name] += gift.count;
    } else {
      acc[gift.name] = gift.count;
    }
    return acc;
  }, {} as { [key: string]: number });

  return Object.entries(giftMap).map(([name, count]) => ({name, count}));
});
