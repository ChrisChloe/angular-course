import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../../../services/admin/admin.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-admin',
  styleUrls: ['./modal-admin.component.scss'],
  templateUrl: './modal-admin.component.html',
})
export class AdminModalComponent implements OnInit {

  modalHeader: string;
  formData: any;
  public adminForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private notify: NotifyService,
  ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      name: [this.formData.name, [Validators.required]],
      email: [this.formData.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get name() {return this.adminForm.get('name'); }
  get email() {return this.adminForm.get('email'); }
  get password() {return this.adminForm.get('password'); }

  updateAdmin() {
    if (this.adminForm.valid) {
      this.adminService.updatePlan(this.formData.id, this.adminForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Administrador atualizado, confira seu email para ativar sua conta!' , 'success');
            this.activeModal.close('success');
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

  closeModal() {
    this.activeModal.dismiss();
  }
}
