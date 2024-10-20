import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ContentListComponent} from './pages/dashboard/content-list/content-list.component';
import {BatchComponent} from './pages/dashboard/batch/batch.component';
import {UpdateComponent} from './pages/dashboard/update/update.component';
import {AuthGuard} from './core/config/auth.guard';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],  // Protect the dashboard route
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: ContentListComponent },
                    { path: 'batch', component: BatchComponent },
                    { path: 'update/:id', component: UpdateComponent }
                ]
            },
            { path: 'login', component: LoginComponent },  // No auth guard for login
            { path: 'register', component: RegisterComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
