import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from '../modal-user/modal-user.component';
import { UserService } from './../../../services/user/user.service';

@Component({
  selector: 'ngx-table-user',
  templateUrl: './table-user.component.html',
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
export class UserTableComponent {
  settings = {
    actions: {
      columnTitle: 'Ações',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'editUser',
          title: '<i class="nb-edit""></i>',
        },
        {
          name: 'viewUser',
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
        title: 'E-Mail',
      },
      user_status: {
        title: 'Status',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  modalRef: any;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router,
    ) {
      this.loadData();
    }

  loadData() {
    this.userService.getUsers().subscribe((response: any) => {
      this.source.load(response.data);
    });
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'viewUser':
        // this.viewUser(event.data);
        break;
     case 'editUser':
        this.editUser(event.data);
    }
  }

  public editUser(formData: any) {
      this.modalRef = this.modalService.open(UserModalComponent, { size: 'lg', container: 'nb-layout' });
      this.modalRef.componentInstance.formData = formData;
      this.modalRef.componentInstance.modalHeader = 'Editar Usuário';
      this.modalRef.result.then((result) => {
        if (result === 'success') {
          this.loadData();
        }
     }, (reason) => {
     });
  }

  public viewUser(formData: any) {
    this.router.navigate(['/pages/user/view-user', formData.id]);
  }
}
