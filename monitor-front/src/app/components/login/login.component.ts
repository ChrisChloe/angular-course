import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loadingLogin: boolean;
  public buttonLogin: string;

  constructor(private fb: FormBuilder,
              private route: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.loadingLogin = false;
    this.buttonLogin = 'Entrar';
    
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    
    if(this.authService.isLoggedIn()){
      this.route.navigate(['home'])
      return;
    }

  }

  login(){
    if(this.loginForm.valid){
      this.loadingLogin = true;
      this.buttonLogin = 'Entrando';

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          () => {
            this.loadingLogin = false;
            this.buttonLogin = 'Entrar';

            this.route.navigate(['home'])
          },
          () => {
            this.loadingLogin = false;
            this.buttonLogin = 'Entrar';

          });
    }
  }

}