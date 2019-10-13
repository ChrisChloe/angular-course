import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { UserCreateComponent } from './create-user/create-user.component';
import { UserListComponent} from './list-user/list-user.component';
import { UserTableComponent } from './table-user/table-user.component';
import { UserModalComponent } from './modal-user/modal-user.component';
import { UserViewComponent } from './view-user/view-user.component';

import { UserRoutingModule, routedComponents } from './user-routing.module';
import { NgxMaskModule } from 'ngx-mask';

const components = [
  UserCreateComponent,
  UserListComponent,
  UserTableComponent,
  UserModalComponent,
  UserViewComponent,
];

const ENTRY_COMPONENTS = [
  UserModalComponent,
];
@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    Ng2SmartTableModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    ...routedComponents, ...components,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class UserModule { }
