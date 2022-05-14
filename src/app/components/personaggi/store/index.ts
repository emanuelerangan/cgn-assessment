import { ActionReducerMap } from '@ngrx/store';
import { GlobalState } from './states/global.state';
import { personaggiReducer } from './reducers/personaggi.reducers';

export const reducers: ActionReducerMap<GlobalState> = {
  personaggi: personaggiReducer
};
