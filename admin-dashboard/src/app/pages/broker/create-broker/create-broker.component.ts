import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrokerService } from './../../../services/broker/broker.service';
import { first } from 'rxjs/operators';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'ngx-create-broker',
  styleUrls: ['./create-broker.component.scss'],
  templateUrl: './create-broker.component.html',
})
export class BrokerCreateComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private brokerService: BrokerService,
    private notify: NotifyService,
  ) { }

  brokerForm: FormGroup;

  ngOnInit() {
    this.brokerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cnpj: ['', Validators.required],
      rates: this.formBuilder.group({
        custody: ['', Validators.required],
        custody_rate: ['', Validators.required],
        hb_fractional: ['', Validators.required],
        hb_fractional_rate: ['', Validators.required],
        hb_future: ['', Validators.required],
        hb_future_rate: ['', Validators.required],
        hb_mini: ['', Validators.required],
        hb_mini_rate: ['', Validators.required],
        hb_options: ['', Validators.required],
        hb_options_rate: ['', Validators.required],
        hb_vista: ['', Validators.required],
        hb_vista_rate: ['', Validators.required],
        m_fractional: ['', Validators.required],
        m_fractional_rate: ['', Validators.required],
        m_mini: ['', Validators.required],
        m_mini_rate: ['', Validators.required],
        m_options: ['', Validators.required],
        m_options_rate: ['', Validators.required],
        m_vista: [''],
        m_vista_rate: ['', Validators.required]}),
      services: this.formBuilder.group({
        community_online: [false],
        educational: [false],
        home_broker: [false],
        integrated_td: [false],
        loans: [false],
        mobile: [false],
        news: [false],
        platform: [false],
        recommendations: [false],
        rent: [false],
        reviews: [false],
        simulators: [false],
        term: [false]}),
    });
  }

  registerBroker() {
    if (this.brokerForm.valid) {
      this.brokerService.registerBroker(this.brokerForm.value)
      .pipe(first())
      .subscribe(
          data => {
            this.notify.show('Corretora cadastrada!', 'success');
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
