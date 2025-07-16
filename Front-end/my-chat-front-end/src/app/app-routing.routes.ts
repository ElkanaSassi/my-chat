import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'sidebar',
                loadChildren: () =>
                    import('./layout/sidebar/sidebar-routing.routes').then((m) => m.routes)
            },
        ]
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth-routing.module').then((m) => m.routes),
    }, 
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
