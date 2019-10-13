import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Authentication } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public showCard: EventEmitter<string> = new EventEmitter();

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'password': new FormControl(null),
  });

  constructor
  (
    private authentication: Authentication
  ) { }

  ngOnInit() {
  }

  public showRegisterCard(): void {
    this.showCard.emit('register');
  }

  public loginUser(): void {
    this.authentication.auth(
      this.form.value.email,
      this.form.value.password
    );
  }
}
