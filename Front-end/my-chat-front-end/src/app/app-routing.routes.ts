import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

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
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth-routing.module').then((m) => m.AuthRoutes),
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent},
];
