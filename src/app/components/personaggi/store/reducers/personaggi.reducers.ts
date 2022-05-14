import {
  initialPersonaggiState,
  personaggiAdapter,
} from "../states/personaggi.state";
import * as personaggiActions from "../actions/personaggi.actions";
import { createReducer, on } from "@ngrx/store";

export const personaggiReducer = createReducer(
  initialPersonaggiState,
  on(personaggiActions.loadingPersonaggi, (state) => ({ ...state, loading: true })),
  on(personaggiActions.loadPersonaggioSuccess, (state, { response, page }) =>
    personaggiAdapter.addMany(response.results, {
      ...state,
      error: false,
      loading: false,
      total: response.count,
      loadedPages: [...state.loadedPages].concat([page].filter((item) => state.loadedPages.indexOf(item) < 0)),
    })
  ),
  on(personaggiActions.loadPersonaggioFailure, (state) =>
    personaggiAdapter.removeAll({
      ...state,
      error: true,
      loading: false,
      total: 0,
      loadedPages: [],
    })
  )
);
