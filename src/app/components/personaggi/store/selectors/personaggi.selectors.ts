import { createSelector, createFeatureSelector } from '@ngrx/store';
import { personaggiAdapter, PersonaggiState } from '../states/personaggi.state';

export const selectors = personaggiAdapter.getSelectors();
export const selectPersonaggiState = createFeatureSelector<PersonaggiState>('personaggi');

export const selectAllPersonaggi = createSelector(
  selectPersonaggiState,
  selectors.selectAll
);

export const selectPersonaggiError = createSelector(
  selectPersonaggiState,
  (state: PersonaggiState): boolean => state.error
);

export const selectPersonaggiLoading = createSelector(
  selectPersonaggiState,
  (state: PersonaggiState): boolean => state.loading
);

export const selectLoadedPages = createSelector(
  selectPersonaggiState,
  (state: PersonaggiState): number[] => state.loadedPages
);

export const selectPersonaggiTotal = createSelector(
  selectPersonaggiState,
  (state: PersonaggiState): number => state.total
);
