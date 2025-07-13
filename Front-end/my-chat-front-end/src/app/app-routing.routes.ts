import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent },
    {
        path: 'sidebar',
        component: SidebarComponent,
        loadChildren: () => import('./layout/sidebar/sidebar-routing.routes')
            .then(m => m.SidebarRoutingModule)
    },

    // {
    //     path: '',
    //     component: LayoutComponent,
    //     children: [
    //     ]
    // },
    // { path: 'login', component: LoginComponent },
    // { path: '**', redirectTo: 'login' }
];

