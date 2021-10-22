import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {Store} from '@ngrx/store';
import {Logout} from '../../state/auth/auth.actions';
import {AppState} from '../../state';
import {SeasonService} from '../../data/services/season.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  seasons$: Observable<any>;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private store: Store<AppState>,
              private seasonService: SeasonService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit() {
    this.seasons$ = this.seasonService.fetchSeasons();

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  changeSeason(season) {
    console.log(season);
    // this._userService.setSeasonInStorage(season);
    // if (this.routedComponent.refresh) {
    //   this.routedComponent.refresh();
    // }
  }

  logout() {
    // this.state.select('setup')
    //   // .pipe(
    //   //   tap(res => {
    //   //     let redirectUrl = `/${res.companyAccount}`
    //   //     this.router.navigate([redirectUrl]);
    //   //   }),
    //   //   take(1)
    //   ).subscribe(() => {
    // })
    this.store.dispatch(Logout());
  }

}
