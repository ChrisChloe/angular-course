import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansComponent } from './plans.component';
import { PlansCreateComponent } from './create-plan/create-plan.component';
import { PlansListComponent } from './list-plan/list-plan.component';

const routes: Routes = [{
  path: '',
  component: PlansComponent,
  children: [{
    path: 'create-plan',
    component: PlansCreateComponent,
  }, {
    path: 'list-plan',
    component: PlansListComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule { }

export const routedComponents = [
  PlansComponent,
  PlansCreateComponent,
  PlansListComponent,
];
