import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../store/state/app.state';
import {Logout} from '../../../../store/actions/auth.actions';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  seasons$: Observable<any>;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private store: Store<IAppState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  changeSeason(season) {
    // this._userService.setSeasonInStorage(season);
    // if (this.routedComponent.refresh) {
    //   this.routedComponent.refresh();
    // }
  }

  logout() {
    // this.store.select('setup')
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
