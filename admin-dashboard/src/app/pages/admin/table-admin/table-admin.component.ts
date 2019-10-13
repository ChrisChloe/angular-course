import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminModalComponent } from '../modal-admin/modal-admin.component';

import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'ngx-table-admin',
  templateUrl: './table-admin.component.html',
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

export class AdminTableComponent {

  settings = {
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'editAdmin',
          title: '<i class="nb-edit""></i>',
        },
        {
          name: 'viewAdmin',
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
      email: {
        title: 'Email',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  modalRef: any;
  test: any;

  constructor(private modalService: NgbModal, private adminService: AdminService ) {
    this.loadData();
  }

  loadData() {
    this.adminService.getAdmins().subscribe((response: any) => {
      this.test = response.data;
      this.source.load(response.data);
    });
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'viewAdmin':
        this.viewAdmin(event.data);
        break;
     case 'editAdmin':
        this.editAdmin(event.data);
    }
  }

  public editAdmin(formData: any) {
      this.modalRef = this.modalService.open(AdminModalComponent, { container: 'nb-layout' });
      this.modalRef.componentInstance.formData = formData;
      this.modalRef.componentInstance.modalHeader = 'Editar Administrador';
      this.modalRef.result.then((result) => {
         if (result === 'success') {
           this.loadData();
         }
      }, (reason) => {
      });
  }
    public viewAdmin(formData: any) {
  }
}
