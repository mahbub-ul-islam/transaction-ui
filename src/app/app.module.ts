import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LayoutComponent} from './shared/layout/layout.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ContentListComponent } from './pages/dashboard/content-list/content-list.component';
import { BatchComponent } from './pages/dashboard/batch/batch.component';
import { UpdateComponent } from './pages/dashboard/update/update.component';
import {AuthInterceptor} from './core/interceptors/auth-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        LayoutComponent,
        NavbarComponent,
        ContentListComponent,
        BatchComponent,
        UpdateComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
