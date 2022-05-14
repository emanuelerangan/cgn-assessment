import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personaggio, PersonaggiResponse} from "../interfaces/personaggi";

@Injectable({
  providedIn: 'root'
})
export class PersonaggiService {
  apiUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getPersonaggi(p?: any): Observable<PersonaggiResponse> {
    let params = new HttpParams();
    (p && p.page) && (params = params.append('page', p.page + 1));

    return (this.http.get(`${this.apiUrl}/people3/`, {params}) as Observable<PersonaggiResponse>);
  }

  getPersonaggio(id: string): Observable<Personaggio> {
    return (this.http.get(`${this.apiUrl}/people/${id}`) as Observable<Personaggio>);
  }

}
