import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class NgxLoginComponent implements OnInit {

  public loginForm: FormGroup;
  url: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.url = this.route.snapshot;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {return this.loginForm.get('email'); }

  get password() {return this.loginForm.get('password'); }

  public login(): void {

    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (res) => {
          this.router.navigate(['../../pages']);
          this.authService.loginInfo(true);
        },
        (err) => {
        });

    }
  }
}
