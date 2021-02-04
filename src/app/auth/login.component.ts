import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {markFormGroupTouched} from '../shared/utils/formUtils';
import {Observable, Subscription} from 'rxjs';
import {IAppState, selectAuthState} from '../store/state/app.state';
import {Store} from '@ngrx/store';
import {IAuthState} from '../store/state/auth.state';
import {Router} from '@angular/router';
import {Login} from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  hidePassword = true;

  authSubscription: Subscription;
  authState: Observable<any>;

  get f() {
    return this.loginForm.controls;
  }

  constructor(private store: Store<IAppState>,
              private router: Router) {
    this.authState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
    this.authSubscription = this.authState.subscribe((state: IAuthState) => {
      console.log(state);
      if (state.isAuthenticated) {
        this.router.navigate(['/admin']);
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  createLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    markFormGroupTouched(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    const password = this.f.password.value;
    this.f.password.patchValue(password.trim());

    console.log('Iniciando sesion');

    this.store.dispatch(Login({user: this.loginForm.value}));
  }

}
