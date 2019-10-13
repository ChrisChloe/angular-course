import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CurrencyPipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrokerModalComponent } from '../modal-broker/modal-broker.component';

import { BrokerService } from '../../../services/broker/broker.service';

@Component({
  selector: 'ngx-table-broker',
  templateUrl: './table-broker.component.html',
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }
      :host /deep/ ng2-st-tbody-edit-delete {
        display: flex !important;
        height: 0 !important;
      }
      :host /deep/ ng2-st-tbody-custom a.ng2-smart-action.ng2-smart-action-custom-custom {
        display: inline-block;
        width: 48%;
        text-align: center;
        font-size: 1.1em;
      }
    `,
  ],
})
export class BrokerTableComponent {
  settings = {
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'editBroker',
          title: '<i class="nb-edit""></i>',
        },
        {
          name: 'viewBroker',
          title: '<i class="fas fa-info-circle"></i>',
        },
      ],
      position: 'right',
    },
    columns: {
      name: {
        title: 'Corretoras',
      },
      hb_vista: {
        title: 'Home Broker - Vista',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.hb_vista, 'BRL')} + ${row.rates.hb_vista_rate}%`;
        },
        filter: false,
      },
      hb_fractional: {
        title: 'Home Broker - Fracionário',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.hb_fractional, 'BRL')} + ${row.rates.hb_fractional_rate}%`;
        },
        filter: false,
      },
      hb_options: {
        title: 'Mesa - Opções',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.hb_options, 'BRL')} + ${row.rates.hb_options_rate}%`;
        },
        filter: false,
      },
      hb_future: {
        title: 'Home Broker - Futuros',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.hb_future, 'BRL')} + ${row.rates.hb_future_rate}%`;
        },
        filter: false,
      },
      hb_mini: {
        title: 'Home Broker - Mini',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.hb_mini, 'BRL')} + ${row.rates.hb_mini_rate}%`;
        },
        filter: false,
      },
      m_vista: {
        title: 'Mesa - Vista',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.m_vista, 'BRL')} + ${row.rates.m_vista_rate}%`;
        },
        filter: false,
      },
      m_fractional: {
        title: 'Mesa - Fracionário',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.m_fractional, 'BRL')} + ${row.rates.m_fractional_rate}%`;
        },
        filter: false,
      },
      m_options: {
        title: 'Mesa - Opções',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.m_options, 'BRL')} + ${row.rates.m_options_rate}%`;
        },
        filter: false,
      },
      m_mini: {
        title: 'Mesa - Mini',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.m_mini, 'BRL')} + ${row.rates.m_mini_rate}%`;
        },
        filter: false,
      },
      m_custody: {
        title: 'Custódia',
        valuePrepareFunction: (cell: any, row: any) => {
          return `${this.currencyPipe.transform(row.rates.custody, 'BRL')} + ${row.rates.custody_rate}%`;
        },
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  modalRef: any;
  brokers = [];

  constructor
    (private modalService: NgbModal,
     private brokerService: BrokerService,
     private currencyPipe: CurrencyPipe,
     ) { this.loadData(); }

  onCustomAction(event) {
    switch ( event.action) {
      case 'viewBroker':
        this.viewBroker(event.data);
        break;
     case 'editBroker':
        this.editBroker(event.data);
    }
  }

  loadData() {
    this.brokerService.getBrokers().subscribe((response: any) => {
      this.brokers = response.data.broker;
      this.source.load(response.data);
    });
  }

  public editBroker(formData: any) {
      this.modalRef = this.modalService.open(BrokerModalComponent, { size: 'lg', container: 'nb-layout' });
      this.modalRef.componentInstance.formData = formData;
      this.modalRef.componentInstance.modalHeader = 'Editar Corretora';
      this.modalRef.result.then((result) => {
         if (result === 'success') {
           this.loadData();
         }
      }, (reason) => {
      });
  }
    public viewBroker(formData: any) {
  }
}
