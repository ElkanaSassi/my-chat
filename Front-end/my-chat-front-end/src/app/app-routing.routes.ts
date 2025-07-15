import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NgModule } from '@angular/core';

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
    }
];
