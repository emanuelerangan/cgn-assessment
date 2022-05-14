import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import {switchMap, map, catchError, tap} from "rxjs/operators";
import { loadPersonaggioSuccess, loadPersonaggioFailure, loadingPersonaggi } from "../actions/personaggi.actions";
import { Observable, of } from "rxjs";
import { PersonaggiParams, PersonaggiResponse } from "../../../../interfaces/personaggi";
import { PersonaggiService } from "../../../../services/personaggi.service";

@Injectable()
export class PersonaggiEffects {
  constructor(private actions$: Actions, private service: PersonaggiService) {}

  public loadPersonaggi$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingPersonaggi),
        switchMap((payload: { params: PersonaggiParams }) =>
          {
            return this.service.getPersonaggi(payload.params).pipe(
              map((response: PersonaggiResponse) =>
                {
                  response.results.map(personaggio => personaggio.id = personaggio.url.substring(personaggio.url.indexOf('/people/') + 8, personaggio.url.length - 1));
                  return loadPersonaggioSuccess({ response, page: payload.params.page })
                }
              ),
              catchError((error: HttpErrorResponse) =>
                of(loadPersonaggioFailure({ error }))
              )
            )
          }
        )
      )
  );
}
