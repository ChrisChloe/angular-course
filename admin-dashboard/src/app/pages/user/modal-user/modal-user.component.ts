import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user/user.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-user',
  styleUrls: ['./modal-user.component.scss'],
  templateUrl: './modal-user.component.html',
})
export class UserModalComponent implements OnInit {

  modalHeader: string;
  formData: any;
  public userForm: FormGroup;


  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notify: NotifyService,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [this.formData.name, [Validators.required]],
      email: [this.formData.email, Validators.required],
      cpf: [this.formData.cpf, [Validators.required, Validators.minLength(11)]],
      phone: [this.formData.phone, [Validators.required, Validators.minLength(14)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cei_password: ['', Validators.required],
      address_id: [this.formData.address_id],
      address: this.formBuilder.group({
        street: [this.formData.address.street, Validators.required],
        number: [this.formData.address.number, Validators.required],
        complement: [this.formData.address.complement],
        district: [this.formData.address.district, Validators.required],
        zip_code: [this.formData.address.zip_code, [Validators.required, Validators.minLength(8)]],
        country: [this.formData.address.country, Validators.required],
        state: [this.formData.address.state, Validators.required],
        city: [this.formData.address.city, Validators.required]}),
      user_status_id: [this.formData.user_status],
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

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.formData.id, this.userForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Usuário atualizado!', 'success');
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
