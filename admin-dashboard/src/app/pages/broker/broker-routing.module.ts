import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrokerComponent } from './broker.component';
import { BrokerCreateComponent } from './create-broker/create-broker.component';
import { BrokerListComponent } from './list-broker/list-broker.component';

const routes: Routes = [{
  path: '',
  component: BrokerComponent,
  children: [{
    path: 'create-broker',
    component: BrokerCreateComponent,
  }, {
    path: 'list-broker',
    component: BrokerListComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrokerRoutingModule { }

export const routedComponents = [
  BrokerComponent,
  BrokerCreateComponent,
  BrokerListComponent,
];
