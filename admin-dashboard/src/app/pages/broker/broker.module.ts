import { NgModule } from '@angular/core';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { BrokerCreateComponent } from './create-broker/create-broker.component';
import { BrokerListComponent} from './list-broker/list-broker.component';
import { BrokerTableComponent } from './table-broker/table-broker.component';
import { BrokerModalComponent } from './modal-broker/modal-broker.component';

import { BrokerRoutingModule, routedComponents } from './broker-routing.module';
import { NgxMaskModule } from 'ngx-mask';

const components = [
  BrokerCreateComponent,
  BrokerListComponent,
  BrokerTableComponent,
  BrokerModalComponent,
];

const ENTRY_COMPONENTS = [
  BrokerModalComponent,
];
@NgModule({
  imports: [
    ThemeModule,
    BrokerRoutingModule,
    Ng2SmartTableModule,
    NgxMaskModule,
  ],
  declarations: [
    ...routedComponents, ...components,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class BrokerModule { }
