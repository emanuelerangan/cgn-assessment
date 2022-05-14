import { Component, OnInit } from '@angular/core';
import {PersonaggiService} from "../../services/personaggi.service";
import {Store} from "@ngrx/store";
import {Personaggio} from "../../interfaces/personaggi";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-personaggio-detail',
  templateUrl: './personaggio-detail.component.html',
  styleUrls: ['./personaggio-detail.component.scss']
})
export class PersonaggioDetailComponent implements OnInit {
  public personaggio: Personaggio;
  public loading = true;
  private personaggioId: string;

  constructor(
    private personaggiService: PersonaggiService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.personaggioId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.personaggiService.getPersonaggio(this.personaggioId).subscribe(personaggio => {
      this.personaggio = personaggio
      this.loading = false;
    });
  }
}
