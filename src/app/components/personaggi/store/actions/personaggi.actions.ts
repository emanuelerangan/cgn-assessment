import { createAction, props } from "@ngrx/store";
import { PersonaggiParams, PersonaggiResponse } from "../../../../interfaces/personaggi";

export const loadingPersonaggi = createAction(
  "[Personaggi] Loading",
  props<{ params: PersonaggiParams }>()
);

export const loadPersonaggioSuccess = createAction(
  "[Personaggi] Loaded Success",
  props<{ response: PersonaggiResponse, page: number }>()
);

export const loadPersonaggioFailure = createAction(
  "[Personaggi] Loaded Failure",
  props<{ error: any }>()
);
