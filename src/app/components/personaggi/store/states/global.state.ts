import {PersonaggiState, initialPersonaggiState} from './personaggi.state';

export interface GlobalState {
  personaggi: PersonaggiState;
}

export const initialGlobalState: GlobalState = {
  personaggi: initialPersonaggiState
};
