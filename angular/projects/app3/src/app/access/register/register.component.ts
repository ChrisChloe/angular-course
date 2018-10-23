import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { User } from '../models/user.model';

import { Authentication } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ Authentication ]
})
export class RegisterComponent implements OnInit {

  @Output() public showCard: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'full_name': new FormControl(null),
    'username': new FormControl(null),
    'password': new FormControl(null),

  });

  constructor(
    private authentication: Authentication
    ) { }

  ngOnInit() {
  }

  public showLoginCard(): void {
    this.showCard.emit('login');
  }

  public registerUser(): void {
    console.log(this.form);

    const user: User = new User(
      this.form.value.email,
      this.form.value.full_name,
      this.form.value.username,
      this.form.value.password
    );

    this.authentication.registerUser(user);
  }
}
