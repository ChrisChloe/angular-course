import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanService } from './../../../services/plan/plan.service';
import { NotifyService } from '../../../services/notify.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'ngx-create-plan',
  styleUrls: ['./create-plan.component.scss'],
  templateUrl: './create-plan.component.html',
})
export class PlansCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private notify: NotifyService,
  ) {
  }

  public planForm: FormGroup;

  ngOnInit() {
    this.planForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      trial_period_duration: ['', Validators.required],
      amount_per_payment: ['', Validators.required],
      period: ['', Validators.required],
      charge: ['manual'],
    });
  }

  get name() {return this.planForm.get('name'); }

  get trial() {return this.planForm.get('trial_period_duration'); }

  get amount() {return this.planForm.get('amount_per_payment'); }

  get period() {return this.planForm.get('period'); }

  createPlan() {
    if (this.planForm.valid) {
      this.planService.addPlans(this.planForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Plano Criado!', 'success');
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
