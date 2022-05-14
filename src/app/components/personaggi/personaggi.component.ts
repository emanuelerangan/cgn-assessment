import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonaggiService} from "../../services/personaggi.service";
import {Personaggio} from "../../interfaces/personaggi";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {select, Store} from "@ngrx/store";
import {merge, Observable, Subscription} from "rxjs";
import {loadingPersonaggi} from "./store/actions/personaggi.actions";
import {first, tap} from "rxjs/operators";
import {GlobalState} from "./store/states/global.state";
import {
  selectAllPersonaggi, selectLoadedPages, selectPersonaggiError,
  selectPersonaggiLoading,
  selectPersonaggiTotal
} from "./store/selectors/personaggi.selectors";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-personaggi',
  templateUrl: './personaggi.component.html',
  styleUrls: ['./personaggi.component.scss'],
  providers: [PersonaggiService],
})
export class PersonaggiComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns = ['name', 'gender', 'height'];
  public allPersonaggi: Personaggio[];
  public dataSource: MatTableDataSource<Personaggio> = new MatTableDataSource();
  public pageSize: number = 10;
  public personaggiTotal: number;
  public loading$: Observable<boolean> = new Observable<false>();
  public error$: Observable<boolean>;
  private loadedPages$: Observable<number[]>
  private subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private personaggiService: PersonaggiService,
    private store: Store<GlobalState>,
    private matSnackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.store
      .pipe(select(selectPersonaggiTotal))
      .subscribe((total) => (this.personaggiTotal = total));

    this.loading$ = this.store.pipe(select(selectPersonaggiLoading));
    this.store.pipe(select(selectPersonaggiError)).subscribe((error) => {
      error && this.matSnackBar.open('An error has occurred');
    })
  }

  public ngAfterViewInit(): void {
    this.loadedPages$ = this.store.pipe(first(),select(selectLoadedPages));

    this.store
      .pipe(select(selectAllPersonaggi))
      .subscribe((personaggi) => {
        this.allPersonaggi = personaggi;
        this.loadPersonaggi();
      });

    this.subscription.add(
      this.paginator.page
        .pipe(tap(() => {
          this.loadPersonaggi();
        }))
        .subscribe()
    );
  }

  private loadPersonaggi(): void {
    this.loadedPages$.pipe(first()).subscribe(loadedPages => {
      if (loadedPages && loadedPages.length && loadedPages.includes(this.paginator.pageIndex)) {
        this.getPagedPersonaggi(this.allPersonaggi,this.paginator.pageIndex + 1, this.pageSize);
      } else {
        this.store.dispatch(loadingPersonaggi({params: {page: this.paginator.pageIndex}}));
      }
    })
  }

  private getPagedPersonaggi(personaggi: Personaggio[], page: number, pageSize: number) {
    const _dataSource = personaggi.filter((item: Personaggio, index) => (index / pageSize < page) && (index / pageSize >= page - 1));
    setTimeout(() => { this.dataSource = new MatTableDataSource(_dataSource) });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
