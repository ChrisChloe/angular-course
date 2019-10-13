import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { PlansCreateComponent } from './create-plan/create-plan.component';
import { PlansListComponent} from './list-plan/list-plan.component';
import { PlansTableComponent } from './table-plan/table-plan.component';
import { PlanModalComponent } from './modal-plan/modal-plan.component';

import { PlansRoutingModule, routedComponents } from './plans-routing.module';
import { NgxMaskModule } from 'ngx-mask';

const components = [
  PlansCreateComponent,
  PlansListComponent,
  PlansTableComponent,
  PlanModalComponent,
];

const ENTRY_COMPONENTS = [
  PlanModalComponent,
];
@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    PlansRoutingModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    ...routedComponents, ...components,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class PlansModule { }
