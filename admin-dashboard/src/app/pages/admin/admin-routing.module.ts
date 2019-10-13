import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminCreateComponent } from './create-admin/create-admin.component';
import { AdminListComponent } from './list-admin/list-admin.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: 'create-admin',
    component: AdminCreateComponent,
  }, {
    path: 'list-admin',
    component: AdminListComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
  AdminCreateComponent,
  AdminListComponent,
];
