import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrokerService } from './../../../services/broker/broker.service';
import { first } from 'rxjs/operators';
import { NotifyService } from '../../../services/notify.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal-broker',
  styleUrls: ['./modal-broker.component.scss'],
  templateUrl: './modal-broker.component.html',
})
export class BrokerModalComponent implements OnInit {

  modalHeader: string;
  formData: any;
  brokerForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private brokerService: BrokerService,
    private notify: NotifyService,
  ) { }

  ngOnInit() {
    this.brokerForm = this.formBuilder.group({
      name: [this.formData.name, [Validators.required]],
      cnpj: [this.formData.cnpj, Validators.required],
      rates_id: [this.formData.rates_id],
      rates: this.formBuilder.group({
        custody: [this.formData.rates.custody, Validators.required],
        custody_rate: [this.formData.rates.custody_rate, Validators.required],
        hb_fractional: [this.formData.rates.hb_fractional, Validators.required],
        hb_fractional_rate: [this.formData.rates.hb_fractional_rate, Validators.required],
        hb_future: [this.formData.rates.hb_future, Validators.required],
        hb_future_rate: [this.formData.rates.hb_future_rate, Validators.required],
        hb_mini: [this.formData.rates.hb_mini, Validators.required],
        hb_mini_rate: [this.formData.rates.hb_mini_rate, Validators.required],
        hb_options: [this.formData.rates.hb_options, Validators.required],
        hb_options_rate: [this.formData.rates.hb_options_rate, Validators.required],
        hb_vista: [this.formData.rates.hb_vista, Validators.required],
        hb_vista_rate: [this.formData.rates.hb_vista_rate, Validators.required],
        m_fractional: [this.formData.rates.m_fractional, Validators.required],
        m_fractional_rate: [this.formData.rates.m_fractional_rate, Validators.required],
        m_mini: [this.formData.rates.m_mini, Validators.required],
        m_mini_rate: [this.formData.rates.m_mini_rate, Validators.required],
        m_options: [this.formData.rates.m_options, Validators.required],
        m_options_rate: [this.formData.rates.m_options_rate, Validators.required],
        m_vista: [this.formData.rates.m_vista],
        m_vista_rate: [this.formData.rates.m_vista_rate, Validators.required]}),
      services_id: [this.formData.services_id],
      services: this.formBuilder.group({
        community_online: [this.formData.services.community_online],
        educational: [this.formData.services.educational],
        home_broker: [this.formData.services.home_broker],
        integrated_td: [this.formData.services.integrated_td],
        loans: [this.formData.services.loans],
        mobile: [this.formData.services.mobile],
        news: [this.formData.services.news],
        platform: [this.formData.services.platform],
        recommendations: [this.formData.services.recommendations],
        rent: [this.formData.services.rent],
        reviews: [this.formData.services.reviews],
        simulators: [this.formData.services.simulators],
        term: [this.formData.services.term]}),
    });
  }

  updateBroker() {
    if (this.brokerForm.valid) {
      this.brokerService.updateBroker(this.formData.id, this.brokerForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Corretora Atualizada!', 'success');
            this.activeModal.close('success');
          },
          error => {
            if (error) {
              this.notify.show(error.body.message, 'danger');
            } else {
              for (error in error.error.errors) {
                if (error.length > 0) {
                this.notify.show(`${error.toUpperCase()} inválido`, 'danger');

                }
              }
            }
          });
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
