import { createSelector } from 'reselect';
import { RootState } from '../rootState.type';

const appSelector = (state: RootState) => state.app;

export const appMetadataSelector = createSelector(
  appSelector,
  (app) => app.metadata,
);
