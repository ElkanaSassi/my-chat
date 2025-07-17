import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: 'layout',
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
            import('./features/auth/auth-routing.module').then((m) => m.AuthRoutes),
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
