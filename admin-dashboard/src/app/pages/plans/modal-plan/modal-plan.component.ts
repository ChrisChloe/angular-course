import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from './../../../services/plan/plan.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-plan',
  styleUrls: ['./modal-plan.component.scss'],
  templateUrl: './modal-plan.component.html',
})
export class PlanModalComponent implements OnInit {

  modalHeader: string;
  formData: any;
  public planForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private notify: NotifyService,
  ) { }

  ngOnInit() {
    this.planForm = this.formBuilder.group({
      name: [this.formData.name, [Validators.required]],
      trial_period_duration: [this.formData.trial_period_duration, Validators.required],
      amount_per_payment: [this.formData.amount_per_payment, Validators.required],
      period: [this.formData.period, Validators.required],
      charge: ['manual'],
    });
  }

  get name() {return this.planForm.get('name'); }

  get trial() {return this.planForm.get('trial_period_duration'); }

  get amount() {return this.planForm.get('amount_per_payment'); }

  get period() {return this.planForm.get('period'); }

  updatePlan() {
    if (this.planForm.valid) {
      this.planService.updatePlan(this.formData.id , this.planForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Plano Atualizado!', 'success');
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
