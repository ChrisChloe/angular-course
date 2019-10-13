import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoggedUsersComponent } from './components/pages/logged-users/logged-users-list/logged-users-list.component';
import { LateOpsComponent } from './components/pages/late-ops/late-ops-list/late-ops.component';
import { LoggedUsersShowComponent } from './components/pages/logged-users/logged-users-show/logged-users-show.component';
import { IssuesListComponent } from './components/pages/issues/issues-list/issues-list.component';
import { DashboardCrmComponent } from './components/pages/dashboard-crm/dashboard-crm.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', canActivate: [AuthGuardService], component: RootComponent, children: 
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard-crm', component: DashboardCrmComponent },

      { path: 'logged-users',     component: LoggedUsersComponent },
      { path: 'logged-users/:id', component: LoggedUsersShowComponent },


      { path: 'late-ops', component: LateOpsComponent },


      { path: 'issues', component: IssuesListComponent },


      // { path: 'patients/create', component: CreateComponent },

    ]
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
