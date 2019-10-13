import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserCreateComponent } from './create-user/create-user.component';
import { UserListComponent } from './list-user/list-user.component';
import { UserViewComponent } from './view-user/view-user.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'create-user',
    component: UserCreateComponent,
  }, {
    path: 'list-user',
    component: UserListComponent,
  },
  {
    path: 'view-user/:id',
    component: UserViewComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [
  UserComponent,
  UserCreateComponent,
  UserListComponent,
];
