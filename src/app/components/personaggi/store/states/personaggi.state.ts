import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Personaggio } from "../../../../interfaces/personaggi";

export interface PersonaggiState extends EntityState<Personaggio> {
  error: boolean;
  loading: boolean;
  total: number;
  loadedPages: number[];
}

export const personaggiAdapter: EntityAdapter<Personaggio> = createEntityAdapter<Personaggio>({
  selectId: (personaggio: Personaggio) => personaggio.url
});

export const initialPersonaggiState: PersonaggiState = personaggiAdapter.getInitialState({
  error: false,
  loading: true,
  total: 0,
  loadedPages: [],
});
