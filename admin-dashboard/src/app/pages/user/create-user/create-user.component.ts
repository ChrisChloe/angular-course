import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user/user.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ngx-create-user',
  styleUrls: ['./create-user.component.scss'],
  templateUrl: './create-user.component.html',
})
export class UserCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notify: NotifyService,
  ) {
  }

  public userForm: FormGroup;

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cei_password: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        district: ['', Validators.required],
        zip_code: ['', [Validators.required, Validators.minLength(8)]],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required]}),
      user_status: ['ATIVO'],
    });
  }

  get name() {return this.userForm.get('name'); }
  get email() {return this.userForm.get('email'); }
  get cpf() {return this.userForm.get('cpf'); }
  get phone() {return this.userForm.get('phone'); }
  get password() {return this.userForm.get('password'); }
  get cei() {return this.userForm.get('cei_password'); }
  get street() {return this.userForm.get('address.street'); }
  get number() {return this.userForm.get('address.number'); }
  get complement() {return this.userForm.get('address.complement'); }
  get district() {return this.userForm.get('address.district'); }
  get zip_code() {return this.userForm.get('address.zip_code'); }
  get country() {return this.userForm.get('address.country'); }
  get state() {return this.userForm.get('address.state'); }
  get city() {return this.userForm.get('address.city'); }

  registerUser() {
    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Usuário criado!', 'success');
          },
          error => {
            for (error in error.error.errors) {
             if (error.length > 0) {
              this.notify.show(`${error.toUpperCase()} inválido`, 'danger');
              }
            }
          });
    }
  }
}
