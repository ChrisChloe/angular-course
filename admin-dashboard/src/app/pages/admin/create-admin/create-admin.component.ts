import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../../../services/admin/admin.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'ngx-create-admin',
  styleUrls: ['./create-admin.component.scss'],
  templateUrl: './create-admin.component.html',
})
export class AdminCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private notify: NotifyService,
  ) {
  }

  public adminForm: FormGroup;

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get name() {return this.adminForm.get('name'); }
  get email() {return this.adminForm.get('email'); }
  get password() {return this.adminForm.get('password'); }


  registerAdmin() {
    if (this.adminForm.valid) {
      this.adminService.registerAdmin(this.adminForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Administrador cadastro, confira seu email para ativar sua conta!' , 'success');
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
