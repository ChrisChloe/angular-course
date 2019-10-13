import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminCreateComponent } from './create-admin/create-admin.component';
import { AdminListComponent} from './list-admin/list-admin.component';
import { AdminTableComponent } from './table-admin/table-admin.component';
import { AdminModalComponent } from './modal-admin/modal-admin.component';

import { AdminRoutingModule, routedComponents } from './admin-routing.module';

const components = [
  AdminCreateComponent,
  AdminListComponent,
  AdminTableComponent,
  AdminModalComponent,
];

const ENTRY_COMPONENTS = [
  AdminModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AdminRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents, ...components,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class AdminModule { }
