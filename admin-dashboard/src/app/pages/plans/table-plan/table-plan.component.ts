import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CurrencyPipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanModalComponent } from '../modal-plan/modal-plan.component';

import { PlanService } from '../../../services/plan/plan.service';

@Component({
  selector: 'ngx-table-plan',
  templateUrl: './table-plan.component.html',
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
      .icon {
        font-size: 20px !important;
      }
    `,
  ],
})
export class PlansTableComponent {
  settings = {
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'editPlan',
          title: '<i class="nb-edit"></i>',
        },
        {
          name: 'viewPlan',
          title: '<i class="fas fa-info-circle"></i>',
        },
      ],
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Nome',
      },
      amount_per_payment: {
        title: 'Parcela',
        valuePrepareFunction : (amount) => {
          return this.currencyPipe.transform(amount, 'BRL');
        },
      },
      period: {
        title: 'Recorrência',
        filter: false,
        valuePrepareFunction: (period) => {
          if (period === 'monthly') {
            period = 'Mensal';
          } else {
            period = 'Anual';
          }
          return period;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  modalRef: any;
  plans: [];

  constructor(
    private modalService: NgbModal,
    private planService: PlanService,
    private currencyPipe: CurrencyPipe,
  ) {
    this.loadData();
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'viewPlan':
        this.viewPlan(event.data);
        break;
     case 'editPlan':
        this.editPlan(event.data);
    }
  }

  loadData() {
    this.planService.getPlans().subscribe((response: any) => {
      this.plans = response.data;
      this.source.load(response.data);
    });
  }

  public editPlan(formData: any) {
      this.modalRef = this.modalService.open(PlanModalComponent, { container: 'nb-layout' });
      this.modalRef.componentInstance.formData = formData;
      this.modalRef.componentInstance.modalHeader = 'Editar Plano';
      this.modalRef.result.then((result) => {
          if (result === 'success') {
            this.loadData();
          }
      }, (reason) => {
      });
  }
    public viewPlan(formData: any) {
  }
}
